import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Task from "../screens/Tasks/Task";
import QuizTask from "../screens/Tasks/QuizTask";

const Stack = createStackNavigator();

export default function TaskStack({route})
{ const {tid,quest,backAnsFormat,completed,frontAnsFormat} = route.params;
  return(
    <Stack.Navigator>
      <Stack.Screen
        name="task"
        component={Task}
        options={{title: "Tarea"}}
        initialParams={{'quest':quest,'tid':tid,'backAnsFormat':backAnsFormat,'completed':completed,'frontAnsFormat':frontAnsFormat}}
        //options={{headerShown: false}}
      />
      <Stack.Screen
        name="quiztask"
        component={QuizTask}
        options={{title: "Actividad"}}
        //options={{headerShown: false}}
      />  
    </Stack.Navigator>
  )
}