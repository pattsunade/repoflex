import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeRegister from "screens/HomeRegister/HomeRegister";
import DocumentData from "screens/HomeRegister/DocumentData";
import DocumentImage from "screens/HomeRegister/DocumentImage";
import Check from "screens/HomeRegister/Check";
// import DocumentSelfie from "../screens/HomeRegister/DocumentSelfie";
// import DocumentFront from "../screens/HomeRegister/DocumentFront";
// import DocumentReverse from "../screens/HomeRegister/DocumentReverse";
// import DocumentCertificate from "../screens/HomeRegister/DocumentCertificate";
// import EconomyActivityNumber from "../screens/HomeRegister/EconomyActivityNumber";
// import EconomyActivityCertificate from "../screens/HomeRegister/EconomyActivityCertificate";
import Training from "../screens/HomeRegister/Training";
import Training2 from "../screens/HomeRegister/Training2";
import Training3 from "../screens/HomeRegister/Training3";
import Firm from "../screens/HomeRegister/Firm";
import EndRegister from "../screens/HomeRegister/EndRegister";
import GoodTraining from "../screens/HomeRegister/GoodTraining";
import BadTraining from "../screens/HomeRegister/BadTraining";
import Rejected from "../screens/HomeRegister/Rejected";
 
const Stack = createStackNavigator();

export default function HomeRegisterStack({route}){
  const {mtx,stp} = route.params;
  return(
    <Stack.Navigator initialRouteName = "homeregister"> 
      <Stack.Screen
        name="homeregister"
        component={HomeRegister}
        options={{title: "Mi Registro"}}
        initialParams={{mtx:mtx,stp:stp}}
        //options={{headerShown: false}}
      />
      <Stack.Screen
        name="documentdata"
        component={DocumentData}
        options={{title: "Datos personales"}}
        //options={{headerShown: false}}
      />
      <Stack.Screen
        name="documentimage"
        component={DocumentImage}
        options={{title: "Identificación"}}
        //options={{headerShown: false}}
      />
      <Stack.Screen
        name="check"
        component={Check}
        options={{title: "Revisión"}}
        //options={{headerShown: false}}
      />
      {/*<Stack.Screen
        name="documentfront"
        component={DocumentFront}
        options={{title: "Fotografía frontal del documento"}}
        //options={{headerShown: false}}
      />
      <Stack.Screen
        name="documentreverse"
        component={DocumentReverse}
        options={{title: "Fotografía reverso del documento"}}
        //options={{headerShown: false}}
      />
      <Stack.Screen
        name="documentcertificate"
        component={DocumentCertificate}
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
      />*/}
      <Stack.Screen
        name="training"
        component={Training}
        options={{title: "Mi Entrenamiento"}}
        // options={{headerShown: false}}
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
      <Stack.Screen
        name="rejected"
        component={Rejected}
        options={{title: "Rechazado"}}
        //options={{headerShown: false}}
      />
    </Stack.Navigator>
  )
}