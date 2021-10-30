import React from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

export default function UserGuest() {
  const navigation = useNavigation();
  return(
    <ScrollView centerContent={true} style={styles.viewBody} >
      <Text style={styles.title}>Repoflex App</Text>
      <Text styles={styles.description}>
        ¡Bienvenido a Repoflex!{"\n"}
        Un producto de Zolbit para el retail.
      </Text>
      <View style={styles.viewBtn}>
        <Button
          title="Empezar"
          buttonStyle={styles.btnStyle}
          containerStyle={styles.btnContainer}
          onPress={ ()=> navigation.navigate("login") }
        />
      </View>
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