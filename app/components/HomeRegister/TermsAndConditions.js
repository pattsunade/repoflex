import React, { useRef } from "react";
import { StyleSheet, Text, View, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { Button, Divider,Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

import BackEndConnect from "../../utils/BackEndConnect";

export default function TermsAndConditions (props) {
    const {TyCTitle,TyCBody} = props;
    const navigation = useNavigation();

    const onSubmit = () =>{
        Alert.alert(
            "Aceptar términos  y condiciones del contrato",
            "¿Estás seguro de que quieres aceptar los términos  y condiciones que se incluyen en el contrato ?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Aceptar",
                    onPress: () => {
                        BackEndConnect("POST","accep").then(async (ans) => {
                            if (ans.ans.stx === "ok"){
                                navigation.navigate("endregister")
                              //navigations.navigate("badtraining")
                            }
                            else{
                                console.log("Algo salio mal");
                            }
                          });
                    }
                }
            ],
            {cancelable:false}
        )
    }

    return (
        <ScrollView>
            <View style={styles.viewContainer2}>
            <TouchableOpacity style={styles.customBtn} onPress={() => {}} >
                <View style={styles.wrapper}>
                    <View style={styles.container}>             
                        <View >
                            <Text style={styles.customBtnText}>{TyCTitle}</Text>
                            <Text style={styles.customBtnTextContent} >{TyCBody}</Text>
                        </View>
                    </View>
                </View>         
            </TouchableOpacity>
            <Button
                    title="Aceptar Términos y condiciones"
                    containerStyle={styles.btnContainer}
                    buttonStyle={styles.btn}
                    onPress={onSubmit}
            />
            </View>        
        </ScrollView>
    )
}


const styles = StyleSheet.create({
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
        marginBottom:300,
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