import React from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { Overlay } from "react-native-elements";

export default function Loading({text=""}){
    return (
      <View style={styles.loaderTask}>
        <ActivityIndicator  size="large" color="#0000ff"/>
        <Text>{text}</Text>
      </View>
    );
}

const styles = StyleSheet.create({
  loaderTask:
  { marginTop:100,
    marginBottom: 10,
    alignItems: "center",
  },
});