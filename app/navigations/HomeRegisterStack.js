import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeRegister from "../screens/HomeRegister/HomeRegister";
import DocumentsSelfie from "../screens/HomeRegister/DocumentSelfie";
import DocumentsFront from "../screens/HomeRegister/DocumentFront";
import DocumentsReverse from "../screens/HomeRegister/DocumentReverse";
import DocumentsCertificate from "../screens/HomeRegister/DocumentCertificate";
import EconomyActivityNumber from "../screens/HomeRegister/EconomyActivityNumber";
import EconomyActivityCertificate from "../screens/HomeRegister/EconomyActivityCertificate";
import Training from "../screens/HomeRegister/Training";
import Training2 from "../screens/HomeRegister/Training2";
import Training3 from "../screens/HomeRegister/Training3";
import Firm from "../screens/HomeRegister/Firm";
import EndRegister from "../screens/HomeRegister/EndRegister";
import GoodTraining from "../screens/HomeRegister/GoodTraining";
import BadTraining from "../screens/HomeRegister/BadTraining";
 
const Stack = createStackNavigator();

export default function HomeRegisterStack(){
  return(
    <Stack.Navigator initialRouteName = "homeregister"> 
      <Stack.Screen
        name="homeregister"
        component={HomeRegister}
        options={{title: "Mi Registro"}}
        //options={{headerShown: false}}
      />
      <Stack.Screen
        name="documentselfie"
        component={DocumentsSelfie}
        options={{title: "Mi Foto"}}
        //options={{headerShown: false}}
      />
      <Stack.Screen
        name="documentfront"
        component={DocumentsFront}
        options={{title: "Fotografía frontal del documento"}}
        //options={{headerShown: false}}
      />
      <Stack.Screen
        name="documentreverse"
        component={DocumentsReverse}
        options={{title: "Fotografía reverso del documento"}}
        //options={{headerShown: false}}
      />
      <Stack.Screen
        name="documentcertificate"
        component={DocumentsCertificate}
        options={{title: "Certificado de antecedentes"}}
        //options={{headerShown: false}}
      />
      <Stack.Screen
        name="economyActivityNumber"
        component={EconomyActivityNumber}
        options={{title: "Certificado de actividad"}}
        //options={{headerShown: false}}
      />
      <Stack.Screen
        name="economyCertifiate"
        component={EconomyActivityCertificate}
        options={{title: "Certificado de actividad"}}
        //options={{headerShown: false}}
      />
      <Stack.Screen
        name="training"
        component={Training}
        options={{title: "Mi Entrenamiento"}}
        //options={{headerShown: false}}
      />
      <Stack.Screen
        name="training2"
        component={Training2}
        options={{title: "Prueba"}}
        //options={{headerShown: false}}
      />
      <Stack.Screen
        name="training3"
        component={Training3}
        options={{title: "Prueba"}}
        //options={{headerShown: false}}
      />
      <Stack.Screen
        name="goodtraining"
        component={GoodTraining}
        //options={{title: "Examen Completado"}}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="badtraining"
        component={BadTraining}
       // options={{title: "Examen reprobado"}}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="firm"
        component={Firm}
        options={{title: "Mi Firma"}}
        //options={{headerShown: false}}
      />
      <Stack.Screen
        name="endregister"
        component={EndRegister}
        options={{title: "Final del registro"}}
        //options={{headerShown: false}}
      />
    </Stack.Navigator>
  )
}