import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { size, isEmpty } from "lodash";
import { useNavigation } from "@react-navigation/native";
import Loading from "../Loading";
import Toast from 'react-native-toast-message';
import BackEndConnect from 'api/backendHandler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {validateEmail} from "utils/validations";
import { clean } from "utils/rut";

export default function EmailVerificationForm(props) {
  const { rut, psw } = props;
  const [loading, setLoading] = useState(false);
  const [mailCorrect, setMailCorrect] = useState(3);
  const [mvcCorrect, setMvcCorrect] = useState(2);
  const [loadingText, setLoadingText] = useState("");
  const [code, setCode] = useState("");
  const [sndvcFormData, setSndvcFormData] = useState(sndvcDefaultFormValue());
  const [vermaFormData, setVermaFormData] = useState(vermaDefaultFormValue());
  const navigation = useNavigation();

  function sndvcDefaultFormValue()
  { return {
      usr: clean(rut).toUpperCase(),
      psw: psw,
      mail: ""
    };
  }

  function vermaDefaultFormValue()
  { return {
      usr: clean(rut).toUpperCase(),
      mvc: 0, 
    };
  }

  function vermaFormat(objeto) {
    return{
      usr: clean(rut).toUpperCase(),
      mvc : parseInt(objeto.mvc),
    };
  }

  function sndvcFormat(objeto) {
    return{
      usr: clean(rut).toUpperCase(),
      psw: psw,
      mail: objeto.mail
    };
  }

  // function autenFormat() {
  //   return{
  //     usr : rut,
  //     psw : psw
  //   }
  // }

  function onEnd(e,type)
  { if(type=='mail')
    { mail = e.nativeEvent.text.replace(/\s/g,'').toLowerCase()
      if(mail.length==0)
      { setMailCorrect(3); 
      }
      else if(!validateEmail(mail))
      { setMailCorrect(0);
      }
      else if(mail.length>32)
      { setMailCorrect(2);
      }
      else
      { setMailCorrect(1);
        setVermaFormData({ ...vermaFormData, [type]: mail });
        setSndvcFormData({ ...sndvcFormData, [type]: mail });
      }
    }
    else
    { if(e.nativeEvent.text.length==0)
      { setMvcCorrect(2); 
      }
      else if(e.nativeEvent.text.length>32)
      { setMvcCorrect(0);
      }
      else
      { setMvcCorrect(1);
        setVermaFormData({ ...vermaFormData, [type]: e.nativeEvent.text });
      }
    }
  }

  function sndvc() {
    setLoadingText("Enviando código...");
    setLoading(true);
    BackEndConnect("POST","sndvc",sndvcFormat(sndvcFormData))
    .then((ans) => {
      if(ans.ans.stx=="ok")
      { Toast.show(
        { type: 'success',
          props: {onPress: () => {}, text1: 'Éxito', text2: ans.ans.msg
          }
        })
        setLoading(false);
      }
      else
      { Toast.show(
        { type: 'error',
          props: {onPress: () => {}, text1: 'Error', text2: ans.ans.msg
          }
        })
        setLoading(false);
      }
    });
  }

  function submit()
  { setLoadingText("Verificando código...");
    setLoading(true);
    BackEndConnect("POST","verma",vermaFormat(vermaFormData)).then((response) => 
    { if (response.ans.stx == "wc")
      { Toast.show(
        { type: 'error',
          props: {onPress: () => {}, text1: 'Error', text2: response.ans.msg
          }
        });
        setLoading(false);
      }
      else if (response.ans.stx == "nk")
      { Toast.show(
        { type: 'error',
          props: {onPress: () => {}, text1: 'Error', text2: 'Error de comunicación.'}
        });
      }
      else
      { setLoadingText("Iniciando sesión");
        AsyncStorage.setItem('@usr',rut);
        navigation.reset(
        { index: 0,
          routes: [
            { name: 'homeregister',
            }
          ],
        });
        setLoading(false);
      }
    })
    .catch((response) =>
    { console.log(response);
      Toast.show(
      { type: 'error',
        props: {onPress: () => {}, text1: 'Error', text2: 'Error de conexión, por favor intenta más tarde'
          }
        });
      setLoading(false);
    });
  }

  return(
    <View style={styles.formContainer}>
      <Text style={styles.textDescription}> Correo:</Text>
      <View style={styles.mailSection}>
        <TextInput
          placeholder="Ingresar correo"
          placeholderTextColor="#AC9DC9"
          style={styles.inputForm}
          inputContainerStyle={{borderBottomWidth:0}}
          onEndEditing={(e) => onEnd(e, "mail")}
          maxLength={32}
        />
        { mailCorrect==1 ? (
          <Button
            title="Enviar"
            containerStyle={styles.sndBtnContainer}
            buttonStyle={styles.sndBtn}
            onPress={sndvc}
            disabled={loading}
          />
        ):(
          <Button
            title="Enviar"
            containerStyle={styles.sndBtnContainer}
            buttonStyle={styles.sndBtn}
            onPress={sndvc}
            disabled={true}
          />
        )
      }
      </View>
      { mailCorrect == 2 ?
        (<Text style={styles.textDescriptionError}>{" "}El correo debe ser menor a 30 caracteres.</Text>):
        mailCorrect == 0 ?
        (<Text style={styles.textDescriptionError}>{" "}El correo no tiene el formato correcto.</Text>):
        (<></>)
      }
      <Text style={styles.textDescription}> Código de verificación:</Text>
      <View style={styles.codeSection}>
        <TextInput
          placeholder="Ingresar código"
          placeholderTextColor="#AC9DC9"
          style={styles.inputForm2}
          inputContainerStyle={{borderBottomWidth:0}}
          onEndEditing={(e) => onEnd(e, "mvc")}
          keyboardType="numeric"
          maxLength={32}
        />
      </View>
      { mvcCorrect == 0 ?
        (<Text style={styles.textDescriptionError}>{" "}El código debe ser menor a 32 caracteres.</Text>):
        (<></>)
      }
      { mailCorrect==1 && mvcCorrect==1 ? (
          <Button
            title="Confirmar"
            containerStyle={styles.btnContainerSend}
            buttonStyle={styles.sndBtn}
            onPress={submit}
            disabled={loading}
          />
        ):(
          <Button
            title="Confirmar"
            containerStyle={styles.btnContainerSend}
            buttonStyle={styles.sndBtn}
            onPress={submit}
            disabled={true}
          />
        )
      }
      { loading && (<Loading text={loadingText}/>)
      }
    </View>
  )
}
const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    marginTop: 10,
    justifyContent:"center"
  },
  inputForm: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    width:"100%",   
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
    marginRight:112,
    width:"100%",   
    backgroundColor: '#fff',
    borderRadius: 20,
    fontSize:16
  },
  texttitle: {
    marginHorizontal:20,
    fontWeight: "bold",
    fontSize: 20,
    textAlign:"justify"
  },
  btnContainerSend: {
    marginTop: 20,
    width: "100%",
  },
  sndBtnContainer: {
    width: "25%",
    marginLeft:5
  },
  sndBtn: {
    backgroundColor: "#6B35E2",
    borderRadius: 50,
  },
  iconRight: {
    color:"#AC9DC9",
    marginLeft:25
  },
  textRegister:{
    marginTop:15,
    marginLeft:10,
    marginRight:10,
    marginBottom:40
  },
  mailSection: {
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginTop:10
  },
  codeSection: {
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginTop:10,
    marginRight:40
  },
  textDescription: {
    fontWeight:"bold",
    fontSize:15,
    marginTop:10,
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