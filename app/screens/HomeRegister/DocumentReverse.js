import React, { useState, useRef } from "react";
import { StyleSheet, View, Text, } from "react-native";
import Toast from "react-native-easy-toast";

import DocumentReverse from "../../components/HomeRegister/DocumentReverse";
import Loading from "../../components/Loading";

export default function DocumentsReverse (props) {
    const {navigation} = props;
    const [isLoading, setIsLoading] = useState(false)
    const toastRef = useRef();
    
    return (
        <View>
            <DocumentReverse
                toastRef={toastRef}
                setIsLoading={setIsLoading}
                navigation={navigation}
            />
            <Toast ref={ toastRef } position="center" opacity={0.9} />
            <Loading isVisible={isLoading} text="Enviando documentos" />

            
        </View>
    )
}
