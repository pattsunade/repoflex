import backendRequest from "../backendHandler"

const quest = async() => {
    return await backendRequest("POST","quest")
}

export default quest;