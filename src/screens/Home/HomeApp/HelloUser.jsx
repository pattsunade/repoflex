import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet, Pressable, Text} from 'react-native';
import { Icon } from 'react-native-elements';

function HelloUser ({ name, levl }) {
    const navigation = useNavigation();
    const navitateToAccount = () => {
        navigation.navigate('account',{
            nameuser:name,
            level:levl
        })
    }

    return (
        <View style={styles.container} >
            <View style={styles.helloUserContainer}>
                <Text style={styles.helloText}>¡Hola {name}!  👋</Text> 
            </View> 
            <Icon
                size={40}
                type='material-community'
                name='account-circle'
                iconStyle={styles.icon}
                containerStyle={styles.iconContainer}
                onPress={navitateToAccount}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: { 
        flexDirection: 'row',
        alignItems: 'center',
    },
    pressableArea: {
        flexDirection: "row",
        alignItems: "center",
        marginEnd: 'auto',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 15,
        backgroundColor: '#e8e0fb',

    },
    helloUserContainer: {
        marginEnd: 'auto',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 12,
        backgroundColor: '#e8e0fb',
    },
    helloText: {
        fontSize: 20,
        color: '#6B35E2',
        fontWeight: 'bold',

    },
    name: {
        fontWeight: 'bold', 
    },
    iconContainer: { 
    },
    icon: {
        color: '#6B35E2',
    },  
})

export default HelloUser;
