import { clean } from "utils/rut";
import backendRequest from "../backendHandler"


const usdat = async({ user }) => {
    return await backendRequest('POST','usdat',{
        usr: clean(user).toUpperCase()
    })
}

export default usdat;