import React, { useEffect,useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import { Button } from 'react-native-elements';
import Toast from 'react-native-toast-message';
import taskq from 'api/transacciones/taskq';
import assgn from 'api/transacciones/assgn';
import taskAbort from 'api/transacciones/abort';
import TaskCardExtended from 'components/General/TaskCard/ExtendedCardTask';
import { ScrollView } from 'react-native-gesture-handler';

function TaskDetail({route,navigation}) { 
    const {tit,typ,tid,pla,amo,sig,wen,start,abort,assign} = route.params;
    const [loading, setLoading] = useState(true);
    const [taskData, setTaskData] = React.useState({})
    const [det,setDet] = useState();
    const [tim,setTim] = useState();
    const [nqu,setNqu] = useState();
    const [npi,setNpi] = useState();
    const [nre,setNre] = useState();
    const [loadingText, setLoadingText] = useState('Cargando detalles...');

    const getTaskDetail = () => { 
        taskq({tid: tid })
        .then((response) => { 
            if(response.ans.stx==='ok') { 
                setDet(response.ans.det);
                setNqu(response.ans.nqu);
                setNpi(response.ans.npi);
                setNre(response.ans.nre);
                setTim(response.ans.tim);
                setTaskData({
                    det: response.ans.det,
                    nqu: response.ans.nqu,
                    npi: response.ans.npi,
                    nre: response.ans.nre,
                    tim: response.ans.tim,
                })
                setLoading(false);
            }
            else { 
                navigation.reset({
                    index: 0,
                    routes: [{ 
                        name: 'login',
                    }],
                });
                Toast.show({ 
                    type: 'error',
                    props: {
                        onPress: () => {}, 
                        text1: 'Error', 
                        text2: 'Error de conexión, por favor intenta nuevamente '
                    },
                    autohide: false
                });
            }
        })
        .catch((ans) => { 
            Toast.show({ 
                type: 'error',
                props: {
                    onPress: () => {}, 
                    text1: 'Error', 
                    text2: 'Error de conexión, por favor intenta nuevamente '
                },
                autohide: false
            });
            navigation.reset({
                index: 0,
                routes: [{ 
                    name: 'login',
                }],
            });
        });
    }

    useEffect(()=> { 
        getTaskDetail();
    },[]);

    const assingFun = () => { 
        setLoadingText('Asignando tarea...');
        setLoading(true);
        assgn({tid: tid})
        .then(async (response) => { 
            if(response.ans.stx!='ok'){
                Toast.show({ 
                    type: 'error',
                    props: {
                        onPress: () => {}, 
                        text1: 'Error', 
                        text2: response.ans.msg
                    },
                    autohide: false
                });
            }
            navigation.goBack();
            setLoading(false);
        })
        .catch((ans) => { 
            console.log(ans);
            Toast.show({ 
                type: 'error',
                props: {
                    onPress: () => {}, 
                    text1: 'Error', 
                    text2: 'Error de conexión, por favor intenta nuevamente '
                },
                autohide: false
            });
            setLoading(false);
        });
    }
    const startFun = () => { 
        navigation.reset({ 
            index: 0,
            routes: [{ 
                name: 'task',
                params: {tid:tid,completed:0,backAnsFormat:null,quest:null,update:null,frontAnsFormat:null}
            }],
        })
    }

    const abortFun = () => { 
        setLoadingText('Asignando tarea...')
        setLoading(true);
        taskAbort({tid: tid })
        .then(async (response) => { 
            if(response.ans.stx!="ok") { 
                Toast.show({
                    type: 'error',
                    props: {
                        onPress: () => {}, 
                        text1: 'Error', 
                        text2: response.ans.msg
                    },
                    autohide: false
                });
            }
            navigation.reset({
                index: 0,
                routes: [{
                    name: 'home',
                }],
            })
        })
        .catch((error) => { 
            console.log(error);
            Toast.show({ 
                type: 'error',
                props: {
                    onPress: () => {}, 
                    text1: 'Error', 
                    text2: 'Error de conexión, por favor intenta nuevamente'
                },
                autohide: false
            });
        });
    }

    if (loading) {
        return (
            <View style={styles.loaderTask}>
                <ActivityIndicator  size="large" color="#0000ff"/>
                <Text>{loadingText}</Text>
            </View>
        )
    }
    return(
        <ScrollView>
            <TaskCardExtended 
                data={{
                    ...route.params,
                    ...taskData
                }}
                buttons={
                    <> 
                    { assign && (
                        <Button
                            title='Asignar'
                            containerStyle={styles.btnContainer}
                            buttonStyle={styles.btn}
                            onPress={() =>assingFun()}
                        />
                    )}
                    { abort && (
                        <Button
                            title="Abortar"
                            containerStyle={styles.btnContainer}
                            buttonStyle={styles.btn}
                            onPress={() =>abortFun()}
                        />
                    )}
                    { start && (
                        <Button
                            title='Iniciar'
                            containerStyle={styles.btnContainer}
                            buttonStyle={styles.btn}
                            onPress={() => startFun()}
                        />
                    )}
                    </>
                }
            />
        </ScrollView>
    );
}
export default TaskDetail;
const customStyle = StyleSheet.create({
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
    taskTypeView: {
        flexDirection: 'row',
        margin:3,
        borderRadius:1,
        alignItems: 'center',
        // borderWidth: 1
    },
    titleTaskSection: {
        marginEnd: 'auto'
    },
    textTitleTask:{
        fontWeight: 'bold', 
        fontSize: 20,
        paddingTop: 0,
        // marginBottom: -3, 
    },
    taskTypeText: {
        marginTop: -4,
        color: '#929492',
    },
    textId:{
        height: '100%',
        marginTop: 'auto',
        marginLeft:5,
        fontSize: 10,
        // borderWidth: 1,
    },
    taskTextView: { 
		// flexDirection:'column',
		margin: 1,
		borderRadius:0,
		// borderWidth: 1
	},
    taskIconTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        // borderWidth: 1
    },	
    taskElementContainer: {
        marginEnd: 'auto'
    },
    taskElementMiniText: {
        // marginTop: -4,
        color: '#929492',
        // borderWidth: 1
    },
    detailIcon: {
        color: "purple",
        fontSize: 25,
        // marginEnd: 5,
        // borderWidth: 1,
    },
    taskDetail: { 
		fontSize: 16,
		// borderWidth: 1
	},
    taskDetailBold: { 
		fontSize: 16,
		fontWeight: 'bold'
		// borderWidth: 1
	},
    taskText:{
		marginLeft:5,
		marginTop: 5,
		// marginRight:70,
		fontSize: 20,
		// borderWidth: 1
	},
    boldTaskDetail: { 
        fontSize: 20,
        fontWeight: 'bold',
        color: 'purple'
    },
    taskDetailContainer: {
        backgroundColor: '#F0F0F0',
        padding: 10,
        marginTop: 5,
        borderRadius: 10
    },
    taskDetailText: {
        color: '#505050'
    },
    taskLiteralDetail: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})
const styles = StyleSheet.create({ 
    parentView: { 
        marginRight: 10,
        marginLeft: 10,
        marginTop:20,
        borderWidth: 1,
        borderColor: '#c7c7c7',
        padding: 10,
        borderRadius:15

    },
    taskTypeView: { 
        flexDirection:'row',
        margin:3,
        
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
  taskTextView:
  { flexDirection:'column',
    margin:1,
    borderRadius:1
  },
  btnView: { 
    flexDirection:'row',
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
  btnContainer:
  { marginTop:20,
    width:'50%'
  },
  btn:
  { backgroundColor:'#68BB6D',
    borderRadius:50,
    marginHorizontal:8,
    marginBottom:10
  },
  loaderTask: {
    marginTop:50,
    marginBottom: 10,
    alignItems: "center",
  },
});
