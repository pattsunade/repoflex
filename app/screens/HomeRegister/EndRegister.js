import React, { useRef,useContext } from "react";
import { StyleSheet, View, ScrollView, Text,Image } from "react-native";
import { Divider,Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function EndRegister () {
    const navigation = useNavigation();
    async function signOut()
    { await AsyncStorage.removeItem('@ott');
        navigation.navigate("login");
    }
    return (
        <ScrollView>
            <View style={styles.viewContainer} >
                <Text style={styles.title}>¡Felicidades!</Text>
                <Text style={styles.text}>Finalizaste tu Registro.</Text>
                <Text style={styles.text}>Ya estás listo para comenzar a realizar tareas y ganar dinero extra.</Text>
            </View>
            <Button
                title="Iniciar"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={signOut}
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
        marginTop:50,
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