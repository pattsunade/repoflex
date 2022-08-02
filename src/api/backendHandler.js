import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { API } from 'api/constants';
import Semaphore from './semaforo';

// semaforo que controla la cantidad request que se hacen al mismo tiempo
const throttler = new Semaphore(1);

const connect = async(method, req, body, ott, txi, phid) => {
	// console.log("> body", JSON.stringify(body))
	let backResponse = await fetch(API, {
		method: method,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			"hdr": { 
				"txi": txi,
				"req": req,
				"ott": ott,
				"phid": phid
			},
			"dat": body
		}),
	});
	try {
		let toJson = await backResponse.json();
		let toAns = await JSON.parse(toJson.ans);
		console.log("Backans-->",toAns);
		return toAns;
	} catch(error) {
		// console.log("error-->",error);
		return false;
	}
}

// Esta parte del codigo es un asco, pero funciona llamandao una callback
// No entiendo como funciona lo de la matriz
const handleRequest =  async(cb,method=null, req=null, body=null) => {
	let ret1 = await AsyncStorage.multiGet(['@ott','@txi']).then(async (ans) => {
		let prevOtt;
		let txi;
		
		if (ans[0][1] == null || ans[0][1].length < 7){
		  prevOtt = "null";
		}
		else {
		  prevOtt = ans[0][1].substring(0,20);
		}
		if (ans[0][1] == null){
		  txi = 1;
		}
		else {
		  txi = parseInt(ans[1][1]) + 1;
		}
		const expoPushToken = await Notifications.getExpoPushTokenAsync({
		  experienceId: '@electronico/repoflex',
		});
		// console.log(expoPushToken);
		// console.log(expoPushToken.data.slice(18,-1));
		let ret2 = await connect(method, req, body, prevOtt, txi, expoPushToken.data.slice(18,-1))
		.then(async(ans1) => { 
			// console.log("connect ans", ans1);
			try{
			  if('mtx' in ans1.hdr)
				await AsyncStorage.multiSet([['@ott',ans1.hdr.ott],['@txi',ans1.hdr.txi.toString()],['@mtx',ans1.hdr.mtx]]);
			  else
				await AsyncStorage.multiSet([['@ott',ans1.hdr.ott],['@txi',ans1.hdr.txi.toString()]]);
			  if('stp' in ans1.ans)
				await AsyncStorage.setItem('@stp',ans1.ans.stp.toString());

			  return cb(ans1);
			}
			catch(e){
			  console.log(e);
			}
		  });
		});
}
// maneja la request que se debe procesar
const throttleRequest = async(cb, method=null, req=null, body=null) => {
	await throttler.callFunction(handleRequest, cb, method, req, body)
		.catch(error => console.log(error))
}

// encapsula la request
const backendRequest = async(...args) => { 
    let fetchedData;
    await throttleRequest((request) => {fetchedData = request}, ...args)
	// console.log("fetchedData", fetchedData)
    return fetchedData
}

export default backendRequest;