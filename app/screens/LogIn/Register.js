import React, { useState,useRef,useCallback } from "react";
import { StyleSheet, View} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import RegisterForm from "../../components/Login/RegisterForm";

export default function Register() {
    return(
      <KeyboardAwareScrollView>  
        <View style={styles.viewForm}>
          <RegisterForm/>
        </View>
      </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: "100%",
        height: 150,
        marginTop: 20,
    },
    viewForm: {
        marginRight: 40,
        marginLeft: 40,
    }
});