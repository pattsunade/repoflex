import React from "react";
import { createStackNavigator } from "@react-navigation/stack";


import Task from "../screens/Home/Task";
import QuizTask from "../screens/Home/QuizTask";

const Stack = createStackNavigator();

export default function TaskStack({route})
{ const {tid,quest,taskData,completed} = route.params;
  return(
    <Stack.Navigator>
      <Stack.Screen
        name="task"
        component={Task}
        options={{title: "Tarea"}}
        initialParams={{'quest':quest,'tid':tid,'taskData':taskData,'completed':completed}}
        //options={{headerShown: false}}
      />
      <Stack.Screen
        name="quiztask"
        component={QuizTask}
        options={{title: "Tarea"}}
        //options={{headerShown: false}}
      />  
    </Stack.Navigator>
  )
}