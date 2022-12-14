import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Avatar } from "react-native-elements";
import * as firebase from "firebase";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

export default function InfoUser(props) {
    const {nameuser,level} = props;
    const changeAvatar = async () => {
        const resultPermission = await Permissions.askAsync(
            Permissions.CAMERA_ROLL
        );
        const resultPermissionCamera = resultPermission.permissions.cameraRoll.status;

        if (resultPermissionCamera === "denied") {
            toastRef.current.show("Es necesario aceptar los permisos de la galeria");
        } 
        else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                presentationStyle: 0,
                // aspect: [4, 3],
            });

        if (result.cancelled) {
            toastRef.current.show("Has cerrado la seleccion de imagenes");
        } 
        else {
            uploadImage(result.uri)
            .then(() => {
                updatePhotoUrl();
            })
            .catch(() => {
                toastRef.current.show("Error al actualizar el avatar.");
            });
        }
        }
    };

    const uploadImage = async (uri) => {
        setLoadingText("Actualizando Avatar");
        setLoading(true);

        const response = await fetch(uri);
        const blob = await response.blob();

        const ref = firebase.storage().ref().child(`avatar/${uid}`);
        return ref.put(blob);
    };

    const updatePhotoUrl = () => {
        firebase
        .storage()
        .ref(`avatar/${uid}`)
        .getDownloadURL()
        .then(async (response) => {
            const update = {
            photoURL: response,
            };
            await firebase.auth().currentUser.updateProfile(update);
            setLoading(false);
        })
        .catch(() => {
            toastRef.current.show("Error al actualizar el avatar.");
        });
    };

  return (
    <View style={styles.viewUserInfo}>
      <Avatar
        rounded
        size="large"
        onPress={changeAvatar}
        containerStyle={styles.userInfoAvatar}
        source={ require("../../../assets/iconrepo2.png")
        }
      />
      <View>
        <Text style={styles.displayName}>
          {nameuser}
        </Text>
      </View>
      <Text style={styles.displaytype}>{level}</Text>
      
    </View>
    
  );
}

const styles = StyleSheet.create({
  viewUserInfo: {
    alignItems: "center",
    justifyContent: "center",
    //flexDirection: "row",
    backgroundColor: "#f2f2f2",
    paddingTop: 30,
    paddingBottom: 5,
  },
  viewUserInfo2: {
    alignItems: "center",
    justifyContent: "center",
    //flexDirection: "row",
    backgroundColor: "#f2f2f2",
    paddingTop: 30,
    paddingBottom: 5,
  },
  userInfoAvatar: {
    justifyContent: "center",
    marginTop: 1
  },
  displayName: {
    fontWeight: "bold",
    paddingBottom: 5,
    marginTop: 10,
    fontSize:25,
    color: "#6B35E2",
    justifyContent: "center"
    
  },
  displaytype: {
    paddingBottom: 5,
    fontSize:13,
    color: "#6B35E2",
    justifyContent: "center"
  
  },
});
