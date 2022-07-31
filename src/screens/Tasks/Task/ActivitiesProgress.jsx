import { RF_PURPLE } from 'components/colorsConstants';
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import * as Progress from 'react-native-progress';
const ActivitiesProgress = ({total, done}) => {
    const progress = React.useMemo(() => {
        return parseInt(done)/parseInt(total);
    },[total, done])
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Progreso de la tarea</Text>
            <Progress.Bar progress={progress} width={null} backgroundColor='#fff' height={25} color={RF_PURPLE}/>
            <Text style={styles.text}>{progress*100} %</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        // flex: 1,
        flexDirection: "column",
        // borderWidth: 1,
        // margin: 100
    },
    title:{
        width: '100%',
        fontWeight:'bold',
        paddingBottom:5,
        marginTop:10,
        marginBottom:10,
        fontSize:25,
        //color: '#6B35E2',
        textAlign:'center'
    },
    text: {
        width: '100%',
        textAlign: 'center',
        marginTop: 10
    }
})

export default ActivitiesProgress;
