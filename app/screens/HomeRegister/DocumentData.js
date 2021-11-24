import React, { useState, useRef,useCallback } from "react";
import { StyleSheet, View, Text, } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useFocusEffect } from '@react-navigation/native';
import Loading from "../../components/Loading";
import DocumentDataForm from "../../components/HomeRegister/DocumentDataForm";
import BackEndConnect from "../../utils/BackEndConnect";

export default function DocumentData (props)
{
  const {navigation} = props;
  const [loading, setLoading] = useState(true);
  const [resultRegions, setResultRegions] = useState([]);
  const [resultBanks, setResultBanks] = useState([]);
  const [resultAccountType, setResultAccountType] = useState([]);
  useFocusEffect(
    useCallback(() =>
    { BackEndConnect("POST","regi0").then(async (response) =>
      { setResultRegions(response.ans.regiones);
        setResultBanks(response.ans.bancos);
        //setCountrys(resultcontrys);
        setResultAccountType(response.ans.actypes);
        setLoading(false);
      });
    }, [])
  );
  return (
    <KeyboardAwareScrollView>
      <View style={styles.viewForm}>
        { loading ? (<Loading isVisible={loading} text="Cargando..." />)
        :(<DocumentDataForm
            navigation={navigation} regions={resultRegions} banks={resultBanks} acctype={resultAccountType}
          />)
        }
      </View>
    </KeyboardAwareScrollView>
  )
}
const styles = StyleSheet.create({
  viewForm: {
    marginRight: 40,
    marginLeft: 40
  }
});
