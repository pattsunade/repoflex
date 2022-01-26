import React, { useState,useCallback } from "react";
import { StyleSheet, View,Text,ActivityIndicator} from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import BackEndConnect from "../../utils/BackEndConnect";
import Toast from 'react-native-toast-message';
import ListTask from "../../components/Home/ListTask";

export default function TaskAssigned({route}) {
  const {lati,long} = route.params;
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
      lat: lati,
      lon: long
    };
  }

  useFocusEffect(
    useCallback(() =>
      { BackEndConnect("POST","tasks",formato()).then(async (response) =>
        { const array = response.ans.tas;
          const arrayPending = [];
          const arrayInProgress = [];
          setMsg(response.ans.msg);
          setMsp(response.ans.msp);
          if(array != undefined)
          { for(let i=0;i<array.length;i++)
            { if(array[i].tst==2)
                arrayPending.push(array[i]);
              else
                arrayInProgress.push(array[i]); 
            }
            setDataPending(arrayPending);
            setInDataProgress(arrayInProgress);
          }
          setLoading(false);
        }).catch((e) => 
          { console.log(e);
            setLoading(false);
            Toast.show(
            { type: 'error',
              props: {onPress: () => {}, text1: 'Error', text2: 'Error de conexión, por favor intenta más tarde'
                }
            });    
          }
        );
      },
    [])
  );

  function Pending()
  { return(
      <>
        { dataPending.length < 1 ?
          ( <View>
              <Text style={styles.title}>{msg}</Text>
            </View>
          ):
          ( <View>
              <View style={styles.viewForm}>
                <ListTask data={dataPending} start={true}/>
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
        { dataInProgress.length < 1 ?
          ( <View>
              <Text style={styles.title}>{msp}</Text>
            </View>
          ):
          ( <View>
              <View style={styles.viewForm}>
                <ListTask data={dataInProgress} start={true} abort={true}/>
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
    marginRight: 10,
    marginLeft: 10
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