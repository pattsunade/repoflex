import backendRequest from "../backendHandler"
const taskp = async({ ticketId, questionId, file }) => {

    return await backendRequest('POST','taskp',{
        tid: ticketId,
        qid: questionId,
        file: file
    })

}

export default taskp