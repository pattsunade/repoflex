import React from 'react';
import {LogBox, View, Text} from "react-native";
import OneSignal from 'react-native-onesignal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast,{BaseToast} from 'react-native-toast-message';
import Navigation from "./app/navigations/NavigationAuth";

LogBox.ignoreAllLogs();

const toastConfig = {
  error: ({props, ...rest}) => (
    <BaseToast
      {...rest}
      style={{ borderLeftColor: 'red' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      leadingIcon={require("./assets/error.png")}
      text1={props.text1}
      text2={props.text2}
    />
  ),
  success: () => {},
  info: () => {},
  any_custom_type: () => {}
};

export default function App() {
  OneSignal.setLogLevel(6, 0);
  OneSignal.setAppId("dac70ae0-ce08-4ec7-b722-540f81c6da38");
  OneSignal.setNotificationOpenedHandler(notification => {
    console.log("OneSignal: notification opened:", notification.notification.additionalData);
    if ("mtx" in notification.notification.additionalData){
      console.log("mtx-->",notification.notification.additionalData.mtx.toString());
      AsyncStorage.setItem('@mtx',notification.notification.additionalData.mtx.toString());
    }
  });
  const phId = OneSignal.getDeviceState().then(async (ans) => {
    await AsyncStorage.setItem('@phid',ans.userId);
  });
  return(
    <>
      <Navigation/>
      <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
    </>
  )
}