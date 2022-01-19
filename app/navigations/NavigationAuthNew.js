import React,{useState,useEffect,useCallback,createContext,useMemo} from "react";
import { StyleSheet,Button, Text, TextInput, View ,ActivityIndicator} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from '@react-native-async-storage/async-storage';
import LogInStack from "./LogInStack";
import HomeStack from "./HomeStack";
import HomeRegisterStack from "./HomeRegisterStack";
import TaskStack from "./TaskStack";
import AccountStack from "./AccountStack";
import Loading from "../components/Loading";
import BackEndConnect from '../utils/BackEndConnect';
import Landing from "../screens/LogIn/Landing";

export const AuthContext = createContext();

function SplashScreen() {
  return (
    <View>
      <Text>Cargando...</Text>
    </View>
  );
}

export default function Navigation() {
  const RootStack = createStackNavigator();  
  const [state, dispatch] = React.useReducer(
    (prevState, action) =>
    { switch (action.type) 
      { case 'LANDING':
          return {
            ...prevState,
            loading: false,
          };
        case 'LOGIN':
          return {
            ...prevState,
            loggedIn: false,
            loading: false,
            intro: true
          };
        case 'LOGOUT':
          return {
            ...prevState,
            loggedIn: false,
            loading: false,
            intro: false,
            loggingOut: true//For adding additional stuff in the future(ex animation).
          };
        case 'RESTORE_TASK':
          return {
            ...prevState,
            loading: false,
            loggedIn: true,
            intro: false,
            quest: action.quest,
            tid: action.tid,
            taskData: action.taskData,
            completed: action.completed
          };
        case 'RESTORE_REGISTER':
          return{
            ...prevState,
            loading: false,
            loggedIn: true,
            intro: false,
            register: true
          }
        case 'HOUSE':
          return{
            ...prevState,
            loading: false,
            loggedIn: true,
            intro: false,
            register: false
          }

      }
    },
    { loading:true,
      loggedIn:false,
      loggingOut:false,
      register:false,
      quest:null,
      tid:null,
      taskData:null,
      completed:null,
      intro:false
    }
  );
  console.log(state);

  useEffect(() => {
    async function getOtt()
    { let data = AsyncStorage.multiGet(['@ott','@mtx','@stp','@quest','@tid','@taskData','@comp','@intro']).then(async (data) =>
      { let mtx;
        if(data[0][1]!=null)// Has ott so user is authenticated.
        { if(data[3][1]!=null)
            dispatch({type:'RESTORE_TASK',quest:JSON.parse(data[3][1]),tid:parseInt(data[4][1]),
                      taskData:JSON.parse(data[5][1]),completed:parseInt(data[6][1])})//There is task data so user has task in progress.
          else if(parseInt(data[2][1])>mtx)
            dispatch({type:'RESTORE_REGISTER'})//User has not completed the registration process.
          else
            dispatch({type:'RESTORE_HOME'})//User is redirected to house.
        }
        else//User is not authenticated
        { if(data[7][1]!=null)//User has already seen introduction.
            dispatch({type:'LOGIN'})  
          else
            dispatch({type:'LANDING'})
        }
      });
    }
    getOtt();
  }, []);

  const authContext = useMemo(() =>
    ({ 
      login: async (data) => {
        dispatch({ type: 'LOGIN'});
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (data) => {
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );

  return(
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStack.Navigator>
          { state.loading ? (<RootStack.Screen name="splash" component={SplashScreen} options={{headerShown: false}}/>)
            : state.loggedIn ?(
                state.register ?(
                  <RootStack.Screen 
                    name="homeregister"
                    component={HomeRegisterStack}
                    options={{ title: "Home", headerShown: false }}
                  />
                ):(state.quest==null ?(
                    <>
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
                    </>
                    )
                    :(<RootStack.Screen 
                        name="task"
                        component={TaskStack}
                        options={{ title: "Task", headerShown: false }}
                        initialParams={{'quest':state.quest,'tid':state.tid,'taskData':state.taskData}}
                      />)
                  )
              ):(state.intro ?
                (<RootStack.Screen
                  name="login"
                  component={LogInStack}
                  options={{headerShown: false}}
                  />
                ):(
                  <RootStack.Screen
                    name="landing"
                    component={Landing}
                    options={{headerShown: false}}
                  />
                )
              )
            }
        </RootStack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  )
}
const styles = StyleSheet.create({
  loaderTask:{
    marginTop:100,
    marginBottom:10,
    alignItems:"center",
  },
});