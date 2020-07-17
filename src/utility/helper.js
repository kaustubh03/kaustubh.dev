export const findInArray = (arr, key, resultant) =>{
    let arr_ = arr.find(item=>{
        return item[key] === resultant;
    });
    return arr_;
}