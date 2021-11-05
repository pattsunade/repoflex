import React from 'react';
import {LogBox, View, Text} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast,{BaseToast} from 'react-native-toast-message';
import Navigation from "./app/navigations/NavigationAuth";
import * as Notifications from 'expo-notifications';

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
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
      }),
  });
  // Notifications.scheduleNotificationAsync({
  //   content: {
  //     title: "Time's up!",
  //     body: 'Change sides!',
  //   },
  //   trigger: {
  //     seconds: 5,
  //   },
  // }).then((ans)=>{
  //   console.log(ans);
  // }).catch((e)=>{
  //   console.log(e);
  // });
  return(
    <>
      <Navigation/>
      <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
    </>
  )
}