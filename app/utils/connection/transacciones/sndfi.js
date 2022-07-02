import backendRequest from "../backendHandler"

const sndfi = async({nfil, tfil, file}) => {
    return await backendRequest("POST","sndfi",{
        nfil : nfil,
        tfil: tfil,
        file : file
    });
}

export default sndfi;