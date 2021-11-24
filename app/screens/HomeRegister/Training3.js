import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Divider,Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import QuizRegister from "../../components/HomeRegister/QuizRegister"

export default function Training3 ({route,navigation}) {
  const { questions, tid } = route.params;
  const navigations = useNavigation();
  return (
    <ScrollView>
      <View>
        <QuizRegister navigation={navigation} questions={questions} tid={tid}/>
      </View>    
      <Divider style= {styles.divider} />
      <View style={styles.viewZolbit}>
        <Text>Un producto de <Text style = {styles.textZolbit}>Zolbit</Text></Text>    
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create(
{
  divider:
  { backgroundColor: "#6B35E2",
    margin: 40,
  },
  viewZolbit:
  { justifyContent: "center",
    alignItems: "center"
  },
  textZolbit:
  { fontWeight: "bold"
  },
});