import React, { useState,useRef,useCallback } from "react";
import { StyleSheet, Text, View, ScrollView, Alert, TouchableOpacity ,Dimensions} from 'react-native';
import * as Progress from 'react-native-progress';
import { Button,Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from '@react-navigation/native';

import Toast from "react-native-easy-toast";

const { width, height } = Dimensions.get('window');

export default function TaskQuestion (props) {
  const { toastRef, navigation, questions,tid} = props;
  var Enunciados = [];
  for(let i = 0; i < questions.length; i++)
  { Enunciados.push
    ( <Text 
        key={questions[i].aty}
        style={styles.customBtnTextContent}>
        {i+1}.- 
        {questions[i].tiq}
      </Text>
    )
  }
  return(
    <ScrollView>
      <View style={styles.viewContainer2}>
      <TouchableOpacity style={styles.customBtn} >
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <View>
            <Text 
              style={styles.customBtnText}>
              Preguntas de la Tarea
            </Text>
            {Enunciados}
          </View>
        </View>
      </View>
      </TouchableOpacity>
      <Button
        title="Comenzar"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={ () => navigation.navigate("quiztask",{questions:questions,tid:tid})} 
      />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create
( { viewContainer:
    { marginRight:40,
      marginLeft:40,
      marginTop:15,
      marginBottom:5,
      justifyContent:"center",
      alignItems:"center"
    },
    viewContainer2:
    { marginRight:30,
      marginLeft:30,
      marginTop:50
    },
    divider:
    { backgroundColor: "#6B35E2",
      margin: 40
    },
    viewZolbit:
    { justifyContent: "center",
      alignItems: "center"
    },
    textZolbit:
    { fontWeight: "bold"
    },
    customBtnText:
    { fontSize: 20,
      fontWeight: "400",
      marginVertical:5
    },
    customBtnTextContent:
    { marginBottom:100,
      textAlign: "justify"
    },
    customBtn:
    { backgroundColor: "#fff",
      paddingHorizontal:30,
      paddingVertical:5,
      borderRadius:10,
      marginTop:5,
      marginBottom:5
    },
    container:
    { flex:.5,
      flexDirection:'row',
      justifyContent:'flex-start',
      alignItems:"center"
    },
    wrapper:
    { flex: 1
    },
    btnContainer:
    { marginTop: 20,
      width: "95%",
      marginLeft: 10
    },
    btn:
    { backgroundColor: "#6B35E2",
      borderRadius: 50
    }
  }
);