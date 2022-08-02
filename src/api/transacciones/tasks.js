import backendRequest from "../backendHandler"

const tasks = async({ page, type, latitude, longitude, search }) => {

    return await backendRequest('POST','tasks',{
        tat: type,
        pag: page, //requested page
        lat: latitude.toString(),
        lon: longitude.toString(),
        sea: search === ''? undefined: search
        // sea: search,
    })
}

export default tasks;