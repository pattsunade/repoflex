import React from 'react';
import {View, Text} from 'react-native';
import CircleIcon from './CircleIcon';
import styles from './styles'


function TaskTitle({name, type, id, sig}) {
	return (
        <View>
            <View style={styles.topTitle}>
                <CircleIcon text={sig}/>
                <Text style={styles.textTitleTask}>
                    {name} 
                </Text>  
            </View>

            <View style={styles.subTitle}>     
                <Text style={styles.taskTypeText}>
                    {type}
                </Text>
                <Text style={styles.textId}>id:{id}</Text>
            </View>
        </View>
	)
}

export default TaskTitle;
