import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home/Home';
import ListTask from '../screens/Home/ListTask';
import ListTaskTab from '../screens/Home/ListTaskTab';
import Notification from '../screens/Home/Notification';
import TaskDetail from '../screens/Home/TaskDetail';

const Stack = createStackNavigator();

export default function HomeStack({route})
{ 
  // const {usr} = route.params;
  return(
    <Stack.Navigator> 
      <Stack.Screen
        name='home'
        component={Home}
        // initialParams={{'usr':usr}}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name='listtask'
        component={ListTask}
        options={({ route }) => ({ title: route.params.title })}
        //options={{headerShown: false}}
      />
      <Stack.Screen
        name='listtasktab'
        component={ListTaskTab}
        options={({ route }) => ({ title: route.params.title })}
        //options={{headerShown: false}}
      />
      <Stack.Screen
        name="taskdetail"
        component={TaskDetail}
        options={{title: "Detalle de la Tarea"}}
        //options={{headerShown: false}}
      />
    </Stack.Navigator>
  )
}