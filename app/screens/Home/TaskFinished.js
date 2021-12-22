import React, { useState,useCallback } from "react";
import { StyleSheet, View,Text,ActivityIndicator} from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from "@react-navigation/native";

import BackEndConnect from "../../utils/BackEndConnect";
import ListTaskFinished from "../../components/Home/ListTaskFinished";

export default function TaskEnded() {
  const navigation = useNavigation();
  const Tab = createMaterialTopTabNavigator();
  const [dataFinished, setDataFinished] = useState([]);
  const [dataPaid, setDataPaid] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [msp, setMsp] = useState("");

  function formato() {
    return{
      tat: 67,
      lat: 12345,
      lon: 54321
    };
  }

  useFocusEffect(
    useCallback(() =>
      { BackEndConnect("POST","tasks",formato()).then(async (response) =>
        { const array = response.ans.tas;
          const arrayFinished = [];
          const arrayPaid = [];
          setMsg(response.ans.msg);
          setMsp(response.ans.msp);
          if(array != undefined)
          { for(let i=0;i<array.length;i++)
            { if(array[i].tst==6)
                arrayFinished.push(array[i]);
              else if(array[i].tst==7)
                arrayPaid.push(array[i]); 
            }
            setDataFinished(arrayFinished);
            setDataPaid(arrayPaid);
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

  function Finished()
  { return(
      <>
        { dataFinished.length < 1 ?
          ( <View>
              <Text style={styles.title}>{msg}</Text>
            </View>
          ):
          ( <View>
              <View style={styles.viewForm}>
                <ListTaskFinished data={dataFinished}/>
              </View>
            </View>
          )
        }
      </>
    )
  }

  function Paid()
  { return(
      <>
        { dataPaid.length < 1 ?
          ( <View>
              <Text style={styles.title}>{msp}</Text>
            </View>
          ):
          ( <View>
              <View style={styles.viewForm}>
                <ListTaskFinished data={dataPaid}/>
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
            <Tab.Screen name="Finalizadas" component={Finished} />
            <Tab.Screen name="Pagadas" component={Paid} />
        </Tab.Navigator>)
    }
  </>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: 20,  
  },
  viewForm: {
    marginRight: 40,
    marginLeft: 40,
  },
  loaderTask: {
    marginTop:100,
    marginBottom: 10,
    alignItems: "center",
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