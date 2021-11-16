import React, { useRef,useState } from "react";
import { StyleSheet,StatusBar, Text, View, ScrollView,  TouchableOpacity ,Dimensions,SafeAreaView} from 'react-native';
import {  Divider,Icon,Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import QuizTaskRun from "../../components/Home/QuizTaskRun";

const { width, height } = Dimensions.get('window');

export default function QuizTask ({route,navigation}) {
  const {questions,tid,completed} = route.params;
  const navigations = useNavigation();
  return(
    <ScrollView>
      <View>
        <QuizTaskRun
          navigation={navigation}
          questions={questions}
          tid={tid}
          completed={completed}
        />
      </View>
      <Divider style= {styles.divider}/>
      <View style={styles.viewZolbit}>
        <Text>Un producto de
          <Text style={styles.textZolbit}> Zolbit</Text>
        </Text>    
      </View>
    </ScrollView>
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