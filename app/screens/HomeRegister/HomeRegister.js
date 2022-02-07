import React, {useState,useEffect,useRef} from 'react';
import {StyleSheet,Text,View,ScrollView,TouchableOpacity,AppState} from 'react-native';
import * as Progress from 'react-native-progress';
import * as TaskManager from 'expo-task-manager';
import { Button, Divider,Icon } from 'react-native-elements';
import * as firebase from 'firebase';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackEndConnect from '../../utils/BackEndConnect';
import Toast from 'react-native-toast-message';
import Loading from '../../components/Loading';
import * as Notifications from 'expo-notifications';

export default function HomeRegister({route}) {
  const {mtx,stp} = route.params;
  const navigation = useNavigation();
  const appState = useRef(AppState.currentState);
  const [loading, setLoading] = useState(true);
  const [percentage, setPercentage] = useState(mtx);
  const [count, setCount] = useState(null);
  const [completed, setCompleted] = useState([]);
  const [pending,setPending] = useState([])
  const activities = [{tit:'Información personal'},
    {tit:'Documentación',
    des:'Necesitamos saber más de ti. Ingresa la información que se solicitará para continuar.',
    scr:['documentdata','documentimage'],
    prm:[{mode:1},{mode:2},{mode:3},{mode:4}]
    },
    {tit:'Revisión',
    des:'Nosotros nos encargamos de este paso. Estamos revisando tu solicitud de registro y verificando tu identidad.',
    scr:'check'
    },
    {tit:'Entrenamiento',
    des:'El curso en linea te tomará 5 minutos. Te enseñaremos todo lo que debes saber para realizar las tareas y generar dinero extra.',
    scr:'training'
    },
    {tit:'Firma',
    des:'Lee y acepta nuestro contrato si estas de acuerdo con las condiciones de trabajo y formas de pago.',
    scr:'firm'
    }
    ];

  useEffect(async () => {
    const subscription = Notifications.addNotificationReceivedListener(async notification => {
      let notificationMtx = notification.request.content.data.mtx;
      await AsyncStorage.setItem('@mtx',notificationMtx);
      if(notificationMtx.includes('-'))
        rejected();
      else
        getMatrix((notificationMtx.match(/1/g) || []).length);
    });
    return () => subscription.remove();
  }, []);
  const BACKGROUND_NOTIFICATION_TASK = 'BACKGROUND-NOTIFICATION-TASK';

  TaskManager.defineTask(BACKGROUND_NOTIFICATION_TASK, async ({ data, error, executionInfo }) => {
    console.log('Received a notification in the background!');
    let mtxObj = JSON.parse(data.notification.data.body);
    await AsyncStorage.setItem('@mtx',mtxObj.mtx);
    if(mtxObj.mtx.includes('-'))
      rejected();
    else
      getMatrix((mtxObj.mtx.match(/1/g) || []).length);
  });

  Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);
  
  async function signOut()
  { await AsyncStorage.multiRemove(['@ott','@mtx','@stp','@usr']);
    navigation.reset(
    { index: 0,
      routes: [
        { name: 'login',
        }
      ],
    });
  }

  useEffect(() => {
    const willFocusSubscription = navigation.addListener('focus', () => {
      setLoading(true);
      getMatrix(null,null);
    });
    return willFocusSubscription;
  },[navigation]);

  async function getMatrix(matrix=mtx, steps=stp)
  { let per=null;
    let mtxCount=matrix;
    if(matrix==null)
    { let data = await AsyncStorage.multiGet(['@stp','@mtx']);
      steps = data[0][1];
      matrix = data[1][1];
      if(matrix.includes('-'))
        rejected();
      else
      { mtxCount = Math.round((matrix.match(/1/g) || []).length);
        per = Math.round((mtxCount*100)/parseInt(steps));
      }
    }
    else
      per = matrix*100/parseInt(steps);
    setPercentage(per);
    if(mtxCount>=7)
    { setCompleted(activities.slice(0,mtxCount-5));
      setPending(activities.slice(mtxCount-4));
    }
    else
    { setCompleted(activities.slice(0,1));
      setPending(activities.slice(2));
    }
    setCount(mtxCount);
    setLoading(false);
  }

  function rejected()
  { navigation.reset(
    { index: 0,
      routes: 
      [ { name: 'rejected'
        }
      ],
    });
  }

  return(
  <>
    { loading ? (<Loading text='Obteniendo datos...' />):
      (<ScrollView>
        <View style={styles.viewContainer}>
          <Text style={styles.title} >Avance de mi registro</Text>
          <Progress.Bar progress={percentage/100} width={300} borderRadius={20} backgroundColor='#fff' height={25} color={'#6B35E2'} />
          <Text>{percentage} %</Text>
        </View>
        <View style={styles.viewContainer2}>
          <Text style={styles.subtitle}>Siguiente Paso</Text>
          <TouchableOpacity style={styles.customBtn} onPress={() =>
            count>=7 ? (navigation.navigate(activities[count-5].scr)):
            (count<3 ? (navigation.navigate(activities[1].scr[0])):
              (navigation.navigate(activities[1].scr[1],activities[1].prm[count-3])))
          }>
            <View style={styles.container}>
              <Icon
                type='material-community'
                name='arrow-right-bold-circle'
                iconStyle={styles.iconLeft1}
                size={35}
              />
              <View style={styles.stepTextView}>
                { count>=7 ? (
                  <>
                    <Text style={styles.customBtnText}>{activities[count-5].tit}</Text>
                    <Text style={styles.customBtnTextContent}>{activities[count-5].des}</Text>
                  </>
                  ):
                  (<>
                    <Text style={styles.customBtnText}>{activities[1].tit}</Text>
                    <Text style={styles.customBtnTextContent}>{activities[1].des}</Text>
                  </>)
                }
              </View>
            </View>
          </TouchableOpacity>
          { pending.length > 0 && <Text style={styles.subtitle}>Pasos Pendientes</Text>
          }
          { pending.map((arr,index) =>
            { return(
                <TouchableOpacity key={index} style={styles.customBtn} onPress={() => {
                  Toast.show(
                    { type: 'error',
                      props: {onPress: () => {}, text1: 'Error', text2: 'Debes completar los pasos anteriores.'
                      }
                    });
                  }}>
                  <View style={styles.container}>
                    <Icon
                      type='material-community'
                      name='circle'
                      iconStyle={styles.iconLeft3}
                      size={35}
                    />                    
                    <View style={styles.stepTextView}>
                      <Text style={styles.customBtnText}>{arr.tit}</Text>
                      <Text style={styles.customBtnTextContent}>{arr.des}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            })
          }
          <Text style={styles.subtitle}>Pasos completados</Text>
          { completed.map((arr,index) =>
            { return(
                <TouchableOpacity key={index} style={styles.customBtn} onPress={() => {
                  Toast.show(
                    { type: 'error',
                      props: {onPress: () => {}, text1: 'Error', text2: 'Debes completar los pasos anteriores.'
                      }
                    });
                  }}>
                  <View style={styles.container}>
                    <Icon
                      type='material-community'
                      name='circle'
                      iconStyle={styles.iconLeft2}
                      size={35}
                    />                    
                    <View style={styles.stepTextView}>
                      <Text style={styles.customBtnText}>{arr.tit}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            })
          }
        </View>
        <Button
          title='Cerrar sesión'
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btnSignOut}
          onPress= {signOut}
        />
        <Divider style= {styles.divider}/>
        <View style={styles.viewZolbit}>
          <Text >Un producto de <Text style = {styles.textZolbit}>Zolbit</Text></Text>
        </View>
      </ScrollView>
      )
    }
  </>
  )
}
const styles = StyleSheet.create({
  viewContainer:{
    marginRight:40,
    marginLeft:40,
    marginTop:15,
    marginBottom:5,
    justifyContent:'center',
    alignItems:'center',
  },
  viewContainer2:{
    marginRight:30,
    marginLeft:30,
    marginTop:10,
  },
  title:{
    fontWeight:'bold',
    paddingBottom:5,
    marginTop:10,
    marginBottom:10,
    fontSize:25,
    //color: '#6B35E2',
    justifyContent:'center'
  },
  title2:{
    fontWeight:'bold',
    paddingBottom:5,
    marginTop:10,
    marginBottom:10,
    fontSize:18,
    color:'#6B35E2',
    justifyContent:'center'
  },
  subtitle: {
    paddingBottom:10,
    paddingTop:30,
    fontSize:20,
  },
  btnContainer:
  { marginTop: 1,
    width: '80%',
    marginLeft: 40
  },
  btnSignOut:{
    marginTop:20,
    borderRadius:20,
    borderTopWidth: 1,
    borderTopColor:'#e3e3e3',
    borderBottomWidth: 1,
    borderBottomColor:'#e3e3e3',
    paddingTop: 10,
    paddingBottom:10,
    marginBottom:10,
  },
  divider:{
    backgroundColor:'#6B35E2',
    marginHorizontal:40,
    marginTop:10,
  },
  textRegister:{
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
    marginBottom:20,
  },
  customBtnText:{
    fontSize: 20,
    fontWeight: '400',
    marginVertical:5,
  },
  customBtnTextContent:{
    marginBottom:5,
    marginRight:60,
  },
  customBtn:{
    backgroundColor:'#fff',
    paddingHorizontal:30,
    paddingVertical:5,
    borderRadius:30,
    marginTop:5 ,
    marginBottom:5
  },
  container:{
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center'
  },
  stepTextView:{
    flexDirection:'column'
  },
  wrapper:{
    flex:1,
  },
  iconLeft1:{
    color: '#6B35E2',
    marginRight: 15,
  },
  iconLeft2:{
    color:'#6B35E2',
    marginRight:15,
  },
  iconLeft3:{
    color:'#DEDCF2',
    marginRight:15,
  },
  viewZolbit:{
    marginRight:40,
    marginLeft:40,
    marginTop:15,
    marginBottom:5,
    justifyContent:'center',
    alignItems:'center',
  },
  textZolbit: {
    fontWeight:'bold',
  },
});



  // OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
  //   console.log('OneSignal: notification will show in foreground:', notificationReceivedEvent);
  //   let notification = notificationReceivedEvent.getNotification();
  //   console.log('notification: ', notification);
  //   const data = notification.additionalData;
  //   console.log('additionalData: ', data);
  //   if ('mtx' in data){
  //     console.log('viene mtx!');
  //     AsyncStorage.setItem('@mtx',data.mtx);
  //     getMatrix();
  //   }
  //   notificationReceivedEvent.complete(notification);
  // });