import React,{useState,useEffect,useCallback} from "react";
import { StyleSheet,Button, Text, TextInput, View ,ActivityIndicator} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from '@react-native-async-storage/async-storage';
import LogInStack from "./LogInStack";
import HomeStack from "./HomeStack";
import HomeRegisterStack from "./HomeRegisterStack";
import TaskStack from "./TaskStack";
import AccountStack from "./AccountStack";
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import BackEndConnect from '../utils/BackEndConnect';

function SplashScreen() {
  return (
    <View>
    </View>
  );
}

export default function Navigation() {
  const RootStack = createStackNavigator();
  const [ott, setOtt] = useState();
  const [matrix, setMatrix] = useState();
  const [stp, setStp] = useState();
  const [quest, setQuest] = useState();
  const [tid, setTid] = useState();
  const [taskData, setTaskData] = useState();
  const [completed, setCompleted] = useState();
  const [intro, setIntro] = useState();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function getOtt()
    { let data = AsyncStorage.multiGet(['@ott','@mtx','@stp','@quest','@tid','@taskData','@comp','@intro']).then(async (ans) =>
      { let mtx;
        // console.log(ans);
        setOtt(ans[0][1]);
        setStp(ans[2][1]);
        if (ans[1][1] != null)
        { mtx = (ans[1][1].match(/1/g) || []).length;
          setMatrix(mtx);
        }
        setQuest(JSON.parse(ans[3][1]));
        setTid(parseInt(ans[4][1]));
        setTaskData(JSON.parse(ans[5][1]));
        setCompleted(parseInt(ans[6][1]));
        setIntro(parseInt(ans[7][1]));
        setLoading(false);
      });
    }
    getOtt();
  }, []);

  // const onLayoutRootView = useCallback(async () => {
  //   if (!loading) {
  //     console.log("me llamaron!");
      
  //   }
  // }, [loading]);

  return(
    <NavigationContainer>
      <RootStack.Navigator>
        { loading ?
          ( <RootStack.Screen name="splash" component={SplashScreen} options={{headerShown: false}}/>
          ):
          ott == null || ott == "null" ?
          ( <>
              <RootStack.Screen
                name="login"
                component={LogInStack}
                options={{headerShown: false}}
                initialParams={{'intro':intro}}
              />
              <RootStack.Screen 
                name="home"
                component={HomeStack}
                options={{ title: "Home", headerShown: false }}
              />
              <RootStack.Screen 
                name="homeregister"
                component={HomeRegisterStack}
                options={{ title: "Home", headerShown: false }}
              />
              <RootStack.Screen 
                name="task"
                component={TaskStack}
                options={{ title: "Task", headerShown: false }}
                initialParams={{'quest':quest,'tid':tid,'taskData':taskData}}
              />
              <RootStack.Screen 
                name="account"
                component={AccountStack}
                options={{headerShown: false}}
              />
            </>
          ): stp>matrix ?
          ( <>
              <RootStack.Screen 
                name="homeregister"
                component={HomeRegisterStack}
                options={{ title: "Home", headerShown: false }}
              />
              <RootStack.Screen 
                name="home"
                component={HomeStack}
                options={{ title: "Home", headerShown: false }}
              />
              <RootStack.Screen
                name="login"
                component={LogInStack}
                options={{headerShown: false}}
                initialParams={{'intro':intro}}
              />
              <RootStack.Screen 
                name="account"
                component={AccountStack}
                options={{headerShown: false}}
              />
              <RootStack.Screen 
                name="task"
                component={TaskStack}
                options={{ title: "Task", headerShown: false }}
                initialParams={{'quest':quest,'tid':tid,'taskData':taskData}}
              />
            </>
          ):quest != null || quest == "null" ?
          ( <>
              <RootStack.Screen 
                name="task"
                component={TaskStack}
                options={{ title: "Task", headerShown: false }}
                initialParams={{'quest':quest,'tid':tid,'taskData':taskData,'completed':completed}}
              />
              <RootStack.Screen
                name="login"
                component={LogInStack}
                options={{headerShown: false}}
                initialParams={{'intro':intro}}
              />
              <RootStack.Screen 
                name="home"
                component={HomeStack}
                options={{ title: "Home", headerShown: false }}
                initialParams={{'quest':quest,'tid':tid,'taskData':taskData}}
              />
              <RootStack.Screen 
                name="account"
                component={AccountStack}
                options={{headerShown: false}}
              />
              <RootStack.Screen 
                name="homeregister"
                component={HomeRegisterStack}
                options={{ title: "Home", headerShown: false }}
              />
            </>
          ):
           (<>
              <RootStack.Screen 
                name="home"
                component={HomeStack}
                options={{ title: "Home", headerShown: false }}
              />
              <RootStack.Screen 
                name="account"
                component={AccountStack}
                options={{headerShown: false}}
              />
              <RootStack.Screen
                name="login"
                component={LogInStack}
                options={{headerShown: false}}
                initialParams={{'intro':intro}}
              />
              <RootStack.Screen 
                name="task"
                component={TaskStack}
                options={{ title: "Task", headerShown: false }}
                initialParams={{'quest':quest,'tid':tid,'taskData':taskData}}
              />
              <RootStack.Screen 
                name="homeregister"
                component={HomeRegisterStack}
                options={{ title: "Home", headerShown: false }}
              />
            </>
          )
    }
    </RootStack.Navigator>
  </NavigationContainer>
  )
}
const styles = StyleSheet.create({
  loaderTask:{
    marginTop:100,
    marginBottom:10,
    alignItems:"center",
  },
});