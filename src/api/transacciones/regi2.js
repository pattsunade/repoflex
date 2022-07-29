import { clean } from "utils/rut"
import backendRequest from "../backendHandler"

const regi2 = async({name, snam, ndoc, addr, comu, pais, usr, bank, acty, acnu}) => {

    return await backendRequest('POST','regi2',{
        name : name,
        snam : snam,
        ndoc : ndoc.toUpperCase(),
        addr : addr,
        comu : comu,
        pais : pais,
        usr  : usr,
        bank : bank,
        acty : acty,
        acnu : acnu
    })

}

export default regi2