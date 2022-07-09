import backendRequest from "../backendHandler"
import * as Location from 'expo-location';

const tasks = async({ pag, tat, search }) => {
    const location = await Location.getCurrentPositionAsync({});

    return await backendRequest('POST','tasks',{
        tat: tat,
        pag: pag, //requested page
        lat: location.coords.latitude.toString(),
        lon: location.coords.longitude.toString(),
        // sea: search,
    })
}

export default tasks;