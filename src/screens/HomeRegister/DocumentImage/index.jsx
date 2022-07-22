import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Text, Alert, Dimensions, Platform, Image } from "react-native";
import { Icon, Avatar, Input, Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from 'expo-image-manipulator';
import InfoSelfie from "../InfoImages/InfoSelfie.js";
import Loading from 'components/Loading';
import Toast from 'react-native-toast-message';
import sndfi from "api/transacciones/sndfi";
import noImage from 'assets/no-image.png'
const activities =  [
    {tit:'Fotografía frontal',
    des:'Debe ser una foto clara para que podamos identificarte.'
    },
    {tit:'Cédula de identidad frontal',
    des:'Verificaremos que la fotografía coincida con la parte frontal de la cédula de identidad.'
    },
    {tit:'Cédula de identidad reverso',
    des:'Verificaremos que la fotografía coincida con el reverso de la cédula de identidad.'
    },
    {tit:'Certificado de Antecedentes',
    des:'Pide tu certificado en el Registro Civil en línea, toma un pantallazo y subelo aquí.'
    }
];
export default function DocumentImage({route}) {
    const {mode} = route.params;
    const navigation = useNavigation();
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);
    const [imageDocumentSelfie, setImageDocumentSelfie] = useState("");
    const [formData, setFormData] = useState({
        nfil: mode,
        tfil: 1,
        file: "", 
    });
    const [isVisibleInfoSelfie, setIsVisibleInfoSelfie] = useState(false);

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]:e });
    }
    const sendimage = async() => {
        await sndfi({
            nfil : mode,
            tfil: 1,
            file : formData.file
        })
    }

  const compress = async (uri) =>
  { const manipResult = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width:640 , height:480  } }],
      { compress: 0.5,base64: true, format: ImageManipulator.SaveFormat.JPEG }
    );
    setImage(manipResult.base64);
    onChange(manipResult.base64,"file");
  };

	const uploadSelfie = async () => { 
		const resultPermissions = await ImagePicker.requestCameraPermissionsAsync();
		if (resultPermissions === "denied") { 
			Toast.show({ 
				type: 'error',
				props: {
					onPress: () => {}, 
					text1: 'Error', 
					text2: "Debes dar permiso para abrir la cámara."
				}
			});
		}
		else { 
			let result = mode < 4 ? (
			await ImagePicker.launchCameraAsync({          
				allowsEditing:true,
				aspect: [4, 3],
				quality: 1,
				presentationStyle: {
					
				}
			})):(await ImagePicker.launchImageLibraryAsync({
			allowsEditing:true,
			quality: 1,
			presentationStyle: 0
			}));
		
		// else
		// { result = await ImagePicker.launchImageLibraryAsync({
		//     allowsEditing:true,
		//     quality: 1,
		//     presentationStyle: 0
		//   });
		// }
		if (!result.cancelled)
		{ compress(result.uri);
			setImageDocumentSelfie(result.uri);
		}
		}
	};

  const uploadDocuments = () =>{
    if(!image){
      Toast.show(
      { type: 'error',
        props: {onPress: () => {}, text1: 'Error', text2: "Debes subir una foto para continuar."
        }
      });
    } 
    else{
      setLoading(true);
      sendimage().then(() => {
        mode < 4 ? (navigation.replace("documentimage",{mode:mode+1})):
        (navigation.reset(
          { index: 0,
            routes: [
              { name: 'homeregister',
              }
            ],
          }));
        setLoading(false);
      });
    }
  };

  return(
    <>
    { loading ? (<Loading text="Subiendo imagen..."/>):
      ( <ScrollView>
          <View style={styles.viewContainer}>
            <Text style={styles.title}>{activities[mode-1].tit}</Text>
            <Text style={styles.text}>{activities[mode-1].des}</Text>
            <View style={styles.wrapper}>
              <View style={styles.container}>
                <View>
					<Button
						title={ !image ? "Toma tu foto aquí" : "Cambiar Foto"}
						containerStyle={styles.btnContainer}
						buttonStyle={ !image ? styles.btn : styles.btnCheck}
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
              source={image ? {uri:imageDocumentSelfie} : noImage}
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
  </>
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
    marginTop:40,
    marginHorizontal:20,
    fontSize:20,
    textAlign:"center",
    fontWeight:"bold"
  },
  text:{
    marginBottom:20,
    marginHorizontal:20,
    fontSize:15,
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
    marginTop:25,
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