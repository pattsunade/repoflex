import React, { useState,useRef,useCallback } from "react";
import { StyleSheet, Text, View, ScrollView, Alert, TouchableOpacity ,Dimensions} from 'react-native';
import { Button, Divider,Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');

export default function TrainingQuestions (props) {
    const { navigation, questions, tid} = props;
    var Enunciados = [];
    for(let i = 0; i < questions.length; i++){
		Enunciados.push(
			<Text key={questions[i].qid} style={styles.customBtnTextContent} >{i+1}.- {questions[i].enu} </Text>
		 )
	}
    const onSubmit = () =>{
        Alert.alert(
            "Prueba de entrenamiento",
            "Empezar prueba para medir los conocimientos y continuar con el registro",
            [
                {
                    text: "Ver denuevo",
                    style: "cancel"
                },
                {
                    text: "Continuar",
                    onPress: () => navigation.navigate("homeregister")
                }
            ],
            {cancelable:false}
        )
    }
    return (
        <ScrollView>
            <View style={styles.viewContainer2}>
            <TouchableOpacity style={styles.customBtn} >
                <View style={styles.wrapper}>
                    <View style={styles.container}>
                  
                        <View >
                            <Text style={styles.customBtnText}>Preguntas del Entrenamiento </Text>
                            {Enunciados}
                    
                        </View>

                    </View>
                </View>         
            </TouchableOpacity>
            <Button
                    title="Comenzar"
                    containerStyle={styles.btnContainer}
                    buttonStyle={styles.btn}
                    onPress={ () => navigation.navigate("training3",{questions:questions,tid:tid})}                  
            />
            </View>         
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    video: {
        width: width,
        height: height / 3
    },
    viewContainer:{
        marginRight: 40,
        marginLeft: 40,
        marginTop: 15,
        marginBottom:5,
        justifyContent: "center",
        alignItems: "center",
    
    },
    viewContainer2:{
        marginRight: 30,
        marginLeft: 30,
        marginTop: 50,
        
    },
    texttitle: {
        marginTop:50,
        marginBottom:50,
        marginHorizontal:20,
        fontSize: 17,
        textAlign:"justify"
    },
    textRegister:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",  
    },
    btnRegister:{
        color: "#6B35E2",
        fontWeight: "bold",
    },
    divider:{
        backgroundColor: "#6B35E2",
        margin: 40,
    },
    viewZolbit:{
        justifyContent: "center",
        alignItems: "center",
        
    },
    textZolbit: {
        fontWeight: "bold",
    },
    customBtnText: {
        fontSize: 20,
        fontWeight: "400",
        marginVertical:5,
    },
    customBtnTextContent: {
        marginBottom:100,
        textAlign: "justify",
        
        },
    customBtn: {
        backgroundColor: "#fff",
        paddingHorizontal: 30,
        paddingVertical: 5,
        borderRadius: 10,
        marginTop:5 ,
        marginBottom:5
    },
    container: {
        flex: .5,
        flexDirection: 'row',
        justifyContent: 'flex-start', //replace with flex-end or center
        alignItems:"center"
    },
    wrapper: {
        flex: 1,
    
    },
    btnContainer: {
        marginTop: 20,
        width: "95%",
        marginLeft: 10,
      },
    btn: {
        backgroundColor: "#6B35E2",
        borderRadius: 50,
      },
});