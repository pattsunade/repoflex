import React, { useState, useRef } from "react";
import { StyleSheet, View, Text, ScrollView, TextInput } from "react-native";
import { Input, Icon, Button, Divider} from "react-native-elements";
import Loading from "../Loading";
import {validateEmail} from "../../utils/validations";
import { size,isEmpty,map,isInteger } from "lodash";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import Toast from 'react-native-toast-message';
import BackEndConnect from "../../utils/BackEndConnect";
import { clean, validarRut } from "../../utils/rut";

const formato = (objeto) => {
    return{
        usr : objeto.rut,
        psw : objeto.psw,
        pho : objeto.pho
    };
}


function RegisterForm() {

    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [formData, setFormData] = useState({
        rut: "",
        psw: "",
        pho: "",
        repeatPassword: ""
    });
    const [rutCorrect, setRutCorrect] = useState(2);
    const [changedRut, setChangedRut] = useState("");
    const [passCorrect, setPassCorrect] = useState(2);
    const [repeatPassCorrect, setRepeatPassCorrect] = useState(2);
    const [loading, setLoading] = useState(false);
    const ref_input2 = useRef();
    const ref_input3 = useRef();
    const ref_input4 = useRef();
    const navigation = useNavigation();

    const onSubmit = () => { 
        setLoading(true);
        if (isEmpty(formData.rut) || isEmpty(formData.psw) || isEmpty(formData.repeatPassword)) { 
            Toast.show({ 
                type: 'error',
                props: {
                    onPress: () => {}, 
                    text1: 'Error', 
                    text2: 'Hay campos vacíos.'
                }
            })
            setLoading(false);
        } 
        else if (!rutCorrect || !passCorrect || !repeatPassCorrect ) { 
            Toast.show({ 
                type: 'error',
                props: {
                    onPress: () => {}, 
                    text1: 'Error', 
                    text2: 'Revisa los campos erroneos.'
                }
            })
            setLoading(false);
        }
        else { 
            BackEndConnect("POST","regi1",formato(formData))
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
                } else { 
                    navigation.replace("emailverification",{
                        rut:formData.rut,
                        psw:formData.psw
                    });
                }
                setLoading(false);
            })
            .catch((ans)=> { 
                setLoading(false);
                console.log(ans);
            });
        }
    }
    const chkPass = (e,type) =>{ 
        if(formData.psw==e.nativeEvent.text){ 
            setFormData({ ...formData, [type]: e.nativeEvent.text });
            setRepeatPassCorrect(1);
        } 
        else { 
            setRepeatPassCorrect(0);
        }
    } 
    const onEnd = (e,type) => { 
        if(type == 'rut'){ 
            const rut = clean(e.nativeEvent.text);
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

        else { 
            if(e.nativeEvent.text.length==0) { 
                setPassCorrect(2);
            }
            else if(e.nativeEvent.text.length<6 || e.nativeEvent.text.length>15) { 
                setPassCorrect(0);
            }
            else { 
                setPassCorrect(1);
                setFormData({ ...formData, [type]: e.nativeEvent.text });
            }
        }
    }

    const format = (rut) => { 
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

    if(loading) {
        return <Loading text="Creando cuenta" />
    } 

    return (
        <ScrollView style={styles.formContainer}>
            <Text style={styles.textDescription}>{" "}Ingresa tu rut</Text>
            <View style={styles.searchSection}>
                <TextInput
                    placeholder="11.111.111-1"
                    placeholderTextColor="#AC9DC9"
                    style={styles.inputForm2}
                    onEndEditing={(e) => onEnd(e,"rut")}
                    maxLength={12}
                    onChangeText={(e) => format(e)}
                    returnKeyType="next"
                    onSubmitEditing={() => { ref_input2.current.focus()}}
                    blurOnSubmit={false}
                    value={changedRut}
                    secureTextEntry={Platform.OS === 'ios' ? false : true}
                    keyboardType={Platform.OS === 'ios' ? null : 'visible-password'}
                    autoCapitalize="none"
                />
            </View>
            { rutCorrect == 0 ?
            (<Text style={styles.textDescriptionError}>{" "}El rut ingresado es incorrecto.</Text>):
            rutCorrect == 3 ?
            (<Text style={styles.textDescriptionError}>{" "}Debes ingresar mínimo 7 dígitos.</Text>):
            (<></>)
            }
            <Text style={styles.textDescription}>{" "}Número telefónico</Text>
            <View style={styles.searchSection}>
            <TextInput
                placeholder="56911111111"
                placeholderTextColor="#AC9DC9"
                keyboardType="numeric"
                style={styles.inputForm2}
                onEndEditing={(e) => onEnd(e,"pho")}
                maxLength={12}
                returnKeyType="next"
                onSubmitEditing={() => { ref_input3.current.focus()}}
                blurOnSubmit={false}
                ref={ref_input2}
            />
            </View>
            {/*{ rutCorrect == 0 ?
            (<Text style={styles.textDescriptionError}>{" "}El rut ingresado es incorrecto.</Text>):
            rutCorrect == 3 ?
            (<Text style={styles.textDescriptionError}>{" "}Debes ingresar mínimo 7 dígitos.</Text>):
            (<></>)
            }*/}
            <Text style={styles.textDescription}>{" "}Contraseña</Text>
            <View style={styles.searchSection}>
            <TextInput
                placeholder="********"
                ref={ref_input3}
                placeholderTextColor="#AC9DC9"
                style={styles.inputForm}
                inputContainerStyle={{borderBottomWidth:0}}
                password={true}
                returnKeyType="next"
                onSubmitEditing={() => { ref_input4.current.focus()}}
                secureTextEntry={showPassword ? false : true}
                onEndEditing={(e) => onEnd(e, "psw")}
                blurOnSubmit={false}
                maxLength={15}
            />
            <Icon
                type="material-community"
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                iconStyle={styles.iconRight}
                onPress={() => setShowPassword(!showPassword)}
            />
            </View>
            { passCorrect == 0 ?
            (<Text style={styles.textDescriptionError}>{" "}Su contraseña debe ser mayor a 5 y menor a 16 caracteres.</Text>):
            (<></>)
            }
            <Text style={styles.textDescription}>{" "}Repetir Contraseña</Text>
            <View style={styles.searchSection}>
            <TextInput
                placeholder="********"
                placeholderTextColor="#AC9DC9"
                ref={ref_input4}
                style={styles.inputForm}
                inputContainerStyle={{borderBottomWidth:0}}
                password={true}
                secureTextEntry={showRepeatPassword ? false : true}
                onEndEditing={(e) => chkPass(e,"repeatPassword")}
                maxLength={32}
            />
            <Icon
                type="material-community"
                name={showRepeatPassword ? "eye-outline" : "eye-off-outline"}
                iconStyle={styles.iconRight}
                onPress={() => setShowRepeatPassword(!showRepeatPassword)}
            />
            </View>
            { repeatPassCorrect == 0 ?
            (<Text style={styles.textDescriptionError}>{" "}Las contraseñas no coinciden</Text>):
            (<></>)
            }
            { rutCorrect==1 && passCorrect==1 && repeatPassCorrect==1 ? (
                <Button
                title="Registrarse"
                containerStyle={styles.btnContainerRegister}
                buttonStyle={styles.btnRegister}
                onPress={onSubmit}
                disabled={loading}
                />
            ):(
                <Button
                title="Registrarse"
                containerStyle={styles.btnContainerRegister}
                buttonStyle={styles.btnRegister}
                onPress={onSubmit}
                disabled={true}
                />
            )
            }
        </ScrollView>
    )
}
export default RegisterForm;
const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    marginTop: 30,
  },
  inputForm: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    width: "100%",   
    backgroundColor: '#fff',
    borderRadius: 20,
    fontSize:16
  },
  inputForm2: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    marginRight:24,
    width: "100%",   
    backgroundColor: '#fff',
    borderRadius: 20,
    fontSize:16
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card:{
    backgroundColor: "#fff",
    marginTop: 10,
    marginLeft: 4,
    borderRadius: 20,
  },
  btnContainerRegister:{
    marginTop: 30,
    width: "100%",
    marginBottom: 30
  },
  btnRegister: {
    backgroundColor:"#6B35E2",
  },
  iconRight: {
    color:"#AC9DC9",
  },
  textDescription: {
    fontWeight:"bold",
    fontSize:15,
    marginTop:10,
    justifyContent:"flex-start",
    color:"#5300eb"
  },
  textDescription2:{
    fontWeight:"normal",
    fontSize:10,
    justifyContent:"flex-start",
  },
  textDescriptionError:{
    fontWeight:"normal",
    fontSize:15,
    justifyContent:"flex-start",
    color:"#ff0000"
  },
  divider:{
    backgroundColor: "#6B35E2",
    margin: 20,
  }
});