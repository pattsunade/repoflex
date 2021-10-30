import React, { useState,useEffect,useRef } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native';
import * as Progress from 'react-native-progress';
import { Button, Divider,Icon } from "react-native-elements";
import * as firebase from "firebase";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackEndConnect from "../../utils/BackEndConnect";
import Toast from "react-native-easy-toast";
import OneSignal from 'react-native-onesignal';

export default function Home () {
  const navigation = useNavigation();
  const [matrix, setMatrix] = useState(0);
  const [num, setNum] = useState(0);
  const [loading, setLoading] = useState(true);
  var complete = [];
  var pending = [];
  const arr = 
  [ { "tit": "Información Personal",
      "desc": ""
    },
    { "tit": "Verificación de correo",
      "desc": ""
    },
    { "tit": "Documentación",
      "desc": "Necesitamos saber más de ti. Primero Completa tus datos, luego validaremos tu identidad."
    },
    { "tit": "Revisión de la postulación",
      "desc": "Nosotros nos encargamos de este paso. Estamos revisando tu solicitud de registro y verificando tu identidad"
    },
    { "tit": "Entrenamiento",
      "desc": "El curso en linea te tomará 15 minutos. Te enseñaremos todo lo que debes saber para realizar las tareas y generar dinero extra."
    },
    { "tit":  "Firma de Contrato Digital",
      "desc": "Lee y acepta nuestro contrato si estás de acuerdo con las condiciones de trabajo y formas de pago."
    }
  ];
  const toastRef = useRef();
  let documents;
  OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
    console.log("OneSignal: notification will show in foreground:", notificationReceivedEvent);
    let notification = notificationReceivedEvent.getNotification();
    console.log("notification: ", notification);
    const data = notification.additionalData;
    console.log("additionalData: ", data);
    if ("mtx" in data){
      console.log("viene mtx!");
      AsyncStorage.setItem('@mtx',data.mtx);
      getMatrix();
    }
    notificationReceivedEvent.complete(notification);
  });
  async function signOut()
  { await AsyncStorage.clear();
    navigation.navigate("login");
  }
  useEffect(async() => {
    var data = await getData();
    console.log((data[0][1].match(/1/g) || []).length);
    setNum((data[0][1].match(/1/g) || []).length);
    setMatrix(num*100)/parseInt(data[1][1]);
    console.log(num,matrix);
    const willFocusSubscription = navigation.addListener('focus', () => {
      data = getData();
      console.log("Me llamaron!");
    });
    return willFocusSubscription;
  },[])
  async function getData()
  { let values = await AsyncStorage.multiGet(['@mtx','@stp']);
    return values
  }
  async function setVar()
  { console.log("el num es-->",num);
    console.log("la mtx es-->",matrix);
    complete = arr.slice(0,num);
    pending = arr.slice(num);
    console.log("complete-->",complete);
    console.log("pending-->",pending);
    setLoading(false);
  }
  return(
    <ScrollView>
      { loading ?
        ( <View style={styles.loaderTask}>
            <ActivityIndicator  size="large" color="#0000ff"/>
            <Text>Cargando...</Text>
          </View>
        ):<>
          <View style={styles.viewContainer}>
            <Text style={styles.title} >Avance de mi registro</Text>
            <Progress.Bar progress={matrix/100} width={300} borderRadius={20} backgroundColor="#fff" height={25} color={"#6B35E2"} />
            <Text>{matrix} %</Text>
          </View>
          <View style={styles.viewContainer2}>
            <Text style={styles.subtitle}> Pasos Pendientes</Text>
            <TouchableOpacity style={styles.customBtn} onPress={() => 
              matrix == 22 ? navigation.navigate("documentselfie"): 
              matrix == 33 ? navigation.navigate("documentfront"):
              matrix == 44 ? navigation.navigate("documentreverse"):
              matrix == 56 ? navigation.navigate("documentcertificate"):
              matrix == 67 ? toastRef.current.show("¡Debes completar los pasos anteriores antes de continuar!",3000):
              matrix == 78 ? navigation.navigate("training"):
              navigation.navigate("firm")
            }>
            <View style={styles.wrapper}>
              <View style={styles.container}>
                <View>
                  <Icon
                    type="material-community"
                    name="circle"
                    iconStyle={styles.iconLeft1}
                    size={35}
                  />
                </View>
                <View>
                  <Text style={styles.customBtnText}>{pending[0][tit]}</Text>
                  <Text style={styles.customBtnTextContent}>{pending[0][desc]}</Text>
                </View>
              </View>
            </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.customBtn} onPress={() => {
              toastRef.current.show("¡Debes completar los pasos anteriores antes de continuar!",3000);
            }}>
            <View style={styles.wrapper}>
              <View style={styles.container}>
                <View>
                  <Icon
                    type="material-community"
                    name="circle"
                    iconStyle={styles.iconLeft3}
                    size={35}
                  />
                </View>
                {pending.map((index) =>
                  { <View>
                      <Text style={styles.customBtnText}>{pending[index][tit]}</Text>
                      <Text style={styles.customBtnTextContent}>{pending[index][desc]}</Text>
                    </View>
                  })
                }
              </View>
            </View>
            </TouchableOpacity>
            <Text style={styles.subtitle}> Pasos Completados</Text>
            <TouchableOpacity style={styles.customBtn} onPress={() => {
              toastRef.current.show("¡Ya completaste este paso!",3000);
            }}>
            <View style={styles.wrapper}>
              <View style={styles.container}>
                <View>
                <Icon
                  type="material-community"
                  name="circle"
                  iconStyle={styles.iconLeft2}
                  size={35}
                />
                </View>
                {complete.map((index)=>
                { <View>
                    <Text style={styles.customBtnText}>{complete[index][tit]}</Text>
                  </View>
                })
                }
              </View>
            </View>
            </TouchableOpacity>
          </View>
          <View>
          <Button
            title="Cerrar sesión"
            buttonStyle={styles.btnCloseSession}
            titleStyle={styles.CloseSessionText}
            onPress= {signOut}
          />
          </View>
          <Divider style= {styles.divider}/>
          <View style={styles.viewZolbit}>
            <Text >Un producto de <Text style = {styles.textZolbit}>Zolbit</Text></Text>
          </View>
          <Toast ref={toastRef} position="center" opacity={0.9}/>
        </>
      }
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  viewContainer:{
    marginRight:40,
    marginLeft:40,
    marginTop:15,
    marginBottom:5,
    justifyContent:"center",
    alignItems:"center",
  },
  viewContainer2:{
    marginRight:30,
    marginLeft:30,
    marginTop:10,
  },
  title:{
    fontWeight:"bold",
    paddingBottom:5,
    marginTop:10,
    marginBottom:10,
    fontSize:25,
    //color: "#6B35E2",
    justifyContent:"center"
  },
  title2:{
    fontWeight:"bold",
    paddingBottom:5,
    marginTop:10,
    marginBottom:10,
    fontSize:18,
    color:"#6B35E2",
    justifyContent:"center"
  },
  subtitle: {
    paddingBottom:10,
    paddingTop:30,
    fontSize:20,
  },
  btnCloseSession:{
    marginTop:30,
    borderRadius:0,
    backgroundColor:"#fff",
    borderTopWidth: 1,
    borderTopColor:"#e3e3e3",
    borderBottomWidth: 1,
    borderBottomColor:"#e3e3e3",
    paddingTop: 10,
    paddingBottom:10,
    marginBottom:20,
  },
  CloseSessionText:{
    color:"#6B35E2",
  },
  divider:{
    backgroundColor:"#6B35E2",
    marginHorizontal:40,
    marginTop:10,
  },
  textRegister:{
    flex: 1,
    alignItems:"center",
    justifyContent:"center",
    marginBottom:20,
  },
  customBtnText:{
    fontSize: 20,
    fontWeight: "400",
    marginVertical:5,
  },
  customBtnTextContent:{
    marginBottom:5,
    textAlign:"justify",
    marginRight:60,
  },
  customBtn:{
    backgroundColor:"#fff",
    paddingHorizontal:30,
    paddingVertical:5,
    borderRadius:30,
    marginTop:5 ,
    marginBottom:5
  },
  container:{
    flex:.5,
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:"center"
  },
  wrapper:{
    flex:1,
  },
  iconLeft1:{
    color: "#6B35E2",
    marginRight: 15,
  },
  iconLeft2:{
    color:"#6B35E2",
    marginRight:15,
  },
  iconLeft3:{
    color:"#DEDCF2",
    marginRight:15,
  },
  viewZolbit:{
    marginRight:40,
    marginLeft:40,
    marginTop:15,
    marginBottom:5,
    justifyContent:"center",
    alignItems:"center",
  },
  textZolbit: {
    fontWeight:"bold",
  },
  loaderTask:{
    marginTop:100,
    marginBottom:10,
    alignItems:"center",
  }
});