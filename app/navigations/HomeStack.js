import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/Home/Home";
import Account from "../screens/Account/Account";
import TaskAvailable from "../screens/Home/TaskAvailable";
import TaskAssigned from "../screens/Home/TaskAssigned";
import TaskInProgress from "../screens/Home/TaskInProgress";
import TaskEnded from "../screens/Home/TaskEnded";
import TaskInRevision from "../screens/Home/TaskInRevision";
import TaskAccepted from "../screens/Home/TaskAccepted";
import Notification from "../screens/Home/Notification";
import DetailTask from "../screens/Home/DetailTask";
import DetailTaskInProgress from "../screens/Home/DetailTaskInProgress";
import TaskDetail from "../screens/Home/TaskDetail";
import AssignedDetail from "../screens/Home/AssignedDetail";
import Task from "../screens/Home/Task";
import QuizTask from "../screens/Home/QuizTask";

const Stack = createStackNavigator();

export default function HomeStack({route})
{ const {tid,quest,taskData,completed} = route.params;
  var init = "home";
  console.log("tipo de quest",typeof quest,quest);
  if (quest != null){
    init = "task";
  }
  return(
    <Stack.Navigator initialRouteName = {init}> 
      <Stack.Screen
        name="home"
        component={Home}
        //options={{title: "Home"}}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="account"
        component={Account}
        options={{title: "Mi Cuenta"}}
        //options={{headerShown: false}}
      />
      <Stack.Screen
        name="notification"
        component={Notification}
        options={{title: "Notificaciones"}}
        //options={{headerShown: false}}
      />
      <Stack.Screen
        name="taskavailable"
        component={TaskAvailable}
        options={{title: "Tareas Disponibles"}}
        //options={{headerShown: false}}
      />
      <Stack.Screen
        name="taskassigned"
        component={TaskAssigned}
        options={{title: "Mis Tareas Asignadas"}}
        //options={{headerShown: false}}
      />
      <Stack.Screen
        name="taskinprogress"
        component={TaskInProgress}
        options={{title: "Mis Tareas en Ejecución"}}
        //options={{headerShown: false}}
      />
      <Stack.Screen
        name="taskended"
        component={TaskEnded}
        options={{title: "Mis Tareas Terminadas"}}
        //options={{headerShown: false}}
      />
      <Stack.Screen
        name="taskinrevision"
        component={TaskInRevision}
        options={{title: "Tareas en Revisión"}}
        //options={{headerShown: false}}
      />
      <Stack.Screen
        name="taskaccepted"
        component={TaskAccepted}
        options={{title: "Mis Tareas Aceptadas"}}
        //options={{headerShown: false}}
      />
      <Stack.Screen
        name="detailtask"
        component={DetailTask}
        options={{title: "Detalle de la Tarea"}}
        //options={{headerShown: false}}
      />
      <Stack.Screen
        name="detailtaskinprogress"
        component={DetailTaskInProgress}
        options={{title: "Detalle de la Tarea"}}
        //options={{headerShown: false}}
      />
      <Stack.Screen
        name="taskdetail"
        component={TaskDetail}
        options={{title: "Detalle de la Tarea"}}
        //options={{headerShown: false}}
      />
      <Stack.Screen
        name="assigneddetail"
        component={AssignedDetail}
        options={{title: "Iniciar tarea asignada"}}
        //options={{headerShown: false}}
      />
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