import backendRequest from "../backendHandler"

const terco = async() => {
    return await backendRequest("POST","terco")
}

export default terco;