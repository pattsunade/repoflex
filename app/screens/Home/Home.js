import React, { useState,useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {StyleSheet,View,ActivityIndicator,Text} from "react-native";
import { Icon } from "react-native-elements";
import HomeApp from "../../components/Home/HomeApp";
import * as Location from 'expo-location';

export default function Home() {
  const navigation = useNavigation();
  const [auth, setAuth] = useState(null);
  const [check, setCheck] = useState(false);

   useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted')
        setAuth(false);
      else
        setAuth(true);
    })();
  }, [check]);

  return(
  <>
    { auth==null ? (
        <View style={styles.loaderTask}>
          <ActivityIndicator  size="large" color="#0000ff"/>
          <Text>Cargando...</Text>
        </View>
      ):
      (auth ? (
        <View style={styles.viewForm}>
          <HomeApp/>
        </View>)
        :(<View style={styles.loaderTask}>
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
      )
    }
  </>
  );
}

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