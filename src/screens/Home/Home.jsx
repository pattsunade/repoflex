import React, { useState,useEffect } from "react";
import {StyleSheet,View,ActivityIndicator,Text} from "react-native";
import { Icon } from "react-native-elements";
import * as Location from 'expo-location';
import HomeApp from "components/Home/HomeApp";

function Home() {
    const [auth, setAuth] = useState(null);
    const [check, setCheck] = useState(false);

    useEffect(() => {(async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted')
            setAuth(false);
        else
            setAuth(true);
        })();
    }, [check]);

    if(auth == null) {
        return (
            <View style={styles.loaderTask}>
                <ActivityIndicator  size="large" color="#0000ff"/>
                <Text>Cargando...</Text>
            </View>
        )
    }
    if (auth) {
        return (
            <View style={styles.viewForm}>
                <HomeApp/>
            </View>
        )
    }

    return (
        <View style={styles.loaderTask}>
            <Text style={{fontWeight:'bold'}}>Debes dar permiso de localización para continuar.</Text>
            <Icon
              size={40}
              type="material-community"
              name="refresh"
              color= "#5300eb"
              containerStyle={styles.btnContainer}
              onPress={()=>setCheck(!check)}
            />
        </View>
    )
}


export default Home

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: 20
  },
  viewForm: {
    marginRight: 30,
    marginLeft: 30
  },
  loaderTask: {
    marginTop:100,
    marginBottom: 10,
    alignItems: "center"
  }
});