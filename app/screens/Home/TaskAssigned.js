import React, { useState,useCallback } from "react";
import { StyleSheet, View,Text,ActivityIndicator} from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import BackEndConnect from "../../utils/BackEndConnect";
import ListTaskAssigned from "../../components/Home/ListTaskAssigned";
import ListTaskInProgress from "../../components/Home/ListTaskInProgress";

export default function TaskAssigned() {
  const navigation = useNavigation();
  const Tab = createMaterialTopTabNavigator();
  const [dataPending, setDataPending] = useState([]);
  const [dataInProgress, setInDataProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [msp, setMsp] = useState("");

  function formato() {
    return{
      tat: 23,
      lat: 12345,
      lon: 54321
    };
  }

  useFocusEffect(
    useCallback(() =>
      { BackEndConnect("POST","tasks",formato()).then(async (response) =>
        { console.log(response);
          const array = response.ans.tas;
          const arrayPending = [];
          const arrayInProgress = [];
          console.log("Arreglo->",array[0]);
          console.log("Data->",array[0].tst);
          setMsg(response.ans.msg);
          setMsp(response.ans.msp);
          for(let i=0;i<array.length;i++)
          { console.log("i->",i);
            if(array[i].tst==2)
            { arrayPending.push(array[i]);
            }
            else
            { arrayInProgress.push(array[i]); 
            }
          }
          setDataPending(arrayPending);
          setInDataProgress(arrayInProgress);
          setLoading(false);
        });
      },
    [])
  );

  function Pending()
  { return(
      <>
        { dataPending == null ?
          ( <View>
              <Text style={styles.title}>{msg}</Text>
            </View>
          ):
          ( <View>
              <View style={styles.viewForm}>
                <ListTaskAssigned data={dataPending}/>
              </View>
            </View>
          )
        }
      </>
    )
  }

  function InProgress()
  { return(
      <>
        { dataInProgress == null ?
          ( <View>
              <Text style={styles.title}>{msp}</Text>
            </View>
          ):
          ( <View>
              <View style={styles.viewForm}>
                <ListTaskInProgress data={dataInProgress}/>
              </View>
            </View>
          )
        }
      </>
    )
  }

  return(
    <>
      { loading ? 
        ( <View style={styles.loaderTask}>
            <ActivityIndicator  size="large" color="#0000ff"/>
            <Text>Cargando Tareas</Text>
          </View>):
        ( <Tab.Navigator>
            <Tab.Screen name="Pendientes" component={Pending} />
            <Tab.Screen name="En progreso" component={InProgress} />
          </Tab.Navigator>)
      }
    </>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: 20
  },
  viewForm: {
    marginRight: 40,
    marginLeft: 40
  },
  loaderTask: {
    marginTop:100,
    marginBottom: 10,
    alignItems: "center"
  },
  title:{
    textAlign: 'center',
    fontWeight:"bold",
    paddingBottom:5,
    marginTop:10,
    marginBottom:10,
    fontSize:20,
    //color: "#6B35E2",
    justifyContent:"center"
  }
});