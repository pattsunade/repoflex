import React from "react";
import {StyleSheet,View,ActivityIndicator,Text} from "react-native";
import * as Notifications from 'expo-notifications';
import LocationPermissionsScreen from "components/General/Permissions/LocationPermissionsScreen";
import Home from "screens/Home/HomeApp/Home";

function HomeApp() {
    // const [isLoading, setIsLoading] = React.useState(true); // set loading state

    React.useEffect(() => {(
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
    }, []);


    const [localizationGranted, setLocalizationGranted] = React.useState(false); // 

    const onPermissionGranted = () => {
        setLocalizationGranted(true);
    }
    if (localizationGranted === false) {
        return <LocationPermissionsScreen onPermissionGranted={onPermissionGranted}/>
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