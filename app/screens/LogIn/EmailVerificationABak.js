import React, { useRef } from "react";
import { StyleSheet, View, ScrollView, Text,Image } from "react-native";
import { Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import EmailVerificationForm from "../../components/Login/EmailVerificationFormA";

export default function EmailVerificationA ({route,navigation}) {
  const { correo, psw } = route.params;
  return (
    <ScrollView>
      <View style={styles.viewContainer} >
        <Text style={styles.texttitle}>Hemos enviado a tu correo un código de verificación que deberás ingresar aquí:</Text>
        <EmailVerificationForm correo={correo} psw={psw} />
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