import backendRequest from "../backendHandler"
import * as Location from 'expo-location';

const tasks = async({ page, type, latitude, longitude }) => {

    return await backendRequest('POST','tasks',{
        tat: type,
        pag: page, //requested page
        lat: latitude.toString(),
        lon: longitude.toString(),
        // sea: search,
    })
}

export default tasks;