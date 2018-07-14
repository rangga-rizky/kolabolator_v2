const validator = require("validator");
const isEmpty = require("../validation/is-empty");

module.exports = function validateProjectInput(data){
    let errors = {};

    data.text = !isEmpty(data.text) ? data.text:"" ; 
    data.title = !isEmpty(data.title) ? data.title:"" ; 
    data.type = !isEmpty(data.type) ? data.type:"" ; 

    if(validator.isEmpty(data.text)){
        errors.text = "Data text dibutuhkan";
    }  
    
    if(validator.isEmpty(data.type)){
        errors.type = "Data type dibutuhkan";
    }    


    if(validator.isEmpty(data.title)){
        errors.title = "Data title dibutuhkan";
    }    


    return {
        errors,
        isValid: isEmpty(errors)
    }
}