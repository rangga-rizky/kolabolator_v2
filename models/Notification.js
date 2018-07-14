const mongoose = require("mongoose");
const schema = mongoose.Schema;

const NotificationSchema = new schema({    
    user:{
        type:schema.Types.ObjectId,
        ref:"user"
    },   
    type:{
        type:String,
        required:true
    },
    isRead:{
        type:Boolean,
        required:true,
        default:false
    },
    data:{},
    date:{
        type:Date,
        default:Date.now,
    },
});

module.exports = Notification = mongoose.model("notification",NotificationSchema);