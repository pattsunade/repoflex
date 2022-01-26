import React, { useState,useRef,useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Alert, TouchableOpacity ,Dimensions} from 'react-native';
import { Button, Divider,Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from '@react-navigation/native';
import BackEndConnect from "../../utils/BackEndConnect"
import TaskQuestion from "../../components/Tasks/TaskQuestion";
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
  
  function formato() 
  { return{
      tid: tid
    };
  }

  useEffect(() => 
  { if(questions===undefined || questions === null)
    { BackEndConnect("POST","detai",formato()).then(async (response) =>
      { var questAns = response.ans.tas;
        setQuestions(questAns);
        questAns = JSON.stringify(questAns);
        AsyncStorage.multiSet([['@quest',questAns],['@tid',tid.toString()],['@comp',completed.toString()]]);
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
          });
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
  { return <Loading text="Iniciando tarea..." />
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
          <Divider style= {styles.divider} />
          <View style={styles.viewZolbit}>
            <Text>Un producto de <Text style = {styles.textZolbit}>Zolbit</Text></Text>    
          </View>
          { loading && (<Loading text={loadingText}/>)
          }
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
    alignItems: "center"
  },
  btnCloseSession:{
    marginTop:10,
    borderRadius:20,
    backgroundColor:"#D0021B",
    borderTopWidth: 1,
    borderTopColor:"#e3e3e3",
    borderBottomWidth: 1,
    borderBottomColor:"#e3e3e3",
    paddingTop: 10,
    paddingBottom:10,
    marginBottom:10,
  },
  viewContainer2:{
    marginRight: 30,
    marginLeft: 30,
    marginTop: 50  
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
    justifyContent: "center"
  },
  btnRegister:{
    color: "#6B35E2",
    fontWeight: "bold"
  },
  divider:{
    backgroundColor: "#6B35E2",
    margin: 20
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
    marginVertical:5
  },
  customBtnTextContent: {
    marginBottom:100,
    textAlign: "justify"
  },
  customBtn: {
    backgroundColor: "#fff",
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 10,
    marginTop:5,
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