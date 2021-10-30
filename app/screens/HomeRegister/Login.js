import React, { useRef } from "react";
import { StyleSheet, View, ScrollView, Text,Image } from "react-native";
import { Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import LoginForm from "../../components/Login/LoginForm";
import Toast from "react-native-easy-toast";

export default function Login() {
    const toastRef = useRef();
    return(
        <ScrollView >

            <Image 
                source={require("../../../assets/img/zolbitLogo.png")}
                resizeMode="contain"
                style={styles.logo}
            />

            <View style={styles.viewContainer}>
                <LoginForm toastRef={toastRef} />
            </View>

            <Divider style= {styles.divider} />

            <View style={styles.textRegister}>
                <Text > Un producto de Zolbit</Text>    
            </View>
            
            <Toast ref={toastRef} position="center" opacity={0.9} />
        </ScrollView>
    )
}





const styles = StyleSheet.create({
    logo:{
        width: "100%",
        height: 150,
        marginTop: 70,
        

    },
    viewContainer:{
        marginRight: 40,
        marginLeft: 40,
        

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
    }
});