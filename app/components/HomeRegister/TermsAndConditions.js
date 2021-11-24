import React,{useState} from "react";
import { StyleSheet, Text, View, ScrollView, Alert, TouchableOpacity, Linking } from 'react-native';
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';
import BackEndConnect from "../../utils/BackEndConnect";

export default function TermsAndConditions (props) {
  const {TyCTitle,TyCBody} = props;
  const navigation = useNavigation();
  const [read, setRead] = useState(false);

  function onSubmit()
  { Alert.alert(
      "Aceptar términos  y condiciones del contrato",
      "¿Estás seguro de que quieres aceptar los términos  y condiciones que se incluyen en el contrato ?",
      [{  text: "Cancelar",
          style: "cancel"
        },
        { text: "Aceptar",
          onPress: () =>
          { BackEndConnect("POST","accep").then(async (ans) =>
            { if (ans.ans.stx === "ok")
              { navigation.reset(
                { index: 0,
                  routes: [
                    {
                      name: 'endregister',
                    }
                  ],
                });
              }
              else{
                console.log("Algo salio mal");
              }
            });
          }
        }
      ],
      {cancelable:false}
    )
  }

  function open()
  { setRead(true);
    WebBrowser.openBrowserAsync('https://expo.dev');
  }

  return (
    <ScrollView>
      <View style={styles.viewContainer}>
        <TouchableOpacity style={styles.customBtn} onPress={() => {}} >
          <View style={styles.wrapper}>
            <View style={styles.container}>
              <View>
                <Text style={styles.customBtnText}>{TyCTitle}</Text>
                <Text style={styles.customBtnTextContent} >{TyCBody}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      <Button
        title="Abrir explorador"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={open}
      />
      <Button
        title="Aceptar Términos y condiciones"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={onSubmit}
        disabled={!read}
      />
      </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  viewContainer:{
    marginRight: 30,
    marginLeft: 30,
    marginTop: 50,
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems:"center"
  },
  wrapper: {
    flex: 1,
  },
  btnContainer: 
  { marginTop: 20,
    width: "95%",
    marginLeft: 10,
  },
  btn:
  { backgroundColor: "#6B35E2",
    borderRadius: 50,
  }
});