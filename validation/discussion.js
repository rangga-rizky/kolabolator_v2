const validator = require("validator");
const isEmpty = require("../validation/is-empty");

module.exports = function validateDiscussionInput(data){
    let errors = {};
    data.text = !isEmpty(data.text) ? data.text:"" ; 
    data.project = !isEmpty(data.project) ? data.project:"" ; 


    if(validator.isEmpty(data.project)){
        errors.project = "Data project dibutuhkan";
    } 


    if(validator.isEmpty(data.text)){
        errors.text = "Data text dibutuhkan";
    }    

    return {
        errors,
        isValid: isEmpty(errors)
    }
}