import React, { useState,useRef,useCallback } from "react";
import { StyleSheet, View, Text} from "react-native";
import { Button } from "react-native-elements";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Outdated({navigation}) {  
  function signOut()
  { AsyncStorage.multiRemove(['@ott','@tid','@quest','@backAnsFormat','@comp']).then(()=>
    { navigation.reset(
      { index: 0,
        routes: [
          { name: 'login',
          }
        ],
      });
    });
  }

  return(
    <View style={styles.viewForm}>
      <Text style={{fontWeight:'bold'}}>Versión de app desactualizada, por favor actualizar a última versión.</Text>
      <Button 
        title="Cerrar sesión"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btnFinish}
        onPress= {signOut}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
      width: "100%",
      height: 150,
      marginTop: 20,
  },
  viewForm: {
      marginRight: 40,
      marginLeft: 40,
      alignItems: 'center'
  },
  btnContainer:
  { marginTop: 1,
    width: "85%",
    marginLeft: 30
  },
  btnFinish:{
    marginTop:20,
    borderRadius:20,
    borderTopWidth: 1,
    borderTopColor:"#e3e3e3",
    borderBottomWidth: 1,
    borderBottomColor:"#e3e3e3",
    paddingTop: 10,
    paddingBottom:10,
    marginBottom:10,
  }
});