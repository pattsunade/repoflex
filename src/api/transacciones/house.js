import backendRequest from "../backendHandler"
import * as Location from 'expo-location';

const house = async() => {
    const location = await Location.getCurrentPositionAsync({});
    return await backendRequest('POST','house',{
        lat: location.coords.latitude.toString(),
        lon: location.coords.longitude.toString(),
    })

}

export default house