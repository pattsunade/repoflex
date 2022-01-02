import React, {useRef,useState} from "react";
import { StyleSheet, View, ScrollView, Text,Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import LoginForm from "../../components/Login/LoginForm";
import Toast from 'react-native-toast-message';

export default function Login() {
  return(
    <ScrollView>
      <Image 
        source={require("../../../assets/img/repoLogo.png")}
        resizeMode="contain"
        style={styles.logo}
      />
      <View 
        style={styles.viewContainer}
      >
        <LoginForm/>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.textRegister}>
        <Text>Un producto de Zolbit</Text>
        <Text>Version v0.53.0 </Text>
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
  }
});