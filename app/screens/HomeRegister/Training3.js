import React, { useRef,useState } from "react";
import { StyleSheet,StatusBar, Text, View, ScrollView,  TouchableOpacity ,Dimensions,SafeAreaView} from 'react-native';
import {  Divider,Icon,Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

import Toast from "react-native-easy-toast";
import QuizRegister from "../../components/HomeRegister/QuizRegister"

const { width, height } = Dimensions.get('window');

export default function Training3 ({route,navigation}) {
    const { questions, tid } = route.params;
    const toastRef = useRef(); 
    const navigations = useNavigation();
    return (
        <ScrollView>
            <View>
                <QuizRegister toastRef={toastRef} navigation={navigation} questions={questions} tid={tid}/>
            </View>
            
            <Divider style= {styles.divider} />
            <View style={styles.viewZolbit}>
                    <Text >Un producto de <Text style = {styles.textZolbit}>Zolbit</Text></Text>    
            </View>
            <Toast ref={toastRef} position="center" opacity={0.9} />
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