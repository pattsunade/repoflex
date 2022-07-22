export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
export const getCurrentTime = () => {
    const date = new Date()
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours();
    const min = date.getMinutes();
    return `${day  < 10 ? "0"+day:day}/${month < 10 ? "0"+month:month}/${year} - ${hour >10 ? hour: "0"+hour}:${min > 10? min: "0"+ min}`
}