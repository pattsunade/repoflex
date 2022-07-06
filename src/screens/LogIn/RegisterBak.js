import React, { useState,useRef,useCallback } from "react";
import { StyleSheet, View} from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import RegisterForm from "../../components/Login/RegisterForm";
import BackEndConnect from 'api/backendHandler'
import Loading from "../../components/Loading";

export default function Register() {
  const [cities, setCities] = useState([]);
  const [banks, setBanks] = useState([]);
  const [countrys, setCountrys] = useState([]);
  const [accountType, setAccountType] = useState([]);
  const [loading, setLoading] = useState(true);
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
        setLoading(false);
        });
      }, [])
    );
    return(
      <KeyboardAwareScrollView>  
        <View style={styles.viewForm}>
          <RegisterForm cities={cities} banks={banks} countrys={countrys} accountType={accountType}/>
        </View>
        <Loading isVisible={loading} text="Cargando"/>
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