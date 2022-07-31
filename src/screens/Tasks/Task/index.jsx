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
    const {quest,tid,backAnsFormat,completed,update,frontAnsFormat} = route.params;
    console.log(route.params)
    
    const isMounted = useMountedComponent();
    const [error, setError] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activitiesTask, setActivitiesTask] = React.useState([])
    const [activitiesResult, setActivitiesResult] = React.useState([])

    React.useEffect(() => {
        const getTaskActivities  = async() => {
            taskd({tid: tid})
            .then(async(response) => {
                if (response.ans.stx ==='ok') { 
                    setActivitiesTask(response.ans.tas || []);
                    AsyncStorage.multiSet([['@quest',JSON.stringify(response.ans.tas)],['@tid',tid.toString()],['@comp',completed.toString()]]);
                }
                else {
                    await AsyncStorage.clear();
                        Toast.show({ 
                            type: 'error',
                            props: {onPress: () => {}, text1: 'Error', text2: response.ans.msg
                        },
                    });
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'login' }],
                    }); 
                }
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                isMounted && setLoading(false);
            });
        }
        getTaskActivities();
    },[])
    const selectActivity = () => {}

    const handleActivityResult = (result) => {
        console.log(result)
    }
    const handleAbortTask = () => {}


   

    // React.useEffect(() => { 
    //     if(questions===undefined || questions === null) { // no question started
    //         taskd({tid: tid}).then(async (response) => { 
                // if (response.ans.stx!='ok') { 
                //     await AsyncStorage.clear();
                //     Toast.show({ 
                //         type: 'error',
                //         props: {onPress: () => {}, text1: 'Error', text2: 'Error interno, por favor inicia sesión nuevamente.'
                //     },
                //     autohide: false
                // });
                // navigation.reset({
                //     index: 0,
                //     routes: [{ name: 'login' }],
                // }); 
    //             }
    //             var questAns = response.ans.tas;
    //             setQuestions(questAns);
    //             questAns = JSON.stringify(questAns);
                
    //             setLoading(false);
    //         })
    //         .catch(async (ans) => { 
    //             console.log(ans);
    //             setError(true);
    //             setLoading(false);
    //             await AsyncStorage.clear();
    //             Toast.show(
    //             { type: 'error',
    //             props: {onPress: () => {}, text1: 'Error', text2: 'Error interno, por favor inicia sesión nuevamente.'
    //             },
    //             autohide: false
    //             });
    //             navigation.reset({
    //                 index: 0,
    //                 routes: [ { name: 'login' }],
    //             });
    //         });
    //     }
    //     else if(typeof questions == 'string') { 
    //         setQuestions(JSON.parse(questions));
    //         setLoading(false);
    //     }
    //     else { 
    //         setLoading(false); 
    //     }
    // },[questions])


    if (loading) { 
        return <Loading text={'Iniciando tarea...'}/>
    }
    else if (error) { 
        return <View></View>
    } 
    return(
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.barContainer}>
                    <ActivitiesProgress total={activitiesTask.length } done={activitiesResult.length} />
                    {/* <TaskQuestion questions={questions} tid={tid} completed={completed} backAnsFormat={backAnsFormat} update={update} frontAnsFormat={frontAnsFormat}/> */}

                </View>
                <Text style={styles.subtitle}> Actividad por desarrollar</Text>
                {activitiesTask.map((activity, idx) => {
                    return (
                        <ActivityBox key={activity.qid}
                            title={activity.tiq}
                            subtitle={`Actividad pendiente ${idx+1}`}
                        />
                    )
                })}
                <Text style={styles.subtitle}> Actividades pendientes</Text>
                <Text style={styles.subtitle}> Actividad por desarrollar</Text>
                <Divider style= {styles.divider} />
                <View style={styles.viewZolbit}>
                    <Text>Un producto de <Text style = {styles.textZolbit}>Zolbit</Text></Text>
                </View> 

            </View>
        </ScrollView>
    )
    
}

const styles = StyleSheet.create({
    container: {
        // borderWidth: 1,
        // margin: 100,
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal: 40
    },
    
    barContainer: {
        width: '100%', 
        marginTop: 30
    },
    subtitle: {
        paddingBottom:10,
        paddingTop:15,
        fontSize:20,
    },
    viewZolbit:{
        justifyContent: 'center',
        alignItems: 'center', 
    },
});