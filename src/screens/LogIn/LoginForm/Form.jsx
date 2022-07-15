import PasswordFormInput from 'components/General/Inputs/PasswordFormInput';
import TextFormInput from 'components/General/Inputs/TextFormInput';
import React from 'react';
import { View, StyleSheet, Text} from 'react-native';
import { Button } from 'react-native-elements';
import { rutRegexDots, validarRut, formatRut } from 'utils/rut';
import { sleep } from 'utils/time';
import GoToCreateAccount from './GoToCreateAccount';
import GoToRecoverPassword from './GoToRecoverPassword';

function Form() {
    // states variables
    const [formData, setFormData] = React.useState({ user:"", password:"" }); // form data
    const [submiting, setIsSubmiting] = React.useState(false); // show spinner if is submiting
    const [isUserValid, setIsUserValid] = React.useState(true);
    const isPasswordValid = React.useMemo(() => {  // derived state from password
        console.log("calling")
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
        setFormData(form => ({
            ...form,
            user: value.toUpperCase()
        }));
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
        await sleep(6000)
        setIsSubmiting(false)

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

            <GoToCreateAccount />
            <Text>
                {/* {JSON.stringify(formData)} */}
            </Text>
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
