import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import ZolbitProduct from 'components/General/ZolbitProduct'
import SendEmailForm from './SendEmailForm';
import VerificationForm from './VerificationForm';
import { Divider } from 'react-native-elements';
function EmailVerification({route}) {
    return (
        <View style={styles.screen}>
            <Text style={styles.texttitle}>
                Ingresa tu correo para enviar un código de verificación:
            </Text>
            <SendEmailForm user={route.params.rut} password={route.params.psw}/>
            <VerificationForm user={route.params.rut} password={route.params.psw}/>

            <Divider style={styles.divider} />

            <ZolbitProduct />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        marginHorizontal: 40
    },
    texttitle: {
        marginTop:50,
        marginBottom:20 ,
        marginHorizontal:20,
        fontSize: 17,
        textAlign:"justify"
    },
    divider:{
        backgroundColor: "#6B35E2",
        marginVertical: 40
      },
})

export default EmailVerification;
