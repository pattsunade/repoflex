import React, { useState,useRef,useCallback } from "react";
import { StyleSheet, View} from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-easy-toast";
import RegisterForm from "../../components/Login/RegisterForm";
import BackEndConnect from "../../utils/BackEndConnect"

export default function Register() {
  const toastRef = useRef();
  const [cities, setCities] = useState([]);
  const [banks, setBanks] = useState([]);
  const [countrys, setCountrys] = useState([]);
  const [accountType, setAccountType] = useState([]);
  useFocusEffect(
    useCallback(() => {
      const resultCities = [];
      const resultBanks = [];
      const resultcontrys = [];
      const resultAccountType = [];
      BackEndConnect("POST","reg00").then(async (response) => {
        for (var i = 0; i < response.ans.comunas.length; i++) {
          var counter = response.ans.comunas[i];
          resultCities.push([counter.name,counter.cod]);
        }
        for (var i = 0; i < response.ans.bancos.length; i++) {
          var counter = response.ans.bancos[i];
          resultBanks.push([counter.name,counter.cod]);
        }
        for (var i = 0; i < response.ans.paises.length; i++) {
          var counter = response.ans.paises[i];
          resultcontrys.push([counter.name,counter.cod]);
        }
        for (var i = 0; i < response.ans.actypes.length; i++) {
          var counter = response.ans.actypes[i];
          resultAccountType.push([counter.name,counter.cod]);
        }
        setCities(resultCities);
        setBanks(resultBanks);
        setCountrys(resultcontrys);
        setAccountType(resultAccountType);
        });
      }, [])
    );
    return(
      <KeyboardAwareScrollView>  
        <View style={styles.viewForm}>
          <RegisterForm toastRef={toastRef} cities={cities} banks={banks} countrys={countrys} accountType={accountType}/>
        </View>
        <Toast ref={toastRef} position="center" opacity={0.9} />
      </KeyboardAwareScrollView>
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
    }
});