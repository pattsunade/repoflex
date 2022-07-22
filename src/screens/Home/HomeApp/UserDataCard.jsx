import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet, Pressable, Text} from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { formatNumberDots } from 'utils/numeros';
import * as Location from 'expo-location';

function UserDataCard({ location, date, amount}){
    return (
        <Card containerStyle={styles.cardStyle}>
            <View style={styles.cardContainerTitle}>
                <Text style={styles.cardAccoutText}> Mi cuenta </Text>
                {/* <Icon 
                    type='material-community'
                    name='account-cog'
                /> */}
            </View>
            <Text style={styles.cardUpdateText}> Última actualización: {date}</Text>
            <Text style={styles.cardLocationText}> Ubicación {location} </Text>
            <View style={styles.cardContainerMoney}>
                <Text style={styles.cardBalanceMoneyText}> Saldo a favor </Text>
                <Text >
                    <Text style={styles.cardMoneyAmountText1}> $ </Text>
                    <Text style={styles.cardMoneyAmountText2}>{amount && formatNumberDots(amount)}</Text>
                </Text>
            </View>
            
        </Card>
    )
}
const styles = StyleSheet.create({
    cardStyle: {
        borderWidth: 1,
        margin: 0,
        borderRadius: 10,
        shadowColor: 'rgba(0,0,0, .2)',
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 0, //default is 1
        shadowRadius: 0//default is 1

        
    },
    // card info
    cardContainerTitle: {
        flexDirection: "row",
        marginBottom: 0,
        // borderWidth: 1,
    },
    cardAccoutText: {
        fontSize: 18,
        
        marginEnd: "auto"
    },
    cardUpdateText: {
        fontSize: 12,
        color: "gray",
    },
    cardLocationText: {
        color: "gray",
        fontSize: 12,
    },
    cardContainerMoney: {
        marginTop: 14,
        // borderWidth: 1,

    }, 
    cardBalanceMoneyText: {
        color: "#6B35E2",
        fontSize: 16,
    },
    cardMoneyAmountText1: {
        color: "#6B35E2",
        fontSize: 20
    },
    cardMoneyAmountText2: {
        color: "#6B35E2",
        fontSize: 24,
        fontWeight: "bold"
    }, 
})

export default UserDataCard;
