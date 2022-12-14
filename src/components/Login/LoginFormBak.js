import React, { useState, useRef} from "react";
import { StyleSheet,View,Text,AppState,TextInput } from "react-native";
import { Icon, Button } from "react-native-elements";
import { isEmpty } from "lodash";
import { useNavigation } from "@react-navigation/native";
import { validateEmail } from "utils/validations";
import Loading from "../Loading";
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackEndConnect from 'api/backendHandler';;

export default function LoginForm()
{ const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(defaultFormValue());
  const [loading, setLoading] = useState(false);
  const [rutCorrect, setRutCorrect] = useState(2);
  const [changedRut, setChangedRut] = useState("");
  const [passCorrect, setPassCorrect] = useState(2);
  const navigation = useNavigation();

  function onSubmit()
  { setLoading(true);
    if (isEmpty(formData.rut) || isEmpty(formData.psw)) 
    { Toast.show(
      { type: 'error',
        props: {onPress: () => {}, text1: 'Error', text2: "Verifica los campos ingresados."
        }
      });
      setLoading(false);
    }
    else
    { BackEndConnect("POST","auten",formato(formData)).then(async (response) => 
      { if (response.ans.stx === "wk")
          { Toast.show(
            { type: 'error',
              props: {onPress: () => {}, text1: 'Error', text2: response.ans.msg
              }
            });
            setLoading(false);
          }
        else if (response.ans.stx === "uk")
        { navigation.navigate("emailverificationA",
          { rut:formData.rut,
            psw:formData.psw
          });
          setLoading(false);
        }
        else
        { let matrix = response.hdr.mtx;
          let stp = response.ans.stp;
          if ((matrix.match(/1/g) || []).length>=parseInt(stp)) 
          { navigation.reset(
            { index: 0,
              routes: [
                {
                  name: 'home',
                }
              ],
            });
          }
          else 
          { navigation.reset(
            { index: 0,
              routes: [
                { name: 'homeregister',
                }
              ],
            });
          }
          setLoading(false);
        }
      })
      .catch((response) => 
      { setLoading(false);
        Toast.show(
          { type: 'error',
            props: {onPress: () => {}, text1: 'Error', text2: "Error de comunicaci??n, intenta m??s tarde"
            }
          });
        console.log(response);
      });
    }
  };

  function format(rut)
  { if (rut.length>0)
    { rut = clean(rut);
      var result = rut.slice(-4, -1) + '-' + rut.substr(rut.length - 1);
      for (var i = 4; i < rut.length; i += 3) {
        result = rut.slice(-3 - i, -i) + '.' + result
      }
      setChangedRut(result);
    }
    else
    { setChangedRut("");
    }
  }

  function clean(rut)
  { return typeof rut === 'string'
      ? rut.replace(/^0+|[^0-9kK]+/g, '').toUpperCase()
      : ''
  }

  function CreateAccount(){
  const navigation = useNavigation();
  return(
    <Text style={styles.textRegister}>
      ??A??n no tienes una cuenta?{" "}
      <Text
        style={styles.btnRegister}
        onPress={() => navigation.navigate("register")}
      >
        Reg??strate
      </Text>
    </Text>
    )
  }

  function RecoverPassword()
  { const navigation = useNavigation();
    return(
      <Text style={styles.textRegister}>
        ??Olvidaste tu contrase??a?{" "}
        <Text 
          style={styles.btnRegister}
          onPress={() => navigation.navigate("recoverpassword")}
        >
          Recup??rala
        </Text>
      </Text>
    );
  }

  function onEnd(e,type)
  { if(type == 'rut')
    { const rut = clean(e.nativeEvent.text);
      const rutLen = rut.length;
      if(rutLen==0)
      { setRutCorrect(2);
      }
      else if(rutLen<7)
      { setRutCorrect(3)
      }
      else
      { var sum = 0;
        var mult = 2;
        for(let i=rutLen-2;i>=0;i--)
        { if (mult > 7){
            mult = 2;
          }
          sum += parseInt(rut[i]*mult);
          mult++;
        }
        var res = 11-sum%11;
        if (res == 11)
        { res = 0;
        }
        if (rut[rutLen-1] == "k")
        { if (res!=10)
          { setRutCorrect(0);
          }
          else
          { setRutCorrect(1);
            setFormData({ ...formData, [type]: rut });
          }
        }
        else if (res != parseInt(rut[rutLen-1]))
        { setRutCorrect(0);
        }
        else
        { setRutCorrect(1);
          setFormData({ ...formData, [type]: rut });
        }
      }
    }
    else
    { if(e.nativeEvent.text.length==0)
      { setPassCorrect(2);
      }
      else if(e.nativeEvent.text.length<6 || e.nativeEvent.text.length>15)
      { setPassCorrect(0);
      }
      else
      { setPassCorrect(1);
        setFormData({ ...formData, [type]: e.nativeEvent.text });
      }
    }
    console.log(passCorrect);
  }

  function defaultFormValue() {
    return {
      rut:"",
      psw:""
    }
  }

  function formato(objeto) {
    return{
      usr : objeto.rut,
      psw : objeto.psw
    }
  }

  return(
    <View style={styles.formContainer}>
      <View style={styles.searchSection}>
        <TextInput
          placeholder="Ingrese su rut"
          placeholderTextColor="#AC9DC9"
          style={styles.inputForm}
          onEndEditing={(e) => onEnd(e,"rut")}
          maxLength={12}
          onChangeText={(e) => format(e)}
          value={changedRut}
        />
        <Icon
          name="fingerprint"
          iconStyle={styles.iconRight}
        />
      </View>
      <View style={styles.viewError}>
        { rutCorrect == 0 ?
          (<Text style={styles.textDescriptionError}>{" "}El rut ingresado es incorrecto.</Text>):
          rutCorrect == 3 ?
          (<Text style={styles.textDescriptionError}>{" "}Debes ingresar m??nimo 7 d??gitos.</Text>):
          (<></>)
        }
      </View>
      <View style={styles.searchSection}>
        <TextInput
          placeholder="Contrase??a"
          placeholderTextColor="#AC9DC9"
          style={styles.inputForm}
          inputContainerStyle={{borderBottomWidth:0}}
          password={true}
          secureTextEntry={showPassword ? false : true}
          onEndEditing={(e) => onEnd(e, "psw")}
          maxLength={15}
        />
        <Icon
          type="material-community"
          name={showPassword ? "eye-outline" : "eye-off-outline"}
          iconStyle={styles.iconRight}
          onPress={() => setShowPassword(!showPassword)}
        />
      </View>
      <View style={styles.viewError}>
        { passCorrect == 0 ?
          (<Text style={styles.textDescriptionError}>{" "}Su contrase??a debe ser mayor a 5 y menor a 16 caracteres.</Text>):
          (<></>)
        }
      </View>
      <RecoverPassword/>
      { rutCorrect==1 && passCorrect==1 ? (
          <Button
            title="Iniciar sesi??n"
            containerStyle={styles.btnContainerLogin}
            buttonStyle={styles.btnLogin}
            onPress={onSubmit}
            disabled={loading}
          />
        ):(
          <Button
            title="Iniciar sesi??n"
            containerStyle={styles.btnContainerLogin}
            buttonStyle={styles.btnLogin}
            onPress={onSubmit}
            disabled={true}
          />
        )
      }
      <CreateAccount/> 
      <Loading isVisible={loading} text="Iniciando sesi??n"/>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:30,
  },
  iconRight: {
    color:"#AC9DC9",
  },
  btnContainerLogin: {
    marginTop: 20,
    width: "95%",
  },
  btnLogin: {
    backgroundColor: "#6B35E2",
    borderRadius: 50,
  },
  inputForm: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    width: "100%",   
    backgroundColor: '#fff',
    borderRadius: 20,
    fontSize:18
  },
  textRegister:{
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
  },
  btnRegister:{
    color: "#6B35E2",
    fontWeight: "bold",
  },
  viewError:{
    flexDirection:"row",
    marginBottom:-10,
    borderRadius:1,
    alignSelf:"flex-start"
  },
  textDescriptionError:{
    fontWeight:"normal",
    fontSize:16,
    justifyContent:"flex-start",
    color:"#ff0000"
  }
});