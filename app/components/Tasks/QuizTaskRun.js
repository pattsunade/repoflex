import React, { useRef,useState } from "react";
import { StyleSheet,StatusBar, Text, View, ScrollView, TextInput,TouchableOpacity ,Dimensions,SafeAreaView, Image, Platform} from 'react-native';
import { Input, Divider, Icon, Button, CheckBox} from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { Rating, AirbnbRating } from 'react-native-ratings';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from 'expo-image-manipulator';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackEndConnect from "../../utils/BackEndConnect";
import Toast from 'react-native-toast-message';
import Loading from '../Loading';
import moment from "moment";
const { width, height } = Dimensions.get('window');

export default function QuizTaskRun (props) {
  const {questions,tid,completed,data} = props;
  console.log(data);
  const navigation = useNavigation();
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [input, setInput] = useState();
  const [checked, setChecked] = useState([]);
  const [stars, setStars] = useState();
  const [image, setImage] = useState("");
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");
  const [displayDate, setDisplayDate] = useState(null);
  const [displayTime, setDisplayTime] = useState(null);
  const [disabledContinue, setDisabledContinue] = useState(data ? false:true);
  const [qid, setQid] = useState(0);
  const [formData, setFormData] = useState([]);
  const [formDataPic, setFormDataPic] = useState(defaultFormValuePic());
  const [pictureData, setPictureData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Guardando respuestas...");

  function defaultFormValuePic() 
  { return {
      tid: tid,
      qid: qid,
      file: "" 
    };
  }

  function formatoPic(objeto,qidd) 
  { return {
      tid: tid,
      qid: qidd,
      file: objeto.file
    };
  }

  function onChange(e)
  { setInput(e.nativeEvent.text);
    setDisabledContinue(false);
  }

  function handleAnswerOptionClickPic(qidd) 
  { setLoading(true);
    if(formDataPic.file.length>0)
    { setQid(qidd)
      if (qid) {
        setScore(score + 1);
      }
      sendimage(qidd).then(() =>
      { AsyncStorage.setItem('@comp',(completed+1).toString()).then(()=>{
        navigation.navigate(
        { name:'task',
          params:
          { completed:completed+1,
            tid:tid,
            taskData:{qid:qidd,aid:"pic"}
          },
          merge: true
        })
      });
      }).catch((ans) =>
        { console.log(ans);
        }
      );
    }
    else
    { Toast.show(
      { type: 'error',
        props: 
        { onPress: () => {}, text1: 'Error', text2: "Debes subir una foto."
        }
      });
    }
  }

  function onChangePic (e, type)
  { setFormDataPic({ ...formDataPic, [type]:e });
    setDisabledContinue(false);
  }

  async function sendimage(qidd)
  { return await BackEndConnect("POST","taskp",formatoPic(formDataPic,qidd));
  }

  const compress = async (uri) => 
  { const manipResult = await ImageManipulator.manipulateAsync
    ( uri,
      [{ resize: { width:640 , height:480  } }],
      { compress: 0.5,base64: true, format: ImageManipulator.SaveFormat.JPEG }
    );
    // setImage(manipResult.base64);
    onChangePic(manipResult.base64,"file");
  }

  async function upload()
  { const roll = await ImagePicker.requestCameraPermissionsAsync();
    if (roll === "denied" || roll===false)
    { Toast.show(
      { type: 'error',
        props: {onPress: () => {}, text1: 'Error', text2: "Debes dar permiso para acceder a la cámara."
        }
      });
    }
    else
    { const result = await ImagePicker.launchCameraAsync(
      { allowsEditing:true,
        quality: 1,
        presentationStyle: 0
      });
      if (result.cancelled) 
      { if (!image)
        { Toast.show(
          { type: 'error',
            props: {onPress: () => {}, text1: 'Error', text2: "Debes tomar una foto."
            }
          });
        }
      }
      else 
      { compress(result.uri);
        setImage(result.uri);
      }
    }
  }

  function handleAnswerOptionClick (res,qid)
  { setLoading(true);
    if (res!=null&&(res.length>0||res>0))
    { formData.push({qid:qid,aid:res});
      if (res) 
      { setScore(score + 1);
      }
      AsyncStorage.setItem('@comp',(completed+1).toString());
      navigation.navigate({
        name:'task',
        params: 
        { completed:completed+1,
          tid:tid,
          taskData:{qid:qid,aid:res},
        },
        merge: true
      });
      setLoading(false);
    }
    else
    { Toast.show(
        { type: 'error',
          props: 
          { onPress: () => {}, text1: 'Error', text2: "El campo no puede estar vacío."
          }
        }
      );
    }
  }

  const handleConfirm = (event, selectedDate) =>
  { const currentDate = selectedDate || date;
    if(Platform.OS === 'ios')
      setSelectedDate(moment(currentDate).format('YYMMDDHHmm'));
    else
    { setShow(false);
      if(mode=='date')
      { setSelectedDate(moment(currentDate).format('YYMMDD'));
        setDisplayDate(moment(currentDate).format('DD [de] MMMM [del] YYYY'));
      }
      else
      { setSelectedTime(moment(currentDate).format('HHmm'));
        setDisplayTime(moment(currentDate).format('HH:mm'));
      }
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatePicker = () =>
  { showMode('date');
  };

  const showTimePicker = () =>
  { showMode('time');
  };  

  function ratingFinish(e)
  { setStars(e);
    setDisabledContinue(false);
  }

  function updateCheck(id)
  { if (checked.length==0){
      for(let i=1;i<=questions.alt.length;i++){
        checked.push(false);
      }
    }
    let newChk = [...checked];
    newChk[id-1] = !newChk[id-1];
    setChecked(newChk);
    setDisabledContinue(false);
  }

  return(
    <View>
      {showScore ? 
        ( <View>
            <Text style={styles.texttitle }>FORMULARIO TERMINADO</Text>
          </View>
        ):questions.aty == 1 ?
        ( <>
            <View>
              <View>
                <Text style={styles.title}>{questions.tiq}</Text>
              </View>
              <Text style={styles.text}>Pregunta {completed + 1}</Text>
            </View>
            <View style={styles.searchSection}>
              <TextInput
                placeholder="Texto aquí"
                style={styles.inputForm}
                onChange={(e) => onChange(e)}
                maxLength={128}
                value={data && data}
              />
            </View>
            <View style={styles.searchSection}>
              <Button 
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn} title="Siguiente"
                disabled={disabledContinue}
                onPress={() => handleAnswerOptionClick(input,questions.qid)}
              />
            </View>
          </>
        ):questions.aty == 2 ?
        ( <>
            <View>
              <View>
                <Text style={styles.title}>{questions.tiq}</Text>
              </View>
              <Text style={styles.text}>Pregunta {completed + 1} </Text>
            </View>
            <View style={styles.searchSection2}>
              {questions.alt.map(
                (answerOption) => 
                  ( <Button 
                      key={answerOption.aid}
                      containerStyle={styles.btnContainer}
                      buttonStyle={styles.btn}
                      title={answerOption.txt}
                      onPress={() => handleAnswerOptionClick(answerOption.aid,questions.qid)}
                    />
                  )
              )}
            </View>
          </>
        ):questions.aty == 3 ?
        ( <>
            <View>
              <View>
                <Text style={styles.title}>{questions.tiq}</Text>
              </View>
              <Text style={styles.text}>Pregunta {completed + 1} </Text>
            </View>
            <View>
              { questions.alt.map((answerOption) =>{
                return <CheckBox
                  title={answerOption.txt}
                  checked={checked[answerOption.aid-1]}
                  onPress={() => updateCheck(answerOption.aid)}
                  key={answerOption.aid}
                  />
              }
              )}
              <View style={styles.searchSection}>
                <Button
                  containerStyle={styles.btnContainer}
                  buttonStyle={styles.btn}
                  title="Siguiente"
                  disabled={disabledContinue}
                  onPress={() =>{
                    let altId="";
                    let len=checked.length;
                    for (let i=1;i<=len;i++)
                    { if(checked[i-1])
                        altId = altId+i.toString()+"-";
                      if(i==len)
                        altId = altId.slice(0,-1);
                    }
                    // console.log(altId);
                    handleAnswerOptionClick(altId,questions.qid)
                  }}
                />
              </View>
            </View>
          </>
        ):questions.aty == 4 ?
        ( <>
            <View>
              <View>
                <Text style={styles.title}>{questions.tiq}</Text>
              </View>
              <Text style={styles.text}>Pregunta {completed + 1} </Text>
            </View>
            <View>
              <AirbnbRating
                count={7}
                reviews={["1", "2", "3", "4", "5", "6", "7"]}
                defaultRating={0}
                size={30}
                onFinishRating={ratingFinish}
              />
              <View style={styles.searchSection}>
                <Button 
                  containerStyle={styles.btnContainer}
                  buttonStyle={styles.btn}
                  title="Siguiente"
                  disabled={disabledContinue}
                  onPress={() => handleAnswerOptionClick(stars,questions.qid)}
                />
              </View>
            </View>
          </>  
        ):questions.aty == 5 ?
        ( <>
            <View>
              <View>
                <Text style={styles.title}>{questions.tiq}</Text>
              </View>
              <Text style={styles.text}>Pregunta {completed + 1} </Text>
            </View>
            <View>      
              <Button
                title={ !image ? "Tomar foto" : "Cambiar Foto"}
                containerStyle={styles.btnContainerPic}
                buttonStyle={ !image ? styles.btnPic : styles.btnCheck}
                onPress={()=>upload()}
              />
              <Image
                  source={image ? {uri:image} : require("../../../assets/no-image.png")}
                  resizeMode="contain"
                  style={styles.logo}
                />
              <View style={styles.searchSection}>
                <Button 
                  containerStyle={styles.btnContainer}
                  buttonStyle={styles.btn}
                  title="Siguiente"
                  disabled={disabledContinue}
                  onPress={() => handleAnswerOptionClickPic(questions.qid)}
                />
              </View>
            </View>
          </>
        ):questions.aty == 6 ?
        ( Platform.OS === 'ios' ?( 
              <View style={styles.viewContainerIos}>
                <Text style={styles.title}>{questions.tiq}</Text>
                <Text style={styles.text}>Actividad {completed + 1} </Text>
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  is24Hour={true}
                  mode='datetime'
                  onChange={handleConfirm}
                />
                <View style={{ alignItems: 'center',
                               justifyContent: 'center'}}>
                  <Button 
                    containerStyle={styles.btnContainer}
                    buttonStyle={styles.btn}
                    title="Siguiente"
                    onPress={selectedDate == null ?
                        () => handleAnswerOptionClick(moment(date).format('YYMMDDHHmm'),questions.qid):
                        () => handleAnswerOptionClick(selectedDate,questions.qid)                        
                      }
                  />
                </View>
              </View>
            ):( <View style={styles.viewContainer}>
                  <Text style={styles.title}>{questions.tiq}</Text>
                  <Text style={styles.text}>Actividad {completed + 1} </Text>
                  <Button containerStyle={styles.btnContainerDate} buttonStyle={styles.btnDate}
                        onPress={showDatePicker} title="Seleccionar fecha"/>
                  <Button containerStyle={styles.btnContainerDate} buttonStyle={styles.btnDate}
                        onPress={showTimePicker} title="Seleccionar hora"/>
                  { show && ( <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode={mode}
                                is24Hour={true}
                                display="default"
                                onChange={handleConfirm}
                              />)
                  }
                  <Text style={styles.textDate}>Fecha: {displayDate}</Text>
                  <Text style={styles.textDate}>Hora:  {displayTime}</Text>
                  <Button 
                    containerStyle={styles.btnContainer}
                    buttonStyle={styles.btn}
                    title="Siguiente"
                    disabled={displayDate!= null && displayTime != null ? false:true}
                    onPress={() => handleAnswerOptionClick(selectedDate+selectedTime,questions.qid)}
                  />
                </View>
              )
        ):(
        <>
        </>)
      }
      { loading && (<Loading text={loadingText}/>)
      }
    </View>
  );
}

const styles = StyleSheet.create(
{ title:
  { marginTop:50,
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
  textDate:
  { marginTop:10,
    marginHorizontal:20,
    fontSize: 20,
    textAlign:"center"
  },
  viewContainer:
  { marginRight: 30,
    marginLeft: 30,
    marginTop: 15,
    marginBottom:5,
    justifyContent: "center",
    alignItems: "center"
  },
  viewContainerIos:
  { marginRight: 30,
    marginLeft: 30,
    marginTop: 15,
    marginBottom:5,
    justifyContent: "center",
  },
  logo:
  { width:"100%",
    height:150,
    marginTop:10
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
  { marginTop: 10,
    width: "80%",
  },
  btn:
  { backgroundColor: "#6B35E2",
    borderRadius: 50
  },
  btnContainerDate:
  { marginTop: 20,
    width: "70%"
  },
  btnDate:
  { backgroundColor: "#6B35E2",
    borderRadius: 50
  },
  inputForm:
  { flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    width: "100%",   
    backgroundColor: '#fff',
    borderRadius: 20
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
  },
  searchSection:
  { flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    marginLeft: 20
  },
  searchSection2:
  { flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    marginLeft: 20
  }
});