import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { View, Text} from 'react-native';
import { Button, Divider, Icon } from 'react-native-elements'
import { Card } from 'react-native-paper';
import { formatearFechaHora } from 'utils/fechas';
import { formatNumberDots } from 'utils/numeros';
import styles from './styles'


function CircleIcon ({text}) {
	return (
		<View style={styles.circleView}>
			<Text style={styles.circleText}>{text}</Text>
		</View>
	)
}

function TaskTitle({name, type, id, sig}) {
	return (
		<View style={styles.taskTypeView}>
			<CircleIcon text={sig}/>
			<View style={styles.titleTaskSection}>
				<Text style={styles.textTitleTask}>{name}</Text>  
				<Text style={styles.taskTypeText}>{type}</Text>
			</View>
			<Text style={styles.textId}>id:{id}</Text>
		</View>
	)
}


function TaskData ({location, date, amount, detail, time}) {

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
                <View style={styles.taskIconTextContainer}>
                    <Icon 
                        type='material-community' 
                        name='calendar-clock'
                        iconStyle={styles.IconDetail}
                    />
                </View>

			</View>

            <Text style={styles.taskElementMiniText}>
                Descripción
            </Text>
            <View style={styles.taskDetailContainer}>
                <Text style={styles.taskDetailText}>
                    {detail}
                </Text>
            </View>
			<Text style={styles.taskText}>
				A pagar: <Text style={styles.boldTaskDetail}>${formatNumberDots(amount)}</Text>
			</Text>
            
            { parseInt(time) > 0 && (
                <Text style={styles.taskText}>
                    Tiempo de resolución: <Text style={styles.taskDetail}>{tim} min</Text>
                </Text>
                )}
		</View>
	)	
}
function TaskCardExtended({data, buttons}) {
    const {tit,typ,tid,pla,amo,sig,wen,start,abort,assign, det, tim, npi, nqu, nre} = data;

    return (
        <Card style={styles.card}>
            <TaskTitle sig={sig} name={tit} type={typ} id={tid} />

            <Divider style= {styles.divider} />

            <TaskData location={pla} date={wen} amount={amo} detail={det} time={tim}/>
            <Divider style= {styles.divider}/>
            <View style={styles.activityView}>
                <Text style={styles.activityTitleText}>DETALLE DE ACTIVIDADES</Text>
                <Text style={styles.activityDetailNumber}>{nqu} Preguntas<Text></Text></Text>
                <Text style={styles.activityDetailNumber}>{npi} <Text>Fotografías</Text></Text>
                <Text style={styles.activityDetailNumber}>{nre} <Text>Reposición</Text></Text>
            </View>
            <View style={styles.btnView}>
                {buttons}
            </View>
        </Card>
    )
}

export default TaskCardExtended