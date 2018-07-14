const mongoose = require("mongoose");
const schema = mongoose.Schema;

const ProjectSchema = new schema({
    user:{
        type:schema.Types.ObjectId,
        ref:"user"
    },
    creator:{
        type:String,
        required:true,
    },
    text:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    type:{
        type:String,
        required:true,
    },
    image:{ type:String },
    member:[
        {
            user:{
                type:schema.Types.ObjectId,
                ref:"user"
            },   
        }
    ],
    date:{
        type:Date,
        default:Date.now,
    },
});

module.exports = Project = mongoose.model("project",ProjectSchema);