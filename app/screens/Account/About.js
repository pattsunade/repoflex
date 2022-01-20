import React, { useRef } from "react";
import { StyleSheet, View, ScrollView, Text,Image } from "react-native";
import { Divider,Card,Icon } from "react-native-elements";


export default function About() {
  return (
    <View style={styles.parentView}>
      <Text style={styles.textStyle}> Repoflex Móvil</Text>
      <Text style={styles.textStyle}> Versión:0.62.0 </Text>
      <Text style={styles.textStyle}> 2021 Zolbit </Text>
      <Text style={styles.textStyle}> Todos los derechos </Text>
      <Text style={styles.textStyle}> reservados </Text>
    </View>
    )
}

const styles = StyleSheet.create({
  parentView: {
    flexDirection: 'column',
    marginTop:15,
    alignItems: 'center',
    justifyContent:'center',
    flex:1
  },
  textStyle:{
    fontWeight:"bold",
    fontSize: 25
  }
});