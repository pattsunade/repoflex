import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { View, Text} from 'react-native';
import { Button, Divider, Icon } from 'react-native-elements'
import { Card } from 'react-native-paper';
import { formatearFechaHora } from 'utils/fechas';
import { formatNumberDots } from 'utils/numeros';
import styles from './styles'
import TaskTitle from './TaskTitle';

function TaskBody ({location, date, amount}) {

	return (
		<View style={styles.taskTextView}>
			
            <Text style={styles.taskElementMiniText}>Local</Text>

			<View style={styles.taskIconTextContainer}>
                <Text style={styles.taskDetail}>{location}</Text>
                <View style={styles.iconStyleContainer}>
                    <Icon  
                        type='material-community' 
                        name='store-outline'
                        iconStyle={styles.IconDetail}
                    />
                </View>
			</View>

            <Text style={styles.taskElementMiniText}>Fecha y hora</Text>
			<View style={styles.taskIconTextContainer}>
                <Text style={styles.taskDetail}>{formatearFechaHora(date)}</Text>
                <View style={styles.iconStyleContainer}>
                    <Icon  
                        type='material-community' 
                        name='calendar-clock'
                        iconStyle={styles.IconDetail}
                    />
                </View>
			</View>

			<Text style={styles.taskText}>
				A pagar: <Text style={styles.boldTaskDetail}>${formatNumberDots(amount)}</Text>
			</Text>
		</View>
	)	
}


function TaskCard({lista,start,abort,assign}) {

    const navigation = useNavigation();
    const {tit,typ,tid,pla,amo,det,tim,nqu,npi,nre,sig,wen} = lista.item;

    return (
        <Card style={styles.card}>
			<TaskTitle sig={sig} name={tit} type={typ} id={tid} />
			<Divider style= {styles.divider}/> 
			<TaskBody location={pla} date={wen} amount={amo} />
            <View style={styles.btnView}>
				<Button
					title='Ver detalles'
					containerStyle={styles.btnContainer}
					buttonStyle={styles.btn}
					onPress={() => navigation.navigate('taskdetail',{ 
						tit:tit,
						typ:typ,
						tid:tid,
						pla:pla,
						amo:amo,
						sig:sig,
						wen:wen,
						start:start,
						assign:assign,
						abort:abort
					})}
				/>
			</View>
        </Card>
    )
}

export default TaskCard