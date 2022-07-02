import backendRequest from "../backendHandler"

const taskq = async({ tid }) => {

    return await backendRequest('POST','taskq',{
        tid: tid,
    })
}

export default taskq;