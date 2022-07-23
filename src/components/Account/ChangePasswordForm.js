import React, { useState,useRef } from "react";
import { StyleSheet, View, Text, TextInput, ScrollView } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { isEmpty } from "lodash";
import { useNavigation } from "@react-navigation/native";
import * as firebase from "firebase";
import { validateEmail } from "utils/validations";
import Loading from "../Loading";
import Toast from 'react-native-toast-message';
import BackEndConnect from 'api/backendHandler';
import { clean } from "utils/rut";

export default function NewPasswordForm (props) {
  const {usr} = props;
  const [loading, setLoading] = useState(false);
  const [passCorrect, setPassCorrect] = useState(2);
  const [oldPassCorrect, setOldPassCorrect] = useState(2);
  const [repeatPassCorrect, setRepeatPassCorrect] = useState(2);
  const [showPassword, setShowPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [formData, setFormData] = useState(defaultFormValue());
  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const navigation = useNavigation();

  function onEnd(e,type)
  { let status = 2;
    if(e.nativeEvent.text.length==0)
      status = 2
    else if(e.nativeEvent.text.length<6 || e.nativeEvent.text.length>15)
      status = 0;
    else
      status = 1
    if(type == 'pso')
      setOldPassCorrect(status);
    else
      setPassCorrect(status);
    setFormData({ ...formData, [type]: e.nativeEvent.text });
    console.log(oldPassCorrect);
  }

  function defaultFormValue()
  { return {
      pso: "",
      psn: ""
    };
  }

  function formato(objeto)
  { return {
      usr: clean(usr).toUpperCase(),
      pso: objeto.pso,
      psn: objeto.psn
    };
  }

  function chkPass (e,type)
  { if(formData.psn==e.nativeEvent.text)
    { setFormData({ ...formData, [type]: e.nativeEvent.text });
      setRepeatPassCorrect(1);
    }
    else
      setRepeatPassCorrect(0);
  }

  const onSubmit = () => 
  { setLoading(true);
    // if (isEmpty(formData.psw) || isEmpty(formData.repeatPassword) || formData.vcd == 0 )
    // { Toast.show(
    //   { type: 'error',
    //     props: {onPress: () => {}, text1: 'Error', text2: 'Hay campos vacíos.'
    //     }
    //   })
    //   setLoading(false);
    // }
    // else if (!repeatPassCorrect || passCorrect == 1)
    // { Toast.show(
    //   { type: 'error',
    //     props: {onPress: () => {}, text1: 'Error', text2: 'Revisa los campos erroneos.'
    //     }
    //   })
    //   setLoading(false);
    // }
    // else
    // { 
    BackEndConnect("POST","chgpw",formato(formData))
      .then((ans) =>
        { if (ans.ans.stx != "ok")
          { Toast.show(
            { type: 'error',
              props: {onPress: () => {}, text1: 'Error', text2: ans.ans.msg
              }
            });
            setLoading(false);
          }
          else
          { Toast.show(
            { type: 'success',
              props: {onPress: () => {}, text1: 'Éxito', text2: ans.ans.msg
              }
            });
            navigation.reset(
            { index: 0,
              routes: [
                {
                  name: 'login',
                }
              ],
            });
            setLoading(false);
          }
        }
      ).catch((ans)=>
        { console.log(ans);
          setLoading(false);
        }
      );
    // }
  };

  return (
    <>
      { loading ? (<Loading isVisible={loading} text="Cargando..."/>):
        ( <ScrollView style={styles.formContainer}>
            <Text style={styles.textDescription}> Contraseña actual:</Text>
            <View style={styles.searchSection}>
              <TextInput
                placeholder="********"
                placeholderTextColor="#AC9DC9"
                style={styles.inputForm}
                inputContainerStyle={{borderBottomWidth:0}}
                errorStyle={styles.errorStyle}
                password={true}
                secureTextEntry={showOldPassword ? false : true}
                onEndEditing={(e) => onEnd(e, "pso")}
                returnKeyType="next"
                onSubmitEditing={() => { ref_input2.current.focus()}}
                blurOnSubmit={false}
                maxLength={15}
              />
              <Icon
                type="material-community"
                name={showOldPassword ? "eye-outline" : "eye-off-outline"}
                iconStyle={styles.iconRight}
                onPress={() => setShowOldPassword(!showOldPassword)}
              />
            </View>
            { oldPassCorrect == 0 ?
            (<Text style={styles.textDescriptionError}>{" "}Su actual contraseña debe ser mayor a 5 y menor a 16 caracteres.</Text>):
            (<></>)
            }
            <Text style={styles.textDescription}>{" "}Nueva contraseña</Text>
            <View style={styles.searchSection}>
              <TextInput
                placeholder="********"
                placeholderTextColor="#AC9DC9"
                style={styles.inputForm}
                inputContainerStyle={{borderBottomWidth:0}}
                errorStyle={styles.errorStyle}
                password={true}
                returnKeyType="next"
                onSubmitEditing={() => { ref_input3.current.focus()}}
                blurOnSubmit={false}
                secureTextEntry={showPassword ? false : true}
                onEndEditing={(e) => onEnd(e, "psn")}
                maxLength={15}
                ref={ref_input2}
              />
              <Icon
                type="material-community"
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                iconStyle={styles.iconRight}
                onPress={() => setShowPassword(!showPassword)}
              />
            </View>
            { passCorrect == 0 ?
              (<Text style={styles.textDescriptionError}>{" "}Su nueva contraseña debe ser mayor a 5 y menor a 16 caracteres.</Text>):
              (<></>)
            }
            <Text style={styles.textDescription}>{" "}Repetir Contraseña</Text>
            <View style={styles.searchSection}>
              <TextInput
                placeholder="********"
                placeholderTextColor="#AC9DC9"
                style={styles.inputForm}
                ref={ref_input3}
                inputContainerStyle={{borderBottomWidth:0}}
                errorStyle={styles.errorStyle}
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
            <Button
              title="Modificar contraseña"
              containerStyle={styles.btnContainerLogin}
              buttonStyle={styles.btnLogin}
              onPress={onSubmit}
              disabled={repeatPassCorrect != 1 && oldPassCorrect != 1 ? (true):(false)}
            />
          </ScrollView>
        )
      }
    </>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
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
    paddingLeft: 0,
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
  btnRegister:{
    color:"#6B35E2",
    fontWeight:"bold"
  },
  textDescription: {
    fontWeight:"bold",
    fontSize:15,
    marginTop:5,
    justifyContent:"flex-start",
    color:"#5300eb"
  },
  textDescriptionError:{
    fontWeight:"normal",
    fontSize:15,
    justifyContent:"flex-start",
    color:"#ff0000"
  }
});