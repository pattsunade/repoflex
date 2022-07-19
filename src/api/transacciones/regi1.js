import { clean } from "utils/rut"
import backendRequest from "../backendHandler"

const regi1 = async({ user, password, phone }) => {

    return await backendRequest('POST','regi1',{
        usr: clean(user).toUpperCase(),
        psw: password,
        pho: phone,
    })

}

export default regi1