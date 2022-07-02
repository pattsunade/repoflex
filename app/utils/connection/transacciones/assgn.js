import backendRequest from "../backendHandler"
const assgn = async({ tid }) => {

    return await backendRequest('POST','assgn',{
        tid: tid,
    })

}

export default assgn