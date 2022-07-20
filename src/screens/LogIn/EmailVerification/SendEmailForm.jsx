import sndvc from 'api/transacciones/sndvc';
import TextFormInput from 'components/General/Inputs/TextFormInput';
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { Button } from 'react-native-elements';
import Toast from 'react-native-toast-message';
import useMountedComponent from 'utils/hooks/useMountedComponent';
import { validateEmail } from 'utils/validations';

function SendEmailForm({user, password}) {

    const isMounted = useMountedComponent();
    const [email, setEmail] = React.useState('');
    const [isEmailValid, setIsEmailValid] = React.useState(undefined);
    const [isSubmiting, setIsSubmiting] = React.useState(false);

    const onChangeEmail = React.useCallback((value) => {
        setEmail(value);
        if (value === ''){
            setIsEmailValid(undefined)
        }
        else if (validateEmail(value) === false){
            setIsEmailValid(false);
        }
        else {
            setIsEmailValid(true);
        }
    },[])
    const submitForm = async() => {
        setIsSubmiting(true);
        await sndvc({
            user: user,
            password: password,
            mail: email,
        })
        .then((response) => {
            if(response.ans.stx === 'ok') {
                Toast.show({
                    type: 'success',
                    props: {
                        onPress: () => {}, 
                        text1: 'Éxito', 
                        text2: response.ans.msg
                    }
                })
            }
            else {
                Toast.show({
                    type: 'error',
                    props: {
                        onPress: () => {}, 
                        text1: 'Error', 
                        text2: response.ans.msg
                    }
                })
            }
        })
        .catch(err => {
            console.log(err);
        })
        .finally(()=>{
            isMounted && setIsSubmiting(false);
        })
    }

    return (
        <View>
            <Text style={styles.textDescription}> Correo:</Text>
            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <TextFormInput 
                        placeholder={'user@example.com'}
                        autoCapitalize={'none'}
                        value={email}
                        onChangeText={onChangeEmail}
                    />
                </View>
                <Button 
                    title="Enviar"
                    containerStyle={styles.buttonContainer}
                    buttonStyle={styles.button}
                    disabledStyle={styles.buttonDisabled}
                    disabledTitleStyle={styles.buttonDisableTitle}
                    onPress={submitForm}
                    disabled={!(isEmailValid === true) || isSubmiting}
                    loading={isSubmiting}
                />                
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    formContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    inputContainer: {
        // width: '75%'
        flex: 70,
        marginEnd: 5 
    },
    buttonContainer: {
        // width: "25%",
        flex: 20,
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
    },
    textDescription: {
        fontWeight:"bold",
        fontSize:15,
        marginTop:10,
        justifyContent:"flex-start",
        color:"#5300eb"
    },
})

export default SendEmailForm;
