import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ChangePassword from "../screens/Account/ChangePassword.js";
import PersonalData from "../screens/Account/PersonalData.js";

export default function AccountStack()
{ const Stack = createStackNavigator();
  return(
    <Stack.Navigator>
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
    </Stack.Navigator>
  )
}