import React,{ useState,useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, Text, View, FlatList, ActivityIndicator} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import tasks from 'api/transacciones/tasks';
import TaskCard from 'components/General/TaskCard';
import { Searchbar } from 'react-native-paper';
import InputSearchBar from 'components/General/InputSearchBar';

export default function ListTask({route}){ 
	const navigation = useNavigation();
	const {lati,long,start,abort,assign,type} = route.params;
	const [taskList, setTaskList] = useState([]);
	const [loading, setLoading] = useState(true); // 
	const [refreshLoading, setRefreshLoading] = useState(false);
	// const [refresh, setRefresh] = useState(false);
	const [requestNum, setRequestNum] = useState(1);
	const [pendingTaskList, setPendingTaskList] = useState();
	const [taskHomeNum, setTaskHomeNum] = useState(0);
	const [msg, setMsg] = useState('');

	
	const fetchTasks = async(pag,tat, search) => { 
		await tasks({
			pag: pag,
			tat: tat,
			search: search,
		})
		.then(async (response) => { 
			if (response.ans.stx === 'ok') { 
				let taskArray = response.ans.tax;
				let taskNum = parseInt(response.ans.knx);
				let taskTypeArray = response.ans.ltt;
				let newHomeTaskNum = taskHomeNum+taskNum;
				setMsg(response.ans.msg);
				setPendingTaskList(response.ans.mas);
				setTaskHomeNum(newHomeTaskNum);
				if(taskArray != undefined) { 
					for(let i=0;i<taskNum;i++) { 
						let taskType = taskArray[i].lto;
						taskArray[i]['sig'] = taskTypeArray[taskType].sig;
						taskArray[i]['typ'] = taskTypeArray[taskType].typ;
					}
					if(pag>1) {
						setTaskList(taskList.concat(taskArray));
					}
					else {
						setTaskList(taskArray);
					}
				}
				setRefreshLoading(false);
				setLoading(false);
			}
			else { 
				Toast.show({ 
					type: 'error',
					props: {
						onPress: () => {}, 
						text1: 'Error', 
						text2: response.ans.msg
					}
				});
				navigation.reset({
					index: 0,
					routes: [{ 
						name: 'login',
					}],
				});
			}
		})
		.catch((e) => { 
			console.log(e);
			setLoading(false);
			Toast.show({ 
				type: 'error',
				props: {
					onPress: () => {}, 
					text1: 'Error', 
					text2: 'Error de conexión, por favor intenta más tarde'
				}
			});
		});
	}

	const refreshTaskList = () => { 
		setRefreshLoading(true);
		setRequestNum(1);
		fetchTasks(1,type, searchValue);
	}
  	useFocusEffect(
		useCallback(() => { 
		if (pendingTaskList!= '0') { 
			const unsubscribe = fetchTasks(requestNum,type, searchValue);
			return () => unsubscribe;
		}
		}, [requestNum])
	);
	


	// Searchbar
	const [searchValue, setSearchValue] = React.useState('')
	const onChangeTextSearch = React.useCallback(value => setSearchValue(value))
	const [isFetching, setIsFetching] = React.useState(false)
	const onSubmitEditingSearch = async() => {
		setIsFetching(true)
		setRequestNum(1)
		await fetchTasks(1, type, searchValue)
		setIsFetching(false);
	}

	if (loading) {
		return (
			<View style={styles.loaderTask}>
				<ActivityIndicator  size="large" color="#0000ff"/>
				<Text>Cargando Tareas...</Text>
			</View>
		)
	}
	if (taskList.length==0) {
		<View>
			<Text style={styles.title}>{msg}</Text>
		</View>
	}
	return(
		<View style={styles.listView}>
			<View style={styles.searchBarContainer}>
				<InputSearchBar 
					// label={'Local'}
					placeHolder={'Local'}
					value={searchValue}
					onChangeText={onChangeTextSearch}
					onSubmitEditing={onSubmitEditingSearch}
					
				/>
			</View>
			{isFetching?(
				<View style={styles.fetchingContainer}>
					<ActivityIndicator color={"#7B53AE"} size="large" />
				</View>

			):(
				<FlatList 
					data={taskList}
					renderItem={(data) => <TaskCard lista={data} start={start} assign={assign} abort={abort}/>}
					keyExtractor={(item, index) => index.toString()}
					onEndReached={()=>pendingTaskList!= '0' && setRequestNum(requestNum+1)}
					onEndReachedThreshold={3}
					refreshing={refreshLoading}
					onRefresh={()=>refreshTaskList()}
				/>
			)} 

		</View>
	)
}

const styles = StyleSheet.create({
	listView: {
	},
	searchBarContainer: {
		marginHorizontal: 20,
		marginTop: 20
	},	
	fetchingContainer: {
		marginTop: 50
	},	
	taskElementContainer: {
        marginEnd: 'auto'
    },

    taskElementMiniText: {
        // marginTop: -4,
        color: '#929492',
        // borderWidth: 1
    },
	loaderTask: {
		marginTop:50,
		marginBottom: 10,
		alignItems: "center",
	},
	parentView: { 
		marginRight: 10,
		marginLeft: 10,
		marginTop:20,
		marginBottom:20,
		borderWidth: 1, // important
		borderRadius:15,
		borderColor: '#c7c7c7',
		padding: 10
	},
	taskTypeView: {
		flexDirection: 'row',
		margin:3,
		borderRadius:1,
		alignItems: 'center',
		// borderWidth: 1
	},
	btnView:{
		flexDirection:'row',
		margin:1,
		borderRadius:1,
		alignSelf:'center'
	},
	taskTextView: { 
		// flexDirection:'column',
		margin:1,
		borderRadius:1,
		// borderWidth: 1
	},
	taskTypeText: {
		marginTop: -4,
		color: '#929492'
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

	textId:{
		height: '100%',
		marginTop: 'auto',
		marginLeft:5,
		fontSize: 10,
		// borderWidth: 1,
	},
	taskText:{
		marginLeft:5,
		marginTop: 5,
		// marginRight:70,
		fontSize: 20,
		// borderWidth: 1
	},
		taskIconTextContainer: {
			flexDirection: 'row',
			alignItems: 'center',
			marginBottom: 10
		},	
		detailIcon: {
			color: "purple",
			fontSize: 25,
			marginEnd: 5,
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
		boldTaskDetail: { 
			fontSize: 20,
			fontWeight: 'bold',
			color: 'purple'
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
		backgroundColor: '#9e68fc',
		borderRadius: 50,
		marginHorizontal:8,
		marginBottom:10,
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
