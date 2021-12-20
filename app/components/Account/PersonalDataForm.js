import React,{useState} from "react";
import { StyleSheet, Text, View, ScrollView, Alert, TouchableOpacity, Linking } from 'react-native';
import { Button, Icon, Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import * as WebBrowser from 'expo-web-browser';
import ParsedText from 'react-native-parsed-text';
import BackEndConnect from "../../utils/BackEndConnect";

export default function PersonalDataForm (props) {
  const navigation = useNavigation();
  

  // paragraph.map((ans) =>{console.log(ans.bod)})
  return (
    <View style={styles.parentView}>
      <View style={styles.firstRowView}>
        <Text>Name</Text>
        <Text>Nico</Text>
      </View>
      <View style={styles.secondRow}>
        <Icon name="fingerprint" size={24} color="black" />
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  parentView: {
  flexDirection: 'row',
  },
  firstRowView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: 'black',
    borderBottomWidth: 2,
  },
  secondRow: {},
  iconRight: {
    color:"#AC9DC9",
  },
});