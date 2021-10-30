import React from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { Overlay } from "react-native-elements"; //Modal

export default function Loading(props){
    const { isVisible, text } = props;
    return(
        <Overlay 
            isVisible={isVisible}
            windowBackgroundColor="rgba(0, 0, 0, 0.5)"
            overlayBackgroundColor="transparent"
            overlayStyle={styles.overlay}
        >
            <View style={styles.view}>
                <ActivityIndicator size="large" color="#6B35E2" />
                {text && <Text style={styles.text} >{text}</Text>}
            </View>
        </Overlay>
    );
}

const styles = StyleSheet.create({
    overlay:{
        height: 100,
        width: 200,
        backgroundColor: "#fff",
        borderColor: "#6B35E2",
        borderWidth: 2,
        borderRadius: 10,
    },
    view:{
        alignItems: "center",
        justifyContent: "center",
    },
    text:{
        color: "#6B35E2",
        textTransform: "uppercase",
        marginTop: 10,
    },
});