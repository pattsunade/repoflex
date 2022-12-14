        
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const validateEmail = (email) => {
    if(emailRegex.test(email.toLowerCase())) {
        return true
    } else {
        return false;
    }
};

export function validateNumber(number){
    const re = /^(\+?56)?(\s?)(0?9)(\s?)[9876543]\d{7}$/;
    return re.test(number);
}