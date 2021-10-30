import React, { useState,useRef,useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Alert, TouchableOpacity ,Dimensions} from 'react-native';
import { Button, Divider,Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from '@react-navigation/native';
import BackEndConnect from "../../utils/BackEndConnect"
import TaskQuestion from "../../components/Home/TaskQuestion";
import Loading from "../../components/Loading";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const { width, height } = Dimensions.get('window');

export default function Task ({route}) {
  const {quest,tid,taskData,completed} = route.params;
  const navigation = useNavigation();
  const [error, setError] = useState(false);
  const [questions, setQuestions] = useState(quest);
  const [loading, setLoading] = useState(true);
  // console.log("Quest en task-->",quest);
  // console.log("Tid en task-->",tid);
  // console.log("taskData en task-->",taskData);
  // console.log("Completed en task-->",completed);
  function formato() 
  { return{
      tid: tid
    };
  }
  function abort()
  { BackEndConnect("POST","abort",formato()).then(async (response) => 
    { if(response.ans.stx!="ok")
      { Toast.show(
        {
          type: 'error',
          props: {onPress: () => {}, text1: 'Error', text2: response.ans.msg
          },
          autohide: false
        });
      }
      AsyncStorage.multiRemove(['@tid','@quest','@taskData','@comp']).then(() =>{
        navigation.reset({
          index: 0,
          routes: 
          [ { name: 'home',
            }
          ],
        });
      });
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
  useEffect(() => 
  { if(questions===undefined || questions === null)
    { BackEndConnect("POST","detai",formato()).then(async (response) =>
      { var questAns = response.ans.tas;
        setQuestions(questAns);
        questAns = JSON.stringify(questAns);
        AsyncStorage.multiSet([['@quest',questAns],['@tid',tid.toString()],['@comp',completed.toString()]])
        setLoading(false);
      })
      .catch((ans) =>
      { console.log(ans);
        setError(true);
        setLoading(false);
        AsyncStorage.removeItem('@ott');
        Toast.show(
        { type: 'error',
          props: {onPress: () => {}, text1: 'Error', text2: 'Error interno, por favor inicia sesión nuevamente.'
          },
          autohide: false
        });
        navigation.reset({
          index: 0,
          routes: 
          [ { name: 'login',
            }
          ],
          })
        }
      );
    }
    else if(typeof questions == 'string')
    { setQuestions(JSON.parse(questions));
      setLoading(false);
    }
    else
    { setLoading(false); 
    }
  },[questions])
  if (loading)
  { return <Loading isVisible={true} text="Cargando..." />
  }
  else
  { if (error)
    { return <View></View>
    }
    else
    { return(
        <ScrollView>
          <View>
            <TaskQuestion questions={questions} tid={tid} completed={completed} taskData={taskData}/>
          </View>
          <View>
            <Button
              title="Abortar tarea"
              buttonStyle={styles.btnCloseSession}
              titleStyle={styles.CloseSessionText}
              onPress={abort}
            />
          </View>
          <Divider style= {styles.divider} />
          <View style={styles.viewZolbit}>
            <Text>Un producto de <Text style = {styles.textZolbit}>Zolbit</Text></Text>    
          </View>
        </ScrollView>
      )
    }
  }
}
const styles = StyleSheet.create({
    viewContainer:{
        marginRight: 40,
        marginLeft: 40,
        marginTop: 15,
        marginBottom:5,
        justifyContent: "center",
        alignItems: "center",
    
    },
    viewContainer2:{
        marginRight: 30,
        marginLeft: 30,
        marginTop: 50,
        
    },
    texttitle: {
        marginTop:50,
        marginBottom:50,
        marginHorizontal:20,
        fontSize: 17,
        textAlign:"justify"
    },
    textRegister:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",  
    },
    btnRegister:{
        color: "#6B35E2",
        fontWeight: "bold",
    },
    divider:{
        backgroundColor: "#6B35E2",
        margin: 40,
    },
    viewZolbit:{
        justifyContent: "center",
        alignItems: "center",
        
    },
    textZolbit: {
        fontWeight: "bold",
    },
    customBtnText: {
        fontSize: 20,
        fontWeight: "400",
        marginVertical:5,
    },
    customBtnTextContent: {
        marginBottom:100,
        textAlign: "justify",
        
        },
    customBtn: {
        backgroundColor: "#fff",
        paddingHorizontal: 30,
        paddingVertical: 5,
        borderRadius: 10,
        marginTop:5 ,
        marginBottom:5
    },
    container: {
        flex: .5,
        flexDirection: 'row',
        justifyContent: 'flex-start', //replace with flex-end or center
        alignItems:"center"
    },
    wrapper: {
        flex: 1,
    
    },
  btnContainer: {
      marginTop: 20,
      width: "95%",
      marginLeft: 10,
    },
  btn: {
      backgroundColor: "#6B35E2",
      borderRadius: 50,
    },
  loaderTask:{
    marginTop:100,
    marginBottom:10,
    alignItems:"center",
  }
});