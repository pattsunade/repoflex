import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import verma from 'api/transacciones/verma';
import TextFormInput from 'components/General/Inputs/TextFormInput';
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { Button } from 'react-native-elements';
import Toast from 'react-native-toast-message';
import useMountedComponent from 'utils/hooks/useMountedComponent';
import { clean } from 'utils/rut';
import { sleep } from 'utils/time';

function VerificationForm ({user}) {
    // hooks
    const isMounted = useMountedComponent();
    const navigation = useNavigation();
    // 
    const [verificationCode, setVerificationCode] = React.useState('')
    const [isCodeValid, setIsCodeValid] = React.useState(undefined);
    const [isSubmiting, setIsSubmiting] = React.useState(false);

    const onChangeCode = React.useCallback((value) => {
        const number = value.replace(/[^0-9]/g, '')
        setVerificationCode(number)
        if(number.length >= 6) {
            setIsCodeValid(true);
        }
        else {
            setIsCodeValid(undefined);
        }
    },[])

    const submitForm = async() => {
        setIsSubmiting(true)
        await verma({
            user: user,
            code: verificationCode,
        })
        .then((response) => {
            if(response.ans.stx === 'ok') {
                AsyncStorage.setItem('@usr', clean(user).toUpperCase());
                navigation.reset({
                    index: 0,
                    routes: [{name: 'homeregister'}]
                })
            }
            else {
                Toast.show({
                    type: 'error',
                    props: {
                        onPress: ()  => {},
                        text1: 'Error',
                        text2: response.ans.msg
                    }
                })
            }
        })
        .catch()
        .finally(() => {
            isMounted && setIsSubmiting(false)
        })
    }
    return (
        <View style={styles.container}>
            <Text style={styles.textDescription}> Código de verificación:</Text>
            <View style={styles.inputContainer}>
                <TextFormInput 
                    value={verificationCode}
                    onChangeText={onChangeCode}
                    keyboardType='numeric'
                    maxLength={7}
                    placeholder={'123456'}
                />
            </View>
            <Button 
                title="Confirmar"
                containerStyle={styles.buttonContainer}
                buttonStyle={styles.button}
                disabledStyle={styles.buttonDisabled}
                disabledTitleStyle={styles.buttonDisableTitle}
                onPress={submitForm}
                disabled={!(isCodeValid === true) || isSubmiting}
                loading={isSubmiting}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
    },
    inputContainer: {
        width: 120
    }, 
    textDescription: {
        fontWeight:"bold",
        fontSize:15,
        justifyContent:"flex-start",
        color:"#5300eb"
    },
    buttonContainer: {
        marginTop: 20,

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
})

export default VerificationForm;
