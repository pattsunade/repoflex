import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { isEmpty } from "lodash";
import { useNavigation } from "@react-navigation/native";
import * as firebase from "firebase";
import { validateEmail } from "utils/validations";
import Loading from "../Loading";
import Toast from 'react-native-toast-message';
import BackEndConnect from 'api/backendHandler';
import { clean, validarRut } from "utils/rut";

const formato = (objeto) => {
    return {
        usr : objeto.usr,
    };
}

export default function RecoverPasswordForm () {
    const [loading, setLoading] = useState(false);
    const [rutCorrect, setRutCorrect] = useState(2);
    const [formData, setFormData] = useState({
        usr: "",
    });
    const [changedRut, setChangedRut] = useState("");
    const navigation = useNavigation();

    const onEnd = (e,type)=> { 
        const rut = clean(e.nativeEvent.text).toUpperCase();
        const rutLen = rut.length;
        if(rutLen==0) { 
            setRutCorrect(2);
        } else if(rutLen<7) { 
            setRutCorrect(3);
        } else { 
            const isRutValid = validarRut(rut);
            if(isRutValid === true) {
                setRutCorrect(1);
                setFormData({ ...formData, [type]: rut });
            } else {
                setRutCorrect(0);
            }
        }
    }

  

    const format = (rut)=> { 
        if (rut.length>0) { 
            rut = clean(rut).toUpperCase();
            var result = rut.slice(-4, -1) + '-' + rut.substr(rut.length - 1);
            for (var i = 4; i < rut.length; i += 3) {
                result = rut.slice(-3 - i, -i) + '.' + result
            }
            setChangedRut(result);
        }
        else { 
            setChangedRut("");
        }
    }

    const onSubmit = () => { 
        setLoading(true);
        BackEndConnect("POST","sndma",formato(formData)) 
        .then((ans) => { 
            if (ans.ans.stx != "ok") { 
                Toast.show({ 
                    type: 'error',
                    props: {
                        onPress: () => {}, 
                        text1: 'Error', 
                        text2: ans.ans.msg
                    }
                });
            setLoading(false);
            }
            else { 
                navigation.navigate("newPassword",{
                    rut:formData.usr
                });
                setLoading(false);
            }
        })
        .catch((ans)=> { 
            Toast.show({ 
                type: 'error',
                props: {
                    onPress: () => {}, 
                    text1: 'Error', 
                    text2: 'Por favor, intenta más tarde.'
                }
            });
            setLoading(false);
        });
    }

    if (loading ) {
        return <Loading text="Cargando"/>
    }
    return (
        <View style={styles.formContainer}>
            <View style={styles.searchSection}>
            <TextInput
                placeholder="Ingrese su rut"
                placeholderTextColor="#AC9DC9"
                style={styles.inputForm}
                onEndEditing={(e) => onEnd(e,"usr")}
                maxLength={12}
                onChangeText={(e) => format(e)}
                secureTextEntry={Platform.OS === 'ios' ? false : true}
                keyboardType={Platform.OS === 'ios' ? null : 'visible-password'}
                autoCapitalize="none"
                value={changedRut}
            />
            </View>
            <View style={styles.viewError}>
            { rutCorrect == 0 ?
            (<Text style={styles.textDescriptionError}>{" "}El rut ingresado es incorrecto.</Text>):
            rutCorrect == 3 ?
            (<Text style={styles.textDescriptionError}>{" "}Debes ingresar mínimo 7 dígitos.</Text>):
            (<></>)
            }
            </View>
            <Button
            title="Recuperar contraseña"
            containerStyle={styles.btnContainerLogin}
            buttonStyle={styles.btnLogin}
            onPress={onSubmit}
            disabled={rutCorrect != 1 ? (true):(false)}
            />
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
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputForm: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    width: "100%",
    backgroundColor: '#fff',
    borderRadius: 20
  },
  btnContainerLogin: {
    marginTop:20,
    width:"95%"
  },
  btnLogin: {
    backgroundColor:"#6B35E2",
    borderRadius:50
  },
  iconRight: {
    color:"#AC9DC9",
  },
  textRegister:{
    marginTop:15,
    marginLeft:10,
    marginRight:10
  },
  textDescriptionError:{
    fontWeight:"normal",
    fontSize:15,
    justifyContent:"flex-start",
    color:"#ff0000"
  },
  btnRegister:{
    color:"#6B35E2",
    fontWeight:"bold"
  }
});