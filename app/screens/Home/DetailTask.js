import React, { useState,useRef,useCallback } from 'react';
import { StyleSheet, View, Text,TouchableOpacity} from 'react-native';
import { Card } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-easy-toast';
import { useNavigation } from '@react-navigation/native';
import { Divider, Button } from 'react-native-elements';
import BackEndConnect from '../../utils/BackEndConnect';
import Loading from '../../components/Loading';

export default function DetailTask({route,navigation}) 
{ const {tit,typ,tid,pla,amo,det,tim,nqu,npi,nre,sig} = route.params;
  const [loading, setLoading] = useState(false);
  function formato() 
  { return{
      tid: tid,
    };
  }
  function assing()
  { setLoading(true);
    BackEndConnect('POST','assgn',formato()).then(async (response) => 
    { if(response.ans.stx!='ok'){
      Toast.show(
        { type: 'error',
          props: {onPress: () => {}, text1: 'Error', text2: response.ans.msg
          },
          autohide: false
        });
      }
      navigation.goBack();
      setLoading(false);
    })
    .catch((ans) =>
    { console.log(ans);
      Toast.show(
      { type: 'error',
        props: {onPress: () => {}, text1: 'Error', text2: 'Error de conexión, por favor intenta nuevamente '+ans1.ans.msg
        },
        autohide: false
      });
      setLoading(false);
    });
  }
  return(
  <>
    { loading ? (<Loading text='Asignando tarea...'/>)
      :(<Card style={styles.parentView}>
          <View style={styles.taskTypeView}>
            <View style={styles.circleView}>
              <Text style={styles.circleText}>{sig}</Text>
            </View>
            <Text style={styles.taskTypeText}>{typ}</Text>
          </View>
          <Text style={styles.taskTitleText}>{tit}</Text>
          <Text style={styles.textId}>id:{tid}</Text>
          <Divider style= {styles.divider} />
          <View style={styles.viewTareasTexto}>            
            <Text style={styles.taskText}>Lugar: <Text style={styles.taskDetail}>{pla}</Text></Text>
            <Text style={styles.taskText}>Detalle: <Text style={styles.taskDetail}>{det} </Text></Text>
            <Text style={styles.taskText}>A pagar: <Text style={styles.boldTaskDetail}>$ {amo}</Text></Text>
            <Text style={styles.taskText}>Tiempo de resolución: <Text style={styles.taskDetail}>{tim} min</Text></Text>
          </View>
          <Divider style= {styles.divider}/>
          <View style={styles.activityView}>
            <Text style={styles.activityTitleText}>DETALLE DE ACTIVIDADES</Text>
            <Text style={styles.activityDetailNumber}>{nqu} <Text>Preguntas</Text></Text>
            <Text style={styles.activityDetailNumber}>{npi} <Text>Fotografías</Text></Text>
            <Text style={styles.activityDetailNumber}>{nre} <Text>Reposición</Text></Text>
          </View>
          <View style={styles.btnView}>
            <Button
              title='Asignar'
              containerStyle={styles.btnContainer2}
              buttonStyle={styles.btn2}
              onPress={() =>assing()}
            />
            <Button
              title='Iniciar'
              containerStyle={styles.btnContainer2}
              buttonStyle={styles.btn2}
              onPress={() => 
                navigation.reset({ 
                  index: 0,
                  routes: 
                  [ { name: 'task',
                      params: {tid:tid,completed:0}
                    }
                  ],
                })
              }
            />
          </View>
        </Card>
      )
    }    
  </>
  );
}

const styles = StyleSheet.create(
{ parentView: 
  { marginRight: 10,
    marginLeft: 10,
    marginTop:20,
    borderWidth: 2,
    borderColor: '#000000'
  },
  taskTypeView:
  { flexDirection:'row',
    margin:3,
    borderRadius:1
  },
  circleView:
  { width:35,
    height:35,
    borderRadius:20,
    backgroundColor:'#6A17DF',
    justifyContent:'center',
    marginRight:5,
  },
  circleText:{
    fontWeight:'bold',
    fontSize:20,
    textAlign:'center',
    color:'#fff'
  },
  taskTypeText:
  { marginTop:8
  },
  viewTareasTexto:
  { flexDirection:'column',
    margin:1,
    borderRadius:1
  },
  btnView:
  { flexDirection:'row',
    justifyContent:'center'
  },
  taskDetailView:
  { flexDirection:'row',
    marginRight:10,
    borderRadius:1
  },
  taskTitleText:
  { fontWeight:'bold',
    fontSize: 20,
    paddingLeft:5
  },
  activityTitleText:
  { fontWeight:'bold',
    fontSize: 20,
    marginTop:10,
  },
  activityDetailNumber:
  { fontSize: 20,
    marginTop:10
  },
  textId:
  { paddingLeft:5,
    fontSize: 10
  },
  taskText:
  { marginLeft:5,
    marginRight:19,
    fontSize: 20
  },
  taskDetail:
  { fontSize: 20
  },
  boldTaskDetail:
  { fontSize: 20,
    fontWeight: 'bold'
  },
  divider:
  { backgroundColor:'#6B35E2',
    margin:10,
  },
  activityView:{
    flexDirection:'column',
    alignItems:'center'
  },
  btnContainer2:
  { marginTop:20,
    width:'50%'
  },
  btn2:
  { backgroundColor:'#68BB6D',
    borderRadius:50,
    marginHorizontal:8,
    marginBottom:10
  },
});
