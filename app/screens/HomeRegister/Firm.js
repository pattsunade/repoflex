import React, { useState,useRef,useCallback } from "react";
import { StyleSheet, Text, View, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { Button, Divider,Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import TermsAndConditions from "../../components/HomeRegister/TermsAndConditions";
import BackEndConnect from "../../utils/BackEndConnect";
import Loading from "../../components/Loading";

export default function Firm () {
  const navigation = useNavigation();
  const [TyCTitle, setTyCTitle] = useState();
  const [TyCBody, setTyCBody] = useState();
  const [loading, setLoading] = useState(false);
  
  useFocusEffect(
    useCallback(() =>
    { setLoading(true);
      BackEndConnect("POST","terco").then(async (response) => {
        var title = response.ans.tit;
        var body = response.ans.bod;
        setTyCTitle(title);
        setTyCBody(body);
        setLoading(false);
      })
      .catch((response) =>
      { console.log(response);
        Toast.show({
          type: 'error',
          props: {onPress: () => {}, text1: 'Error', text2: 'Error de conexión, por favor intenta más tarde'
            }
        });
        setLoading(false);
      });
    }, [])
  );

  return (
    <ScrollView>
      <View>
        <TermsAndConditions navigation={navigation} TyCTitle={TyCTitle} TyCBody={TyCBody} />
      </View>  
      <Divider style= {styles.divider} />
      <View style={styles.viewZolbit}>
        <Text >Un producto de <Text style = {styles.textZolbit}>Zolbit</Text></Text>    
      </View>
      <Loading isVisible={loading} text="Cargando..."/>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  viewZolbit:{
    justifyContent: "center",
    alignItems: "center",   
  },
  textZolbit: {
    fontWeight: "bold",
  }
});