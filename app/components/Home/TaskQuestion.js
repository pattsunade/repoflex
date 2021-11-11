import React, { useState,useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Alert, TouchableOpacity ,Dimensions} from 'react-native';
import * as Progress from 'react-native-progress';
import { Button,Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from '@react-navigation/native';
import BackEndConnect from "../../utils/BackEndConnect";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const { width, height } = Dimensions.get('window');

export default function TaskQuestion (props) {
  const {questions, tid, completed, taskData} = props;
  const navigation = useNavigation();
  const [formData, setFormData] = useState([]);
  const per = completed*100/questions.length;
  const compArr = questions.slice(0,completed);
  // console.log(per);
  // console.log("taskData en TaskQuestion-->",taskData);
  // console.log(questions);
  // console.log("comArr-->",compArr);
  const pendArr = questions.slice(completed+1);
  // console.log("Questions en TaskQuestion-->",questions);
  // console.log("Tid en TaskQuestion-->",tid);
  // console.log("Completed en TaskQuestion-->",completed);
  function endTask()
  { BackEndConnect("POST","taska",formato(formData)).then((ans) =>
    { if (ans.ans.stx === "ok")
      { AsyncStorage.multiRemove(['@tid','@quest','@taskData','@comp']).then(() =>
        { navigation.reset(
          { index: 0,
            routes: 
            [ { name: 'home',
              }
            ],
          });
        });
      }
      else
      { console.log("Algo salio mal en taska");
      }
    });
  }
  function formato(data) {
    return {
      tid: tid,
      abc: data
    };
  }
  useEffect(() => 
  { if (taskData!==null)
    { 
      if (formData.length==0)
      { 
        console.log("entre en 1");
        setFormData([...formData,taskData]);
        AsyncStorage.setItem('@taskData',JSON.stringify(taskData));
        console.log("ofrmdata-->",formData);
      }
      else if (per<100)
      { const temp = [...formData,taskData];
        // console.log("temp-->",temp);
        AsyncStorage.setItem('@taskData',JSON.stringify(temp)); 
        console.log("entre en 2");
        setFormData(temp);
        // console.log("ofrmdata-->",formData);
      }
      // AsyncStorage.setItem('@taskData',JSON.stringify(formData));
      
    }
  },[taskData]);

  return(
    <ScrollView>
      <View style={styles.viewContainer}>
        <Text style={styles.title}>Progreso de la tarea</Text>
        <Progress.Bar progress={per/100} width={300} borderRadius={20} backgroundColor="#fff" height={25} color={"#6B35E2"} />
        <Text>{per} %</Text>
      </View>
      <View style={styles.viewContainer2}>
        { completed<questions.length ?
          (<>
            <Text style={styles.subtitle}> Actividades Pendientes</Text>
            <TouchableOpacity style={styles.customBtn} onPress={() => 
              navigation.navigate("quiztask",{questions:questions[completed],tid:tid,completed:completed})
            }>
            <View style={styles.wrapper}>
              <View style={styles.container}>
                <View>
                <Icon
                  type="material-community"
                  name="arrow-right-bold-circle"
                  iconStyle={styles.iconLeft1}
                  size={35}
                />
                </View>
                <View>
                  <Text style={styles.customBtnText}>{questions[completed].tiq}</Text>
                  <Text style={styles.customBtnTextContent}>Actividad en desarrollo(haz click).</Text>
                </View>
              </View>
            </View>
            </TouchableOpacity>
          </>
          ):(<Text style={styles.subtitle}> ¡Ya finalizaste todas las actividades!</Text>)
        }
        { pendArr.map((arr,index) =>
            { return(
                <TouchableOpacity key={arr.qid} style={styles.customBtn} onPress={() =>
                  { Toast.show(
                      { type: 'error',
                        props: 
                        { onPress: () => {}, text1: 'Error', text2: "Debes completar las actividades anteriores."
                        }
                      }
                    );
                  }
                }>
                <View style={styles.wrapper}>
                  <View style={styles.container}>
                    <View>
                      <Icon
                        type="material-community"
                        name="circle"
                        iconStyle={styles.iconLeft3}
                        size={35}
                      />
                    </View>
                    <View>
                      <Text style={styles.customBtnText}>{arr.tiq}</Text>
                      <Text style={styles.customBtnTextContent}>Actividad pendiente {index+1}.</Text>
                    </View>
                  </View>
                </View>
                </TouchableOpacity>
              )
            }
          )
        }
        <Text style={styles.subtitle}> Pasos Completados: {completed}</Text>
        { compArr.map((arr,index) =>
            { return(
                <TouchableOpacity key={arr.qid} style={styles.customBtn} onPress={() =>
                  { Toast.show(
                      { type: 'error',
                        props: 
                        { onPress: () => {}, text1: 'success', text2: "¡Ya completaste esta actividad!."
                        }
                      }
                    );
                  }
                }>
                <View style={styles.wrapper}>
                  <View style={styles.container}>
                    <View>
                      <Icon
                        type="material-community"
                        name="check-circle"
                        iconStyle={styles.iconLeft2}
                        size={35}
                      />
                    </View>
                    <View>
                      <Text style={styles.customBtnText}>{arr.tiq}</Text>
                      <Text style={styles.customBtnTextContent}>Actividad completada {index+1}.</Text>
                    </View>
                  </View>
                </View>
                </TouchableOpacity>
              )
            }
          )
        }
      </View>
      <View>
        { per==100 ?
          ( <Button
              title="Finalizar tarea"
              buttonStyle={styles.btnCloseSession}
              titleStyle={styles.CloseSessionText}
              onPress={endTask}
            />
          )
          :(<></>)
        }
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  viewContainer:{
    marginRight:40,
    marginLeft:40,
    marginTop:15,
    marginBottom:5,
    justifyContent:"center",
    alignItems:"center",
  },
  viewContainer2:{
    marginRight:30,
    marginLeft:30,
    marginTop:10,
  },
  title:{
    fontWeight:"bold",
    paddingBottom:5,
    marginTop:10,
    marginBottom:10,
    fontSize:25,
    //color: "#6B35E2",
    justifyContent:"center"
  },
  title2:{
    fontWeight:"bold",
    paddingBottom:5,
    marginTop:10,
    marginBottom:10,
    fontSize:18,
    color:"#6B35E2",
    justifyContent:"center"
  },
  subtitle: {
    paddingBottom:10,
    paddingTop:30,
    fontSize:20,
  },
  btnCloseSession:{
    marginTop:30,
    borderRadius:0,
    backgroundColor:"#D0021B",
    borderTopWidth: 1,
    borderTopColor:"#e3e3e3",
    borderBottomWidth: 1,
    borderBottomColor:"#e3e3e3",
    paddingTop: 10,
    paddingBottom:10,
    marginBottom:20,
  },
  CloseSessionText:{
    color:"#6B35E2",
  },
  divider:{
    backgroundColor:"#6B35E2",
    marginHorizontal:40,
    marginTop:10,
  },
  textRegister:{
    flex: 1,
    alignItems:"center",
    justifyContent:"center",
    marginBottom:20,
  },
  customBtnText:{
    fontSize: 15,
    fontWeight: "400",
    marginVertical:5,
  },
  customBtnTextContent:{
    marginBottom:5,
    textAlign:"justify",
    marginRight:60,
  },
  customBtn:{
    backgroundColor:"#fff",
    paddingHorizontal:30,
    paddingVertical:5,
    borderRadius:30,
    marginTop:5 ,
    marginBottom:5
  },
  container:{
    flex:.5,
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:"center"
  },
  wrapper:{
    flex:1,
  },
  iconLeft1:{
    color: "#6B35E2",
    marginRight: 15,
  },
  iconLeft2:{
    color:"#6B35E2",
    marginRight:15,
  },
  iconLeft3:{
    color:"#DEDCF2",
    marginRight:15,
  },
  viewZolbit:{
    marginRight:40,
    marginLeft:40,
    marginTop:15,
    marginBottom:5,
    justifyContent:"center",
    alignItems:"center",
  },
  textZolbit: {
    fontWeight:"bold",
  },
  loaderTask:{
    marginTop:100,
    marginBottom:10,
    alignItems:"center",
  }
});