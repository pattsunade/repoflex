import React, { useState, useRef } from "react";
import { StyleSheet, View, Text, } from "react-native";
import Toast from "react-native-easy-toast";

import DocumentCertificate from "../../components/HomeRegister/DocumentCertificate";
import Loading from "../../components/Loading";

export default function DocumentsCertificate (props) {
    const {navigation} = props;
    const [isLoading, setIsLoading] = useState(false)
    const toastRef = useRef();
    
    return (
        <View>
            <DocumentCertificate
                toastRef={toastRef}
                setIsLoading={setIsLoading}
                navigation={navigation}
            />
            <Toast ref={ toastRef } position="center" opacity={0.9} />
        </View>
    )
}
