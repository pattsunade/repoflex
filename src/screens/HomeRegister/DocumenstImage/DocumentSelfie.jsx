import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import * as ImagePicker from "expo-image-picker";
import noImage from 'assets/no-image.png'
import ZolbitProduct from 'components/General/ZolbitProduct';
import Toast from 'react-native-toast-message';
import { compressImageByUri } from 'utils/images';
import { RF_PURPLE, RF_PURPLE_DISABLED } from 'components/colorsConstants';
import ImagePlaceholder from 'components/General/ImagePlaceholder';
import sndfi from 'api/transacciones/sndfi';
import { useNavigation } from '@react-navigation/native';


function DocumentSelfie({mode}) {

    const navigation = useNavigation();
    const [image, setImage] = React.useState(undefined);
    const [isSubmitingImage, setIsSubmitingImage] = React.useState(false);

    const openCamera = async() => {
        const resultPermissions = await ImagePicker.requestCameraPermissionsAsync();
        if (resultPermissions === "denied" ) {
            Toast.show({ 
				type: 'error',
				props: {
					onPress: () => {}, 
					text1: 'Error', 
					text2: "Debes dar permiso para abrir la cámara."
				}
			});
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 1,
            presentationStyle: 0,
        })
        if (result.cancelled === false) {
            const compressedImage = await compressImageByUri(result)
            setImage(compressedImage)
        }
    }

    const submitImage = async() => {
        if(image === undefined) {
            Toast.show({ 
                type: 'error',
                    props: {onPress: () => {}, text1: 'Error', text2: "Debes subir una foto para continuar."
                }
            });
            return;
        }

        setIsSubmitingImage(true)
        await sndfi({
            nfil: mode,
            tfil: 1,
            file: image,
        })
        .then(response => {
            if (response.ans.stx === 'ok') {
                navigation.replace('documentimage', {
                    mode: mode +1,
                }) 
            }
        })
        .catch(err => {
            console.log(err);
            Toast.show({ 
                type: 'error',
                    props: {onPress: () => {}, text1: 'Error', text2: "Error al enviar la imagen."
                }
            });
        })
        .finally(() => {
            setIsSubmitingImage(false)
        })


    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Fotografía frontal</Text>
            <Text style={styles.description}>Debe ser una foto clara para que podamos identificarte.</Text>
            <View style={styles.imageContainer}>
                {image === undefined? 
                    <ImagePlaceholder /> : <Image source={image || noImage} style={styles.imageStyle} />}
                {/* <Image source={image || noImage} style={styles.image} /> */}
            </View>

            <TouchableOpacity 
                style={styles.touchButtonStyle}
                onPress={openCamera}
            >
                <Text style={styles.buttonUploadText}>{image? 'Cambiar foto': 'Subir foto'   }</Text>
                <Icon
                    type="material-community"
                    name='camera-plus'
                    iconStyle={styles.buttonIcon}
                />
            </TouchableOpacity>
            <View style={styles.viewButtonContainerNext}>

                <Button 
                    title={'Siguiente'}
                    disabled={(image === undefined) || isSubmitingImage}
                    loading={isSubmitingImage}
                    containerStyle={styles.buttonNextContainer}
                    buttonStyle={styles.buttonNext}
                    disabledStyle={styles.buttonNextDisabled}
                    disabledTitleStyle={styles.buttonNextDisableTitle}
                    onPress={submitImage}
                />
            </View>
            <View>
                <ZolbitProduct />
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container:{
        marginHorizontal:30,
        alignItems:"center",
        textAlign:"center",
        justifyContent:"center"
    },
    title:{
        marginTop:40,
        marginHorizontal:20,
        fontSize:20,
        textAlign:"center",
        fontWeight:"bold"
    },
    description:{
        marginBottom:20,
        marginHorizontal:20,
        fontSize:15,
        textAlign:"center"
    },
    
    viewButtonUploadContainer:{
        marginBottom:10,
        width:"100%",
        marginHorizontal:15,
        flexDirection: 'row',
        // justifyContent: 'flex-end',
        // borderWidth: 1,
        
    },
    buttonUploadContainer: {
        width: '100%',
        borderRadius: 10,
    },
    buttonUpload: {
        borderRadius: 10,
        borderColor: RF_PURPLE
    },
    buttonUploadText: {
        color: RF_PURPLE,
        fontWeight: 'bold'
    },
    buttonIcon: {
        marginStart: 5,
        color: RF_PURPLE
    },
    viewButtonContainerNext:{
        marginTop: 20,
        marginBottom: 40,
        width:"100%",
        borderRadius: 10,
        alignItems: 'flex-end',
        
    },
    buttonNextContainer: {
        marginTop: 30,
        width: '100%'
    },
    buttonNext: {
        color: 'whitesmoke',
        backgroundColor:RF_PURPLE,
        borderRadius: 10
        // width: '50%'
    },
    buttonNextDisabled: {
        backgroundColor: RF_PURPLE_DISABLED
    },
    buttonNextDisableTitle: {
        color: "#fff"
    },
    imageContainer: {
        height:200,
        width:'100%',
        alignItems:"center",
    },
    imageStyle:{
        height:200,
        width: 250,
        resizeMode: 'contain'
    },
    touchButtonStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width:'50%',
        paddingVertical: 5,
        marginTop: 5,
    },
})

export default DocumentSelfie;
