import React, { useState,useCallback } from "react";
import { StyleSheet, View,Text,ActivityIndicator} from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from "@react-navigation/native";
import BackEndConnect from "../../utils/BackEndConnect";
import ListTaskSent from "../../components/Home/ListTaskSent";
import ListTaskInRevision from "../../components/Home/ListTaskInRevision";

export default function TaskSent() {
  const navigation = useNavigation();
  const Tab = createMaterialTopTabNavigator();
  const [dataSent, setDataSent] = useState([]);
  const [dataInRevision, setDataInRevision] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [msp, setMsp] = useState("");
  
  function formato() {
    return{
      tat: 45,
      lat: 12345,
      lon: 54321
    };
  }

  useFocusEffect(
    useCallback(() =>
      { BackEndConnect("POST","tasks",formato()).then(async (response) =>
        { const array = response.ans.tas;
          const arraySent = [];
          const arrayInRevision = [];
          setMsg(response.ans.msg);
          setMsp(response.ans.msp);
          if(array != undefined)
          { for(let i=0;i<array.length;i++)
            { if(array[i].tst==4)
                arraySent.push(array[i]);
              else if(array[i].tst==5)
                arrayInRevision.push(array[i]); 
            }
            setDataSent(arraySent);
            setDataInRevision(arrayInRevision);
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

  function Sent()
  { return(
      <>
        { dataSent.length < 1 ?
        ( <View>
            <Text style={styles.title}>{msg}</Text>
          </View>
        ):
        ( <View>
            <View style={styles.viewForm}>
              <ListTaskSent data={dataSent}/>
            </View>
          </View>
        )
        }
      </>
    )
  }

  function InRevision()
  { return(
      <>
        { dataInRevision < 1 ?
        ( <View>
            <Text style={styles.title}>{msp}</Text>
          </View>
        ):
        ( <View>
            <View style={styles.viewForm}>
              <ListTaskInRevision data={dataInRevision}/>
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
            <Tab.Screen name="Enviadas" component={Sent} />
            <Tab.Screen name="En revisión" component={InRevision} />
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