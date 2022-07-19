import { useNavigation } from '@react-navigation/native';
import regi1 from 'api/transacciones/regi1';
import PasswordFormInput from 'components/General/Inputs/PasswordFormInput';
import TextFormInput from 'components/General/Inputs/TextFormInput';
import React from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import { Button } from 'react-native-elements';
import Toast from 'react-native-toast-message';
import useMountedComponent from 'utils/hooks/useMountedComponent';
import { formatRut, rutRegexDots, validarRut } from 'utils/rut';


function Form () {
    // hooks
    const isMounted = useMountedComponent();
    const navigation = useNavigation();
    // form values
    const [formData, setFormData] = React.useState({
        user: "",
        phone: "",
        password: "",
        password2:"",
    })
    // inputs validation state
    const [isUserValid, setIsUserValid] = React.useState(undefined);
    const [isPhoneValid, setIsPhoneValid] = React.useState(undefined);
    const [isPasswordValid, setIsPasswordValid] = React.useState(undefined);
    const [isPassword2Valid, setIsPassword2Valid] = React.useState(undefined);

    // input reference
    const ref_input2 = React.useRef();
    const ref_input3 = React.useRef(); 
    const ref_input4 = React.useRef(); 

    // inputs methods
    const onChangeUser = React.useCallback((value) => {
        const isValueValid = rutRegexDots.test(value);
        if(isValueValid) {
            setFormData(data => ({ 
                ...data,
                user: value,
            }))
        }
    },[])
    const onEndUser = React.useCallback((value) => {
        if(value === '') {
            setIsUserValid(undefined);
        }
        else if (validarRut(value) === true) {
            setIsUserValid(true);
            setFormData(form => ({
                ...form,
                user: formatRut(value).toUpperCase()
            }))
        }
        else {
            setIsUserValid(false);
        }
    },[])

    const onChangePhone = React.useCallback((value) => {
        setFormData(data => ({
            ...data,
            phone: value,
        }))
    },[])
    const onEndPhone = React.useCallback((value) => {
        if (value === '') {
            setIsPhoneValid(undefined)
        }
        else {
            setIsPhoneValid(true)
        }
    },[])

    const onChangePassword = React.useCallback((value) => {
        setFormData(data => ({
            ...data,
            password: value,
        }))
    },[])

    
    const onEndPassword = (value) => {
        if (value === '') {
            setIsPasswordValid(undefined);
        }
        else if (value.length < 6) {
            setIsPasswordValid(false);
        }
        else {
            setIsPasswordValid(true);
        }

        // compare with the second password
        if (formData.password2 === '') {
            setIsPassword2Valid(undefined);
        }
        else if(value !== formData.password2){
            setIsPassword2Valid(false);
        }
        else {
            setIsPassword2Valid(true);
        }
    }
    const onChangePassword2 = React.useCallback((value) => {
        setFormData(data => ({
            ...data,
            password2: value,
        }))
    },[])
    const onEndPassword2 = (value) => {
        // compare with the first password
        if (value === '') {
            setIsPassword2Valid(undefined);
        }
        else if(value !== formData.password){
            setIsPassword2Valid(false);
        }
        else {
            setIsPassword2Valid(true);
        }
    }

    // SUBMIT
    const [isSubmiting,setIsSubmiting] = React.useState(false)
    const submitForm = async() => {
        setIsSubmiting(true);
        await regi1({
            user: formData.user,
            password: formData.password,
            phone: formData.phone,
        })
        .then(response => {
            if (response.ans.stx === 'ok') {
                navigation.replace("emailverification", {
                    rut: formData.user,
                    psw: formData.password
                })
            }
            else {
                Toast.show({
                    type: 'error',
                    props: {
                        onPress: () => {}, 
                        text1: 'Error', 
                        text2: response.ans.msg,
                    }
                })
            }
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            isMounted && setIsSubmiting(false);
        })
    }
    return (
        <ScrollView style={styles.formContainer}>
            <Text style={styles.textDescription}>{" "}Ingresa tu rut</Text>
            <TextFormInput
                placeholder="11.111.111-1"
                maxLength={12}
                returnKeyType="next"
                value={formData.user}
                onSubmitEditing={() => ref_input2.current.focus()}
                errorText={'El usuario ingresado no es válido.'}
                showError={isUserValid === false}
                onChangeText={onChangeUser}
                onEndEditingText={onEndUser}
                autoCapitalize={'characters'}
            />
            <Text style={styles.textDescription}>{" "}Número telefónico</Text>
            <TextFormInput 
                placeholder="56911111111"
                maxLength={12}
                keyboardType="numeric"
                returnKeyType="next"
                value={formData.phone}
                ref={ref_input2}
                onChangeText={onChangePhone}
                onEndEditingText={onEndPhone}
                errorText={'El número ingresado no es valido'}
                showError={isPhoneValid === false}
                onSubmitEditing={() => ref_input3.current.focus()}
            />
            <Text style={styles.textDescription}>{" "}Contraseña</Text>
            <PasswordFormInput 
                placeholder="********"
                maxLength={16}
                returnKeyType="next"
                value={formData.password}
                ref={ref_input3}
                onSubmitEditing={() => ref_input4.current.focus()}
                errorText={'Su contraseña debe tener entre 6 a 16 caracteres'}
                showError={isPasswordValid === false}
                onChangeText={onChangePassword}
                onEndEditingText={onEndPassword}

            />
            <Text style={styles.textDescription}>{" "}Repetir Contraseña</Text>
            <PasswordFormInput 
                placeholder="********"
                maxLength={16}
                value={formData.password2}
                ref={ref_input4}                
                onChangeText={onChangePassword2}
                onEndEditingText={onEndPassword2}
                errorText={'Las contraseñas no coinciden'}
                showError={isPassword2Valid === false}
            />
            <Button 
                title="Registrarse"
                containerStyle={styles.buttonContainer}
                buttonStyle={styles.button}
                disabledStyle={styles.buttonDisabled}
                disabledTitleStyle={styles.buttonDisableTitle}
                disabled={!(isUserValid && isPasswordValid && isPassword2Valid && isPhoneValid) || isSubmiting}
                loading={isSubmiting}
                onPress={submitForm}
            />
            {/* <Text>
                {JSON.stringify(formData)}
            </Text> */}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    textDescription: {
        fontWeight:"bold",
        fontSize:15,
        // marginTop:10,
        justifyContent:"flex-start",
        color:"#5300eb"
    },
    formContainer: {
        marginTop: 30,
    },
    buttonContainer: {
        marginTop: 30,
        width: "100%",
        marginBottom: 30
    },
    button: {
        backgroundColor: "#6B35E2",
        borderRadius: 50,
    },
    buttonDisabled: {
        backgroundColor: "#bea6f2",
    },
    buttonDisableTitle: {
        color: "#fff"
    }
})

export default Form;
