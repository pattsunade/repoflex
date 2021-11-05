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
    // console.log("ott-->",ott);
    // console.log("txi-->",txi);
    // console.log("phid-->",phid);
    if (body == null){
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
    }
    else {
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

  ret1 = AsyncStorage.getItem('@ott').then(async (ans) => {
    // console.log("ottSaved-->",ans);
    if (ans == null || ans.length < 7){
      prevOtt = "null";
    }
    else {
      prevOtt = ans.substring(0,20);
    }
    var txi = await AsyncStorage.getItem('@txi');
    if (txi == null){
      txi = 1;
    }
    else {
      txi = parseInt(txi) + 1;
    }
    const expoPushToken = await Notifications.getExpoPushTokenAsync({
      experienceId: '@electronico/repoflex',
    });
    console.log(expoPushToken);
    console.log(expoPushToken.data);
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    console.log(finalStatus);
    ret2 = await Connect(method, req, body, prevOtt, txi, expoPushToken.data).then(async (ans1) =>
    { 
      if (ans1 == false)
      { Promise.reject("Problema json");
      }
      else
      { if('mtx' in ans1.hdr)
        { await AsyncStorage.multiSet([['@ott',ans1.hdr.ott],['@txi',ans1.hdr.txi.toString()],['@mtx',ans1.hdr.mtx]]);
        }
        else
        { await AsyncStorage.multiSet([['@ott',ans1.hdr.ott],['@txi',ans1.hdr.txi.toString()]]);
        }
        if('stp' in ans1.ans)
        { await AsyncStorage.setItem('@stp',ans1.ans.stp.toString());   
        }
        if(ans1.ans.stx == 'nk')
        { Toast.show({
            type: 'error',
            props: {onPress: () => {}, text1: 'Error', text2: 'Error de conexión, por favor intenta nuevamente '+ans1.ans.msg
            },
            autohide: false
          });
          Promise.reject("Problema tx");
        }
        else
        { return ans1;
        }
      }
    });
    return ret2
    });
  return ret1;
}