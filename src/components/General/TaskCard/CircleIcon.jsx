import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles'

function CircleIcon ({text}) {
	return (
		<View style={styles.circleView}>
			<Text style={styles.circleText}>{text}</Text>
		</View>
	)
}


export default CircleIcon;
