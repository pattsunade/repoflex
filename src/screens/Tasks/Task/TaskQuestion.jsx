import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, TouchableOpacity ,Dimensions} from 'react-native';
import * as Progress from 'react-native-progress';
import { Button,Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Loading from 'components/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import taska from 'api/transacciones/taska';
import abort from 'api/transacciones/abort';
import FinishTaskMessage from './FinishTaskMessage';

const { width, height } = Dimensions.get('window');
const isArray = (a) => {
	return (!!a) && (a.constructor === Array);
};

export default function TaskQuestion (props) {
	const {questions, tid, completed, backAnsFormat, frontAnsFormat, update} = props;
	const navigation = useNavigation();
	const [formData, setFormData] = useState([]);
	const [frontData, setFrontData] = useState([]);
	const percentageProgress = React.useMemo(() => Math.round(completed*100/questions.length), [completed, questions.length])
	const compArr = questions.slice(0,completed);
	const [loading, setLoading] = useState(false);
	const [loadingText, setLoadingText] = useState('Enviando tarea...');
	const pendArr = questions.slice(completed+1);

	const endTask = () => { 
		setLoading(true);
		taska({
			tid: tid,
			abc: formData
		})
		.then((ans) => { 
			if (ans.ans.stx === 'ok'){ 
				Toast.show({ 
					type: 'success',
					props: {
						onPress: () => {}, 
						text1: 'Éxito', 
						text2: ans.ans.msg
					}
				});
				AsyncStorage.multiRemove(['@tid','@quest','@backAnsFormat','@comp','@frontAnsFormat'])
				.then(() => { 
					setLoading(false);
					navigation.reset({ 
						index: 0,
						routes: [{ 
							name: 'home',
						}],
					});
				});
			}
			else { 
				Toast.show({ 
					type: 'error',
					props: {
						onPress: () => {}, 
						text1: 'Error', 
						text2: 'Error de comunicación, por favor intenta nuevamente.'
					}
				});
			}
		})
		.catch((error)=> { 
			console.log(error);
			Toast.show({ 
				type: 'error',
				props: {
					onPress: () => {}, 
					text1: 'Éxito', 
					text2: 'Error interno, por favor intenta nuevamente.'
				}
			});
		});
	}
	const abortTask = () => { 
		setLoadingText('Abortando tarea...');
		setLoading(true);
		abort({tid: tid})
		.then(async (response) => { 
			if(response.ans.stx!='ok') { 
				Toast.show({ 
					type: 'error',
					props: {
						onPress: () => {}, 
						text1: 'Error', 
						text2: response.ans.msg
					},
					autohide: false
				});
				AsyncStorage.multiRemove(['@tid','@quest','@backAnsFormat','@comp','@frontAnsFormat'])
				.then(() => { 
					setLoading(false);
					navigation.reset({ 
						index: 0,
						routes: [{ 
							name: 'home',
						}],
					});
				});
			}
      		else{
				Toast.show({ 
					type: 'success',
					props: {
						onPress: () => {}, 
						text1: 'Éxito', 
						text2: response.ans.msg
					}
				});
				AsyncStorage.multiRemove(['@tid','@quest','@backAnsFormat','@comp','@frontAnsFormat'])
				.then(() => { 
					setLoading(false);
					navigation.reset({
						index: 0,
						routes: [{ 
							name: 'home',
						}],
					});
				});
			}
		})
		.catch((error) => { 
			console.log(error);
			Toast.show({ 
				type: 'error',
				props: {
					onPress: () => {}, 
					text1: 'Error', 
					text2: 'Error de conexión, por favor intenta nuevamente '+ans1.ans.msg
				},
				autohide: false
			});
		});
	}
	
	useEffect(async () =>{ 
		console.log("backAnsFormat->",backAnsFormat);
		console.log("frontAnsFormat->",frontAnsFormat);
		if (backAnsFormat!=null) { 
			console.log('entre en no null');
			if (update) { 
				let updAnswer = formData;
				let updData = frontData;
				let taskNum = parseInt(backAnsFormat.qid);
				updAnswer[taskNum-1] = backAnsFormat;
				updData[taskNum-1]= frontAnsFormat;
				setFormData(updAnswer);
				setFrontData(updData);
			}
			else if (isArray(backAnsFormat)) { 
				setFormData(backAnsFormat);
				setFrontData(frontAnsFormat);
			}
			else { 
				let addAnswer = [...formData,backAnsFormat];
				let addUpdate = [...frontData,frontAnsFormat];
				setFormData(addAnswer);
				setFrontData(addUpdate);
				await AsyncStorage.multiSet([['@backAnsFormat',JSON.stringify(addAnswer)],['@frontAnsFormat',JSON.stringify(addUpdate)]]);
		}
		// if (formData!=null)
		// { console.log('entre en 1');
		//   setFormData([...formData,backAnsFormat]);
		//   AsyncStorage.setItem('@backAnsFormat',JSON.stringify(backAnsFormat));
		// }
		// else if (per<=100)
		// { const temp = [...formData,backAnsFormat];
		//   // console.log('temp-->',temp);
		//   AsyncStorage.setItem('@backAnsFormat',JSON.stringify(temp)); 
		//   console.log('entre en 2');
		//   setFormData(temp);
		//   // console.log('ofrmdata-->',formData);
		// }
		// AsyncStorage.setItem('@backAnsFormat',JSON.stringify(formData));  
		}
		console.log('frontData->',frontData);
		console.log("form->",formData);
	},[backAnsFormat]);


	if (loading) {
		return (<Loading text={loadingText}/>)
	}

	return(<>
		<ScrollView>
			<View style={styles.viewContainer}>
				<Text style={styles.title}>Progreso de la tarea</Text>
				<Progress.Bar progress={percentageProgress/100} width={300} borderRadius={100} backgroundColor='#fff' height={25} color={'#6B35E2'} />
				<Text>{percentageProgress} %</Text>
			</View>
			{ percentageProgress==100 && <FinishTaskMessage onEndTask={endTask}/>}
			
			<View style={styles.viewContainer2}>
				{ completed<questions.length &&
				(<>
					<Text style={styles.subtitle}> Actividad por desarrollar</Text>
					<TouchableOpacity 
						style={styles.customBtn} 
						onPress={() => navigation.navigate('quiztask',{questions:questions[completed],tid:tid,completed:completed})
					}>
					<View style={styles.container}>
						<Icon
							type='material-community'
							name='arrow-right-bold-circle'
							iconStyle={styles.iconLeft1}
							size={35}
						/>
						<View style={styles.activityText}>
						<Text style={styles.customBtnText}>{questions[completed].tiq}</Text>
						<Text style={styles.customBtnText}>Actividad a desarrollar</Text>
						</View>
					</View>
					</TouchableOpacity>
					{pendArr.length>0 && <Text style={styles.subtitle}> Actividades pendientes</Text>}
				</>
				)
				}
				{ pendArr.map((arr,index) =>
				{ return(
					<TouchableOpacity key={arr.qid} style={styles.customBtn} onPress={() =>
						{ Toast.show(
							{ type: 'error',
							props: 
							{ onPress: () => {}, text1: 'Error', text2: 'Debes completar las actividades anteriores.'
							}
							}
						);
						}
					}>
						<View style={styles.container}>
						<Icon
							type='material-community'
							name='circle'
							iconStyle={styles.iconLeft3}
							size={35}
						/>
						<View style={styles.activityText}>
							<Text style={styles.customBtnText}>{arr.tiq}</Text>
							<Text style={styles.customBtnText}>Actividad pendiente {index+1}.</Text>
						</View>
						</View>
					</TouchableOpacity>
					)
				})
				}
				{compArr.length>0 && <Text style={styles.subtitle}> Actividades completadas: {completed}</Text>}
				{ compArr.map((arr,index) => { 
					return(
						<TouchableOpacity key={arr.qid} style={styles.customBtn} onPress={() =>
							navigation.navigate('quiztask',{questions:questions[index],tid:tid,completed:index+1,prevAns:frontData[index]})
						}>
							<View style={styles.container}>
							<Icon
								type='material-community'
								name='check-circle'
								iconStyle={styles.iconLeft2}
								size={35}
							/>
							<View style={styles.activityText}>
								<Text style={styles.customBtnText}>{arr.tiq}</Text>
								<Text style={styles.customBtnText}>Actividad completada {index+1}.</Text>
							</View>
							</View>
						</TouchableOpacity>
					)
				})
				}
			</View>
			<View style={styles.wrapper}>
				<Button
				title='Abortar tarea'
				containerStyle={styles.btnContainer}
				buttonStyle={styles.btnAbort}
				onPress={abortTask}
				/>
			</View>
		</ScrollView>


	</>)
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
    paddingTop:15,
    fontSize:20,
  },
  btnContainer: { 
		marginTop: 1,
		width: '80%',
		marginLeft: 40
  },
  btnFinish:{
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
  btnAbort:{
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
    fontSize: 15,
    fontWeight: '400',
    marginVertical:5,
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
  wrapper:{
    flex:1,
  },
  iconLeft1:{
    color: '#6B35E2',
    marginRight: 15,
  },
  iconLeft2:{
    color:'#5cb85c',
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
  activityText: {
    flex: 1,
    flexDirection:'column'
  },
  loaderTask:{
    marginTop:100,
    marginBottom:10,
    alignItems:'center',
  }
});