import { styleSheets } from 'min-document';
import React from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements';

export default function ListTaskSent() {
    return (
        <View style={styles.loaderTask}>
            <ActivityIndicator  size="large" color="#0000ff"/>
            <Text>Cargando Tareas</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    loaderTask: {
        marginTop:100,
        marginBottom: 10,
        alignItems: "center",
    },
});
