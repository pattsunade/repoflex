import React, {useEffect,useState} from "react";
import { StyleSheet, View, ScrollView, Text,Image } from "react-native";
import { Divider } from "react-native-elements";
import LoginForm from "../../components/Login/LoginForm";
import * as Notifications from 'expo-notifications';
import Constants from "expo-constants";
// import repoLogo from "assets/img/repoLogo.png"
export default function Login() {

	const [check, setCheck] = useState(false);
  useEffect(() => {(
		async () => {
		let permisions = await Notifications.requestPermissionsAsync({
			ios: {
				allowAlert: true,
				allowBadge: true,
				allowSound: true,
				allowAnnouncements: true,
				},
			});
		})();
  }, [check]);

  return(
    <ScrollView>
		<Image 
			source={require("../../../assets/img/repoLogo.png")}
			resizeMode="contain"
			style={styles.logo}
		/>
      <View 
        style={styles.viewContainer}
      >
        <LoginForm/>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.textRegister}>
        <Text>Un producto de Zolbit</Text>
        <Text>Versión v{Constants.manifest.version}</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  logo:{
    width: "100%",
    height: 150,
    marginTop: 70
  },
  viewContainer:{
    marginRight: 40,
    marginLeft: 40
  },
  textRegister:{   
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  btnRegister:{
    color: "#6B35E2",
    fontWeight: "bold"
  },
  divider:{
    backgroundColor: "#6B35E2",
    margin: 40
  }
});