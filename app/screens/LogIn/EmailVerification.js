import React, { useRef } from "react";
import { StyleSheet, View, ScrollView, Text,Image } from "react-native";
import { Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import EmailVerificationForm from "../../components/Login/EmailVerificationForm";

export default function EmailVerificationA ({route,navigation}) {
  const { rut, psw } = route.params;
  return (
    <ScrollView>
      <View style={styles.viewContainer} >
        <Text style={styles.texttitle}>Ingresa tu correo para enviar un código de verificación:</Text>
        <EmailVerificationForm rut={rut} psw={psw} />
      </View>
      <Divider style={styles.divider} />
      <View style={styles.viewZolbit}>
        <Text>Un producto de <Text style = {styles.textZolbit}>Zolbit</Text></Text>    
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  viewContainer:{
    marginRight: 40,
    marginLeft: 40
  },
  texttitle: {
    marginTop:50,
    marginBottom:20 ,
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
    margin: 40
  },
  viewZolbit:{
    justifyContent: "center",
    alignItems: "center"  
  },
  textZolbit: {
    fontWeight: "bold"
  }
});