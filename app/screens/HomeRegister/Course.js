import React, { useRef,useState } from "react";
import { StyleSheet,StatusBar, Text, View, ScrollView,  TouchableOpacity ,Dimensions,SafeAreaView} from 'react-native';
import { Divider,Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

import Toast from "react-native-easy-toast";
import { Button, ButtonContainer } from "../../components/Button";
import { Alert } from "../../components/Alert";
import CourseShow from "../../components/HomeRegister/CourseShow";

export default function Course (props) {
    const {navigation} = props;
    return(
        <View>
            <CourseShow/>
        </View>
        )
}