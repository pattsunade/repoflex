import React, { useState, useRef} from "react";
import { StyleSheet,View,Text,AppState } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { isEmpty } from "lodash";
import { useNavigation } from "@react-navigation/native";
import { validateEmail } from "../../utils/validations";
import Loading from "../Loading";
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackEndConnect from '../../utils/BackEndConnect';

export default function LoginForm(props)
{ const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(defaultFormValue());
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };
  const onSubmit = () =>
  { setLoading(true);
    formData.email = formData.email.replace(/\s/g,'').toLowerCase();
    if (isEmpty(formData.email) || isEmpty(formData.password)) 
    { Toast.show(
      { type: 'error',
        props: {onPress: () => {}, text1: 'Error', text2: "Verifica los campos ingresados."
        }
      });
      setLoading(false);
    }
    else if (!validateEmail(formData.email))
    { Toast.show(
      { type: 'error',
        props: {onPress: () => {}, text1: 'Error', text2: "El email ingresado no es correcto."
        }
      });
      setLoading(false);
    }
    else
    { 
      BackEndConnect("POST","auten",formato(formData)).then(async (response) => 
      { if (response.ans.stx === "wk")
          { Toast.show(
            { type: 'error',
              props: {onPress: () => {}, text1: 'Error', text2: response.ans.msg
              }
            });
          }
        else if (response.ans.stx === "uk")
        { navigation.navigate("emailverificationA",
          { correo:formData.email
          });
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
                {
                  name: 'homeregister',
                }
              ],
            });
          }
        }
      })
      .catch((response) => 
      { console.log(response);
      });
    }
  };
  return(
    <View style={styles.formContainer}>
      <Input
        placeholder="Correo electrónico"
        containerStyle={styles.inputForm}
        inputContainerStyle={{borderBottomWidth:0}}
        errorStyle={styles.errorStyle}
        onChange={(e) => onChange(e, "email")}
        rightIcon={
          <Icon
            type="material-community"
            name="at"
            iconStyle={styles.iconRight}
          />
        }
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.inputForm}
        inputContainerStyle={{borderBottomWidth:0}}
        errorStyle={styles.errorStyle}
        password={true}
        secureTextEntry={showPassword ? false : true}
        onChange={(e) => onChange(e, "password")}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      <RecoverPassword/>
      {!loading ? (<Button
        title="Iniciar sesión"
        containerStyle={styles.btnContainerLogin}
        buttonStyle={styles.btnLogin}
        onPress={onSubmit}
        />):(<Button
        title="Iniciar sesión"
        containerStyle={styles.btnContainerLogin}
        buttonStyle={styles.btnLogin2}
      />)
      }
      <CreateAccount/> 
      <Loading isVisible={loading} text="Iniciando sesión"/>
    </View>
  );
}
function defaultFormValue() {
  return {
    email: "",
    password: "", 
  };
}
function formato(objeto) {
  return{
    usr : objeto.email,
    psw : objeto.password
  };
}
function CreateAccount(){
  const navigation = useNavigation();
  return(
    <Text style={styles.textRegister}>
      ¿Aún no tienes una cuenta?{" "}
      <Text
        style={styles.btnRegister}
        onPress={() => navigation.navigate("register")}
      >
        Regístrate
      </Text>
    </Text>
  )
}
function RecoverPassword(){
  const navigation = useNavigation();
  return(
      <Text style={styles.textRegister}>
          ¿Olvidaste tu contraseña?{" "}
          <Text 
              style={styles.btnRegister}
              onPress={() => navigation.navigate("recoverpassword")}
          >
              Recupérala
          </Text>
      </Text>
  );
}
function EmailVerification(){
  const navigation = useNavigation();
  return(
    <Text style={styles.textRegister}>
      Verifica tu correo{" "}
      <Text 
        style={styles.btnRegister}
        onPress={() => navigation.navigate("emailverification")}
      >
        Aquí.
      </Text>
    </Text>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 70,
  },
  inputForm: {
    width: "100%",
    marginTop: 30,
    backgroundColor: '#fff',
    borderRadius: 50,
  },
  btnContainerLogin: {
    marginTop: 20,
    width: "95%",
  },
  btnLogin: {
    backgroundColor: "#6B35E2",
    borderRadius: 50,
  },
  btnLogin2: {
    backgroundColor: "#cccccc",
    borderRadius: 50,
  },
  errorStyle:{
    marginBottom:0,
    marginTop:0,
    height: 0,
  },
  iconRight: {
    color: "#c1c1c1",
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
});