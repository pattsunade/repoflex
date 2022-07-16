import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Landing from "../screens/LogIn/Landing";
// import Login from "../screens/LogIn/Login";
import Register from "../screens/LogIn/Register";
import RecoverPassword from "../screens/LogIn/RecoverPassword";
import NewPassword from "../screens/LogIn/NewPassword";
import Rejected from "../screens/LogIn/Rejected";
import EmailVerification from "../screens/LogIn/EmailVerification";
import Outdated from "../screens/LogIn/Outdated";
import LoginForm from "screens/LogIn/LoginForm";

const Stack = createStackNavigator();
export default function LogInStack({route})
{ const {intro} = route.params;
  var value = 'landing';
  if (intro == 1)
  { value = 'login';
  }
  return(
    <Stack.Navigator initialRouteName={value}>
      <Stack.Screen
        name="login"
        component={LoginForm}
        options={{title: "Iniciar Sesión",headerShown: false}}
      />
      <Stack.Screen
        name="landing"
        component={Landing}
        options={{title: "Bienvenido",headerShown: false}}
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
      <Stack.Screen
        name="rejected"
        component={Rejected}
        options={{title: "Rechazado"}}
        //options={{headerShown: false}}
      />
      <Stack.Screen
        name="outdated"
        component={Outdated}
        options={{title: "Actualizar"}}
        //options={{headerShown: false}}
      />
      <Stack.Screen
        name="newPassword"
        component={NewPassword}
        options={{title: "Modificar contraseña"}}
        //options={{headerShown: false}}
      />
    </Stack.Navigator>
  );

};