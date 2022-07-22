import React, { useState,useEffect,useCallback } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { Divider } from "react-native-elements";
import { useFocusEffect } from '@react-navigation/native';
import PersonalDataForm from "../../components/Account/PersonalDataForm";
import Loading from "../../components/Loading";
import Toast from 'react-native-toast-message';
import BackEndConnect from 'api/backendHandler';;
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import usdat from "api/transacciones/usdat";

export default function PersonalData({route}) {
  const [data,setData] = useState({});
  const [lists,setLists] = useState({});
  const [comunas, setComunas] = useState({});
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const usr = route.params.usr;

  function formato(usr)
  { return{
      usr: usr
    };
  }

  function gecomFormat(regi)
  { return{
      reg:regi
    }
  }

  useEffect(
    useCallback(() => { 
      usdat({user: usr})
      .then(async (response) => { 
        if(response.ans.stx != 'ok')
        { Toast.show(
            { type: 'error',
              props: 
              { onPress: () => {}, text1: 'Error', text2: "Error conexión. Porfavor intenta más tarde"
              }
            }
          );
          navigation.goBack();
        }
        else
        { setData(response.ans);
          BackEndConnect("POST","regi0").then(async (response2) =>
          { setLists(response2.ans);
            setLoading(false);
            // BackEndConnect("POST","gecom",gecomFormat(response.ans.regi)).then((response3)=>
            // { setComunas(response3.ans);
            //   setLoading(false);
            // })
          })
          .catch((ans) => 
          { console.log(ans);
            Toast.show(
              { type: 'error',
                props: 
                { onPress: () => {}, text1: 'Error', text2: "Error conexión. Porfavor intenta más tarde"
                }
              }
            );
            navigation.goback();
          })
        }
      }).catch((ans) => 
        { console.log(ans);
          Toast.show(
            { type: 'error',
              props: 
              { onPress: () => {}, text1: 'Error', text2: "Error conexión. Porfavor intenta más tarde"
              }
            }
          );
          navigation.goback();
        });
    })
  ,[usr]);
  

  return (
    <ScrollView>
      { loading ? (<Loading isVisible={loading} text="Obteniendo datos..." />)
        :(<View style={styles.viewContainer} >
            <PersonalDataForm data={data} lists={lists} />
          </View>)
      }
      <Divider style= {styles.divider} />
      <View style={styles.textRegister}>
        <Text>Un producto de Zolbit</Text>    
      </View>
    </ScrollView>
    )
}

const styles = StyleSheet.create({
  logo:{
    width: "100%",
    height: 150,
    marginTop: 70
  },
  viewContainer:{
    marginRight: 30,
    marginLeft: 30
  },
  textRegister:{    
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  btnRegister:{
    color: "#6B35E2",
    fontWeight: "bold"
  },
  divider:{
    backgroundColor: "#6B35E2",
    margin: 30
  }
});