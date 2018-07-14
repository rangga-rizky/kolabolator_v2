const validator = require("validator");
const isEmpty = require("../validation/is-empty");

module.exports = function validateEducationInput(data){
    let errors = {};

    data.school = !isEmpty(data.school) ? data.school:"" ; 
    data.fieldOfStudy = !isEmpty(data.fieldOfStudy) ? data.fieldOfStudy:"" ;  
    data.deegre = !isEmpty(data.deegre) ? data.deegre:"" ;  
    data.from = !isEmpty(data.from) ? data.from:"" ;  

    
    if(validator.isEmpty(data.school)){
        errors.school = "Data school dibutuhkan";
    }

    if(validator.isEmpty(data.fieldOfStudy)){
        errors.fieldOfStudy = "Data fieldOfStudy dibutuhkan";
    }

    if(validator.isEmpty(data.deegre)){
        errors.deegre = "Data deegre dibutuhkan";
    }

    if(validator.isEmpty(data.from)){
        errors.from = "Data from dibutuhkan";
    }  
   

    return {
        errors,
        isValid: isEmpty(errors)
    }
}