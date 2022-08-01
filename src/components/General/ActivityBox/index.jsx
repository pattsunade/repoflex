import { RF_PURPLE } from 'components/colorsConstants';
import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import { Icon } from 'react-native-elements';

const TYPE_CONFIG = {
    next: {
        iconType: 'material-community',
        name:'arrow-right-bold-circle'
    },
    wait: {
        iconType: 'material-community',
        name:'circle'
    },
    done: {
        iconType: 'material-community',
        name:'check-circle'
    },
    error: {

    }
}

const ActivityBox = ({
    onPress = () => {},
    type='next',
    title,
    subtitle
}) => {
    return (
        <TouchableOpacity
            style={styles.activityBox} 
            onPress={onPress}
        >
            <View style={styles.viewContainer} >
                <Icon
                    type={TYPE_CONFIG[type].iconType}
                    name={TYPE_CONFIG[type].name}
                    iconStyle={styles[type]}
                    size={35}
                />
                <View style={styles.activityText}>
                    <Text style={styles.customBtnText}>{title}</Text>
                    <Text style={styles.customBtnText}>{subtitle}</Text>
                </View>
            </View>
                

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    activityBox:{
        backgroundColor:'#fff',
        paddingHorizontal:30,
        paddingVertical:5,
        borderRadius:30,
        marginTop:5 ,
        marginBottom:5,
        width: '100%'
    },
    viewContainer: {
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center'
    },
    next: {
        marginRight: 15,
        color: RF_PURPLE,
    },
    wait: {
        marginRight: 15,
        color:'#DEDCF2',
    },
    done:{
        marginRight: 15,
        color:'#5cb85c',
    },

    customBtnText:{
        fontSize: 15,
        fontWeight: '400',
        marginVertical:5,
    },
    activityText: {
        flex: 1,
        flexDirection:'column'
    },

})

export default ActivityBox;
