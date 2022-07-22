import backendRequest from "../backendHandler"

const taskd = async({ tid }) => {

    return await backendRequest('POST','taskd',{
        tid: tid,
    })
}

export default taskd;