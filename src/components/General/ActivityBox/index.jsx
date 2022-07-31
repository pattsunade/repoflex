import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import { Icon } from 'react-native-elements';

const ActivityBox = ({
    onPress = () => {},
    type,
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
                    type='material-community'
                    name='arrow-right-bold-circle'
                    iconStyle={styles.iconLeft1}
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
    iconLeft1:{
        color: '#6B35E2',
        marginRight: 15,
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
