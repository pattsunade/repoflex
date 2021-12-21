import React, { useRef } from "react";
import { StyleSheet, View, ScrollView, Text,Image } from "react-native";
import { Divider } from "react-native-elements";
import PersonalDataForm from "../../components/Account/PersonalDataForm";

export default function PersonalData() {
  return (
    <ScrollView>
      <View style={styles.viewContainer} >
        <PersonalDataForm/>
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
    marginRight: 30,
    marginLeft: 30
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