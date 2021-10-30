import { styleSheets } from 'min-document';
import React from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements';
import { Divider, Button } from 'react-native-elements';

export default function ListNotification(props) {
    const {notifications} = props;
    const goTask = () =>{
        console.log("go tarea");
    }
    return (
        <View>
        <TouchableOpacity style={styles.TouchTask} onPress={goTask}>
            <View style={styles.viewTareas}>
                <View style={styles.circleViewRZ}>
                    <Text style={styles.circleText}>N</Text>
                </View>
                <Text style={styles.textTypeTask}>Notificación</Text>
            
            </View>
            <View style={styles.viewTareas}>
                <Text style={styles.textTitleTask}>{notifications[0]}</Text>
            </View>
            <View>
                <Text style={styles.idText}>id:123456</Text>
            </View>
            <Divider style= {styles.divider} />
            <View style={styles.viewTareasTexto}>
                <View>
                <Text style={styles.textTask2}>Texto Texto Texto Texto Texto Texto Texto Texto Texto Texto Texto Texto </Text>
                </View>
                
            </View>
             
            <View style={styles.viewTareasTexto}>
                <View>
                    <Button
                        title="Eliminar"
                        containerStyle={styles.btnContainer}
                        buttonStyle={styles.btn}
                        //onPress={onSubmit}
                    />
                </View>
                
                
            </View>
            
        </TouchableOpacity>

        <TouchableOpacity style={styles.TouchTask} onPress={goTask}>
            <View style={styles.viewTareas}>
                <View style={styles.circleViewRZ}>
                    <Text style={styles.circleText}>N</Text>
                </View>
                <Text style={styles.textTypeTask}>Notificación</Text>
            
            </View>
            <View style={styles.viewTareas}>
                <Text style={styles.textTitleTask}>{notifications[1]}</Text>
            </View>
            <View>
                <Text style={styles.idText}>id:123456</Text>
            </View>
            <Divider style= {styles.divider} />
            <View style={styles.viewTareasTexto}>
                <View>
                <Text style={styles.textTask2}>Texto Texto Texto Texto Texto Texto Texto Texto Texto Texto Texto Texto </Text>
                </View>
                
            </View>
             
            <View style={styles.viewTareasTexto}>
                <View>
                    <Button
                        title="Eliminar"
                        containerStyle={styles.btnContainer}
                        buttonStyle={styles.btn}
                        //onPress={onSubmit}
                    />
                </View>
            </View>
        </TouchableOpacity>
        </View>
    )
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
        alignItems: "center",
    },
    viewTareas:{
        flexDirection: "row",
        margin:3,
        borderRadius:1,
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
        fontSize: 10,
    },
    textTask:{
        marginLeft:5,
        marginRight:70,
        fontSize: 20,
    },
    textTask2:{
        marginLeft:5,
        marginRight:50,
        fontSize: 20,
    },
    textRTask:{
        marginLeft:5,
        fontSize: 20,
        fontWeight: "bold", 
    },
    circleViewRZ: {
        width: 35,
        height: 35,
        borderRadius: 20,
        backgroundColor: "#6A17DF",
        justifyContent: 'center',
        marginRight:5,
    },
    circleText: {
        fontWeight: "bold", 
        fontSize: 20,
        textAlign: 'center',
        color:"#fff"
    },
    divider:{
        backgroundColor: "#6B35E2",
        margin: 10,
        
    },
    btnContainer: {
        marginTop: 20,
        width: "100%",
        marginHorizontal:15
      },
      btn: {
        backgroundColor: "#A88DCB",
        borderRadius: 50,
        marginHorizontal:80,
        marginBottom:10

      },

      btnContainer2: {
        marginTop: 20,
        width: "100%",
        marginHorizontal:15
      },
      btn2: {
        backgroundColor: "#68BB6D",
        borderRadius: 50,
        marginHorizontal:8,
        marginBottom:10
      },
});