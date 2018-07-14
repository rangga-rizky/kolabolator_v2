const validator = require("validator");
const isEmpty = require("../validation/is-empty");

module.exports = function validatePostInput(data){
    let errors = {};
    data.text = !isEmpty(data.text) ? data.text:"" ; 


    if(validator.isEmpty(data.text)){
        errors.text = "Data text dibutuhkan";
    }    

    return {
        errors,
        isValid: isEmpty(errors)
    }
}