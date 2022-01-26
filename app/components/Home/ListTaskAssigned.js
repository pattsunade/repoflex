import React from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Divider, Button} from 'react-native-elements';
import { useNavigation } from "@react-navigation/native";

export default function ListTaskAssigned(props) {
  const navigation = useNavigation();
  const {data} = props;
  return (
    <View>
      <FlatList 
        data={data}
        renderItem={(data) => <Tarea lista={data} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  )
}
function Tarea(props){
  const navigation = useNavigation();
  const {lista} = props;
  const {tit,typ,tid,pla,amo,det,tim,nqu,npi,nre,sig} = lista.item;
  return(
    <TouchableOpacity style={styles.TouchTask}>
      <View style={styles.viewTareas}>
        <View style={styles.circleViewRZ}>
          <Text style={styles.circleText}>{sig}</Text>
        </View>
        <Text style={styles.textTypeTask}>{typ}</Text>
      </View>
      <View style={styles.viewTareas}>
        <Text style={styles.textTitleTask}>{tit}</Text>  
      </View>
      <View>
        <Text style={styles.idText}>id:{tid}</Text>
      </View>
      <Divider style= {styles.divider} />
      <View style={styles.viewTareasTexto}>
        <View>
          <Text style={styles.textTask}>Lugar: <Text style={styles.textRTask}>{pla}</Text></Text>
        </View>
      </View>
      <View style={styles.viewTareasTexto}>
        <View>
          <Text style={styles.textTask2}>A pagar: <Text style={styles.textRTask}>$ {amo}</Text></Text>
        </View>
      </View>
      <View style={styles.viewBtn}>
        <Button
          title="Ver detalles"
          containerStyle={styles.btnContainer2}
          buttonStyle={styles.btn2}
          onPress={() => navigation.navigate("detailtask",{
            tit:tit,
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
            start:true
          })}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  TouchTask:{
    marginTop:10,
    borderRadius:10,
    // borderColor:"black",
    backgroundColor:"#fff",
    borderWidth: 0.5,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15 ,
    shadowOffset : { width: 1, height: 13}
  },
  loaderTask: {
    marginTop:100,
    marginBottom: 10,
    alignItems: "center"
  },
  viewTareas:{
    flexDirection: "row",
    margin:3,
    borderRadius:1
  },
  viewBtn:{
    flexDirection:"row",
    margin:1,
    borderRadius:1,
    alignSelf:"center"
  },
  viewTareasTexto:{
    flexDirection: "row",
    margin:1,
    borderRadius:1,
  },
  textTypeTask:{
    marginTop:8
  },
  textTitleTask:{
    fontWeight: "bold",
    fontSize: 20,
  },
  idText:{
    marginLeft:5,
    fontSize: 10
  },
  textTask:{
    marginLeft:5,
    marginRight:70,
    fontSize: 20
  },
  textTask2:{
    marginLeft:5,
    marginRight:50,
    fontSize: 20
  },
  textRTask:{
    marginLeft:5,
    fontSize: 20,
    fontWeight: "bold"
  },
  circleViewRZ: {
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
  btnContainer2: {
    marginTop: 20,
    width: "50%",
    marginHorizontal:15
  },
  btn2: {
    backgroundColor: "#A88DCB",
    borderRadius: 50,
    marginHorizontal:8,
    marginBottom:10
  },
});
