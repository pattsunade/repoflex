import React, { useState,useRef,useCallback } from "react";
import { StyleSheet, View, Text} from "react-native";
import { Button } from "react-native-elements";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Rejected({navigation}) {  

  return(
    <View style={styles.viewForm}>
      <Text>Nosotros nos encargamos de este paso. Estamos revisando tu solicitud de registro y verificando tu identidad.</Text>
    </View>
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
      alignItems: 'center'
  },
  btnContainer:
  { marginTop: 1,
    width: "85%",
    marginLeft: 30
  },
  btnFinish:{
    marginTop:20,
    borderRadius:20,
    borderTopWidth: 1,
    borderTopColor:"#e3e3e3",
    borderBottomWidth: 1,
    borderBottomColor:"#e3e3e3",
    paddingTop: 10,
    paddingBottom:10,
    marginBottom:10,
  }
});