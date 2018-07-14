const validator = require("validator");
const isEmpty = require("../validation/is-empty");

module.exports = function validateMemberInput(data){
    let errors = {};

    data.project = !isEmpty(data.project) ? data.project:"" ; 


    if(validator.isEmpty(data.project)){
        errors.project = "Data project dibutuhkan";
    }   

    return {
        errors,
        isValid: isEmpty(errors)
    }
}