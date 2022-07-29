import backendRequest from "../backendHandler"
import * as Location from 'expo-location';

const taskd = async({ tid }) => {
    const location = await Location.getCurrentPositionAsync({});

    return await backendRequest('POST','taskd',{
        tid: tid,
        lat: location.coords.latitude.toString(),
        lon: location.coords.longitude.toString(),
    })
}

export default taskd;