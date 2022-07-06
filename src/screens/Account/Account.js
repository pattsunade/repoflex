import React, {useRef, useState, useEffect,useContext} from "react";
import {StyleSheet, View, Text, ScrollView} from "react-native";
import { Button } from "react-native-elements";
import * as firebase from "firebase";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from "../../components/Loading";
import InfoUser from "../../components/Account/InfoUser";
import AccountOptions from "../../components/Account/AccountOptions";

export default function Account({route,navigation}) {
  const { nameuser,level} = route.params;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("");

  useEffect(() =>
  { AsyncStorage.getItem('@usr').then((ans)=>
    { setUser(ans);
      setLoading(false);
    })
  });

  function signOut()
  { AsyncStorage.multiRemove(['@ott','@tid','@quest','@taskData','@comp']).then(()=>
    { navigation.reset(
      { index: 0,
        routes: [
          { name: 'login',
          }
        ],
      });
    });
  }

  return(
    <ScrollView style={styles.viewUserInfo}>
      { loading ? (<Loading isVisible={loading} text="Obteniendo datos..." />)
        :(<>
            <InfoUser
              level={level}
              nameuser={nameuser}
            /> 
            <AccountOptions usr={user}/>
            <Button 
              title="Cerrar sesión"
              containerStyle={styles.btnContainer}
              buttonStyle={styles.btnFinish}
              onPress= {signOut}
            />
          </>)
      }
    </ScrollView>
  );
}

const styles = StyleSheet.create(
{ viewUserInfo:
  { minWidth: "100%",
    backgroundColor: "#f2f2f2",
  },
  btnContainer:
  { marginTop: 1,
    width: "85%",
    marginLeft: 30
  },
  btnFinish:{
    marginTop:20,
    borderRadius:20,
    borderTopWidth: 1,
    borderTopColor:"#e3e3e3",
    borderBottomWidth: 1,
    borderBottomColor:"#e3e3e3",
    paddingTop: 10,
    paddingBottom:10,
    marginBottom:10,
  }
})