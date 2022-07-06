import React, { useState,useRef,useCallback } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity ,Dimensions} from 'react-native';
import { Button, Divider, Card } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');

export default function TrainingQuestions (props) {
  const { navigation, questions, tid} = props;
  var Enunciados = [];
  for(let i = 0; i < questions.length; i++)
  { Enunciados.push(
      <Text key={questions[i].qid} style={styles.questionTextContent} >{i+1}.- {questions[i].enu} </Text>
    )
  }
  return(
    <ScrollView>
      <View style={styles.viewContainer}>
        <Card>
          <Card.Title style={styles.cardTitleText}>Preguntas del Entrenamiento</Card.Title>
          <Card.Divider/>
          {Enunciados}
        </Card>
        <Button
          title="Comenzar"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={() => navigation.navigate("training3",{questions:questions,tid:tid})}
        />
      </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  viewContainer:{
    marginRight: 20,
    marginLeft: 20,
    marginTop: 25
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  wrapper: {
    flex: 1,
  },
  cardTitleText: {
    fontSize: 21,
    fontWeight: "400",
    marginVertical:5,
    textAlign:"left"
  },
  questionTextContent:{
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom:20
  },
  btnContainer: {
    marginTop: 20,
    width: "95%",
    marginLeft: 10
  },
  btn: {
    backgroundColor: "#6B35E2",
    borderRadius: 50,
  }
});