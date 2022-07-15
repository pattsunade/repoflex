import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Constants from "expo-constants";

function ZolbitProduct () {
    return (
        <View style={styles.container}>
            <Text>Un producto de Zolbit</Text>
            <Text>Versión v{Constants.manifest.version}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        // justifyContent: "center"
    }
})

export default ZolbitProduct;
