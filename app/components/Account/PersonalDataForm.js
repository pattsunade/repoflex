import React,{useState} from "react";
import { StyleSheet, Text, View, ScrollView, Alert, TouchableOpacity, Linking } from 'react-native';
import { Button, Icon, Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import * as WebBrowser from 'expo-web-browser';
import ParsedText from 'react-native-parsed-text';
import BackEndConnect from "../../utils/BackEndConnect";

export default function PersonalDataForm (props) {
  const navigation = useNavigation();
  

  // paragraph.map((ans) =>{console.log(ans.bod)})
  return (
    <ScrollView>
      <View style={styles.parentView}>
        <View style={styles.firstRowView}>
          <Text style={styles.dataText}>Nombres</Text>
          <Text style={styles.dataText}>Nicolás Antonio</Text>
        </View>
        <View>
          <Icon type="material-community" name="file-edit-outline" size={24} color="black" />
        </View>
      </View>
      <View style={styles.parentView}>
        <View style={styles.firstRowView}>
          <Text style={styles.dataText}>Apellidos</Text>
          <Text style={styles.dataText}>Pino Leva</Text>
        </View>
        <View>
          <Icon type="material-community" name="file-edit-outline" size={24} color="black" />
        </View>
      </View>
      <View style={styles.parentView}>
        <View style={styles.firstRowView}>
          <Text style={styles.dataText}>Rut</Text>
          <Text style={styles.dataText}>19.410.235-6</Text>
        </View>
        <View>
          <Icon type="material-community" name="file-edit-outline" size={24} color="black" />
        </View>
      </View>
      <View style={styles.parentView}>
        <View style={styles.firstRowView}>
          <Text style={styles.dataText}>Correo</Text>
          <Text style={styles.dataText}>npino7081@gmail.com</Text>
        </View>
        <View>
          <Icon type="material-community" name="file-edit-outline" size={24} color="black" />
        </View>
      </View>
      <View style={styles.parentView}>
        <View style={styles.firstRowView}>
          <Text style={styles.dataText}>Teléfono</Text>
          <Text style={styles.dataText}>+56998869780</Text>
        </View>
        <View>
          <Icon type="material-community" name="file-edit-outline" size={24} color="black" />
        </View>
      </View>
      <View style={styles.parentView}>
        <View style={styles.firstRowView}>
          <Text style={styles.dataText}>Dirección</Text>
          <Text style={styles.dataText}>Quirihue 255 DPTO 45</Text>
        </View>
        <View>
          <Icon type="material-community" name="file-edit-outline" size={24} color="black" />
        </View>
      </View>
      <View style={styles.parentView}>
        <View style={styles.firstRowView}>
          <Text style={styles.dataText}>Comuna</Text>
          <Text style={styles.dataText}>Ñuñoa</Text>
        </View>
        <View>
          <Icon type="material-community" name="file-edit-outline" size={24} color="black" />
        </View>
      </View>
      <View style={styles.parentView}>
        <View style={styles.firstRowView}>
          <Text style={styles.dataText}>País</Text>
          <Text style={styles.dataText}>Chile</Text>
        </View>
        <View>
          <Icon type="material-community" name="file-edit-outline" size={24} color="black" />
        </View>
      </View>
      <Text style={styles.titleText}> Datos bancarios</Text>
      <View style={styles.parentView}>
        <View style={styles.firstRowView}>
          <Text style={styles.dataText}>Banco</Text>
          <Text style={styles.dataText}>Banco de Chile</Text>
        </View>
        <View>
          <Icon type="material-community" name="file-edit-outline" size={24} color="black" />
        </View>
      </View>
      <View style={styles.parentView}>
        <View style={styles.firstRowView}>
          <Text style={styles.dataText}>Tipo de cuenta</Text>
          <Text style={styles.dataText}>Corriente</Text>
        </View>
        <View>
          <Icon type="material-community" name="file-edit-outline" size={24} color="black" />
        </View>
      </View>
      <View style={styles.parentView}>
        <View style={styles.firstRowView}>
          <Text style={styles.dataText}>Número</Text>
          <Text style={styles.dataText}>00-174-07682-07</Text>
        </View>
        <View>
          <Icon type="material-community" name="file-edit-outline" size={24} color="black" />
        </View>
      </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  parentView: {
    flexDirection: 'row',
    marginTop:15
  },
  firstRowView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: 'black',
    borderBottomWidth: 2,
  },
  dataText:{
    color: "#6B35E2",
    fontSize:14
  },
  iconRight: {
    color:"#AC9DC9",
  },
  titleText:{
    fontSize:20,
    fontWeight:"bold",
    marginTop:10
  }
});