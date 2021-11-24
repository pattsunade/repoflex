import React, { useState,useCallback,useEffect } from "react";
import {StyleSheet,View,ActivityIndicator,Text} from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import HomeApp from "../../components/Home/HomeApp";
import BackEndConnect from "../../utils/BackEndConnect";
import Toast from 'react-native-toast-message';
import * as Notifications from 'expo-notifications';
import * as Location from 'expo-location';
import { useNavigation } from "@react-navigation/native";

export default function Register() {
  const [name, setName] = useState();
  const [rank, setRank] = useState();
  const [amou, setAmou] = useState();
  const [avai, setAvai] = useState();
  const [asgn, setAsgn] = useState();
  const [proc, setProc] = useState();
  const [envi, setEnvi] = useState();
  const [chck, setChck] = useState();
  const [fini, setFini] = useState();
  const [loca, setLoca] = useState();
  const [noti, setNoti] = useState();
  const [tenp, setTenp] = useState();
  const [work, setWork] = useState();
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  function formato(lati,longi)
  { return{
      lat: lati,
      lon: longi
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
            setName(response.ans.name);
            setRank(response.ans.rank);
            setAvai(response.ans.avai);
            setAsgn(response.ans.asgn);
            setProc(response.ans.proc);
            setEnvi(response.ans.envi);
            setChck(response.ans.chck);
            setFini(response.ans.fini);
            setLoca(response.ans.loca);
            setNoti(notificaciones);
            setWork(response.ans.work);
            setLoading(false);
          })
        .catch((ans) => 
          { console.log(ans);
            Toast.show(
              { type: 'error',
                props: 
                { onPress: () => {}, text1: 'Error', text2: "Error conexión. Porfavor inicia sesión nuevamente"
                }
              }
            );
            navigation.reset(
            { index: 0,
              routes: [
                { name: 'login',
                }
              ],
            });
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
                name={name}
                amou={amou}
                rank={rank}
                avai={avai}
                asgn={asgn}
                proc={proc}
                envi={envi}
                chck={chck}
                fini={fini}
                loca={loca}
                noti={noti}
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
    marginTop: 20
  },
  viewForm: {
    marginRight: 40,
    marginLeft: 40
  },
  loaderTask: {
    marginTop:100,
    marginBottom: 10,
    alignItems: "center"
  }
});