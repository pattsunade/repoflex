import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { size, isEmpty } from "lodash";
import { useNavigation } from "@react-navigation/native";
import Loading from "../Loading";
import Toast from 'react-native-toast-message';
import BackEndConnect from "../../utils/BackEndConnect";

export default function EmailVerificationFormA (props) {
    const  { toastRef, correo } = props;
    const [loading, setLoading] = useState(false);
    const [code, setCode] = useState("");
    const [formData, setFormData] = useState(defaultFormValue());
    const navigation = useNavigation();
    
    const onChange = (e, type) => {
      setFormData({ ...formData, [type]: e.nativeEvent.text });
    };
    function verificationagain() {
      BackEndConnect("POST","sndvc",formato2(formData))
      .then((ans) => {
        if (ans.ans.stx=="vc")
        { Toast.show(
          { type: 'error',
            props: {onPress: () => {}, text1: 'Error', text2: ans.ans.msg
            }
          })
        }
      });
    }
    const onSubmit = () => {
      if( code === " " ){
        toastRef.current.show("Debes ingresar el código de 5 dígitos enviado a tu correo", 3000);
      } else {
        verification().then(() => 
        { navigation.navigate("login");
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
      }
    }
    function defaultFormValue() {
      return {
        usr: correo,
        mvc: 0, 
      };
    }
    function formato(objeto) {
      return{
        usr: correo,
        mvc : parseInt(objeto.mvc),
      };
    }
    function formato2(objeto) {
      return{
        usr: correo,
      };
    }
    async function verification() {
      return await BackEndConnect("POST","verma",formato(formData));
    }
    return(
        <View >
            <Text style={styles.texttitle}> Código de Verificación:</Text>
            <View style={styles.formContainer}>
                <Input
                    placeholder=" - - - - - -"
                    containerStyle={styles.inputForm}
                    inputContainerStyle={{borderBottomWidth:0}}
                    onChange={(e) => onChange(e, "mvc")}
                    rightIcon={
                        <Icon
                          type="material-community"
                          name="lock-question"
                          iconStyle={styles.iconRight}
                        />
                    }
                    keyboardType="numeric"
                />    
                <Text style={styles.textRegister}>
                  Para enviar nuevamente el correo con el código presiona {" "}
                  <Text
                    style={styles.btnRegister}
                    onPress={() => verificationagain()}
                  >
                    Aquí
                  </Text>
                  . (No olvides verificar tu carpeta de Spam).
                </Text>
                <Button
                    title="Confirmar"
                    containerStyle={styles.btnContainerLogin}
                    buttonStyle={styles.btnLogin}
                    onPress={onSubmit}
                />
                <Loading isVisible={loading} text="Iniciando sesión"/>
            </View>
      </View>        
    )
}
const styles = StyleSheet.create({
    formContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 10,
    },
    inputForm: {
      width: "100%",
      backgroundColor: '#fff',
      borderRadius: 50,
      marginBottom:20
    },
    texttitle: {
        marginHorizontal:20,
        fontWeight: "bold",
        fontSize: 20,
        textAlign:"justify"
    },
    btnContainerLogin: {
      marginTop: 20,
      width: "95%",
    },
    btnLogin: {
      backgroundColor: "#6B35E2",
      borderRadius: 50,
    },
    iconRight: {
      color: "#c1c1c1",
    },
    textRegister:{
      marginTop: 15,
      marginLeft: 10,
      marginRight: 10,
      marginBottom:40,
    },
    btnRegister:{
      color: "#6B35E2",
      fontWeight: "bold",
  },
});