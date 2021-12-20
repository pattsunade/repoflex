import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/Home/Home";
import TaskAvailable from "../screens/Home/TaskAvailable";
import TaskAssigned from "../screens/Home/TaskAssigned";
import TaskInProgress from "../screens/Home/TaskInProgress";
import TaskFinished from "../screens/Home/TaskFinished";
import TaskInRevision from "../screens/Home/TaskInRevision";
import TaskSent from "../screens/Home/TaskSent";
import Notification from "../screens/Home/Notification";
import DetailTask from "../screens/Home/DetailTask";
import DetailTaskInProgress from "../screens/Home/DetailTaskInProgress";
import TaskDetail from "../screens/Home/TaskDetail";
import AssignedDetail from "../screens/Home/AssignedDetail";

const Stack = createStackNavigator();

export default function HomeStack({route})
{ return(
    <Stack.Navigator> 
      <Stack.Screen
        name="home"
        component={Home}
        //options={{title: "Home"}}
        options={{headerShown: false}}
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
        options={{title: "Mis Tareas en Proceso"}}
        //options={{headerShown: false}}
      />
      <Stack.Screen
        name="tasksent"
        component={TaskSent}
        options={{title: "Mis Tareas Enviadas"}}
        //options={{headerShown: false}}
      />
      <Stack.Screen
        name="taskinrevision"
        component={TaskInRevision}
        options={{title: "Tareas en Revisión"}}
        //options={{headerShown: false}}
      />
      <Stack.Screen
        name="taskfinished"
        component={TaskFinished}
        options={{title: "Mis Tareas Finalizadas"}}
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
    </Stack.Navigator>
  )
}