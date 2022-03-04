export const getLocalDate = (date:Date) =>{
    // let d = new Date();
    let d = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    return d.toISOString().split('T')[0];
}