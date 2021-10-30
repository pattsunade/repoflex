import React, { useState,useRef,useCallback } from "react";
import { StyleSheet, View, Text,TouchableOpacity} from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-easy-toast";
import { useNavigation } from "@react-navigation/native";
import { Divider, Button } from 'react-native-elements';


export default function TaskDetail({route,navigation}) {
    const toastRef = useRef();
     const {tit,typ,tid,pla,amo,det,tim,nqu,npi,nre} = route.params;
    
    return(
        <View style={styles.viewForm}>
        <KeyboardAwareScrollView >
            <TouchableOpacity style={styles.TouchTask}  >
            <View style={styles.viewTareas}>
                <View style={styles.circleViewRZ}>
                { typ === 1 ? (
                    <Text style={styles.circleText}>TA</Text>
                ):typ === 2 ?(
                    <Text style={styles.circleText}>TR</Text>
                ):(
                    <Text style={styles.circleText}>TI</Text>
                )
                }
                    
                </View>
                { typ === 1 ? (
                    <Text style={styles.textTypeTask}>Auditoria</Text>
                ):typ === 2 ?(
                    <Text style={styles.textTypeTask}>Reposición</Text>
                ):(
                    <Text style={styles.textTypeTask}>Implementación</Text>
                ) 
                }
            </View>
            <View style={styles.viewTareas}>
                <Text style={styles.textTitleTask}>{tit}</Text>
                
            </View>
            <View>
                <Text style={styles.idText}>id:{tid}</Text>
            </View>
            <Divider style= {styles.divider} />
            <View style={styles.viewTareasTexto}>
                <View>
                <Text style={styles.textTask}>Lugar:</Text>
                </View>
                <Text style={styles.textRTask}>{pla}</Text>
            </View>
            <View style={styles.viewTareasDetalle}>
                <View>
                <Text style={styles.textTaskDetalle}>Detalle:</Text>
                </View>
                <Text style={styles.textRDetalle}>{det} </Text>
                
            </View>
            <View style={styles.viewTareasTexto}>
                <View>
                <Text style={styles.textTask2}>A pagar:</Text>
                </View>
                <Text style={styles.textRTask}>$ {amo}</Text>
            </View>
            <View style={styles.viewTareasTexto}>
                <View>
                <Text style={styles.textTask}>Tiempo de resolución:</Text>
                </View>
                <Text style={styles.textRTask}>{tim} min</Text>
            </View>
            <Divider style= {styles.divider} />

            <Text style={styles.textTitle}>DETALLE DE ACCIONES</Text>

            <Text style={styles.textDetalles}>{nqu}     Preguntas</Text>
            <Text style={styles.textDetalles}>{npi}     Fotografías</Text>
            <Text style={styles.textDetalles}>{nre}     Reposición</Text>
             
            <View style={styles.viewTareasTexto}>
                
            </View>
            
        </TouchableOpacity>
        </KeyboardAwareScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    viewForm: {
        marginRight: 10,
        marginLeft: 10,
    },
    TouchTask:{
        marginTop:10,
        borderRadius:10,
        // borderColor:"black",
        backgroundColor:"#fff",
        borderWidth: 0.5,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        elevation: 6,
        shadowRadius: 15 ,
        shadowOffset : { width: 1, height: 13}
    },
    loaderTask: {
        marginTop:100,
        marginBottom: 10,
        alignItems: "center",
    },
    viewTareas:{
        flexDirection: "row",
        margin:3,
        borderRadius:1,
    },
    viewTareasTexto:{
        flexDirection: "row",
        margin:1,
        borderRadius:1,
    },
    viewTareasDetalle:{
        flexDirection: "row",
        marginRight:10,
        borderRadius:1,
    },
    textTypeTask:{
        marginTop:8
    },
    textTitleTask:{
        fontWeight: "bold", 
        fontSize: 20,
    },
    textTitle:{
        fontWeight: "bold", 
        fontSize: 20,
        marginTop:20,
        marginHorizontal:79,
        alignItems: "center",
    },
    textDetalles:{
        
        fontSize: 20,
        marginTop:20,
        marginHorizontal:100,
        alignItems: "center",
    },
    idText:{
        marginLeft:5,
        fontSize: 10,
    },
    textTask:{
        marginLeft:5,
        marginRight:19,
        fontSize: 20,
    },
    textTaskDetalle:{
        marginLeft:5,
        marginRight:10,
        fontSize: 20,
    },
    textTask2:{
        marginLeft:5,
        marginRight:10,
        fontSize: 20,
    },
    textRTask:{
        marginLeft:5,
        marginRight:50,
        fontSize: 20,
        fontWeight: "bold", 
    },
    textRDetalle:{
        marginLeft:3,
        marginRight:50,
        fontSize: 20,
        
    },
    circleViewRZ: {
        width: 35,
        height: 35,
        borderRadius: 20,
        backgroundColor: "#6A17DF",
        justifyContent: 'center',
        marginRight:5,
    },
    circleText: {
        fontWeight: "bold", 
        fontSize: 20,
        textAlign: 'center',
        color:"#fff"
    },
    divider:{
        backgroundColor: "#6B35E2",
        margin: 10,
        
    },
    btnContainer: {
        marginTop: 20,
        width: "100%",
        marginHorizontal:15
      },
      btn: {
        backgroundColor: "#A88DCB",
        borderRadius: 50,
        marginHorizontal:8,
        marginBottom:10
      },

      btnContainer2: {
        marginTop: 20,
        width: "100%",
        marginHorizontal:15
      },
      btn2: {
        backgroundColor: "#68BB6D",
        borderRadius: 50,
        marginHorizontal:8,
        marginBottom:10
      },
});
