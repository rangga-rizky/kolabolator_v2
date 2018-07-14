const mongoose = require("mongoose");
const schema = mongoose.Schema;

const UserSchema = new schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
    },
    userType:{
        type:String,
        required:true
    },
    created_at:{
        type:Date,
        default:Date.now
    }
});

module.exports = User = mongoose.model("user",UserSchema);