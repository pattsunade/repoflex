import React, { useState, useRef } from "react";
import { StyleSheet, View, Text, } from "react-native";
import Toast from "react-native-easy-toast";

import DocumentSelfie from "../../components/HomeRegister/DocumentSelfie";
import Loading from "../../components/Loading";

export default function DocumentsSelfie (props) {
  const {navigation} = props;
  const [isLoading, setIsLoading] = useState(false)
  const toastRef = useRef();
  return (
    <View>
      <DocumentSelfie
        toastRef={toastRef}
        setIsLoading={setIsLoading}
        navigation={navigation}
      />
      <Toast ref={ toastRef } position="center" opacity={0.9} />
    </View>
  )
}
