import React, { useState, useRef } from "react";
import { StyleSheet, View, Text, } from "react-native";
import Toast from "react-native-easy-toast";

import DocumentFront from "../../components/HomeRegister/DocumentFront";
import Loading from "../../components/Loading";

export default function DocumentsFront (props) {
    const {navigation} = props;
    const [isLoading, setIsLoading] = useState(false)
    const toastRef = useRef();
    
    return (
        <View>
            <DocumentFront
                toastRef={toastRef}
                setIsLoading={setIsLoading}
                navigation={navigation}
            />
            <Toast ref={ toastRef } position="center" opacity={0.9} />
            <Loading isVisible={isLoading} text="Enviando documentos" />

            
        </View>
    )
}
