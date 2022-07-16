import React from "react";
import {StyleSheet,View,ActivityIndicator,Text} from "react-native";
import * as Location from 'expo-location';
import LocationPermissionsScreen from "components/General/Permissions/LocationPermissionsScreen";
import Home from "screens/Home/HomeApp/Home";

function HomeApp() {
    const [isLoading, setIsLoading] = React.useState(true); // set loading state
    const [localizationGranted, setLocalizationGranted] = React.useState(false); // 

    const enableLocation = async() => {
        const { status } = await Location.requestForegroundPermissionsAsync()
        if (status === 'granted') {
            setLocalizationGranted(true)
        }
    }
    React.useEffect(() => {
        const run = async() => {
            await enableLocation();
            setIsLoading(false)
        }
        run();
    },[])

    
    if(isLoading === true) {
        return (
            <View style={styles.loaderTask}>
                <ActivityIndicator  size="large" color="#0000ff"/>
                <Text>Cargando...</Text>
            </View>
        )
    }
    if (localizationGranted === false) {
        return <LocationPermissionsScreen onPressEnable={enableLocation}/>
    } 
    
    return (
        <View style={styles.viewForm}>
            <Home/>
        </View>
    )
}


export default HomeApp

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: 20
  },
  viewForm: {
    marginRight: 30,
    marginLeft: 30
  },
  loaderTask: {
    marginTop:100,
    marginBottom: 10,
    alignItems: "center"
  }
});