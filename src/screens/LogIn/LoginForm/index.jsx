import ZolbitProduct from 'components/General/ZolbitProduct';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Divider } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import Form from './Form';
import RepoflexLogo from './RepoflexLogo';

function LoginForm () {
    return (
        <ScrollView>
            <RepoflexLogo />
            <View style={styles.formContainer}>
                <Form />
            </View>

            <Divider style={styles.divider}/>
            <ZolbitProduct />
        </ScrollView>
    );
}


export default LoginForm;


const styles = StyleSheet.create({
    formContainer: {
        marginTop: 50,
    },
    divider:{
        backgroundColor: "#6B35E2",
        margin: 40
    }
})
