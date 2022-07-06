import React, { useState,useRef,useCallback } from "react";
import { StyleSheet, Text, View, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { Button, Divider,Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import TermsAndConditions from "../../components/HomeRegister/TermsAndConditions";
import Loading from "../../components/Loading";
import terco from "api/transacciones/terco";

export default function Firm () {
    const navigation = useNavigation();
    const [masterTitle, setMasterTitle] = useState();
    const [paragraph, setParagraft] = useState([]);
    const [fut, setFut] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useFocusEffect(
        useCallback(() => { 
        terco("POST","terco")
        .then(async (response) => { 
            if (response.ans.stx === "ok") { 
                var mst = response.ans.mat;
                setMasterTitle(mst);
                setParagraft(response.ans.par);
                setFut(response.ans.fut);
                setLoading(false);
            }
            else
            { Toast.show({
            type: 'error',
            props: {onPress: () => {}, text1: 'Error', text2: 'Error de conexión, por favor intenta más tarde' + response.ans.stx
                }
            });
            navigation.reset(
            { index: 0,
                routes: [
                { name: 'login',
                }
                ],
            });
            setLoading(false);
            }
        })
        .catch((response) =>
        { Toast.show({
            type: 'error',
            props: {onPress: () => {}, text1: 'Error', text2: 'Error de conexión, por favor intenta más tarde' + response.ans.stx
                }
            });
            navigation.reset(
            { index: 0,
            routes: [
                { name: 'login',
                }
            ],
            });
            setLoading(false);
        });
        }, [])
    );

  return (
    <ScrollView>
      { loading ? (<Loading isVisible={loading} text="Cargando..." />)
        :(<View>
            <TermsAndConditions navigation={navigation} masterTitle={masterTitle} paragraph={paragraph} fut={fut}/>
          </View>)
      }
      {/*<View>
        <TermsAndConditions navigation={navigation} masterTitle={masterTitle} paragraph={paragraph} fut={fut}/>
      </View>  */}
      <Divider style= {styles.divider} />
      <View style={styles.viewZolbit}>
        <Text >Un producto de <Text style = {styles.textZolbit}>Zolbit</Text></Text>    
      </View>
      {/*<Loading isVisible={loading} text="Cargando..."/>*/}
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
  },
  divider:{
    backgroundColor:"#6B35E2",
    marginHorizontal:40,
    marginTop:10,
  }
});