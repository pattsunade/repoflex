import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
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
	},
    titleTaskSection: {
		marginEnd: 'auto',
		flex: 1
	},
    textTitleTask:{
		fontWeight: 'bold', 
		fontSize: 20,
		paddingTop: 0,
		// marginBottom: -3, 
	},
    taskTypeText: {
		marginTop: -4,
		color: '#929492'
	},
    textId:{
		textAlign:'right',
		marginBottom: -10,
		fontSize: 10,
	},
    taskTextView: { 
		// flexDirection:'column',
		margin:1,
		// borderRadius:1,
		// borderWidth: 1
	},
    taskIconTextContainer: {
        flexDirection: 'row',
        // alignItems: 'center',
        marginBottom: 10,
		// borderWidth: 1
    },
	iconStyleContainer: {
		// borderWidth: 1,
		width: '15%',
		// justifyContent: 'end'
	},
    IconDetail: {
        color: "purple",
        fontSize: 25,
		alignSelf: 'flex-end'
		// marginStart: 'auto'
		// borderColor: 'red',
		// flex: 1
    },
    taskElementContainer: {
        marginEnd: 'auto',
		width: '85%'
    },
    taskElementMiniText: {
        // marginTop: -4,
        color: '#929492',
        // borderWidth: 1
    },
    taskDetail: { 
		fontSize: 16,
		marginEnd: 'auto',
		width: '85%'
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
    card: { 
		marginRight: 20,
		marginLeft: 20,
		marginTop:10,
		marginBottom:20,
		borderRadius:15,
		borderWidth: 1, // important
		borderColor: '#c7c7c7',
		padding: 10
	},
    divider:{
		backgroundColor: '#6B35E2',
		margin: 10  
	},
    btnView:{
		flexDirection:'row',
		margin:1,
		borderRadius:1,
		alignSelf:'center'
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
    },
    activityView:{
        flexDirection:'column',
        alignItems:'center'
    },
    activityTitleText: { 
        fontWeight:'bold',
        fontSize: 20,
        marginTop:10,
    },
    activityDetailNumber:{ 
        fontSize: 20,
        marginTop:10
    },
    btnView2: { 
        flexDirection:'row',
        justifyContent:'center'
    },
})

export default styles