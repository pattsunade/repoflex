import React, { useState,useCallback,useEffect } from "react";
import {StyleSheet,View,ActivityIndicator,Text} from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import HomeApp from "../../components/Home/HomeApp";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer';
import * as Notifications from 'expo-notifications';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from "moment";

export default function Home() {  
  const navigation = useNavigation();

  // function HomeScreen() 
  // { return (
  //     <View style={styles.viewForm}>
  //       <HomeApp
  //         name={name}
  //         amou={amou}
  //         rank={rank}
  //         avai={avai}
  //         asgn={asgn}
  //         proc={proc}
  //         envi={envi}
  //         chck={chck}
  //         fini={fini}
  //         loca={loca}
  //         noti={noti}
  //         work={work}
  //         date={date}
  //       />
  //     </View>
  //   );
  // }

  // function CustomDrawerContent(props)
  // { return (
  //     <DrawerContentScrollView {...props}>
  //       <DrawerItemList {...props} />
  //       {/*<DrawerItem
  //         label="Cerrar sesión"
  //         onPress={() => signOut()}
  //       />*/}
  //     </DrawerContentScrollView>
  //   );
  // }

  return(
    <View style={styles.viewForm}>
      <HomeApp/>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: 20
  },
  viewForm: {
    marginRight: 40,
    marginLeft: 40
  },
  loaderTask: {
    marginTop:100,
    marginBottom: 10,
    alignItems: "center"
  }
});