import React, { useState,useRef,useCallback } from "react";
import { StyleSheet, Text, View, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { Button, Divider,Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import TermsAndConditions from "../../components/HomeRegister/TermsAndConditions";
import BackEndConnect from "../../utils/BackEndConnect";

export default function Firm () {
    const navigation = useNavigation();
    const [TyCTitle, setTyCTitle] = useState();
    const [TyCBody, setTyCBody] = useState();

    useFocusEffect(
        useCallback(() => {
            BackEndConnect("POST","terco").then(async (response) => {
                var title = response.ans.tit;
                var body = response.ans.bod;
                setTyCTitle(title);
                setTyCBody(body);
            })
            .catch((response) =>{
              console.log(response);
              Toast.show({
                type: 'error',
                props: {onPress: () => {}, text1: 'Error', text2: 'Error de conexión, por favor intenta más tarde'
                  }
              });
            }
        );
        }, [])
      );

    return (
        <ScrollView>
            
            <View>
                <TermsAndConditions navigation={navigation} TyCTitle={TyCTitle} TyCBody={TyCBody} />
            </View>
            
            <Divider style= {styles.divider} />
            <View style={styles.viewZolbit}>
                    <Text >Un producto de <Text style = {styles.textZolbit}>Zolbit</Text></Text>    
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