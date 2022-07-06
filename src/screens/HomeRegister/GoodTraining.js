import React, { useRef } from "react";
import { StyleSheet, View, ScrollView, Text,Image } from "react-native";
import { Divider,Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

export default function GoodTraining () {
    const navigation = useNavigation();
    return (
        <ScrollView>
            <View style={styles.viewContainer} >
                <Text style={styles.title}>Felicidades!</Text>
                <Text style={styles.text}>Examen completado.</Text>
                <Text style={styles.text}>Ahora solo tienes que completar el último paso para poder comenzar a realizar tareas.</Text>
            </View>
            <Button
                title="Ir al Último Paso"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={ () => navigation.navigate("homeregister")}
            />
            <Divider style= {styles.divider} />
            <View style={styles.textRegister}>
                <Text > Un producto de Zolbit</Text>    
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({

    viewContainer:{
        marginRight: 40,
        marginLeft: 40,
        alignItems:"center"
    },
    title: {
        marginTop:120,
        marginBottom:30,
        marginHorizontal:20,
        fontSize: 30,
        textAlign:"center",
        fontWeight: "bold",
    },
    text: {
        marginTop:30,
        marginBottom:10,
        marginHorizontal:20,
        fontSize: 20,
        textAlign:"center"
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
    btnContainer: {
        marginTop: 60,
        width: "100%",
    },
    btn: {
        backgroundColor: "#6B35E2",
        borderRadius: 50,
        marginHorizontal:60,
    },
});