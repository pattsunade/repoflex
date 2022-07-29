import React, { useState, useRef,useCallback } from "react";
import { StyleSheet, View, Text, } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useFocusEffect } from '@react-navigation/native';
import Loading from "../../../components/Loading";
import DocumentDataForm from "./DocumentDataForm";
import Toast from 'react-native-toast-message';


export default function DocumentData () { 

	return (
		<KeyboardAwareScrollView enableOnAndroid={true} enableAutomaticScroll={(Platform.OS === 'ios')} >
			<View style={styles.viewForm}>
				<DocumentDataForm/>
			</View>
		</KeyboardAwareScrollView>
	)
}
const styles = StyleSheet.create({
  viewForm: {
    marginRight: 40,
    marginLeft: 40
  }
});