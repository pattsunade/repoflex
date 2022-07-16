import backendRequest from "api/backendHandler"
import Constants from "expo-constants";
import { clean } from "utils/rut";

const auten = async({ user, password }) => {

    return await backendRequest('POST','auten',{
        usr: clean(user).toUpperCase(),
        psw: password,
        vers: Constants.manifest.android.versionCode,
        orig : 'app',
    })

}

export default auten