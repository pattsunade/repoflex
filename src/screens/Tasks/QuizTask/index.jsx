import React from "react";
import { StyleSheet, Text, View} from 'react-native';
import {  Divider } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import QuizTaskRun from "./QuizTaskRun";

export default function QuizTask ({route,navigation}) {
    const {questions,tid,completed,prevAns} = route.params;
    return(
        <KeyboardAwareScrollView enableOnAndroid={true}
        enableAutomaticScroll={(Platform.OS === 'ios')}
        >
        <QuizTaskRun
            navigation={navigation}
            questions={questions}
            tid={tid}
            completed={completed}
            prevAns={prevAns}
        />
        <Divider style= {styles.divider}/>
        <View style={styles.viewZolbit}>
            <Text>Un producto de
            <Text style={styles.textZolbit}> Zolbit</Text>
            </Text>    
        </View>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
  divider:{
    backgroundColor: "#6B35E2",
    margin: 40
  },
  viewZolbit:{
    justifyContent: "center",
    alignItems: "center"
  },
  textZolbit: {
    fontWeight: "bold"
  }
});