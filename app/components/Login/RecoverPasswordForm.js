import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { isEmpty } from "lodash";
import { useNavigation } from "@react-navigation/native";
import * as firebase from "firebase";
import { validateEmail } from "../../utils/validations";
import Loading from "../Loading";
import Toast from 'react-native-toast-message';
import BackEndConnect from "../../utils/BackEndConnect";

export default function RecoverPasswordForm () {
  const [loading, setLoading] = useState(false);
  const [usrCorrect, setUsrCorrect] = useState(3);
  const [formData, setFormData] = useState(defaultFormValue());
  const navigation = useNavigation();
  function onEnd(e,type)
  { if(!validateEmail(e.nativeEvent.text.replace(/\s/g,'').toLowerCase()))
    { console.log("entre");
      setUsrCorrect(2);
    }
    else if(e.nativeEvent.text.length==0)
    { setUsrCorrect(3);
    }
    else if(e.nativeEvent.text.length<=32)
    { setUsrCorrect(1);
    }
    else
    { setUsrCorrect(0);
    }
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  }
  function defaultFormValue() {
    return {
      usr: ""
    };
  }
  function formato(objeto) {
  return{
    usr : objeto.usr,
    };
  }
  const onSubmit = () => 
  { setLoading(true);
    formData.usr = formData.usr.replace(/\s/g,'').toLowerCase();
    if (isEmpty(formData.usr))
    { Toast.show(
      { type: 'error',
        props: {onPress: () => {}, text1: 'Error', text2: 'Debes ingresar un correo.'
        }
      })
      setLoading(false);
    }
    else if (!usrCorrect || usrCorrect == 2)
    { Toast.show(
      { type: 'error',
        props: {onPress: () => {}, text1: 'Error', text2: 'Revisa los campos erroneos.'
        }
      })
      setLoading(false);
    }
    else
    { BackEndConnect("POST","sndma",formato(formData)
      ).then((ans) =>
        { if (ans.ans.stx != "ok")
          { Toast.show(
            { type: 'error',
              props: {onPress: () => {}, text1: 'Error', text2: ans.ans.msg
              }
            });
            setLoading(false);
          }
          else
          { navigation.navigate("newPassword",{
              correo:formData.usr
            });
            setLoading(false);
          }
        }
      ).catch((ans)=>
        { console.log(ans);
          setLoading(false);
        }
      );
    }
  };
  return (
    <View style={styles.formContainer}>
      <View style={styles.searchSection}>
        <TextInput
          placeholder="correo@dominio.com"
          placeholderTextColor="#AC9DC9"
          style={styles.inputForm}
          inputContainerStyle={{borderBottomWidth:0}}
          errorStyle={styles.errorStyle}
          onEndEditing={(e) => onEnd(e, "usr")}
          maxLength={32}
        />
        <Icon
          type="material-community"
          name="at"
          iconStyle={styles.iconRight}
        />   
      </View>
      { usrCorrect == 0 ?
        (<Text style={styles.textDescriptionError}>{" "}El correo debe ser menor a 30 caracteres.</Text>):
        usrCorrect == 2 ?
        (<Text style={styles.textDescriptionError}>{" "}El correo no tiene el formato correcto.</Text>):
        (<></>)
      }
      <Button
        title="Recuperar contraseña"
        containerStyle={styles.btnContainerLogin}
        buttonStyle={styles.btnLogin}
        onPress={onSubmit}
      />
    <Loading isVisible={loading} text="Cargando"/>
    </View>
    /*<View style={styles.formContainer}>
      <Button
        title="Recuperar contraseña"
        containerStyle={styles.btnContainerLogin}
        buttonStyle={styles.btnLogin}
      />
      
  </View>*/
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