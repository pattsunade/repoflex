import React,{ useEffect,useState } from 'react';
import { Card } from 'react-native-paper';
import { StyleSheet, Text, View, FlatList, ActivityIndicator} from 'react-native';
import { Divider, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import BackEndConnect from '../../utils/BackEndConnect';

export default function ListTask({route}){ 
  const navigation = useNavigation();
  const {lati,long,start,abort,assign,type} = route.params;
  const [taskList, setTaskList] = useState();
  const [loading, setLoading] = useState(true);
  const [refreshLoading, setRefreshLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [taskType, setTaskType] = useState(type[0] ? type[0]:type)
  const [taskType2, setTaskType2] = useState(type[1]);
  const [requestNum, setRequestNum] = useState(1);
  const [msg, setMsg] = useState('');

  function formato(pag) {
    return{
      tat: taskType,//task type
      lat: lati,
      lon: long,
      pag: pag //requested page
    };
  }

  function getTasks(pag)
  { BackEndConnect('POST','tasks',formato(pag)).then((response) =>
    { if (response.ans.stx === 'ok')
      { let taskArray = response.ans.tax;
        let taskNum = parseInt(response.ans.knx);
        let taskTypeArray = response.ans.ltt;
        setMsg(response.ans.msg);
        if(taskArray != undefined)
        { for(let i=0;i<taskNum;i++)
          { let taskType = taskArray[i].lto;
            taskArray[i]['sig'] = taskTypeArray[taskType].sig;
            taskArray[i]['typ'] = taskTypeArray[taskType].typ;
          }
          if(requestNum>1)
            setTaskList(taskList.concat(taskArray));
          else
            setTaskList(taskArray);
        }
        setRefreshLoading(false);
        setLoading(false);
      }
      else
      { Toast.show(
        { type: 'error',
          props: {onPress: () => {}, text1: 'Error', text2: response.ans.msg
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
    }).catch((e) => 
      { console.log(e);
        setLoading(false);
        Toast.show(
        { type: 'error',
          props: {onPress: () => {}, text1: 'Error', text2: 'Error de conexión, por favor intenta más tarde'
            }
        });
        navigation.reset(
        { index: 0,
          routes: [
            { name: 'login',
            }
          ],
        });
      }
    );
  }

  function refreshTaskList()
  { setRefreshLoading(true);
    setRefresh(!refresh);
    setRequestNum(1);
  }

  useEffect(()=>
  { getTasks(requestNum);
  },[requestNum,refresh]);

  function Tasks(props){
    const navigation = useNavigation();
    const {lista,start,abort,assign} = props;
    const {tit,typ,tid,pla,amo,det,tim,nqu,npi,nre,sig,wen} = lista.item;
    return( 
      <Card style={styles.parentView}>
        <View style={styles.taskTypeView}>
          <View style={styles.circleView}>
            <Text style={styles.circleText}>{sig}</Text>
          </View>
          <Text style={styles.taskTypeText}>{typ}</Text>
        </View>
        <Text style={styles.textTitleTask}>{tit}</Text>        
        <Text style={styles.textId}>id:{tid}</Text>
        <Divider style= {styles.divider}/>
        <View style={styles.taskTextView}>
          <Text style={styles.taskText}>Lugar: <Text style={styles.taskDetail}>{pla}</Text></Text>
          <Text style={styles.taskText}>Fecha: <Text style={styles.taskDetail}>{wen.substring(4,6)}/{wen.substring(2,4)}/{wen.substring(0,2)} {wen.substring(6,8)}:{wen.substring(8,10)}</Text></Text>
          <Text style={styles.taskText}>A pagar: <Text style={styles.boldTaskDetail}>$ {amo}</Text></Text>
        </View>
        <View style={styles.btnView}>
          <Button
            title='Ver detalles'
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btn}
            onPress={() => navigation.navigate('taskdetail',
            { tit:tit,
              typ:typ,
              tid:tid,
              pla:pla,
              amo:amo,
              det:det,
              tim:tim,
              nqu:nqu,
              npi:npi,
              nre:nre,
              sig:sig,
              wen:wen,
              start:start,
              assign:assign,
              abort:abort
            })}
          />
        </View>      
      </Card>
    );
  }
  return( 
    <>
      { loading ? 
        ( <View style={styles.loaderTask}>
            <ActivityIndicator  size="large" color="#0000ff"/>
            <Text>Cargando Tareas...</Text>
          </View>):
        taskList == null ?
        ( <View>
            <Text style={styles.title}>{msg}</Text>
          </View>
        ):
        ( <View style={styles.listView}>
            <FlatList 
              data={taskList}
              renderItem={(data) => <Tasks lista={data} start={start} assign={assign} abort={abort}/>}
              keyExtractor={(item, index) => index.toString()}
              onEndReached={()=>setRequestNum(requestNum+1)}
              onEndReachedThreshold={1}
              refreshing={refreshLoading}
              onRefresh={()=>refreshTaskList()}
            />
          </View>
        )
      }
    </>
  )
}

const styles = StyleSheet.create({
  listView: {
    marginRight: 10,
    marginLeft: 10,
  },
  loaderTask: {
    marginTop:100,
    marginBottom: 10,
    alignItems: "center",
  },
  parentView: 
  { marginRight: 10,
    marginLeft: 10,
    marginTop:20,
    borderWidth: 2,
    borderRadius:10,
    borderColor: '#000000'
  },
  taskTypeView:{
    flexDirection: 'row',
    margin:3,
    borderRadius:1,
  },
  btnView:{
    flexDirection:'row',
    margin:1,
    borderRadius:1,
    alignSelf:'center'
  },
  taskTextView:
  { flexDirection:'column',
    margin:1,
    borderRadius:1
  },
  taskTypeText:{
    marginTop:8
  },
  textTitleTask:{
    fontWeight: 'bold', 
    fontSize: 20,
  },
  textId:{
    marginLeft:5,
    fontSize: 10
  },
  taskText:{
    marginLeft:5,
    marginRight:70,
    fontSize: 20
  },
  taskDetail:
  { fontSize: 20
  },
  boldTaskDetail:
  { fontSize: 20,
    fontWeight: 'bold'
  },
  circleView: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: '#6A17DF',
    justifyContent: 'center',
    marginRight:5
  },
  circleText: {
    fontWeight: 'bold', 
    fontSize: 20,
    textAlign: 'center',
    color:'#fff'
  },
  divider:{
    backgroundColor: '#6B35E2',
    margin: 10  
  },
  btnContainer: {
    marginTop: 20,
    width: '45%',
    marginHorizontal:15
  },
  btn: {
    backgroundColor: '#A88DCB',
    borderRadius: 50,
    marginHorizontal:8,
    marginBottom:10,
  }
});
