import backendRequest from "../backendHandler"
import * as Location from 'expo-location';

const tasks = async({ pag, tat }) => {
    const location = await Location.getCurrentPositionAsync({});

    return await backendRequest('POST','tasks',{
        tat: tat,
        pag: pag, //requested page
        lat: location.coords.latitude.toString(),
        lon: location.coords.longitude.toString(),
    })
}

export default tasks;