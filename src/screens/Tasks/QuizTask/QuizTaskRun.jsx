import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, TextInput, Image, Platform, ActivityIndicator} from 'react-native';
import { Input, Divider, Icon, Button, CheckBox} from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { Rating, AirbnbRating } from 'react-native-ratings';
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from 'expo-image-manipulator';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackEndConnect from "api/backendHandler";
import Toast from 'react-native-toast-message';
import moment from "moment";
import noImage from 'assets/no-image.png'


export default function QuizTaskRun (props) {
	const {questions,tid,completed,prevAns} = props;
	// console.log("prevAns->",prevAns);
	const navigation = useNavigation();
	// const [showScore, setShowScore] = useState(false);
	// const [score, setScore] = useState(0);
	const [input, setInput] = useState(prevAns);
	const [checked, setChecked] = useState(prevAns ? prevAns:[]);
	const [stars, setStars] = useState(prevAns ? prevAns:0);
	const [image, setImage] = useState(prevAns);
	const [date, setDate] = useState(questions.aty == 6 && prevAns ? new Date(Date.parse('20'+prevAns.substr(0,2)+'/'+
		prevAns.substr(2,2)+'/'+prevAns.substr(4,2)+
		' '+prevAns.substr(6,2)+':'+prevAns.substr(8,2))):
		new Date());
	const [selectedDate, setSelectedDate] = useState(null);
	const [selectedTime, setSelectedTime] = useState(null);
	const [show, setShow] = useState(false);
	const [mode, setMode] = useState('date');
	const [displayDate, setDisplayDate] = useState(questions.aty == 6 && prevAns ? prevAns.substr(4,2)+'/'+
		prevAns.substr(2,2)+'/'+prevAns.substr(0,2):null);
	const [displayTime, setDisplayTime] = useState(questions.aty == 6 && prevAns ? prevAns.substr(6,2)+':'+
		prevAns.substr(8,2):null);
	const [disabledContinue, setDisabledContinue] = useState(prevAns ? false:true);
	const [qid, setQid] = useState(0);
	const [formData, setFormData] = useState([]);
	const [formDataPic, setFormDataPic] = useState({
		tid: tid,
		qid: qid,
		file: "" 
	});
	const [loading, setLoading] = useState(false);

	const formatoPic = (objeto,qidd) => { 
		return {
			tid: tid,
			qid: qidd,
			file: objeto.file
		};
	}

	const onChange = (e) => { 
		setInput(e.nativeEvent.text);
		setDisabledContinue(false);
	}

	const handleAnswerOptionClickPic = (qidd) => { 
		setLoading(true);
		if(formDataPic.file.length>0)
		{ setQid(qidd)
		// if (qid) {
		//   setScore(score + 1);
		// }
		sendimage(qidd).then(() =>
		{ AsyncStorage.setItem('@comp',(completed+1).toString()).then(()=>
			{ if (prevAns)
			{ navigation.navigate(
				{ name:'task',
				params:
				{ tid:tid,
					backAnsFormat:{qid:qidd,aid:'pic'},
					frontAnsFormat:image,
					update:true
				},
				merge: true
				});
			}
			else
			{ navigation.navigate(
				{ name:'task',
				params:
				{ completed:completed+1,
					tid:tid,
					backAnsFormat:{qid:qidd,aid:"pic"},
					frontAnsFormat:image
				},
				merge: true
				});
			}
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

	const onChangePic = (e, type) => { 
		setFormDataPic({ ...formDataPic, [type]:e });
		setDisabledContinue(false);
	}

	const sendimage = async(qidd) => { 
		return await BackEndConnect("POST","taskp",formatoPic(formDataPic,qidd));
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

  function handleAnswerOptionClick (backAns,qid,frontAns=null,)
  { setLoading(true);
    if (backAns!=null&&(backAns.length>0||backAns>0))
    { formData.push({qid:qid,aid:backAns});
      // if (res) 
      //   setScore(score + 1);
      if (prevAns)
      { navigation.navigate(
        { name:'task',
          params: 
          { tid:tid,
            backAnsFormat:{qid:qid,aid:backAns},
            frontAnsFormat:frontAns ? frontAns:backAns,
            update:true
          },
          merge: true
        });
      }
      else
      { AsyncStorage.setItem('@comp',(completed+1).toString()).then(()=>
        { navigation.navigate(
          { name:'task',
            params: 
            { completed:completed+1,
              tid:tid,
              backAnsFormat:{qid:qid,aid:backAns},
              frontAnsFormat:frontAns ? frontAns:backAns
            },
            merge: true
          });
        });
      }
      setLoading(false);
    }
    else
    { Toast.show(
      { type: 'error',
        props: 
        { onPress: () => {}, text1: 'Error', text2: "El campo no puede estar vacío."
        }
      });
    }
  }

  const handleConfirm = (event, selectedDate) =>
  { if(Platform.OS === 'ios')
    { setSelectedDate(moment(selectedDate).format('YYMMDDHHmm'));
      setDate(selectedDate);
    }
    else
    { setShow(false);
      if(mode=='date')
      { setSelectedDate(moment(selectedDate).format('YYMMDD'));
        setDisplayDate(moment(selectedDate).format('DD/MM/YYYY'));
      }
      else
      { setSelectedTime(moment(selectedDate).format('HHmm'));
        setDisplayTime(moment(selectedDate).format('HH:mm'));
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

  function updateCheck(id,multi)//0 == single choice
  { let newChk = [...checked];
    let total = questions.alt.length;
    let button = false;
    console.log(newChk);
    if (newChk.length==0)
    { for(let i=1;i<=total;i++)
      { if (i==id)
          newChk.push(true);
        else
          newChk.push(false);
      }
    }
    else
    { if (multi==0)
      { for(let i=1;i<=total;i++)
        { if (newChk[i-1]==true)
          { newChk[i-1] = false;
            break;
          }
        }
        newChk[id-1] = !newChk[id-1];
      }
      else
      { newChk[id-1] = !newChk[id-1];
        for(let i=1;i<=total;i++)
        { if (newChk[i-1]==true)
            break;
          else if (i==total)
            button = true;
        }
      }
    }
    console.log(newChk);
    setChecked(newChk);
    setDisabledContinue(button);
  }

  function finalMultiChoice()
  { let altId="";
    let len=checked.length;
    for (let i=1;i<=len;i++)
    { if(checked[i-1])
        altId = altId+i.toString()+"-";
      if(i==len)
        altId = altId.slice(0,-1);
    }
    // console.log(altId);
    handleAnswerOptionClick(altId,questions.qid,checked);
  }

  return(
    <>
      {questions.aty == 1 ?
        ( <View style={styles.activityParentView}>
            <Text style={styles.title}>{questions.tiq}</Text>
            <Text style={styles.text}>Pregunta {prevAns ? completed:completed+1}</Text>
            <TextInput
              placeholder="Texto aquí"
              style={styles.inputForm}
              onChange={(e) => onChange(e)}
              maxLength={128}
              value={input}
            />
            <Button
              containerStyle={styles.btnContainer}
              buttonStyle={styles.btn} title="Siguiente"
              disabled={disabledContinue}
              onPress={() => handleAnswerOptionClick(input,questions.qid)}
            />
          </View>
        ):questions.aty == 2 ?
        ( <ScrollView>
            <Text style={styles.title}>{questions.tiq}</Text>
            <Text style={styles.text}>Pregunta {prevAns ? completed:completed+1}</Text>
            { questions.alt.map((answerOption) =>
              { return <CheckBox
                  title={answerOption.txt}
                  checked={checked[answerOption.aid-1]}
                  onPress={() => updateCheck(answerOption.aid,0)}
                  key={answerOption.aid}
                />
              }
            )}
            <View style={styles.searchSection}>
              <Button
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                disabled={disabledContinue}
                title='Siguiente'
                onPress={()=>finalMultiChoice()}
              />
            </View>
          </ScrollView>
        ):questions.aty == 3 ?
        ( <ScrollView>
            <Text style={styles.title}>{questions.tiq}</Text>
            <Text style={styles.text}>Pregunta {prevAns ? completed:completed+1}</Text>
            { questions.alt.map((answerOption) =>
              { return <CheckBox
                  title={answerOption.txt}
                  checked={checked[answerOption.aid-1]}
                  onPress={() => updateCheck(answerOption.aid,1)}
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
                onPress={()=>finalMultiChoice()}
              />
            </View>
          </ScrollView>
        ):questions.aty == 4 ?
        ( <View>
            <Text style={styles.title}>{questions.tiq}</Text>
            <Text style={styles.text}>Pregunta {prevAns ? completed:completed+1}</Text>
            <AirbnbRating
              count={7}
              reviews={["1", "2", "3", "4", "5", "6", "7"]}
              defaultRating={stars}
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
        ):questions.aty == 5 || questions.aty == 7 ?
        ( <View style={styles.activityParentView}>
            <Text style={styles.title}>{questions.tiq}</Text>
            <Text style={styles.text}>Pregunta {prevAns ? completed:completed+1}</Text>
            <Button
              title={ !image ? "Tomar foto" : "Cambiar Foto"}
              containerStyle={styles.picContainerBtn}
              buttonStyle={ !image ? styles.picBtn : styles.checkBtn}
              onPress={()=>upload()}
            />
            <Image
              source={image ? {uri:image} : noImage}
              resizeMode="contain"
              style={styles.logo}
            />
            { loading ? 
              ( <View style={styles.loaderTask}>
                  <ActivityIndicator  size="large" color="#0000ff"/>
                  <Text>Subiendo imagen...</Text>
                </View>
              ):
              ( <Button
                  containerStyle={styles.btnContainer}
                  buttonStyle={styles.btn}
                  title="Siguiente"
                  disabled={disabledContinue}
                  onPress={() => handleAnswerOptionClickPic(questions.qid)}
                />
              )
            }
          </View>
        ):questions.aty == 6 &&
        ( Platform.OS === 'ios' ?
          ( <View style={styles.IosDateActivityParentView}>
              <Text style={styles.title}>{questions.tiq}</Text>
              <Text style={styles.text}>Pregunta {prevAns ? completed:completed+1}</Text>
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
          ):
          ( <View style={styles.AndroidDateActivityParentView}>
              <Text style={styles.title}>{questions.tiq}</Text>
              <Text style={styles.text}>Pregunta {prevAns ? completed:completed+1}</Text>
              <Button containerStyle={styles.btnContainerDate} buttonStyle={styles.btnDate}
                    onPress={showDatePicker} title="Seleccionar fecha"/>
              <Button containerStyle={styles.btnContainerDate} buttonStyle={styles.btnDate}
                    onPress={showTimePicker} title="Seleccionar hora"/>
              { show && ( 
                <DateTimePicker
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
        )
      }
    </>
  );
}

const styles = StyleSheet.create(
{ activityParentView:
  { flexDirection:'column',
    alignItems: 'center',
    marginRight: 30,
    marginLeft: 30
  },
  title:
  { marginTop:40,
    marginHorizontal:20,
    fontSize: 30,
    textAlign:"center",
    fontWeight: "bold"
  },
  text:
  { marginTop:20,
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
  AndroidDateActivityParentView:
  { marginRight: 30,
    marginLeft: 30,
    marginTop: 15,
    marginBottom:5,
    justifyContent: "center",
    alignItems: "center"
  },
  IosDateActivityParentView:
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
    paddingLeft: 10,
    width: "100%",   
    backgroundColor: '#fff',
    borderRadius: 20
  },
  picContainerBtn:
  { marginTop:20,
    width: "50%",
    marginHorizontal:100
  },
  picBtn:
  { backgroundColor: "#A29FD8",
    borderRadius: 50,
    marginHorizontal:10
  },
  checkBtn:
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
  },
  loaderTask:
  { marginTop:10,
    marginBottom: 10,
    alignItems: "center",
  }
});