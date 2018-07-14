const validator = require("validator");
const isEmpty = require("../validation/is-empty");

module.exports = function validateProfileInput(data){
    let errors = {};

    data.handle = !isEmpty(data.handle) ? data.handle:"" ; 
    data.status = !isEmpty(data.status) ? data.status:"" ;  
    data.skills = !isEmpty(data.skills) ? data.skills:"" ;  

    if(!validator.isLength(data.handle,{min:2,max:40})){
        errors.status = "handle minimal 2 karakter";
    } 

    if(!isEmpty(data.website)){
        if(!validator.isURL(data.website)){
            errors.website = "website not valid url";
        }
    }

    if(!isEmpty(data.youtube)){
        if(!validator.isURL(data.youtube)){
            errors.youtube = "youtube not valid url";
        }
    }

    if(!isEmpty(data.twitter)){
        if(!validator.isURL(data.twitter)){
            errors.twitter = "twitter not valid url";
        }
    }

    if(!isEmpty(data.linkedin)){
        if(!validator.isURL(data.linkedin)){
            errors.linkedin = "linkedin not valid url";
        }
    }

    if(!isEmpty(data.facebook)){
        if(!validator.isURL(data.facebook)){
            errors.facebook = "facebook not valid url";
        }
    }

    if(!isEmpty(data.instagram)){
        if(!validator.isURL(data.instagram)){
            errors.instagram = "instagram not valid url";
        }
    }
   
    if(validator.isEmpty(data.handle)){
        errors.handle = "Data handle dibutuhkan";
    }

    if(validator.isEmpty(data.skills)){
        errors.skills = "Data skills dibutuhkan";
    }

    if(validator.isEmpty(data.status)){
        errors.status = "Data status dibutuhkan";
    }  

    return {
        errors,
        isValid: isEmpty(errors)
    }
}