import React, { useState,useCallback,useEffect } from "react";
import {StyleSheet,View,ActivityIndicator,Text} from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import HomeApp from "../../components/Home/HomeApp";
import BackEndConnect from "../../utils/BackEndConnect";
import Toast from 'react-native-toast-message';
import * as Notifications from 'expo-notifications';
import * as Location from 'expo-location';

export default function Register() {
  const [amou, setAmou] = useState();
  const [asgn, setAsgn] = useState();
  const [avai, setAvai] = useState();
  const [fini, setFini] = useState();
  const [proc, setProc] = useState();
  const [chck, setChck] = useState();
  const [acce, setAcce] = useState();
  const [loca, setLoca] = useState();
  const [name, setName] = useState();
  const [noti, setNoti] = useState();
  const [rank, setRank] = useState();
  const [work, setWork] = useState();
  const [loading, setLoading] = useState(true);

  function formato(lati,longi)
  { return{
      lat: lati,
      lon: longi
    };
  }
  function datos(response) {
    return{
      amou: response.ans.amou,
      asgn: response.ans.asgn,
      avai: response.ans.avai,
      chck: response.ans.chck,
      fini: response.ans.fini,
      loca: response.ans.loca,
      name: response.ans.name,
      noti: response.ans.noti,
      rank: response.ans.rank,
      work: response.ans.work,
    };
  }
  useFocusEffect(
    useCallback(() => 
    { (async () => 
      { let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        BackEndConnect("POST","house",formato(location.coords.latitude.toString(),
          location.coords.longitude.toString()))
        .then(async (response) => 
          { const notificaciones = [];
            for (var i = 0; i < response.ans.noti.length; i++)
            { var counter = response.ans.noti[i];
              notificaciones.push(counter);
            }
            setAmou(response.ans.amou);
            setAsgn(response.ans.asgn);
            setAvai(response.ans.avai);
            setAcce(response.ans.acce);
            setProc(response.ans.proc);
            setChck(response.ans.chck);
            setFini(response.ans.fini);
            setName(response.ans.name);
            setLoca(response.ans.loca);
            setNoti(notificaciones);
            setRank(response.ans.rank);
            setWork(response.ans.work);
            setLoading(false);
          })
        .catch((ans) => 
          { console.log(ans);
            navigation.reset(
            { index: 0,
              routes: [
                {
                  name: 'login',
                }
              ],
            });
            // Toast.show(
            // { type: 'error',
            //   props: {onPress: () => {}, text1: 'Error', text2: 'Error de conexión, por favor inicia sesión nuevamente'
            // }
            // });
          }
        );
      })();
    },[])
  );
  return(
    <>
      { loading ? 
        (<View style={styles.loaderTask}>
            <ActivityIndicator  size="large" color="#0000ff"/>
            <Text>Cargando</Text>
          </View>):
        ( <KeyboardAwareScrollView>
            <View style={styles.viewForm}>
              <HomeApp
                amou={amou}
                asgn={asgn}
                avai={avai}
                chck={chck}
                acce={acce}
                proc={proc}
                fini={fini}
                loca={loca}
                name={name}
                noti={noti}
                rank={rank}
                work={work}
              />
            </View>
        </KeyboardAwareScrollView>
      )
    }
    </>
  );
}
const styles = StyleSheet.create({
    logo: {
        width: "100%",
        height: 150,
        marginTop: 20,
    },
    viewForm: {
        marginRight: 40,
        marginLeft: 40,
    },
    loaderTask: {
      marginTop:100,
      marginBottom: 10,
      alignItems: "center",
    },
});