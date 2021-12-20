import React, { useRef,useState } from "react";
import { StyleSheet,StatusBar, Text, View, ScrollView,  TouchableOpacity ,Dimensions,SafeAreaView} from 'react-native';
import { Input, Divider, Icon, Button, CheckBox } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { Rating, AirbnbRating } from 'react-native-ratings';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from 'expo-image-manipulator';
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from "react-native-easy-toast";
import BackEndConnect from "../../utils/BackEndConnect";


const { width, height } = Dimensions.get('window');

export default function QuizTaskRun (props) {
  const { questions,tid } = props;
  const toastRef = useRef(); 
  const navigations = useNavigation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [input, setInput] = useState();
  const [checked, setChecked] = useState([]);
  const [stars, setStars] = useState();
  const [image, setImage] = useState("");
  const [date, setDate] = useState(new Date())
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [qid, setQid] = useState(0);
  const [formData, setFormData] = useState([]);
  const [formDataPic, setFormDataPic] = useState(defaultFormValuePic());
  const [pictureData, setPictureData] = useState([]);
  console.log(questions);
  function defaultFormValuePic() 
  { return {
      tid: tid,
      qid: qid,
      file: "" 
    };
  };
  function formatoPic(objeto,qidd) 
  { return {
      tid: tid,
      qid: qidd,
      file : objeto.file
    };
  };
  function formato(formData) {
    return {
      abc: formData    
    };
  }
  const onChange = (e) => {
    setInput(e.nativeEvent.text);
  };
  const handleAnswerOptionClickPic = (qidd) => {
    console.log("clickpic");
    formData.push({qid:qidd,aid:"pic"})
    setQid(qidd)
    if (qid) {
      setScore(score + 1);
    }
    sendimage(qidd).then(() => {
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
          setCurrentQuestion(nextQuestion); 
        }
        else {
          BackEndConnect("POST","taska",formato(formData)).then((ans) => {
            if (ans.ans.stx === "ok"){
              console.log("TODO BIEN DE LA TAREA");
              navigations.navigate("home");
            }
            else{
              console.log("Algo salio mal en taska1");
            }
          });
        }
      }
    ).catch((ans) =>{
      console.log(ans);
      }
    );
  };
  function onChangePic (e, type)
  { setFormDataPic({ ...formDataPic, [type]:e });
  };
  async function sendimage(qidd)
  { return await BackEndConnect("POST","taskp",formatoPic(formDataPic,qidd));
  };
  const compress = async (uri) => 
  { const manipResult = await ImageManipulator.manipulateAsync
    ( uri,
      [{ resize: { width:640 , height:480  } }],
      { compress: 0.5,base64: true, format: ImageManipulator.SaveFormat.JPEG }
    );
    setImage(manipResult.base64);
    onChangePic(manipResult.base64,"file");
  };
  const upload = async () =>
  { const resultPermissions = await MediaLibrary.requestPermissionsAsync();
    if (resultPermissions === "denied")
    { toastRef.current.show("Es necesario aceptar los permisos de cámara para subir imagenes")
    } 
    else
    { const result = await ImagePicker.launchCameraAsync(
      { allowsEditing:true,
        aspect: [4, 3],
        quality: 1
      });
      if (result.cancelled) 
      { if (!image)
        { toastRef.current.show("Has cerrado la cámara sin tomar una imagen",3000);
        }
      }
      else 
      { compress(result.uri);
      }
    }
  };
  const handleAnswerOptionClick = (res,qid) => 
  { formData.push({qid:qid,aid:res});
    if (res) 
    { setScore(score + 1);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) 
    { setCurrentQuestion(nextQuestion);
    }
    else 
    { //setShowScore(true);
      BackEndConnect("POST","taska",formato(formData)).then(async (ans) => 
      {
        await console.log("RESPUESTA DENTRO:",ans);
        if (ans.ans.stx === "ok")
        { console.log("TODO BIEN DE LA TAREA");
          navigations.navigate("home");
        }
        else{
          console.log("Algo salio mal taska0");
        }
      });
    }
  };
    //Fecha
  const onChangeDate = (event, selectedDate) => 
  { const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };
  const showMode = (currentMode) => 
  { setShow(true);
    setMode(currentMode);
  };
  const showDatepicker = () => 
  { showMode('date');
  };
  const showTimepicker = () => 
  { showMode('time');
  };
    //SUBIR IMAGEN
  //Estrellas
  const ratingFinish = (e) => 
  { setStars(e);
  };
  const updateCheck = (id) =>{
    if (checked.length==0){
      for(let i=1;i<=questions[currentQuestion].alt.length;i++){
        checked.push(false);
      }
    }
    let newChk = [...checked];
    newChk[id-1] = !newChk[id-1];
    console.log(newChk)
    setChecked(newChk);
  }
  return(
    <View>
      {showScore ? 
        ( <View>
            <Text style={styles.texttitle }>FORMULARIO TERMINADO</Text>
          </View>
        ):questions[currentQuestion].aty == 1 ?
        ( <>
            <View>
              <View>
                <Text style={styles.title}>{questions[currentQuestion].tiq}</Text>
              </View>
              <Text style={styles.text}>Pregunta {currentQuestion + 1} / {questions.length} </Text>
            </View>
            <Input
              placeholder="Texto aqui"
              containerStyle={styles.inputForm}
              inputContainerStyle={{borderBottomWidth:0}}
              errorStyle={styles.errorStyle}
              onChange={(e) => onChange(e)}
              rightIcon=
              { <Icon
                  type="material-community"
                  name="at"
                  iconStyle={styles.iconRight}
                />
              }
            />
            <View>
              <Button 
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn} title="Siguiente"
                onPress={() => handleAnswerOptionClick(input,questions[currentQuestion].qid)}
              />
            </View>
          </>
        ):questions[currentQuestion].aty == 2 ?
        ( <>
            <View>
              <View>
                <Text style={styles.title}>{questions[currentQuestion].tiq}</Text>
              </View>
              <Text style={styles.text}>Pregunta {currentQuestion + 1} / {questions.length} </Text>
            </View>
            <View>
              {questions[currentQuestion].alt.map(
                (answerOption) => 
                  ( <Button 
                      key={answerOption.aid}
                      containerStyle={styles.btnContainer}
                      buttonStyle={styles.btn}
                      title={answerOption.txt}
                      onPress={() => handleAnswerOptionClick(answerOption.aid,questions[currentQuestion].qid)}
                    />
                  )
              )}
            </View>
          </>
        ):questions[currentQuestion].aty == 3 ?
        ( <>
            <View>
              <View>
                <Text style={styles.title}>{questions[currentQuestion].tiq}3</Text>
              </View>
              <Text style={styles.text}>Pregunta {currentQuestion + 1} / {questions.length} </Text>
            </View>
            <View>
              { questions[currentQuestion].alt.map((answerOption) =>{
                return <CheckBox
                  title={answerOption.txt}
                  checked={checked[answerOption.aid-1]}
                  onPress={() => updateCheck(answerOption.aid)}
                  key={answerOption.aid}
                  />
              }
              )}
              <Button 
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                title="Siguiente"
                onPress={() =>{
                  let altId="" 
                  for (let i=1;i<=checked.length;i++){
                    if(checked[i-1]){
                      altId = altId+i.toString()+"-";
                    }
                  }
                  console.log(altId);
                  handleAnswerOptionClick(altId,questions[currentQuestion].qid)
                }}
              />
            </View>
          </>
        ):questions[currentQuestion].aty == 4 ?
        ( <>
            <View>
              <View>
                <Text style={styles.title}>{questions[currentQuestion].tiq}</Text>
              </View>
              <Text style={styles.text}>Pregunta {currentQuestion + 1} / {questions.length} </Text>
            </View>
            <View>
              <AirbnbRating
                count={7}
                reviews={["1", "2", "3", "4", "5", "6", "7"]}
                defaultRating={0}
                size={30}
                onFinishRating={ratingFinish}
              />
              <Button 
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                title="Siguiente"
                onPress={() => handleAnswerOptionClick(stars,questions[currentQuestion].qid)}
              />
            </View>
          </>  
        ):questions[currentQuestion].aty == 5 ?
        ( <>
            <View>
              <View>
                <Text style={styles.title}>{questions[currentQuestion].tiq}</Text>
              </View>
              <Text style={styles.text}>Pregunta {currentQuestion + 1} / {questions.length} </Text>
            </View>
            <View>      
              <Button
                title={ !image ? "Tomar foto" : "Cambiar Foto"}
                containerStyle={styles.btnContainerPic}
                buttonStyle={ !image ? styles.btnPic : styles.btnCheck}
                onPress={()=>upload()}
              />            
              <Toast ref={ toastRef } position="center" opacity={0.9} />
              <Button 
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                title="Siguiente"
                onPress={() => handleAnswerOptionClickPic(questions[currentQuestion].qid)}
              />
            </View>
          </>
        ):questions[currentQuestion].aty == 6 ?
        ( <>
            <View>
              <View>
                <Text style={styles.title}>{questions[currentQuestion].tiq}</Text>
              </View>
              <Text style={styles.text}>Pregunta {currentQuestion + 1} / {questions.length} </Text>
            </View>
            <View>
              <View>
                <Button containerStyle={styles.btnContainerDate} buttonStyle={styles.btnDate} onPress={showDatepicker} title="Establecer Fecha" />
              </View>
              <View>
                <Button containerStyle={styles.btnContainerDate} buttonStyle={styles.btnDate} onPress={showTimepicker} title="Establecer Hora" />
              </View>
              {show && 
                ( <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChangeDate}
                  />
                )
              }
            </View>
            <Button 
              containerStyle={styles.btnContainer}
              buttonStyle={styles.btn}
              title="Siguiente"
              onPress={() => handleAnswerOptionClick(date,questions[currentQuestion].qid)}/>
          </>
        ):
        <>
          <View>
            <View>
              <Text style={styles.title}>Fin de la tarea</Text>
            </View>
            <Text style={styles.text}>Presiona continuar para enviar los datos de tu trabajo </Text>                
          </View>
          <View>    
            <Button 
              containerStyle={styles.btnContainer}
              buttonStyle={styles.btn}
              title="Finalizar Tarea" />    
          </View>
        </>
      }
    </View>
  );
}

const styles = StyleSheet.create(
{ title:
  { marginTop:50,
    marginBottom:80,
    marginHorizontal:20,
    fontSize: 30,
    textAlign:"center",
    fontWeight: "bold"
  },
  text:
  { marginTop:30,
    marginBottom:10,
    marginHorizontal:20,
    fontSize: 20,
    textAlign:"center"
  },
  viewContainer:
  { marginRight: 40,
    marginLeft: 40,
    marginTop: 15,
    marginBottom:5,
    justifyContent: "center",
    alignItems: "center"
  },
  viewContainer2:
  { marginRight: 30,
    marginLeft: 30,
    marginTop: 50
  },
  texttitle:
  { marginTop:50,
    marginBottom:50,
    marginHorizontal:20,
    fontSize: 17,
    textAlign:"justify"
  },
  textRegister:
  { flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  btnRegister:
  { color: "#6B35E2",
    fontWeight: "bold"
  },
  divider:
  { backgroundColor: "#6B35E2",
    margin: 40
  },
  viewZolbit:
  { justifyContent: "center",
    alignItems: "center"
  },
  textZolbit:
  { fontWeight: "bold"
  },
  customBtnText:
  { fontSize: 20,
    fontWeight: "400",
    marginVertical:5
  },
  customBtnTextContent:
  { marginBottom:100,
    textAlign: "justify"
  },
  customBtn: 
  { backgroundColor: "#fff",
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 10,
    marginTop:5 ,
    marginBottom:5
  },
  container: 
  { flex:.5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems:"center"
  },
  wrapper:
  { flex: 1
  },
  btnContainer:
  { marginTop: 20,
    width: "80%",
    marginLeft: 40
  },
  btn:
  { backgroundColor: "#6B35E2",
    borderRadius: 50
  },
  btnContainerDate:
  { marginTop: 20,
    width: "50%",
    marginLeft: 100
  },
  btnDate:
  { backgroundColor: "#6B35E2",
    borderRadius: 50
  },
  inputForm:
  { width: "100%",
    marginTop: 30,
    backgroundColor: '#fff',
    borderRadius: 50
  },
  btnContainerPic:
  { marginTop:40,
    marginBottom: 40,
    width: "50%",
    marginHorizontal:100
  },
  btnPic:
  { backgroundColor: "#A29FD8",
    borderRadius: 50,
    marginHorizontal:10
  },
  btnCheck:
  { backgroundColor: "#5100FF",
    borderRadius: 50,
    marginHorizontal:10
  }
});