import { clean } from "utils/rut"
import backendRequest from "../backendHandler"
const sndvc = async({ user, password, mail }) => {

    return await backendRequest('POST','sndvc',{
        usr: clean(user).toUpperCase(),
        psw: password,
        mail: mail
    })

}

export default sndvc