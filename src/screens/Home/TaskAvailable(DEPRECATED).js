import React, { useState,useCallback } from 'react';
import { StyleSheet, View,Text,ActivityIndicator} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';

import BackEndConnect from 'api/backendHandler';;
import ListTask from '../../components/Home/ListTask';

function formato() {
    return{
      tat: 1,
      lat: lati,
      lon: long
    };
  }

export default function TaskAvailable({route}) {
    const {lati,long} = route.params;
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [msg, setMsg] = useState('');

  

    useFocusEffect(useCallback(() => {
        BackEndConnect('POST','tasks',formato())
        .then(async (response) => { 
            const array = response.ans.tas;
            setMsg(response.ans.msg);
            setData(array);
            setLoading(false);
        })
        .catch((ans) => { 
            console.log(ans);
            Toast.show({ 
                type: 'error',
                props: { 
                    onPress: () => {}, 
                    text1: 'Error', 
                    text2: 'Error conexión. Porfavor inicia sesión nuevamente'
                }
            });
            navigation.reset({ 
                index: 0,
                routes: [{ 
                    name: 'login',
                }],
            });
        }
        );
    },[]));
    if (loading) {
        return (
            <View style={styles.loaderTask}>
                <ActivityIndicator  size='large' color='#0000ff'/>
                <Text>Cargando Tareas...</Text>
            </View>
        )
    } 
    return(
  <>
    {
      data == null ?
      ( <View>
          <Text style={styles.title}>{msg}</Text>
        </View>
      ):
      ( <View style={styles.viewForm}>
          <ListTask data={data} start={true} assign={true}/>
        </View>
      )
    }
  </>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: '100%',
    height: 150,
    marginTop: 20,  
  },
  viewForm: {
    marginRight: 10,
    marginLeft: 10,
  },
  loaderTask: {
    marginTop:100,
    marginBottom: 10,
    alignItems: 'center',
  },
  title:{
    textAlign: 'center',
    fontWeight:'bold',
    paddingBottom:5,
    marginTop:10,
    marginBottom:10,
    fontSize:20,
    //color: '#6B35E2',
    justifyContent:'center'
  }
});