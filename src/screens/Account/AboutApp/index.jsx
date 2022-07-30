import React from "react";
import { StyleSheet, View,Text, Linking } from "react-native";
import Constants from "expo-constants";

function About() {
  return (
    <View style={styles.parentView}>
      <Text style={styles.textStyle}> Repoflex Móvil</Text>
      <Text style={styles.textStyle}> Versión v{Constants.manifest.version} </Text>
      <Text style={styles.textStyle}> 2022 Zolbit </Text>
      <Text style={styles.textStyle}> Todos los derechos </Text>
      <Text style={styles.textStyle}> reservados </Text>
      <Text style={styles.link} 
        onPress={() => Linking.openURL('https://retailpro.atlassian.net/wiki/spaces/SRP/pages/2293432331/Pol+ticas+de+Privacidad+Repoflex')}>
        Políticas de Privacidad
      </Text>
    </View>
    )
}
export default About;
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
    fontSize: 20
  },
  link: {
    color: 'blue'
  }
});