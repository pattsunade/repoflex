import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import auten from 'api/transacciones/auten';
import PasswordFormInput from 'components/General/Inputs/PasswordFormInput';
import TextFormInput from 'components/General/Inputs/TextFormInput';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import { Button } from 'react-native-elements';
import { rutRegexDots, validarRut, formatRut } from 'utils/rut';
import GoToCreateAccount from './GoToCreateAccount';
import GoToRecoverPassword from './GoToRecoverPassword';

function Form() {
    // states variables
    const [formData, setFormData] = React.useState({ user:"", password:"" }); // form data
    const [submiting, setIsSubmiting] = React.useState(false); // show spinner if is submiting
    const [isUserValid, setIsUserValid] = React.useState(true);
    const navigation = useNavigation();
    const isPasswordValid = React.useMemo(() => {  // derived state from password
        if (formData.password.length >= 6 && formData.password.length <= 16) {
            return true
        }
        else {
            return false
        }
    },[formData.password])
    const refInputPassword = React.useRef(); // reference to next input

    // functions
    const focusOnPassword = () => refInputPassword.current.focus() // focus password input
    const onChangeUser = React.useCallback((value) => {
        const isValueValid = rutRegexDots.test(value);
        if(isValueValid) {
            setFormData(form => ({
                ...form,
                user: value
            }))
        }
    },[])
    const onEndUser = (value) => {
        if(validarRut(value) === false && formData.user !== '') {
            setIsUserValid(false);
        }
        else {
            setFormData(form => ({
                ...form,
                user: formatRut(value).toUpperCase()
            }))
            setIsUserValid(true);
        }
    }
    const onChangePassword = React.useCallback((value) => {
        setFormData(form => ({
            ...form,
            password: value
        }))
    },[]);
    const submitForm = async() => {
        setIsSubmiting(true)
        await auten({ user: formData.user, password: formData.password })
            .then(response => {
                console.log(response);
                if(response.ans.stx === 'ok') {
                    const matrixLength = (response.hdr.mtx.match(/1/g) || []).length;
                    const stp = response.ans.stp;
                    if (matrixLength>=parseInt(stp)) {
                        AsyncStorage.setItem('@usr',formData.user);
                        navigation.reset({ 
							index: 0,
							routes: [{ 
								name: 'home'
							}],
						});
                    }
                }
                else if (response.ans.stx === "nk") {
                    Toast.show({ 
						type: 'error',
						props: {
							onPress: () => {}, 
							text1: 'Error', 
							text2: 'Porfavor intenta más tarde'
						}
					});
                }
                else if (response.ans.stx === "wk") { 

					Toast.show({ 
						type: 'error',
						props: {
							onPress: () => {}, 
							text1: 'Error', 
							text2: response.ans.msg
						}
					});
				}
				else if (response.ans.stx === "uk") { 
					navigation.navigate("emailverification", { 
						rut:formData.user,
						psw:formData.password
					});
				}
				else if(response.ans.stx === "rk") { 
					navigation.reset({
						index: 0,
						routes: [{ 
							name: 'rejected'
						}],
					});
					
				}
				else if(response.ans.stx === "vk") { 
					navigation.reset({ 
						index: 0,
						routes: [{ 
							name: 'outdated'
						}],
					});
				}
            })
            .catch(error => {

            })
            .finally(() => {
                setIsSubmiting(false)
            })
    }


    return (
        <View style={styles.formContainer}>
            
            <TextFormInput 
                placeholder="Ingrese su rut"
                onChangeText={onChangeUser}
                onEndEditingText={onEndUser}
                maxLength={12}
                onSubmitEditing={focusOnPassword}
                returnKeyType="next"
                blurOnSubmit={false}
                value={formData.user}
                autoCapitalize={'characters'}
                errorText={'El usuario ingresado no es válido.'}
                showError={isUserValid === false}
            />
            <PasswordFormInput 
                placeholder="Contraseña"
                onChangeText={onChangePassword}
                value={formData.password}
                ref={refInputPassword}
                maxLength={16}
            />
            <GoToRecoverPassword />

            <View>
                <Button 
                    title={"Iniciar sesión"}
                    containerStyle={styles.buttonContainer}
                    buttonStyle={styles.buttonStyle}
                    disabled={!(isUserValid && isPasswordValid) || submiting}
                    disabledStyle={styles.buttonDisabled}
                    disabledTitleStyle={styles.buttonDisableTitle}
                    loading={submiting}
                    onPress={submitForm}
                />
            </View>

            <GoToCreateAccount />
        </View>
    );
}
const styles = StyleSheet.create({
    formContainer: {
        // marginTop: 20,
        justifyContent: "center",
        marginHorizontal: 40,
        // borderWidth: 1
    },
    buttonContainer: {
        marginTop: 30,
        width: "100%",
        // justifyContent: 'center',
        // borderWidth: 1
    },
    buttonStyle: {
        backgroundColor: "#6B35E2",
        borderRadius: 50,
        // width: "85%"
    },
    buttonDisabled: {
        backgroundColor: "#bea6f2",
    },
    buttonDisableTitle: {
        color: "#fff"
    }
})


export default Form;
