import React,{ useState,useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import tasks from 'api/transacciones/tasks';
import SimpleTaskCard from 'components/General/TaskCard/SimpleTaskCard';
import useMountedComponent from 'utils/hooks/useMountedComponent';
import * as Location from 'expo-location';

export default function ListTask({route}){ 
	const {start,abort,assign,type} = route.params; // route params
	// Hooks
	const isMounted = useMountedComponent(); // component to manage memory leaks
	const navigation = useNavigation(); // allow to get the device location
	
	// Component States/Variables
	const [taskList, setTaskList] = React.useState([]); // list of task
	const userLocation = React.useRef({ // location paramateres
		latitude: undefined,
		longitude: undefined,
	}); 
	const pageList = React.useRef(1); // current page as ref
	const [isScreenLoading, setIsScreenLoading] = React.useState(true); // intial loading
	const [refreshLoading, setRefreshLoading] = React.useState(false); // refresh on pull down
	const [canFetchMore, setCanFetchMore] = React.useState(true); // show status at end of list
	const [backendMessage, setBackendMessage] = React.useState(''); // mesage from backend
	// const [refresh, setRefresh] = useState(false);
	// const [requestNum, setRequestNum] = useState(1);
	// const [pendingTaskList, setPendingTaskList] = useState();
	// const [taskHomeNum, setTaskHomeNum] = useState(0);

	// reset some screens parameters
	const resetScreenParameters = async() => {
		pageList.current = 1; // reset page
		
		// isMounted && setTaskList([])
		const location = await Location.getCurrentPositionAsync({}); // location values
		userLocation.current.latitude = location.coords.latitude.toString()
		userLocation.current.longitude = location.coords.longitude.toString()

	}
	// Fetch task function
	const fetchTasks = async(page,type, latitude, longitude) => {
		// console.log("number page", page);
		await tasks({
			page: page, 
			type: type, 
			latitude: latitude, 
			longitude: longitude})
		.then(async (response) => {
			if (response.ans.stx === 'ok') { 
				isMounted && setBackendMessage(response.ans.msg);
				if (response.ans.tax) {
					const typesOfTask = response.ans.ltt;
					const newArrayTask = response.ans.tax.map(task => ({
						...task,
						sig: typesOfTask[task.lto].sig,
						typ: typesOfTask[task.lto].typ,
					}))
					if (isMounted) {
						page === 1? setTaskList(newArrayTask):setTaskList(prevTask => [...prevTask, ...newArrayTask]);
						response.ans.mas === 0? setCanFetchMore(false): setCanFetchMore(true);
					}
				} 
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
			setIsScreenLoading(false);
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
	
	// initial/on screen fetch
	useFocusEffect(
		React.useCallback(() => {
			const run = async() => {
				isMounted && setIsScreenLoading(true);
				await resetScreenParameters(); // reset query parameters
				await fetchTasks(pageList.current, type, userLocation.current.latitude, userLocation.current.longitude);
				isMounted && setIsScreenLoading(false);
			}
			run();
		},[])	
	)

	const refreshTaskList = async() => { 
		isMounted && setRefreshLoading(true);
		await resetScreenParameters(); // reset query parameters
		await fetchTasks(pageList.current, type, userLocation.current.latitude, userLocation.current.longitude);
		isMounted && setRefreshLoading(false);
	}
	
	// fetch more task at the end of the list
	const isFetchingMore = React.useRef(false); // limit accidetnasl fetch  
	const fetchOnEnd = async() => {
		if (isFetchingMore.current === false && canFetchMore === true) {
			isFetchingMore.current = true;
			pageList.current += 1;
			await fetchTasks(
				pageList.current, 
				type, 
				userLocation.current.latitude, 
				userLocation.current.longitude
			)
			isFetchingMore.current = false;
		}
	}
	// Searchbar
	// const [searchValue, setSearchValue] = React.useState('')
	const [isFetching, setIsFetching] = React.useState(false)

	if (isScreenLoading) {
		return (
			<View style={styles.loaderTask}>
				<ActivityIndicator  size="large" color="#0000ff"/>
				<Text>Cargando Tareas...</Text>
			</View>
		)
	}
	if (taskList.length==0) {
		return (
			<View>
				<Text style={styles.title}>{backendMessage}</Text>
			</View>
		)
	}
	return(
		<>
			<View style={styles.listView}>		
			{isFetching?(
				<View style={styles.fetchingContainer}>
					<ActivityIndicator color={"#7B53AE"} size="large" />
				</View>

			):(<>

				<FlatList 
					data={taskList}
					renderItem={data => <SimpleTaskCard lista={data} start={start} assign={assign} abort={abort}/>}
					keyExtractor={item => item.tid}
					onEndReachedThreshold={2}
					onEndReached={fetchOnEnd}
					refreshing={refreshLoading}
					onRefresh={()=>refreshTaskList()}
					ListFooterComponent={
						<View style={styles.fetchMoreContainer}>
							{canFetchMore? (
								<ActivityIndicator color={"#7B53AE"} size="large"/>
							):(null)}
						</View>
					}
			
				/>
				
			</>)} 


			</View>
		</>
		
	)
}

const styles = StyleSheet.create({
	listView: {
	},
	fetchMoreContainer: {
		marginBottom: 10,
	},
	searchBarContainer: {
		marginHorizontal: 20,
		marginTop: 20,
		// marginBottom: 20
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
