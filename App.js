import React from 'react';
import {LogBox, View, Text} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast,{BaseToast} from 'react-native-toast-message';
import Navigation from "./app/navigations/NavigationAuth";
import * as Notifications from 'expo-notifications';


const toastConfig = {
  error: ({props, ...rest}) => (
    <BaseToast
      {...rest}
      style={{ borderLeftColor: 'red' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      leadingIcon={require("./assets/error.png")}
      text1Style={{
        fontSize: 15,
        fontWeight: 'bold'
      }}
      text2Style={{
        fontSize: 13
      }}
      text1={props.text1}
      text2={props.text2}
    />
  ),
  success: ({props, ...rest}) => (
    <BaseToast
      {...rest}
      style={{ borderLeftColor: 'green' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      leadingIcon={require("./assets/ok-24.png")}
      
      text1={props.text1}
      text2={props.text2}
    />
  ),
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
      <Toast config={toastConfig} visibilityTime={7000} ref={(ref) => Toast.setRef(ref)} />
    </>
  )
}