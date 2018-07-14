const mongoose = require("mongoose");
const schema = mongoose.Schema;

const MasterSchema = new schema({
    user_type:
        [{
            name:{
                type:String,
                required:true
            },
            desc:{
                type:String,
                required:true
            },
        }]
    ,
    project_type:{
        type:Array,
        required:true
    },
});

module.exports = Master = mongoose.model("master",MasterSchema);