const mongoose = require("mongoose");
const schema = mongoose.Schema;

const MemberSchema = new schema({    
    user:{
        type:schema.Types.ObjectId,
        ref:"user"
    },   
    project:{
        type:schema.Types.ObjectId,
        ref:"project"
    },
    status:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now,
    },
});

module.exports = Member = mongoose.model("member",MemberSchema);