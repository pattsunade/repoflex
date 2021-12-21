import React, { useRef } from "react";
import { StyleSheet, View, ScrollView, Text,Image } from "react-native";
import { Divider,Card,Icon } from "react-native-elements";


export default function FrecuentQuestions() {
  return (
    <ScrollView>
      <Card>
        <View style={styles.titleView}>
          <Text style={styles.titleText}> INFORMACIÓN BÁSICA </Text>
          <Icon type="material-community" name="menu-right" size={24} />
        </View>
        <Card.Divider/>
        <View style={styles.titleView}>
          <Text style={styles.titleText}> DOCUMENTACIÓN </Text>
          <Icon type="material-community" name="menu-right" size={24} />
        </View>
        <Card.Divider/>
        <View style={styles.titleView}>
          <Text style={styles.titleText}> REPOFLEX APP </Text>
          <Icon type="material-community" name="menu-right" size={24} />
        </View>
        <Card.Divider/>
        <View style={styles.titleView}>
          <Text style={styles.titleText}> OTROS </Text>
          <Icon type="material-community" name="menu-right" size={24} />
        </View>
        <Card.Divider/>
      </Card>
    </ScrollView>
    )
}

const styles = StyleSheet.create({
  titleView: {
    flexDirection: 'row',
    marginTop:15,
    justifyContent: 'space-between'
  },
  titleText:{
    fontWeight:"bold"
  }
});