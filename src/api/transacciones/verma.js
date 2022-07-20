import { clean } from "utils/rut"
import backendRequest from "../backendHandler"
const verma = async({ user, code,}) => {

    return await backendRequest('POST','verma',{
        usr: clean(user).toUpperCase(),
        mvc: parseInt(code, 10),
    })

}

export default verma