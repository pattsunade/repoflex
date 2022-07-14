import React from 'react';
import {View, Text} from 'react-native';
import CircleIcon from './CircleIcon';
import styles from './styles'


function TaskTitle({name, type, id, sig}) {
	return (
        <View>
            <Text style={styles.textId}>id:{id}</Text>
            <View style={styles.taskTypeView}>
                <CircleIcon text={sig}/>
                <View style={styles.titleTaskSection}>
                    <Text style={styles.textTitleTask}>
                        {name} 
                    </Text>  
                    <Text style={styles.taskTypeText}>
                        {type}
                    </Text>
                </View>
                
            </View>
        </View>
	)
}

export default TaskTitle;
