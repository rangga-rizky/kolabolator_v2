const validator = require("validator");
const isEmpty = require("../validation/is-empty");

module.exports = function validateExperienceInput(data){
    let errors = {};

    data.title = !isEmpty(data.title) ? data.title:"" ; 
    data.company = !isEmpty(data.company) ? data.company:"" ;  
    data.from = !isEmpty(data.from) ? data.from:"" ;  

    
    if(validator.isEmpty(data.title)){
        errors.title = "Data title dibutuhkan";
    }

    if(validator.isEmpty(data.company)){
        errors.company = "Data company dibutuhkan";
    }

    if(validator.isEmpty(data.from)){
        errors.from = "Data from dibutuhkan";
    }  
   

    return {
        errors,
        isValid: isEmpty(errors)
    }
}