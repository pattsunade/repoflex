import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, TouchableOpacity ,Dimensions} from 'react-native';
import * as Progress from 'react-native-progress';
import { Button,Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import Loading from '../Loading';
import BackEndConnect from '../../utils/BackEndConnect';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const { width, height } = Dimensions.get('window');

export default function TaskQuestion (props) {
  const {questions, tid, completed, taskData, update} = props;
  const navigation = useNavigation();
  const [formData, setFormData] = useState([]);
  const per = Math.round(completed*100/questions.length);
  const compArr = questions.slice(0,completed);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Enviando tarea...');
  const pendArr = questions.slice(completed+1);

  function endTask()
  { setLoading(true);
    BackEndConnect('POST','taska',formato(formData)).then((ans) =>
    { if (ans.ans.stx === 'ok')
      { Toast.show(
        { type: 'success',
          props: {onPress: () => {}, text1: 'Éxito', text2: ans.ans.msg
          }
        });
        AsyncStorage.multiRemove(['@tid','@quest','@taskData','@comp']).then(() =>
        { setLoading(false);
          navigation.reset(
          { index: 0,
            routes: 
            [ { name: 'home',
              }
            ],
          });
        });
      }
      else
      { Toast.show(
        { type: 'error',
          props: {onPress: () => {}, text1: 'Error', text2: 'Error de comunicación, por favor intenta nuevamente.'
          }
        });
      }
    }).catch((ans)=>
    { Toast.show(
        { type: 'error',
          props: {onPress: () => {}, text1: 'Éxito', text2: 'Error interno, por favor intenta nuevamente.'
          }
        });
    });
  }

  function abort()
  { setLoadingText('Abortando tarea...');
    setLoading(true);
    BackEndConnect('POST','abort',formato2()).then(async (response) => 
    { if(response.ans.stx!='ok')
      { Toast.show(
        { type: 'error',
          props: {onPress: () => {}, text1: 'Error', text2: response.ans.msg
          },
          autohide: false
        });
        AsyncStorage.multiRemove(['@tid','@quest','@taskData','@comp']).then(() =>
        { setLoading(false);
          navigation.reset(
          { index: 0,
            routes: 
            [ { name: 'home',
              }
            ],
          });
        });
      }
      else
      { Toast.show(
        { type: 'success',
          props: {onPress: () => {}, text1: 'Éxito', text2: response.ans.msg
          }
        });
        AsyncStorage.multiRemove(['@tid','@quest','@taskData','@comp']).then(() =>
        { setLoading(false);
          navigation.reset({
            index: 0,
            routes: 
            [ { name: 'home',
              }
            ],
          });
        });
      }
    })
    .catch((ans) =>
    { console.log(ans);
      Toast.show(
      { type: 'error',
        props: {onPress: () => {}, text1: 'Error', text2: 'Error de conexión, por favor intenta nuevamente '+ans1.ans.msg
        },
        autohide: false
      });
    });
  }

  function formato(data) {
    return {
      tid: tid,
      abc: data
    };
  }

  function formato2() 
  { return{
      tid: tid
    };
  }

  useEffect(async () =>
  { console.log("taskData->",taskData);
    console.log("data->",update);
    if (taskData!=null)
    { console.log('entre en no null');
      if (update)
      { console.log("entre");
        taskNum = parseInt(taskData.qid);
        let updAnswer = formData;
        updAnswer[taskNum-1] = taskData;
        setFormData(updAnswer);
      }
      else if (isArray(taskData))
        setFormData(taskData);
      else
      { let addAnswer = [...formData,taskData];
        setFormData(addAnswer);
        await AsyncStorage.setItem('@taskData',JSON.stringify(addAnswer));
      }
      // if (formData!=null)
      // { console.log('entre en 1');
      //   setFormData([...formData,taskData]);
      //   AsyncStorage.setItem('@taskData',JSON.stringify(taskData));
      // }
      // else if (per<=100)
      // { const temp = [...formData,taskData];
      //   // console.log('temp-->',temp);
      //   AsyncStorage.setItem('@taskData',JSON.stringify(temp)); 
      //   console.log('entre en 2');
      //   setFormData(temp);
      //   // console.log('ofrmdata-->',formData);
      // }
      // AsyncStorage.setItem('@taskData',JSON.stringify(formData));  
    }
    console.log("form->",formData);
  },[taskData]);

  function isArray(a) {
    return (!!a) && (a.constructor === Array);
  };

  return(
    <>
      { loading ? (<Loading text={loadingText}/>):
        (<ScrollView>
          <View style={styles.viewContainer}>
            <Text style={styles.title}>Progreso de la tarea</Text>
            <Progress.Bar progress={per/100} width={300} borderRadius={20} backgroundColor='#fff' height={25} color={'#6B35E2'} />
            <Text>{per} %</Text>
          </View>
          { per==100 &&
            ( <View style={styles.viewContainer2}>
                <Text style={styles.subtitle}> ¡Ya finalizaste todas las actividades!</Text>
                <Button
                  title='Finalizar tarea'
                  containerStyle={styles.btnContainer}
                  buttonStyle={styles.btnFinish}
                  onPress={endTask}
                />
              </View>
            )
          }
          <View style={styles.viewContainer2}>
            { completed<questions.length &&
              (<>
                <Text style={styles.subtitle}> Actividad por desarrollar</Text>
                <TouchableOpacity style={styles.customBtn} onPress={() => 
                  navigation.navigate('quiztask',{questions:questions[completed],tid:tid,completed:completed})
                }>
                  <View style={styles.container}>
                    <Icon
                      type='material-community'
                      name='arrow-right-bold-circle'
                      iconStyle={styles.iconLeft1}
                      size={35}
                    />
                    <View style={styles.activityText}>
                      <Text style={styles.customBtnText}>{questions[completed].tiq}</Text>
                      <Text style={styles.customBtnText}>Actividad a desarrollar</Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <Text style={styles.subtitle}> Actividades pendientes</Text>
              </>
              )
            }
            { pendArr.map((arr,index) =>
              { return(
                  <TouchableOpacity key={arr.qid} style={styles.customBtn} onPress={() =>
                    { Toast.show(
                        { type: 'error',
                          props: 
                          { onPress: () => {}, text1: 'Error', text2: 'Debes completar las actividades anteriores.'
                          }
                        }
                      );
                    }
                  }>
                    <View style={styles.container}>
                      <Icon
                        type='material-community'
                        name='circle'
                        iconStyle={styles.iconLeft3}
                        size={35}
                      />
                      <View style={styles.activityText}>
                        <Text style={styles.customBtnText}>{arr.tiq}</Text>
                        <Text style={styles.customBtnText}>Actividad pendiente {index+1}.</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )
              })
            }
            <Text style={styles.subtitle}> Pasos Completados: {completed}</Text>
            { compArr.map((arr,index) =>
              { return(
                  <TouchableOpacity key={arr.qid} style={styles.customBtn} onPress={() =>
                    navigation.navigate('quiztask',{questions:questions[index],tid:tid,completed:index+1,update:formData[index].aid})
                  }>
                    <View style={styles.container}>
                      <Icon
                        type='material-community'
                        name='check-circle'
                        iconStyle={styles.iconLeft2}
                        size={35}
                      />
                      <View style={styles.activityText}>
                        <Text style={styles.customBtnText}>{arr.tiq}</Text>
                        <Text style={styles.customBtnText}>Actividad completada {index+1}.</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )
              })
            }
          </View>
          <View style={styles.wrapper}>
            <Button
              title='Abortar tarea'
              containerStyle={styles.btnContainer}
              buttonStyle={styles.btnAbort}
              onPress={abort}
            />
          </View>
        </ScrollView>
        )
      }
    </>
  )
}

const styles = StyleSheet.create({
  viewContainer:{
    marginRight:40,
    marginLeft:40,
    marginTop:15,
    marginBottom:5,
    justifyContent:'center',
    alignItems:'center',
  },
  viewContainer2:{
    marginRight:30,
    marginLeft:30,
    marginTop:10,
  },
  title:{
    fontWeight:'bold',
    paddingBottom:5,
    marginTop:10,
    marginBottom:10,
    fontSize:25,
    //color: '#6B35E2',
    justifyContent:'center'
  },
  title2:{
    fontWeight:'bold',
    paddingBottom:5,
    marginTop:10,
    marginBottom:10,
    fontSize:18,
    color:'#6B35E2',
    justifyContent:'center'
  },
  subtitle: {
    paddingBottom:10,
    paddingTop:15,
    fontSize:20,
  },
  btnContainer:
  { marginTop: 1,
    width: '80%',
    marginLeft: 40
  },
  btnFinish:{
    marginTop:20,
    borderRadius:20,
    borderTopWidth: 1,
    borderTopColor:'#e3e3e3',
    borderBottomWidth: 1,
    borderBottomColor:'#e3e3e3',
    paddingTop: 10,
    paddingBottom:10,
    marginBottom:10,
  },
  btnAbort:{
    marginTop:10,
    borderRadius:20,
    backgroundColor:'#D0021B',
    borderTopWidth: 1,
    borderTopColor:'#e3e3e3',
    borderBottomWidth: 1,
    borderBottomColor:'#e3e3e3',
    paddingTop: 10,
    paddingBottom:10,
    marginBottom:10,
  },
  divider:{
    backgroundColor:'#6B35E2',
    marginHorizontal:40,
    marginTop:10,
  },
  textRegister:{
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
    marginBottom:20,
  },
  customBtnText:{
    fontSize: 15,
    fontWeight: '400',
    marginVertical:5,
  },
  customBtn:{
    backgroundColor:'#fff',
    paddingHorizontal:30,
    paddingVertical:5,
    borderRadius:30,
    marginTop:5 ,
    marginBottom:5
  },
  container:{
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center'
  },
  wrapper:{
    flex:1,
  },
  iconLeft1:{
    color: '#6B35E2',
    marginRight: 15,
  },
  iconLeft2:{
    color:'#6B35E2',
    marginRight:15,
  },
  iconLeft3:{
    color:'#DEDCF2',
    marginRight:15,
  },
  viewZolbit:{
    marginRight:40,
    marginLeft:40,
    marginTop:15,
    marginBottom:5,
    justifyContent:'center',
    alignItems:'center',
  },
  textZolbit: {
    fontWeight:'bold',
  },
  activityText: {
    flex: 1,
    flexDirection:'column'
  },
  loaderTask:{
    marginTop:100,
    marginBottom:10,
    alignItems:'center',
  }
});