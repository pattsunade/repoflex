import React from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import Swiper from 'react-native-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

export default function UserGuest() {
  const navigation = useNavigation();

  function Login()
  { AsyncStorage.setItem('@intro','1').then(()=>
    { navigation.reset(
      { index: 0,
        routes: [
          { name: 'login',
          }
        ],
      });
    })
    .catch((e)=>
    { Toast.show(
      { type: 'error',
        props: {onPress: () => {}, text1: 'Error', text2: "Error interno, intenta más tarde."
        }
      });
    });
  }

  return(
    <Swiper style={styles.wrapper} showsButtons loop={false}>
      <View testID="slide1" style={styles.slide}>
        <Image
          style={styles.image}
          source={require("../../../assets/Intro1.jpg")}
          resizeMode={"cover"} //
        />
        <View style={styles.slideText}>
          <Text style={styles.title}>RÁPIDO</Text>
          <Text style={styles.text}>Regístrate hoy</Text>
          <Text style={styles.text}>y empieza a ganar dinero</Text>
          <Text style={styles.text}>en menos de 24 horas.</Text>
        </View>
      </View>
      <View testID="slide2" style={styles.slide}>
        <Image
          style={styles.image}
          source={require("../../../assets/Intro2.jpg")}
          resizeMode={"cover"} //
        />
        <View style={styles.slideText}>
          <Text style={styles.title}>RENTABLE</Text>
          <Text style={styles.text}>Administra tu tiempo</Text>
          <Text style={styles.text}>e incrementa tus ingresos.</Text>
        </View>
      </View>
      <View testID="slide3" style={styles.slide}>
        <Image
          style={styles.image}
          source={require("../../../assets/Intro3.jpg")}
          resizeMode={"cover"} //
        />
        <View style={styles.slideText}>
          <Text style={styles.title}>FÁCIL</Text>
          <Text style={styles.text}>Conéctate donde sea</Text>
          <Text style={styles.text}>realiza tus tareas cercanas</Text>
          <Text style={styles.text}>Y comienza a ganar.</Text>
        </View>
        <Button
          title="Empezar"
          buttonStyle={styles.btn}
          containerStyle={styles.btnContainer}
          onPress={Login}
        />
      </View>
    </Swiper>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 270,
    height: 270,
    borderWidth: 2,
    borderRadius: 150
  },
  slideText: {
    marginTop:40
  },
  slide:
  { flex: 1,
    marginTop:100,
    alignItems: 'center',
  },
  title:
  { color: '#5300eb',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  text:
  { color: '#b597ff',
    fontSize: 20,
    textAlign: 'center'
  },
  btnContainer: {
    marginTop: 40,
    width: "65%",
  },
  btn: {
    backgroundColor: "#6B35E2",
    borderRadius: 50,
  },
});