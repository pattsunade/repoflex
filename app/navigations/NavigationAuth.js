import React,{useState,useEffect} from "react";
import { StyleSheet,Button, Text, TextInput, View ,ActivityIndicator} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from '@react-native-async-storage/async-storage';
import LogInStack from "./LogInStack";
import HomeStack from "./HomeStack";
import HomeRegisterStack from "./HomeRegisterStack"
import Loading from "../components/Loading";
import BackEndConnect from '../utils/BackEndConnect';
import Toast from 'react-native-toast-message';
const RootStack = createStackNavigator();

function SplashScreen() {
  return (
    <View style={styles.loaderTask}>
      <ActivityIndicator  size="large" color="#0000ff"/>
      <Text>Cargando...</Text>
    </View>
  );
}

export default function Navigation() {
  const [ott, setOtt] = useState();
  const [matrix, setMatrix] = useState();
  const [stp, setStp] = useState();
  const [quest, setQuest] = useState();
  const [tid, setTid] = useState();
  const [taskData, setTaskData] = useState();
  const [completed, setCompleted] = useState()
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    function getOtt(){
      let data = AsyncStorage.multiGet(['@ott','@mtx','@stp','@quest','@tid','@taskData','@comp']).then((ans) =>
      { let mtx;
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
        if (mtx==6)
        { BackEndConnect("POST","matrx").then((ans)=>{
            if ((ans.hdr.mtx.match(/1/g) || []).length==7)
            { AsyncStorage.setItem('@mtx',ans.hdr.mtx).then(()=>
              { setLoading(false);
              });
            }
            else
            { setLoading(false);
            }
          }).catch((ans)=>
          { console.log("error->",ans);
            AsyncStorage.multiRemove(['@ott','@mtx','@stp']);
          })
        }
        else
        { setLoading(false);
        }
      });
    }
    getOtt();
  }, []);
  return(
    <NavigationContainer>
      <RootStack.Navigator>
      { loading ? 
        ( <RootStack.Screen name="Splash" component={SplashScreen}/>
        ): ott == null || ott == "null" ?
          ( <>
              <RootStack.Screen
                name="login"
                component={LogInStack}
                options={{headerShown: false}}
              />
              <RootStack.Screen 
                name="home"
                component={HomeStack}
                options={{ title: "Home", headerShown: false }}
                initialParams={{'quest':quest,'tid':tid,'taskData':taskData}}
              />
              <RootStack.Screen 
                name="homeregister"
                component={HomeRegisterStack}
                options={{ title: "Home", headerShown: false }}
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
              />
            </>
          ): <>
              <RootStack.Screen 
                name="home"
                component={HomeStack}
                options={{ title: "Home", headerShown: false }}
                initialParams={{'quest':quest,'tid':tid,'taskData':taskData,'completed':completed}}
              />
              <RootStack.Screen
                name="login"
                component={LogInStack}
                options={{headerShown: false}}
              />
              <RootStack.Screen 
                name="homeregister"
                component={HomeRegisterStack}
                options={{ title: "Home", headerShown: false }}
              />
            </>
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