import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Landing from "../screens/LogIn/Landing";
import Login from "../screens/LogIn/Login";
import Register from "../screens/LogIn/Register";
import RecoverPassword from "../screens/LogIn/RecoverPassword";
import NewPassword from "../screens/LogIn/NewPassword";
import EmailVerification from "../screens/LogIn/EmailVerification";
// import EmailVerificationA from "../screens/LogIn/EmailVerificationA";

const Stack = createStackNavigator();
export default function LogInStack(){
  return(
    <Stack.Navigator>
      <Stack.Screen
        name="landing"
        component={Landing}
        options={{title: "Bienvenido",headerShown: false}}
      />
      <Stack.Screen
        name="login"
        component={Login}
        options={{title: "Iniciar Sesión",headerShown: false}}
      />
      <Stack.Screen
        name="register"
        component={Register}
        options={{title: "Registro"}}
      />
      <Stack.Screen
        name="recoverpassword"
        component={RecoverPassword}
        options={{title: "Recuperar Contraseña"}}
      />
      <Stack.Screen
        name="emailverification"
        component={EmailVerification}
        options={{title: "Verificar Email"}}
        //options={{headerShown: false}}
      />
      {/*<Stack.Screen
        name="emailverificationA"
        component={EmailVerificationA}
        options={{title: "Verificar Email"}}
        //options={{headerShown: false}}
      />*/}
      <Stack.Screen
        name="newPassword"
        component={NewPassword}
        options={{title: "Modificar contrasña"}}
        //options={{headerShown: false}}
      />
    </Stack.Navigator>
  );

};