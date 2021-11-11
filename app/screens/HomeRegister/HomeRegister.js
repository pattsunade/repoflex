import React, {useState,useEffect,useRef} from "react";
import {StyleSheet,Text,View,ScrollView,TouchableOpacity,AppState} from 'react-native';
import * as Progress from 'react-native-progress';
import * as TaskManager from 'expo-task-manager';
import { Button, Divider,Icon } from "react-native-elements";
import * as firebase from "firebase";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackEndConnect from "../../utils/BackEndConnect";
import Toast from 'react-native-toast-message';
import Loading from "../../components/Loading";
import * as Notifications from 'expo-notifications';

export default function Home () {
  const navigation = useNavigation();
  const appState = useRef(AppState.currentState);
  const [loading, setLoading] = useState(true);
  const [matrix, setMatrix] = useState(0);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  let documents;
  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      let mtx = notification.request.content.data.mtx;
      if (mtx != null)
      { AsyncStorage.setItem('@mtx',mtx);
        getMatrix();
      }
    });
    return () => subscription.remove();
  }, []);
  const BACKGROUND_NOTIFICATION_TASK = 'BACKGROUND-NOTIFICATION-TASK';

  TaskManager.defineTask(BACKGROUND_NOTIFICATION_TASK, ({ data, error, executionInfo }) => {
    console.log('Received a notification in the background!');
    mtxObj = JSON.parse(data.notification.data.body);
    AsyncStorage.setItem('@mtx',mtxObj.mtx);
    getMatrix();
  });

  Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);
  
  async function signOut()
  { await AsyncStorage.multiRemove(['@ott','@mtx','@stp']);
    navigation.reset(
    { index: 0,
      routes: [
        {
          name: 'login',
        }
      ],
    });
  }

  useEffect(() => {
    const willFocusSubscription = navigation.addListener('focus', () => {
      getMatrix();
      console.log("llamaron al focus");
    });
    console.log("Me llamaron!");
    return willFocusSubscription;
  },[navigation]);

  // useEffect(() =>
  // { const subscription = AppState.addEventListener("change", nextAppState => {
  //     if ( appState.current.match(/inactive|background/) &&
  //       nextAppState === "active") 
  //     { BackEndConnect("POST","matrx").then((ans)=>{
  //       getMatrix();
  //     })
  //       console.log("App has come to the foreground!");
  //     }
  //     appState.current = nextAppState;
  //     setAppStateVisible(appState.current);
  //     console.log("AppState", appState.current);
  //   });
  //   // return () => subscription.remove();
  // }, []);

  async function getMatrix() {
    let stp = await AsyncStorage.getItem('@stp');
    if(loading)
    { BackEndConnect("POST","matrx").then((ans)=>{
        var mtx = ans.hdr.mtx;
        setMatrix(Math.round((((mtx.match(/1/g) || []).length)*100)/parseInt(stp)));
        setLoading(false);
      })
    }
    else
    { let mtx = await AsyncStorage.getItem('@mtx');
      setMatrix(Math.round((((mtx.match(/1/g) || []).length)*100)/parseInt(stp)));
    }
    console.log("Llamaron a getmatrix");
  }
  console.log("Matrix",matrix);
  if (loading)
  { return <Loading isVisible={true} text="Cargando..." />
  }
  else if (matrix < 67){
    return(
      <ScrollView>
        <View style={styles.viewContainer}>
          <Text style={styles.title} >Avance de mi registro</Text>
          <Progress.Bar progress={matrix/100} width={300} borderRadius={20} backgroundColor="#fff" height={25} color={"#6B35E2"} />
          <Text>{matrix} %</Text>
        </View>
        <View style={styles.viewContainer2}>
          <Text style={styles.subtitle}> Pasos Pendientes</Text>
          <TouchableOpacity style={styles.customBtn} onPress={() => 
            matrix < 33 ? navigation.navigate("documentselfie"): 
            matrix < 44 ? navigation.navigate("documentfront"):
            matrix < 56 ? navigation.navigate("documentreverse"):
            navigation.navigate("documentcertificate")   
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
                <Text style={styles.customBtnText}>Documentación</Text>
                <Text style={styles.customBtnTextContent} >Necesitamos saber más de ti. Primero Completa tus datos, luego validaremos tu identidad.</Text>
              </View>
            </View>
          </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.customBtn} onPress={() => {
            Toast.show(
              { type: 'error',
                props: {onPress: () => {}, text1: 'Error', text2: "Debes completar los pasos anteriores."
                }
              });
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
              <View>
                <Text style={styles.customBtnText}>Revisión de la Postulación</Text>
                <Text style={styles.customBtnTextContent} >Nosotros nos encargamos de este paso. Estamos revisando tu solicitud de registro y verificando tu identidad.</Text>
              </View>
            </View>
          </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.customBtn} onPress={() => {
            Toast.show(
              { type: 'error',
                props: {onPress: () => {}, text1: 'Error', text2: "Debes completar los pasos anteriores."
                }
              });
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
              <View>
                <Text style={styles.customBtnText}>Entrenamiento</Text>
                <Text style={styles.customBtnTextContent} >El curso en linea te tomara 15 minutos. Te enseñaremos todo lo que debes saber para realizar las tareas y generar dinero extra.</Text>
              </View>
            </View>
          </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.customBtn} onPress={() => {
            Toast.show(
              { type: 'error',
                props: {onPress: () => {}, text1: 'Error', text2: "Debes completar los pasos anteriores."
                }
              });
            }
          }>
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
              <View>
                <Text style={styles.customBtnText}>Firma de Contrato Digital</Text>
                <Text style={styles.customBtnTextContent} >Lee y acepta nuestro contrato si estás de acuerdo con las condiciones de trabajo y formas de pago.</Text>
              </View>
            </View>
          </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.customBtn} onPress={() => {
            Toast.show(
              { type: 'error',
                props: {onPress: () => {}, text1: 'Error', text2: "Debes completar los pasos anteriores."
                }
              });
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
              <View>
                <Text style={styles.customBtnText}>Pantalla final</Text>
              </View>
            </View>
          </View>
          </TouchableOpacity>
          <Text style={styles.subtitle}> Pasos Completados</Text>
          <TouchableOpacity style={styles.customBtn} onPress={() => {
            Toast.show(
              { type: 'error',
                props: {onPress: () => {}, text1: 'Error', text2: "Ya completaste este paso!"
                }
              });
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
              <View>
                <Text style={styles.customBtnText}>Información Personal</Text>
              </View>
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
      </ScrollView>
    )
  }
  else if (matrix <= 67){
    return(
      <ScrollView>
        <View style={styles.viewContainer}>
          <Text style={styles.title} >Avance de mi registro</Text>
          <Progress.Bar progress={matrix/100} width={300} borderRadius={20} backgroundColor="#fff" height={25} color={"#6B35E2"} />
          <Text>{matrix} %</Text>
        </View>
        <View style={styles.viewContainer2}>
          <Text style={styles.subtitle}> Pasos Pendientes</Text>
          <TouchableOpacity style={styles.customBtn} onPress={() => {}} >
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
                <Text style={styles.customBtnText}>Revisión de la Postulación</Text>
                <Text style={styles.customBtnTextContent} >Nosotros nos encargamos de este paso. estamos revisando tu solicitud de registro y verificando tu identidad.</Text>
              </View>
            </View>
          </View>  
          </TouchableOpacity>
          <TouchableOpacity style={styles.customBtn} onPress={() => {
              Toast.show(
              { type: 'error',
                props: {onPress: () => {}, text1: 'Error', text2: "Te informaremos cuando puedas continuar."
                }
              });
          }} >
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
              <View>
                <Text style={styles.customBtnText}>Entrenamiento</Text>
                <Text style={styles.customBtnTextContent} >El curso en linea te tomara 15 minutos. Te ensenaremos todo lo que debes saber para realizar las tareas y generar dinero extra.</Text>
              </View>
            </View>
          </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.customBtn} onPress={() => {
            Toast.show(
              { type: 'error',
                props: {onPress: () => {}, text1: 'Error', text2: "Te informaremos cuando puedas continuar."
                }
              });
          }} >
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
              <View>
                <Text style={styles.customBtnText}>Firma de Contrato Digital</Text>
                <Text style={styles.customBtnTextContent} >Lee y acepta nuestro contrato si estas de acuerdo con las condiciones de trabajo y formas de pago. </Text>
              </View>
            </View>
          </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.customBtn} onPress={() => {
            Toast.show(
              { type: 'error',
                props: {onPress: () => {}, text1: 'Error', text2: "Te informaremos cuando puedas continuar."
                }
              });
          }} >
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
              <View>
                <Text style={styles.customBtnText}>Pantalla final</Text>
             </View>
            </View>
          </View>
          </TouchableOpacity>
          <Text style={styles.subtitle}> Pasos Completados</Text>
          <TouchableOpacity style={styles.customBtn} onPress={() => {}} >
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
              <View>
                <Text style={styles.customBtnText}>Información Personal</Text>
              </View>
            </View>
          </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.customBtn} onPress={() => {
            Toast.show(
              { type: 'error',
                props: {onPress: () => {}, text1: 'Error', text2: "Ya completaste este paso!"
                }
              });
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
                <View>
                  <Text style={styles.customBtnText}>Documentación</Text>
                  <Text style={styles.customBtnTextContent} >Hemos recibido tus documentos, porfavor continua con el resto de los pasos.</Text>
                </View>
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
      <Divider style={styles.divider}/>
      <View style={styles.viewZolbit}>
        <Text>Un producto de <Text style = {styles.textZolbit}>Zolbit</Text></Text>
      </View>
    </ScrollView>
  )
  }
  else if (matrix <= 78){
    return(
      <ScrollView>
        <View style={styles.viewContainer}>
          <Text style={styles.title} >Avance de mi registro</Text>
          <Progress.Bar progress={matrix/100} width={300} borderRadius={20} backgroundColor="#fff" height={25} color={"#6B35E2"} />
          <Text>{matrix} %</Text>
        </View>
        <View style={styles.viewContainer2}>
          <Text style={styles.subtitle}> Pasos Pendientes</Text>
          <TouchableOpacity style={styles.customBtn} onPress={() => navigation.navigate("training")} >
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
                  <Text style={styles.customBtnText}>Entrenamiento</Text>
                  <Text style={styles.customBtnTextContent} >El curso en línea te tomara 15 minutos. Te enseñaremos todo lo que debes saber para realizar las tareas y generar dinero extra.</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.customBtn} onPress={() => {
            Toast.show(
              { type: 'error',
                props: {onPress: () => {}, text1: 'Error', text2: "Debes completar los pasos anteriores."
                }
              });
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
              <View>
                <Text style={styles.customBtnText}>Firma de Contrato Digital</Text>
                <Text style={styles.customBtnTextContent} >Lee y acepta nuestro contrato si estas de acuerdo con las condiciones de trabajo y formas de pago.</Text>
              </View>
            </View>
          </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.customBtn} onPress={() => {
            Toast.show(
              { type: 'error',
                props: {onPress: () => {}, text1: 'Error', text2: "Debes completar los pasos anteriores."
                }
              });
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
                <View>
                  <Text style={styles.customBtnText}>Pantalla final</Text>
               </View>
            </View>
            </View>
            </TouchableOpacity>
            <Text style={styles.subtitle}> Pasos Completados</Text>
            <TouchableOpacity style={styles.customBtn} onPress={() => {}} >
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
                <View >
                  <Text style={styles.customBtnText}>Información Personal</Text>
                </View>
              </View>
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.customBtn} onPress={() => {
          Toast.show(
            { type: 'error',
              props: {onPress: () => {}, text1: 'Error', text2: "Ya completaste este paso!"
              }
            });
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
            <View>
              <Text style={styles.customBtnText}>Documentación</Text>
              <Text style={styles.customBtnTextContent} >Hemos recibido tus documentos, porfavor continua con el resto de los pasos.</Text>
            </View>
          </View>
        </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.customBtn} onPress={() => {
          Toast.show(
              { type: 'error',
                props: {onPress: () => {}, text1: 'Error', text2: "Ya completaste este paso!"
                }
              });
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
            <View>
              <Text style={styles.customBtnText}>Revisión de la Postulación</Text>
              <Text style={styles.customBtnTextContent}>¡Ya has sido aprobado para ganar dinero extra con repoflex!</Text>
            </View>
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
        <Divider style={styles.divider}/>
        <View style={styles.viewZolbit}>
          <Text>Un producto de <Text style = {styles.textZolbit}>Zolbit</Text></Text>
        </View>
      </ScrollView>
    )
  }
  else if (matrix <= 89){
    return(
      <ScrollView>
        <View style={styles.viewContainer}>
          <Text style={styles.title} >Avance de mi registro</Text>
          <Progress.Bar progress={matrix/100} width={300} borderRadius={20} backgroundColor="#fff" height={25} color={"#6B35E2"} />
          <Text>{matrix} %</Text>
        </View>
        <View style={styles.viewContainer2}>
          <Text style={styles.subtitle}> Pasos Pendientes</Text>
          <TouchableOpacity style={styles.customBtn} onPress={() => navigation.navigate("firm")} >
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
                <Text style={styles.customBtnText}>Firma de Contrato Digital</Text>
                <Text style={styles.customBtnTextContent} >Lee y acepta nuestro contrato si estas de acuerdo con las condiciones de trabajo y formas de pago. </Text>
              </View>
            </View>
          </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.customBtn} onPress={() => {
            Toast.show(
              { type: 'error',
                props: {onPress: () => {}, text1: 'Error', text2: "Debes completar los pasos anteriores."
                }
              });
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
              <View>
                <Text style={styles.customBtnText}>Pantalla final</Text>
             </View>
            </View>
          </View>
          </TouchableOpacity>
          <Text style={styles.subtitle}> Pasos Completados</Text>
          <TouchableOpacity style={styles.customBtn} onPress={() => {
            Toast.show(
              { type: 'error',
                props: {onPress: () => {}, text1: 'Error', text2: "Ya completaste este paso!"
                }
              });
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
              <View>
                <Text style={styles.customBtnText}>Información Personal</Text>
              </View>
            </View>
          </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.customBtn} onPress={() => {
            Toast.show(
              { type: 'error',
                props: {onPress: () => {}, text1: 'Error', text2: "Ya completaste este paso!"
                }
              });
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
              <View>
                <Text style={styles.customBtnText}>Documentación</Text>
                <Text style={styles.customBtnTextContent} >Hemos recibido tus documentos, porfavor continua con el resto de los pasos.</Text>
              </View>
            </View>
          </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.customBtn} onPress={() => {
            Toast.show(
              { type: 'error',
                props: {onPress: () => {}, text1: 'Error', text2: "Ya completaste este paso!"
                }
              });
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
              <View>
                <Text style={styles.customBtnText}>Revisión de la Postulación</Text>
                <Text style={styles.customBtnTextContent}>¡Ya has sido aprobado para ganar dinero extra con repoflex!</Text>
              </View>
            </View>
          </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.customBtn} onPress={() => {
            Toast.show(
              { type: 'error',
                props: {onPress: () => {}, text1: 'Error', text2: "Ya completaste este paso!"
                }
              });
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
              <View>
                <Text style={styles.customBtnText}>Entrenamiento</Text>
                <Text style={styles.customBtnTextContent}>Ya has aprobado el entrenamiento, ¡Felicidades!</Text>
              </View>
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
        <Divider style={styles.divider}/>
        <View style={styles.viewZolbit}>
          <Text>Un producto de <Text style = {styles.textZolbit}>Zolbit</Text></Text>
        </View>
      </ScrollView>
    )
  }
else {
  return(
    <View>
      <View>
        <Button
          title="Cerrar sesión"
          buttonStyle={styles.btnCloseSession}
          titleStyle={styles.CloseSessionText}
          onPress= {signOut}
        />
      </View>
      <Divider style={styles.divider}/>
      <View style={styles.viewZolbit}>
        <Text>Un producto de <Text style = {styles.textZolbit}>Zolbit</Text></Text>
      </View>
    </View>
    )
  }
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
  }
});



  // OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
  //   console.log("OneSignal: notification will show in foreground:", notificationReceivedEvent);
  //   let notification = notificationReceivedEvent.getNotification();
  //   console.log("notification: ", notification);
  //   const data = notification.additionalData;
  //   console.log("additionalData: ", data);
  //   if ("mtx" in data){
  //     console.log("viene mtx!");
  //     AsyncStorage.setItem('@mtx',data.mtx);
  //     getMatrix();
  //   }
  //   notificationReceivedEvent.complete(notification);
  // });