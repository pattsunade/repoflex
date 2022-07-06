import backendRequest from "../backendHandler"
import * as Location from 'expo-location';

const taska = async({ tid, abc }) => {
    const location = await Location.getCurrentPositionAsync({});

    return await backendRequest('POST','taska',{
        tid: tid,
        abc: abc,
        lat: location.coords.latitude.toString(),
        lon: location.coords.longitude.toString(),
    })
}

export default taska;