import React, {useRef, useState, useEffect,useContext} from "react";
import {StyleSheet, View, Text, ScrollView} from "react-native";
import { Button } from "react-native-elements";
import Toast from "react-native-easy-toast";
import * as firebase from "firebase";
import { useNavigation } from "@react-navigation/native";

import Loading from "../../components/Loading";
import InfoUser from "../../components/Account/InfoUser";
import AccountOptions from "../../components/Account/AccountOptions";

export default function Account({route,navigation}) {
    const { nameuser } = route.params;
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("");
    const [reloadUserInfo, setReloadUserInfo] = useState(false);
    const toastRef = useRef();

    return(
        <ScrollView style={styles.viewUserInfo}>
            <InfoUser 
                            toastRef={toastRef}
                            setLoading={setLoading}
                            setLoadingText={setLoadingText}
                            nameuser={nameuser} 
            /> 
            <AccountOptions userInfo={userInfo} toastRef={toastRef} setReloadUserInfo={setReloadUserInfo} />   
            <Button 
                title="Cerrar sesion"
                buttonStyle={styles.btnCloseSession}
                titleStyle={styles.CloseSessionText}
                onPress= {signOut}
            />
            <Toast ref={toastRef} position="center" opacity={0.9} />
            <Loading text={loadingText} isVisible={loading}  />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    viewUserInfo: {
        minWidth: "100%",
        backgroundColor: "#f2f2f2",
    },
    btnCloseSession: {
        marginTop: 30,
        borderRadius: 0,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#e3e3e3",
        borderBottomWidth: 1,
        borderBottomColor: "#e3e3e3",
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 20,
    },
    CloseSessionText: {
        color: "#6B35E2",
    },
})