import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ChangePassword from "../screens/Account/ChangePassword.js";
import PersonalData from "../screens/Account/PersonalData.js";
import FrecuentQuestions from "../screens/Account/FrequentQuestions.js";
import Account from "../screens/Account/Account.js";
import About from "../screens/Account/About.js";

export default function AccountStack({route})
{ const Stack = createStackNavigator();
  const {nameuser,level} = route.params;
  return(
    <Stack.Navigator>
      <Stack.Screen
        name="account"
        component={Account}
        options={{title: "Mi Cuenta"}}
        initialParams={{'nameuser':nameuser,'level':level}}
      />
      <Stack.Screen
        name="changepassword"
        component={ChangePassword}
        options={{title: "Cambiar contraseña"}}
      />
      <Stack.Screen
        name="personaldata"
        component={PersonalData}
        options={{title: "Datos personales"}}
      />
      <Stack.Screen
        name="frequentquestions"
        component={FrecuentQuestions}
        options={{title: "Preguntas frecuentes"}}
      />
      <Stack.Screen
        name="about"
        component={About}
        options={{title: "Acerca de la app"}}
      />
    </Stack.Navigator>
  )
}