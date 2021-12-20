import React, { useRef } from "react";
import { StyleSheet, View, ScrollView, Text,Image } from "react-native";
import { Divider } from "react-native-elements";
import ChangePasswordForm from "../../components/Account/ChangePasswordForm";

export default function RecoverPassword() {
  return (
    <ScrollView>
      <Text style={styles.texttitle}>Ingresa tu contraseña antigua junto con la nueva para modificar:</Text>
      <View style={styles.viewContainer} >
        <ChangePasswordForm/>
      </View>
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