import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { View, Text} from 'react-native';
import { Button, Divider, Icon } from 'react-native-elements'
import { Card } from 'react-native-paper';
import { formatearFechaHora } from 'utils/fechas';
import { formatNumberDots } from 'utils/numeros';
import styles from './styles'
import TaskTitle from './TaskTitle';

function TaskBody ({location, date, amount, detail, time, id}) {
	return (
		<View style={styles.taskTextView}>
            <View style={styles.topContent}>
            	<Text style={styles.taskElementMiniText}>Local</Text>
            	{/* <Text style={styles.textId}>id: {id}</Text> */}
			</View>

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
                    {detail.replace(/\^/gi,'\n')}
                </Text>
            </View>

            {amount !== '-' &&
                <Text style={styles.taskText}>
                    A pagar: <Text style={styles.boldTaskDetail}>${formatNumberDots(amount)}</Text>
                </Text>
            }
			            
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

            <TaskBody location={pla} date={wen} amount={amo} detail={det} time={tim}  id={tid}/>
            <Divider style= {styles.divider}/>
            <View style={styles.activityView}>
                <Text style={styles.activityTitleText}>DETALLE DE ACTIVIDADES</Text>
                <Text style={styles.activityDetailNumber}>{nqu} Preguntas</Text>
                <Text style={styles.activityDetailNumber}>{npi} Fotografías</Text>
                <Text style={styles.activityDetailNumber}>{nre} Reposición</Text>
            </View>
            <View style={styles.btnView2}>
                {buttons}
            </View>
        </Card>
    )
}

export default TaskCardExtended