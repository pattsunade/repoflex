import backendRequest from "../backendHandler"


const abort = async({ tid }) => {
    return await backendRequest('POST','abort',{
        tid: parseInt(tid, 10)
    })
}

export default abort;