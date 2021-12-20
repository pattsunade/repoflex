import React, { useRef } from "react";
import { StyleSheet, View, ScrollView, Text,Image } from "react-native";
import { Divider } from "react-native-elements";

import NewPasswordForm from "../../components/Login/NewPasswordForm";

export default function NewPassword({route,navigation}) {
  const { rut } = route.params;
  return (
    <ScrollView style={styles.viewContainer}>
      <Text style={styles.texttitle}>Ingresa el código que recibiste, junto con tu nueva contraseña.</Text>
      <NewPasswordForm rut={rut}/>     
      <Divider style= {styles.divider} />
      <View style={styles.textRegister}>
        <Text>Un producto de Zolbit</Text>    
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  logo:{
    width: "100%",
    height: 150,
    marginTop: 70
  },
  viewContainer:{
    marginRight: 40,
    marginLeft: 40
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
    margin: 40
  },
  texttitle: {
    marginTop:50,
    marginBottom:50,
    marginHorizontal:20,
    fontSize: 17,
    textAlign:"justify"
  },
});