const validator = require("validator");
const isEmpty = require("../validation/is-empty");

module.exports = function validateLoginInput(data){
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email:"" ; 
    data.password = !isEmpty(data.password) ? data.password:"" ;  

    if(!validator.isLength(data.password,{min:6,max:50})){
        errors.password = "Password minimal 6 karakter";
    } 
    
  
    if(!validator.isEmail(data.email)){
        errors.email = "Email tidak valid";
    }

    if(validator.isEmpty(data.email)){
        errors.email = "Data Email dibutuhkan";
    }


    if(validator.isEmpty(data.password)){
        errors.password = "Data Password dibutuhkan";
    }  

    return {
        errors,
        isValid: isEmpty(errors)
    }
}