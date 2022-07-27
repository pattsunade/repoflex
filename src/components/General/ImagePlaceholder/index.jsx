import { RF_PURPLE } from 'components/colorsConstants';
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { Icon } from 'react-native-elements';

function ImagePlaceholder (){
    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>
                Sin vista previa
            </Text>
            <Icon
                type='material-comunity'
                name='image'
                iconStyle={styles.icon}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 15,
        borderColor: RF_PURPLE,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        color: RF_PURPLE
    },
    icon: {
        color: RF_PURPLE,
        fontSize: 35
    }

})

export default ImagePlaceholder;
