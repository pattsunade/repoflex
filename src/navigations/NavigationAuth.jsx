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

function SplashScreen() {
	return (<View>  </View>);
}

function Navigation() {
	const RootStack = createStackNavigator();
	const [ott, setOtt] = useState();
	const [mtx, setMtx] = useState();
	const [stp, setStp] = useState();
	const [quest, setQuest] = useState();
	const [tid, setTid] = useState();
	const [backAnsFormat, setBackAnsFormat] = useState();
	const [completed, setCompleted] = useState();
	const [frontAnsFormat,setFrontAnsFormat] = useState();
	const [intro, setIntro] = useState();
	const [loading, setLoading] = useState(true);
  
	useEffect(() => { 
		const getOtt = async() => { 
			let data = AsyncStorage.multiGet(['@ott','@mtx','@stp','@quest','@tid','@backAnsFormat','@comp','@intro','@frontAnsFormat'])
			.then(async (ans) => { 
				console.log(ans);
				setOtt(ans[0][1]);
				setStp(ans[2][1]);
				if (ans[1][1] != null) {
					setMtx((ans[1][1].match(/1/g) || []).length);
				}
				setQuest(JSON.parse(ans[3][1]));
				setTid(parseInt(ans[4][1]));
				setBackAnsFormat(JSON.parse(ans[5][1]));
				setCompleted(parseInt(ans[6][1]));
				setIntro(parseInt(ans[7][1]));
				setFrontAnsFormat(JSON.parse(ans[8][1]));
				setLoading(false);
			});
		}
		getOtt();
	}, []);

	if(loading) {
		return <RootStack.Screen name="splash" component={SplashScreen} options={{headerShown: false}}/>
	}
	else if ( ott === null || ott === "null" ) {
		return (
			<RootStack.Navigator >
				<RootStack.Screen
						name="login"
						component={LogInStack}
						options={{headerShown: false}}
						initialParams={{'intro':intro}}
					/>
					<RootStack.Screen 
						name="home"
						component={HomeStack}
						options={{ headerShown: false }}
					/>
					<RootStack.Screen 
						name="homeregister"
						component={HomeRegisterStack}
						options={{ headerShown: false }}
						initialParams={{ mtx:mtx,stp:stp }}
					/>
					<RootStack.Screen 
						name="task"
						component={TaskStack}
						options={{ title: "Task", headerShown: false }}
						initialParams={{'quest':quest,'tid':tid,'backAnsFormat':backAnsFormat,'frontAnsFormat':frontAnsFormat}}
					/>
					<RootStack.Screen 
						name="account"
						component={AccountStack}
						options={{headerShown: false}}
					/>
			</RootStack.Navigator>)
	}
	else if ( stp>mtx ) {
		return (
			<RootStack.Navigator>
				<RootStack.Screen 
					name="homeregister"
					component={HomeRegisterStack}
					options={{ title: "Home", headerShown: false }}
					initialParams={{ mtx:mtx,stp:stp }}
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
					initialParams={{'quest':quest,'tid':tid,'backAnsFormat':backAnsFormat,'frontAnsFormat':frontAnsFormat}}
				/>
			</RootStack.Navigator>
		)
	}
	if ( quest !== null || quest === "null" ) {
		return (
			<RootStack.Navigator>
				<RootStack.Screen 
					name="task"
					component={TaskStack}
					options={{ title: "Task", headerShown: false }}
					initialParams={{'quest':quest,'tid':tid,'backAnsFormat':backAnsFormat,'completed':completed,'frontAnsFormat':frontAnsFormat}}
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
					initialParams={{'quest':quest,'tid':tid,'backAnsFormat':backAnsFormat}}
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
					initialParams={{ mtx:mtx,stp:stp }}
				/>
			</RootStack.Navigator>
		)
	}

	return (
		<RootStack.Navigator>
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
				initialParams={{'quest':quest,'tid':tid,'backAnsFormat':backAnsFormat,'frontAnsFormat':frontAnsFormat}}
			/>
			<RootStack.Screen 
				name="homeregister"
				component={HomeRegisterStack}
				options={{ title: "Home", headerShown: false }}
				initialParams={{ mtx:mtx,stp:stp }}
			/>
		</RootStack.Navigator>
	)
}


function NavigationAuth() {
	return (
		<NavigationContainer>
			<Navigation />
		</NavigationContainer>
		
	)
}

export default NavigationAuth
const styles = StyleSheet.create({
  loaderTask:{
    marginTop:100,
    marginBottom:10,
    alignItems:"center",
  },
});