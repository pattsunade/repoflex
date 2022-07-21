import backendRequest from "../backendHandler"


const gecom = async({ regi }) => {
    return await backendRequest('POST','gecom',{
        reg:regi
    })
}

export default gecom;