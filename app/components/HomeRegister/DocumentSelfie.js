import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Text, Alert, Dimensions, Platform, Image } from "react-native";
import { Icon, Avatar, Input, Button } from "react-native-elements";
import * as MediaLibrary from 'expo-media-library';
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from 'expo-image-manipulator';
import Modal from "../Modal";
import InfoSelfie from "../HomeRegister/InfoImages/InfoSelfie";
import BackEndConnect from "../../utils/BackEndConnect";

export default function DocumentSelfie (props) {
    const { toastRef, setIsLoading, navigation} = props;
    const [imageSelfie, setImageSelfie] = useState("");
    const [imageDocumentSelfie, setImageDocumentSelfie] = useState("");
    const [formData, setFormData] = useState(defaultFormValue());
    const [isVisibleInfoSelfie, setIsVisibleInfoSelfie] = useState(false);
    function onChange (e, type) {
        setFormData({ ...formData, [type]:e });
    };
    function defaultFormValue() {
        return {
          nfil: 1,
          tfil: 1,
          file: "", 
        };
    };
    function formato(objeto) {
        return{
          nfil : 1,
          tfil: 1,
          file : objeto.file
        };
    };
    async function sendimage() {
        await BackEndConnect("POST","sndfi",formato(formData));
    };
    const compress = async (uri) => {
        const manipResult = await ImageManipulator.manipulateAsync(
          uri,
          [{ resize: { width:640 , height:480  } }],
          { compress: 0.5,base64: true, format: ImageManipulator.SaveFormat.JPEG }
        );
        setImageSelfie(manipResult.base64);
        onChange(manipResult.base64,"file");
    };
    const uploadSelfie = async () =>{
        const resultPermissions = await MediaLibrary.requestPermissionsAsync();
        const resultPermissionsCamera = await ImagePicker.requestCameraPermissionsAsync()
        const roll = await ImagePicker.requestCameraRollPermissionsAsync()
        if (resultPermissions === "denied"){
            toastRef.current.show("Es necesario aceptar los permisos de cámara para subir imagenes")
        }
        else {
            const result = await ImagePicker.launchCameraAsync({          
                allowsEditing:true,
                aspect: [4, 3],
                quality: 1
            });
            if (result.cancelled) {
                if (!imageSelfie){
                    toastRef.current.show("Has cerrado la cámara sin tomar una imagen",3000);
                }
            } 
            else {
                compress(result.uri);
                setImageDocumentSelfie(result.uri);
                toastRef.current.show("Imagen selfie tomada",3000);
            }
        }
    };
    const uploadDocuments = () =>{
        if(!imageSelfie){
            toastRef.current.show("Debe subir su Selfie para Continuar",3000);
        } else {
            sendimage()
            navigation.navigate("documentfront");
        }
    };
    return(
        <ScrollView>
            <View style={styles.viewContainer}>
                <Text style={styles.title}>Fotografía Frontal (Selfie)</Text>
                <Text style={styles.text}>Verificaremos que esta fotografía coincida con cedula de identidad.</Text>
                <View style={styles.wrapper}>
                    <View style={styles.container}>
                        <View>
                            <Button
                                title={ !imageSelfie ? "Sube tu archivo aquí" : "Cambiar Foto"}
                                containerStyle={styles.btnContainer}
                                buttonStyle={ !imageSelfie ? styles.btn : styles.btnCheck}
                                onPress={uploadSelfie}
                            />
                        </View>
                        <View>
                        <Icon
                            type="material-community"
                            name="information-outline"
                            iconStyle={styles.iconLeft}
                            size={25}
                            onPress={() => setIsVisibleInfoSelfie(true)}
                        />
                        <InfoSelfie isVisibleInfoSelfie={isVisibleInfoSelfie} setIsVisibleInfoSelfie={setIsVisibleInfoSelfie}/>
                        </View>
                    </View>
                </View>
                <Image
                    source={imageSelfie ? {uri:imageDocumentSelfie} : require("../../../assets/no-image.png")}
                    resizeMode="contain"
                    style={styles.logo}
                />
                <Button
                    title="Siguiente"
                    containerStyle={styles.btnContainerNext}
                    buttonStyle={styles.btnNext}
                    onPress={uploadDocuments}
                />
                <View style={styles.viewZolbit}>
                    <Text>Un producto de <Text style = {styles.textZolbit}>Zolbit</Text></Text>    
                </View>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    viewContainer:{
        marginRight:40,
        marginLeft:40,
        alignItems:"center",
        textAlign:"center",
        justifyContent:"center"
    },
    title:{
        marginTop:200,
        marginHorizontal:20,
        fontSize:20,
        textAlign:"center",
        fontWeight:"bold"
    },
    text:{
        marginBottom:20,
        marginHorizontal:20,
        fontSize:10,
        textAlign:"center"
    },
    btnContainer:{
        marginBottom:10,
        width:"100%",
        marginHorizontal:15
    },
    btn:{
        backgroundColor:"#A29FD8",
        borderRadius:50,
        marginHorizontal:10
    },
    btnCheck:{
        backgroundColor:"#5100FF",
        borderRadius:50,
        marginHorizontal:10
    },
    container:{
        flex:.5,
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:"center"
    },
    wrapper:{
        flex:1
    },
    iconLeft:{
        color:"#A29FD8",
        marginBottom:10,
        marginLeft:10
    },
    btnContainerNext:{
        marginBottom:20,
        width:"100%"
    },
    btnNext:{
        backgroundColor:"#6B35E2",
        borderRadius:50,
        marginHorizontal:20,
        marginBottom:30
    },
    viewZolbit:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",  
        position:"absolute",
        bottom:5
    },
    logo:{
        width:"100%",
        height:150,
        marginTop:10
    },
    textZolbit:{
        fontWeight:"bold"
    }
});