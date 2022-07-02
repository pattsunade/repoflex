import backendRequest from "../backendHandler"

const cours = async() => {

    return await backendRequest("POST","cours")
}

export default cours;