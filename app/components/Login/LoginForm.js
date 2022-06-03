import React, { useState, useRef} from "react";
import { StyleSheet,View,Text,AppState,TextInput } from "react-native";
import { Icon, Button } from "react-native-elements";
import { isEmpty } from "lodash";
import { useNavigation } from "@react-navigation/native";
import { validateEmail } from "../../utils/validations";
import Loading from "../Loading";
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackEndConnect from '../../utils/BackEndConnect';
import { clean } from "../../utils/rut";

function CreateAccount(){

	const navigation = useNavigation();
	return(
		<Text style={styles.textRegister}>
			¿Aún no tienes una cuenta?{" "}
			<Text style={styles.btnRegister} onPress={() => navigation.navigate("register")}>
				Regístrate
			</Text>
		</Text>
	)
}

function RecoverPassword() { 
    const navigation = useNavigation();
    return(
		<Text style={styles.textRegister}>
			¿Olvidaste tu contraseña?{" "}
		<Text style={styles.btnRegister} onPress={() => navigation.navigate("recoverpassword")}
		>
			Recupérala
		</Text>
		</Text>
	);
}

const formatoObjeto = (objeto) => {
    return{
		usr : objeto.rut,
		psw : objeto.psw,
		vers: 13,
		orig : 'app'
    }
}

export default function LoginForm() { 
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		rut:"",
		psw:""
	});
	const [loading, setLoading] = useState(false);
	const [rutCorrect, setRutCorrect] = useState(2);
	const [changedRut, setChangedRut] = useState("");
	const [passCorrect, setPassCorrect] = useState(2);
	const ref_input2 = useRef();
	const navigation = useNavigation();
	const onSubmit = () => { 
		setLoading(true);
		if (isEmpty(formData.rut) || isEmpty(formData.psw) || !rutCorrect || !passCorrect)
		{ Toast.show(
		{ type: 'error',
			props: {onPress: () => {}, text1: 'Error', text2: "Verifica los campos ingresados."
			}
		});
		setLoading(false);
		}
		else
		{ BackEndConnect("POST","auten",formatoObjeto(formData)).then(async (response) => 
		{ if (response.ans.stx === "nk")
			{ Toast.show(
			{ type: 'error',
				props: {onPress: () => {}, text1: 'Error', text2: 'Porfavor intenta más tarde'
				}
			});
			setLoading(false);
			}
			else if (response.ans.stx === "wk")
			{ Toast.show(
			{ type: 'error',
				props: {onPress: () => {}, text1: 'Error', text2: response.ans.msg
				}
			});
			setLoading(false);
			}
			else if (response.ans.stx === "uk")
			{ navigation.navigate("emailverification",
			{ rut:formData.rut,
				psw:formData.psw
			});
			setLoading(false);
			}
			else if(response.ans.stx === "rk")
			{ navigation.reset({ 
			index: 0,
				routes: 
				[ { name: 'rejected'
				}
				],
			});
			setLoading(false);
			}
			else if(response.ans.stx === "vk")
			{ navigation.reset({ 
			index: 0,
				routes: 
				[ { name: 'outdated'
				}
				],
			});
			setLoading(false);
			}
			else
			{ let matrix = (response.hdr.mtx.match(/1/g) || []).length;
			let stp = response.ans.stp;
			if (matrix>=parseInt(stp))
			{ AsyncStorage.setItem('@usr',formData.rut)
				navigation.reset(
				{ index: 0,
				routes: 
				[ { name: 'home'
					}
				],
				});
			}
			else
			{ navigation.reset(
				{ index: 0,
				routes: [
					{ name: 'homeregister',
					params: { mtx:matrix,stp:stp }
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
			props: {onPress: () => {}, text1: 'Error', text2: "Error de comunicación, intenta más tarde"
			}
			});
			console.log(response);
		});
		}
		};

  	const formatInputText = (textRut) => { 
	  	if (textRut.length>0) { 
			textRut = clean(textRut);
			let result = textRut.slice(-4, -1) + '-' + textRut.substr(textRut.length - 1);
			for (let i = 4; i < textRut.length; i += 3) {
				result = textRut.slice(-3 - i, -i) + '.' + result
			}
			setChangedRut(result);
		}
		else { 
			setChangedRut("");
		}
	}

  	const handleOnEnd = (e,type) => { 
		if(type == 'rut'){ 
			const rut = clean(e.nativeEvent.text);
			const rutLen = rut.length;
			if(rutLen==0) { 
				setRutCorrect(2);
			}
			else if(rutLen<7){ 
				setRutCorrect(3);
			}
			else { 
				let sum = 0;
				let mult = 2;
				for(let i=rutLen-2;i>=0;i--){ 
					if (mult > 7){
					mult = 2;
				}
				sum += parseInt(rut[i]*mult);
				mult++;
				}
				let res = 11-sum%11;
				if (res == 11) { 
					res = 0;
				}
				if (rut[rutLen-1] == "k"){ 
					if (res!=10){ 
						setRutCorrect(0);
					}
					else { 
						setRutCorrect(1);
						setFormData({ ...formData, [type]: rut });
					}
				}
				else if (res != parseInt(rut[rutLen-1])){ 
					setRutCorrect(0);
				}
				else { 
					setRutCorrect(1);
					setFormData({ ...formData, [type]: rut });
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




	return(
		<>
		{ loading ? (<Loading text="Iniciando sesión"/>)
		:(<View style={styles.formContainer}>
			<View style={styles.searchSection}>
				<TextInput
				placeholder="Ingrese su rut"
				placeholderTextColor="#AC9DC9"
				style={styles.inputForm2}
				onEndEditing={(e) => handleOnEnd(e,"rut")}
				maxLength={12}
				onChangeText={(e) => formatInputText(e)}
				returnKeyType="next"
				onSubmitEditing={() => { ref_input2.current.focus()}}
				blurOnSubmit={false}
				value={changedRut}
				secureTextEntry={Platform.OS === 'ios' ? false : true}
				keyboardType={Platform.OS === 'ios' ? null : 'visible-password'}
				autoCapitalize="none"
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
			<View style={styles.searchSection}>
				<TextInput
				placeholder="Contraseña"
				placeholderTextColor="#AC9DC9"
				style={styles.inputForm}
				ref={ref_input2}
				inputContainerStyle={{borderBottomWidth:0}}
				password={true}
				secureTextEntry={showPassword ? false : true}
				onEndEditing={(e) => handleOnEnd(e, "psw")}
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
				(<Text style={styles.textDescriptionError}>{" "}Su contraseña debe ser mayor a 5 y menor a 16 caracteres.</Text>):
				(<></>)
				}
			</View>
			<RecoverPassword/>
			{ rutCorrect==1 && passCorrect==1 ? (
				<Button
					title="Iniciar sesión"
					containerStyle={styles.btnContainerLogin}
					buttonStyle={styles.btnLogin}
					onPress={onSubmit}
					disabled={loading}
				/>
				):(
				<Button
					title="Iniciar sesión"
					containerStyle={styles.btnContainerLogin}
					buttonStyle={styles.btnLogin}
					onPress={onSubmit}
					disabled={true}
				/>
				)
			}
			<CreateAccount/> 
			</View>)
		}
		</>
	);
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20
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
    paddingLeft: 10,
    width: "100%",   
    backgroundColor: '#fff',
    borderRadius: 20,
    fontSize:18
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