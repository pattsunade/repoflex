import React from 'react';
import { Card } from 'react-native-paper';
import { StyleSheet, Text, View, FlatList, ActivityIndicator} from 'react-native';
import { Divider, Button } from 'react-native-elements';
import { useNavigation } from "@react-navigation/native";

export default function ListTask(props){ 
  const navigation = useNavigation();
  const {data,start,abort,assign} = props;

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
            title="Ver detalles"
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btn}
            onPress={() => navigation.navigate("detailtask",
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
      <FlatList 
        data={data}
        renderItem={(data) => <Tasks lista={data} start={start} assign={assign} abort={abort}/>}
        keyExtractor={(item, index) => index.toString()}
      />
    </>
  )
}

const styles = StyleSheet.create({
  parentView: 
  { marginRight: 10,
    marginLeft: 10,
    marginTop:20,
    borderWidth: 2,
    borderRadius:10,
    borderColor: '#000000'
  },
  taskTypeView:{
    flexDirection: "row",
    margin:3,
    borderRadius:1,
  },
  btnView:{
    flexDirection:"row",
    margin:1,
    borderRadius:1,
    alignSelf:"center"
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
    fontWeight: "bold", 
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
    backgroundColor: "#6A17DF",
    justifyContent: 'center',
    marginRight:5
  },
  circleText: {
    fontWeight: "bold", 
    fontSize: 20,
    textAlign: 'center',
    color:"#fff"
  },
  divider:{
    backgroundColor: "#6B35E2",
    margin: 10  
  },
  btnContainer: {
    marginTop: 20,
    width: "45%",
    marginHorizontal:15
  },
  btn: {
    backgroundColor: "#A88DCB",
    borderRadius: 50,
    marginHorizontal:8,
    marginBottom:10,
  }
});
