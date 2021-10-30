import React, { useState,useRef,useCallback } from "react";
import { StyleSheet, View} from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-easy-toast";
import { useNavigation } from "@react-navigation/native";

import BackEndConnect from "../../utils/BackEndConnect";
import ListNotification from "../../components/Home/ListNotification";

export default function Notification({route,navigation}) {
    const toastRef = useRef();
    const { notifications } = route.params;

    return(
        <KeyboardAwareScrollView>
            <View style={styles.viewForm}>
                <ListNotification toastRef={toastRef} notifications={notifications} />
            </View>
            <Toast ref={toastRef} position="center" opacity={0.9}  />
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