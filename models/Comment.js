const mongoose = require("mongoose");
const schema = mongoose.Schema;

const CommentSchema = new schema({    
    user:{
        type:schema.Types.ObjectId,
        ref:"user"
    },   
    text:{
        type:String,
        required:true,
    },
    name:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now,
    },
});

module.exports = Comment = mongoose.model("comment",CommentSchema);