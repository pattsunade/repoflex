import React from 'react';
import {View, Text,StyleSheet} from 'react-native';
import { Button } from 'react-native-elements';

function FinishTaskMessage ({ onEndTask = () => {} }){
    return (
        <View style={styles.viewContainer2}>
            <Text style={styles.subtitle}> ¡Ya finalizaste todas las actividades!</Text>
            <Button
                title='Finalizar tarea'
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btnFinish}
                onPress={onEndTask}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    viewContainer2: {
        marginRight:30,
        marginLeft:30,
        marginTop:10,
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
})

export default FinishTaskMessage;
