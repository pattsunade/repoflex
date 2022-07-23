import React from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ListTask from '../ListTask';

export default function ListTaskTab({route}){ 
  const navigation = useNavigation();
  const Tab = createMaterialTopTabNavigator();
  const {lati,long,start,abort,assign,type,names} = route.params;

  return( 
    <>
      <Tab.Navigator>
        <Tab.Screen name={names[0]} component={ListTask} initialParams={{lati:lati,long:long,type:type[0],start:start,assign:assign,abort:abort}}/>
        <Tab.Screen name={names[1]} component={ListTask} initialParams={{lati:lati,long:long,type:type[1],start:start,assign:assign,abort:abort}}/>
      </Tab.Navigator>
    </>
  )
}

const styles = StyleSheet.create({
  listView: {
    marginRight: 10,
    marginLeft: 10,
  },
  loaderTask: {
    marginTop:50,
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
