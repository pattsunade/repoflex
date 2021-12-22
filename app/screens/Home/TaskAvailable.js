import React, { useState,useCallback } from "react";
import { StyleSheet, View,Text,ActivityIndicator} from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Location from 'expo-location';
import { useNavigation } from "@react-navigation/native";

import BackEndConnect from "../../utils/BackEndConnect";
import ListTaskAvailable from "../../components/Home/ListTaskAvailable";

export default function TaskAvailable() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  function formato(lati,longi) {
    return{
      tat: 1,
      lat: lati,
      lon: longi
    };
  }

  useFocusEffect(
    useCallback(() => 
    { (async () => 
      { let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        BackEndConnect("POST","tasks",formato(location.coords.latitude.toString(),
          location.coords.longitude.toString())).then(async (response) =>
        { const array = response.ans.tas;
          setMsg(response.ans.msg);
          setData(array);
          setLoading(false);
        })
        .catch((ans) => 
          { console.log(ans);
            Toast.show(
              { type: 'error',
                props: 
                { onPress: () => {}, text1: 'Error', text2: "Error conexión. Porfavor inicia sesión nuevamente"
                }
              }
            );
            navigation.reset(
            { index: 0,
              routes: [
                { name: 'login',
                }
              ],
            });
          }
        );
      })();
    },[])
  );


  return(
  <>
    { loading ? 
      ( <View style={styles.loaderTask}>
          <ActivityIndicator  size="large" color="#0000ff"/>
          <Text>Cargando Tareas</Text>
        </View>):
      data == null ?
      ( <View>
          <Text style={styles.title}>{msg}</Text>
        </View>
      ):
      ( <View>
          <View style={styles.viewForm}>
            <ListTaskAvailable data={data}/>
          </View>
        </View>
      )
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