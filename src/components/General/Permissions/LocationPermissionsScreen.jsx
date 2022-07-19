import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import * as Location from 'expo-location';
import { ActivityIndicator } from 'react-native-paper';
import useMountedComponent from 'utils/hooks/useMountedComponent';

function LocationPermissionsScreen ({
    onPermissionGranted = () => {},
}) {
    const isMounted = useMountedComponent();


    const [isLoading, setIsLoading] = React.useState(true);
    const enableLocation = async() => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
            onPermissionGranted();
        }
    }
    React.useEffect(() => {
        const run = async() => {
            await enableLocation();
            isMounted && setIsLoading(false);
        }
        run();
    },[])

    
    if (isLoading === true) {
        return (
            <View style={styles.loadingIndicator}>
                <ActivityIndicator  size="large" color="#0000ff"/>
                <Text>Verificando permisos</Text>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <Icon
                type='material-community'
                name={'map-marker-outline'}
                iconStyle={styles.icon}
            />
            <Text style={styles.titleText}>
                Habilitar Localización
            </Text>
            <Text style={styles.commentText}>
                Debes permitir acceder a tu localización para poder usar Repoflex
            </Text>
            <Button 
                containerStyle={styles.buttonContainer}
                buttonStyle={styles.button}
                title={'Otorgar permiso'}
                onPress={enableLocation}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        marginHorizontal: 50,
        alignItems: 'center',
        justifyContent: 'center',
        // borderWidth: 1
    },
    titleText: {
        fontWeight:'bold',
        marginTop: 20,
        textAlign: 'center',
        fontSize: 16,
        color: '#000000',
    },
    commentText: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 14,
        color: '#696969'
    },
    icon: {
        fontSize: 120,
        color: '#946cea'
    },
    buttonContainer: {
        width: '100%',
        marginTop: 40,
        // marginTop: 'auto',
        // marginBottom: 50
    },
    button: {
        backgroundColor: '#6B35E2',
        borderRadius: 100,
    },
    loadingIndicator: {
        marginTop:100,
        marginBottom: 10,
        alignItems: "center"
      }
})

export default LocationPermissionsScreen;
