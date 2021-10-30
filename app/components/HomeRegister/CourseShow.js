import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Text, Alert, Dimensions,Platform } from "react-native";
import { Icon, Avatar, Input, Image, Button } from "react-native-elements";
import * as MediaLibrary from 'expo-media-library';
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from 'expo-image-manipulator';

import BackEndConnect from "../../utils/BackEndConnect";

export default function CourseShow () {
    return(
        <ScrollView centerContent={true} style={styles.viewBody}>
            <Text style={styles.title} Repoflex App />
            <Text styles={styles.description}>
                Mucho texto Mucho texto Mucho texto Mucho texto Mucho texto
                Mucho texto Mucho texto Mucho texto Mucho texto Mucho texto 
                Mucho texto Mucho texto Mucho texto Mucho texto Mucho texto.
            </Text>
        </ScrollView>
    );    
}

const styles = StyleSheet.create({
    viewBody:{
        marginHorizontal:30
    },
    image:{
        height: 300,
        width: "100%",
        marginBottom: 40,
    },
    title:{
        fontWeight: "bold",
        fontSize: 19,
        marginBottom: 50,
        marginTop:100,
        textAlign: "center",
    },
    description:{
        marginBottom: 20,
        textAlign:"center",
    },
    btnStyle:{
        backgroundColor: "#6B35E2",
    },
    viewBtn:{
        flex: 1,
        alignItems: "center",
        marginTop:40
    },
    btnContainer:{
        width: "70%",
    },

});