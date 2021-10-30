import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { isEmpty } from "lodash";
import { useNavigation } from "@react-navigation/native";
import * as firebase from "firebase";
import { validateEmail } from "../../utils/validations";
import Loading from "../Loading";

export default function RecoverPasswordForm () {
  const [loading, setLoading] = useState(false);
  return (
    <View style={styles.formContainer}>
      <Input
        placeholder="Correo electronico"
        containerStyle={styles.inputForm}
        inputContainerStyle={{borderBottomWidth:0}}
        rightIcon={
          <Icon
            type="material-community"
            name="at"
            iconStyle={styles.iconRight}
          />
        }
      />
    <Button
      title="Recuperar contrasena "
      containerStyle={styles.btnContainerLogin}
      buttonStyle={styles.btnLogin}
    />
    <Loading isVisible={loading} text="Iniciando sesión" />
  </View>        
  )
}

const styles = StyleSheet.create({
  formContainer: {
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    marginTop:70,
  },
  inputForm: {
    width:"100%",
    marginTop:20,
    backgroundColor:'#fff',
    borderRadius:50,
  },
  btnContainerLogin: {
    marginTop:20,
    width:"95%",
  },
  btnLogin: {
    backgroundColor:"#6B35E2",
    borderRadius:50,
  },
  iconRight: {
    color:"#c1c1c1",
  },
  textRegister:{
    marginTop:15,
    marginLeft:10,
    marginRight:10,
  },
  btnRegister:{
    color:"#6B35E2",
    fontWeight:"bold",
  },
});