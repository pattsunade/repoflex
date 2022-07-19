import React from 'react';
import {View, StyleSheet, } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Form from './Form';

function Register () {
    return (
        <KeyboardAwareScrollView>
            <View style={styles.form}>
                <Form />
            </View>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    form: {
        marginHorizontal: 40,
    }
})

export default Register;
