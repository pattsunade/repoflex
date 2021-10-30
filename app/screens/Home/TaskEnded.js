import React, { useState,useCallback } from "react";
import { StyleSheet, View,Text,ActivityIndicator} from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";

import BackEndConnect from "../../utils/BackEndConnect";
import ListTaskEnded from "../../components/Home/ListTaskEnded";

export default function TaskEnded() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  function formato() {
    return{
      tat: 4,
      lat: 12345,
      lon: 54321
    };
  }
  useFocusEffect(
    useCallback(() =>
    { BackEndConnect("POST","tasks",formato()).then(async (response) =>
      { const array = response.ans.tas;
        setMsg(response.ans.msg);
        setData(array);
        setLoading(false);
      });
    },
    [])
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
            <ListTaskEnded data={data}/>
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