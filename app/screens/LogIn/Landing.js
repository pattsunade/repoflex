import React from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import Swiper from 'react-native-swiper'

export default function UserGuest() {
  const navigation = useNavigation();
  return(
    <Swiper style={styles.wrapper} showsButtons loop={false}>
    <View testID="Hello" style={styles.slide1}>
      <Text style={styles.title}>RÁPIDO</Text>
      <Text style={styles.text}>Regístrate hoy</Text>
      <Text style={styles.text}>y empieza a ganar dinero</Text>
      <Text style={styles.text}>en menos de 24 horas</Text>
    </View>
    <View testID="Beautiful" style={styles.slide2}>
      <Text style={styles.text}>Beautiful</Text>
    </View>
    <View testID="Simple" style={styles.slide3}>
      <Text style={styles.text}>And simple</Text>
    </View>
  </Swiper>
  );
}

const styles = StyleSheet.create({
  slide1:
  { flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide2:
  { flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3:
  { flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  title:
  { color: '#5300eb',
    fontSize: 40,
    fontWeight: 'bold'
  },
  text:
  { color: '#d4c4fb',
    fontSize: 20,
    textAlign: 'center',
  }
});