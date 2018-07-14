const mongoose = require("mongoose");
const schema = mongoose.Schema;

const DiscussionSchema = new schema({
    user:{
        type:schema.Types.ObjectId,
        ref:"user"
    },
    project:{
        type:schema.Types.ObjectId,
        ref:"project"
    },
    text:{
        type:String,
        required:true,
    },
    name:{
        type:String
    },
    avatar:{
        type:String
    },
    likes:[
        {
            user:{
                type:schema.Types.ObjectId,
                ref:"user"
            },   
        }
    ],
    comments:{
        type:Array,
    },
    date:{
        type:Date,
        default:Date.now,
    },
});

module.exports = Discussion = mongoose.model("discussion",DiscussionSchema);