import React, { useState,useRef,useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, TouchableOpacity ,Dimensions} from 'react-native';
import { Button, Divider,Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import BackEndConnect from 'api/backendHandler';
import TaskQuestion from './TaskQuestion';
import * as Progress from 'react-native-progress';
import Loading from 'components/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import taskd from 'api/transacciones/taskd';
import useMountedComponent from 'utils/hooks/useMountedComponent';
import ActivitiesProgress from './ActivitiesProgress';
import ActivityBox from 'components/General/ActivityBox';

// const { width, height } = Dimensions.get('window');

export default function Task ({route}) {
    const isMounted = useMountedComponent();
    const {quest,tid,backAnsFormat,completed,update,frontAnsFormat} = route.params;
    const navigation = useNavigation();
    const [error, setError] = useState(false);
    const [questions, setQuestions] = useState(quest);
    const [loading, setLoading] = useState(true);


    // const [totalActivties, setTotalActivities] = React.useState(1)
    // const [nextActivityIndex, setNextActivityIndex] = React.useState(0) 


    // const [nextActivity, setNextActivity] = React.useState() // Next activity
    // const [activitiesResult, setActivitiesResult] = React.useState([]) // Result of activites
    // const [activitiesTask, setActivitiesTask] = React.useState([]) // List of activites
    
    // const [showActivity, setShowActivity] = React.useState(false) // List of activites
    

    // React.useEffect(() => {
    //     const getTaskActivities  = async() => {
    //         taskd({tid: tid})
    //         .then(async(response) => {
    //             if (response.ans.stx ==='ok') { 
    //                 setActivitiesTask(response.ans.tas || []);
    //                 setTotalActivities(response.ans.tas?.lenght || 1)
    //                 AsyncStorage.multiSet([['@quest',JSON.stringify(response.ans.tas)],['@tid',tid.toString()],['@comp',completed.toString()]]);
    //             }
    //             else {
    //                 await AsyncStorage.clear();
    //                     Toast.show({ 
    //                         type: 'error',
    //                         props: {onPress: () => {}, text1: 'Error', text2: response.ans.msg
    //                     },
    //                 });
    //                 navigation.reset({
    //                     index: 0,
    //                     routes: [{ name: 'login' }],
    //                 }); 
    //             }
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         })
    //         .finally(() => {
    //             isMounted && setLoading(false);
    //         });
    //     }
    //     getTaskActivities();
    // },[])

    // const updatenNextActivity = () => {
    //     console.log(actCopy)
    //     // const resultCopy = [...activitiesResult].push({
    //     //     ...actCopy[0],
    //     // })
    //     // console.log("resultCopy", resultCopy)
        
    //     // setActivitiesResult(results => (results.push(activityResult)))
    // }
    // const selectActivity = () => {}

    // const handleNewActivityResult = (result) => {
    //     // activ
    // }
    // const handleEditActivityResult = (newResult) => {
    //     // update result
    //     const resultDescription = {
    //         ...activitiesTask[0], 
    //         result:'this is a test'
    //     }
    //     setActivitiesResult(results => [...results, resultDescription])
         
    //     // update activities
    //     const actCopy = [...activitiesTask]
    //     const next = actCopy.shift()
    //     setNextActivity(next)
    //     setActivitiesTask(actCopy)
        
    // }
    
    const handleAbortTask = () => {}
   

    React.useEffect(() => { 
        if(questions===undefined || questions === null) { // no question started
            taskd({tid: tid})
            .then(async (response) => {
                    
                if (response.ans.stx!='ok') { 
                    await AsyncStorage.clear();
                    Toast.show({ 
                        type: 'error',
                        props: {onPress: () => {}, text1: 'Error', text2: 'Error interno, por favor inicia sesión nuevamente.'
                    },
                    autohide: false
                });
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'login' }],
                }); 
                }
                var questAns = response.ans.tas;
                setQuestions(questAns);
                questAns = JSON.stringify(questAns);
                
                setLoading(false);
            })
            .catch(async (ans) => { 
                console.log(ans);
                setError(true);
                setLoading(false);
                await AsyncStorage.clear();
                Toast.show(
                { type: 'error',
                props: {onPress: () => {}, text1: 'Error', text2: 'Error interno, por favor inicia sesión nuevamente.'
                },
                autohide: false
                });
                navigation.reset({
                    index: 0,
                    routes: [ { name: 'login' }],
                });
            });
        }
        else if(typeof questions == 'string') { 
            setQuestions(JSON.parse(questions));
            setLoading(false);
        }
        else { 
            setLoading(false); 
        }
    },[questions])

    if (loading) { 
        return <Loading text={'Iniciando tarea...'}/>
    }
    else if (error) { 
        return <View></View>
    } 
    return(
        <ScrollView>
             <View>
                <TaskQuestion questions={questions} tid={tid} completed={completed} backAnsFormat={backAnsFormat} update={update} frontAnsFormat={frontAnsFormat}/>
            </View>
            <Divider style= {styles.divider} />
            <View style={styles.viewZolbit}>
                <Text>Un producto de <Text style = {styles.textZolbit}>Zolbit</Text></Text>
            </View>
            {/* <View style={styles.container}>
                <View style={styles.barContainer}>
                    <ActivitiesProgress total={totalActivties} done={activitiesResult.length} />
                </View>
                <Text style={styles.subtitle}>Actividad por desarrollar</Text>
                {nextActivity && (
                    <ActivityBox 
                        title={nextActivity?.tid}
                        subtitle={`Actividad ${nextActivity?.qid}`}
                    />
                )}

                <Text style={styles.subtitle}>Actividades pendientes</Text>
                {activitiesTask.map((activity, idx) => {
                    return (
                        <ActivityBox key={activity.qid}
                            title={activity.tiq}
                            subtitle={`Actividad ${activity.qid}`}
                        />
                    )
                })}
                <Text style={styles.subtitle}>Actividades completadas</Text>

                {activitiesResult.map(activity => {
                    return (
                        <ActivityBox key={activity.qid}
                            title={activity.tiq}
                            subtitle={`Actividad ${activity.qid}`}
                        />
                    )
                })}
                <Button 
                    title='Abortar tarea'
					containerStyle={styles.abortButtonContainer}
					buttonStyle={styles.abortButtonStyle}
                    onPress={handleEditActivityResult}
                />

                <Divider style= {styles.divider} />
                <View style={styles.viewZolbit}>
                    <Text>Un producto de <Text style = {styles.textZolbit}>Zolbit</Text></Text>
                </View> 

            </View> */}
        </ScrollView>
    )
    
}

// const styles = StyleSheet.create({
//     container: {
//         // borderWidth: 1,
//         // margin: 100,
//         justifyContent:'center',
//         alignItems:'center',
//         marginHorizontal: 40
//     },
//     test: {
//         borderWidth: 1,
//         width: '100%', 
//     },
//     barContainer: {
//         width: '100%', 
//         marginTop: 30
//     },
//     subtitle: {
//         paddingBottom:10,
//         paddingTop:15,
//         fontSize:20,
//     },
//     viewZolbit:{
//         justifyContent: 'center',
//         alignItems: 'center', 
//     },
//     abortButtonContainer: { 
// 		marginTop: 1,
// 		width: '100%',
// 		// marginLeft: 40
//     },
//     abortButtonStyle:{
//         marginTop:10,
//         borderRadius:20,
//         backgroundColor:'#D0021B',
//         borderTopWidth: 1,
//         borderTopColor:'#e3e3e3',
//         borderBottomWidth: 1,
//         borderBottomColor:'#e3e3e3',
//         paddingTop: 10,
//         paddingBottom:10,
//         marginBottom:10,
//     },
// });
const styles = StyleSheet.create({
    viewContainer:{
      marginRight: 40,
      marginLeft: 40,
      marginTop: 15,
      marginBottom:5,
      justifyContent: 'center',
      alignItems: 'center'
    },
    btnCloseSession:{
      marginTop:10,
      borderRadius:20,
      backgroundColor:'#D0021B',
      borderTopWidth: 1,
      borderTopColor:'#e3e3e3',
      borderBottomWidth: 1,
      borderBottomColor:'#e3e3e3',
      paddingTop: 10,
      paddingBottom:10,
      marginBottom:10,
    },
    viewContainer2:{
      marginRight: 30,
      marginLeft: 30,
      marginTop: 50  
    },
    texttitle: {
      marginTop:50,
      marginBottom:50,
      marginHorizontal:20,
      fontSize: 17,
      textAlign:'justify'
    },
    textRegister:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    btnRegister:{
      color: '#6B35E2',
      fontWeight: 'bold'
    },
    divider:{
      backgroundColor: '#6B35E2',
      margin: 20
    },
    viewZolbit:{
      justifyContent: 'center',
      alignItems: 'center', 
    },
    textZolbit: {
      fontWeight: 'bold',
    },
    customBtnText: {
      fontSize: 20,
      fontWeight: '400',
      marginVertical:5
    },
    customBtnTextContent: {
      marginBottom:100,
      textAlign: 'justify'
    },
    customBtn: {
      backgroundColor: '#fff',
      paddingHorizontal: 30,
      paddingVertical: 5,
      borderRadius: 10,
      marginTop:5,
      marginBottom:5
    },
    container: {
      flex: .5,
      flexDirection: 'row',
      justifyContent: 'flex-start', //replace with flex-end or center
      alignItems:'center'
    },
    wrapper: {
      flex: 1,
    },
    btnContainer: {
      marginTop: 20,
      width: '95%',
      marginLeft: 10,
    },
    btn: {
      backgroundColor: '#6B35E2',
      borderRadius: 50,
    },
    loaderTask:{
      marginTop:100,
      marginBottom:10,
      alignItems:'center',
    }
  });