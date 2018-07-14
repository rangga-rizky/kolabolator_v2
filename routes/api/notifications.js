const express = require("express");
const router = express.Router();
const passport = require("passport");
const Notification = require("../../models/Notification");

// @desc get all Notification
router.get("/",passport.authenticate("jwt",{session:false}),(req,res) => {
    Notification.find({user:req.user.id}).sort({date:-1})
        .then(notifications => res.json(notifications))
        .catch(err=>
            res.status(404).json({nonotiffound:"tidak ditemukan post"})
        );    
});


// @desc get 5 new Notification
router.get("/new",passport.authenticate("jwt",{session:false}),(req,res) => {
    Notification.find({user:req.user.id,isRead:false}).sort({date:-1}).limit(5)
        .then(notifications => res.json(notifications))
        .catch(err=>
            res.status(404).json({nonotiffound:"tidak ditemukan post"})
        );    
});


module.exports = router;