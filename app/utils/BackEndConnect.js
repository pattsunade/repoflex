import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

export default function BackEndConnect(method=null, req=null, body=null){
  const ip = "http://104.237.140.131";
  const port = "30000";
  const dir = "/app";
  
  async function Connect(method, req, body, ott, txi, phid){
    let url = ip + ":" + port + dir;
    if (body == null){
      console.log("pidiendo datos");
      var backResponse = await fetch(url, {
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
          }
        }),
      });
      console.log(backResponse);
    }
    else 
    { console.log("enviando datos");
      var backResponse = await fetch(url, {
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
    }
    try{
      let toJson = await backResponse.json();
      let toAns = await JSON.parse(toJson.ans);
      console.log("Backans-->",toAns);
      return toAns;
    }
    catch(error){
      console.log("error-->",error);
      return false;
    }
  }

  ret1 = AsyncStorage.multiGet(['@ott','@txi']).then(async (ans) => {
    // console.log("ottSaved-->",ans);
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
    // const { status: existingStatus } = await Notifications.getPermissionsAsync();
    //   let finalStatus = existingStatus;
    //   console.log(finalStatus);
    const expoPushToken = await Notifications.getExpoPushTokenAsync({
      experienceId: '@electronico/repoflex',
    });
    // console.log(expoPushToken);
    // console.log(expoPushToken.data.slice(18,-1));
    ret2 = await Connect(method, req, body, prevOtt, txi, expoPushToken.data.slice(18,-1)).then(async (ans1) =>
      { try{
          if('mtx' in ans1.hdr)
            await AsyncStorage.multiSet([['@ott',ans1.hdr.ott],['@txi',ans1.hdr.txi.toString()],['@mtx',ans1.hdr.mtx]]);
          else
            await AsyncStorage.multiSet([['@ott',ans1.hdr.ott],['@txi',ans1.hdr.txi.toString()]]);
          if('stp' in ans1.ans)
            await AsyncStorage.setItem('@stp',ans1.ans.stp.toString());             
          return ans1;
        }
        catch(e){
          console.log(e);
        }
      });
    return ret2
    });
  return ret1;
}