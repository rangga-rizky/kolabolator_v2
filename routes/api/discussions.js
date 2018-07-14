const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Discussion = require("../../models/Discussion");
const Comment = require("../../models/Comment");
const validateDiscussionInput = require("../../validation/Discussion");
const validateCommentInput = require("../../validation/comment");


// @desc get Discussion by ID
router.get("/:id",passport.authenticate("jwt",{session:false}),(req,res) => {
    Discussion.findById(req.params.id).populate('project',['title','member','user'])
        .then(discussion => {
            if(discussion.project.user == req.user.id || discussion.project.member.indexOf(req.user.id) != -1){    
                const comments = discussion.comments;             
                discussion.comments = [];
                res.json({
                    discussion: discussion,
                    comments : comments
                })
            }else{
                res.status(401).json("unauthorized");
            }
        })
        .catch(err=>{
            console.log(err);
            res.status(404).json({noDiscussionfound:"tidak ditemukan diskusi"})
        });    
});

// @desc create Discussion
router.post("/",passport.authenticate("jwt",{session:false}),(req,res) => {    
    const {errors,isValid}  = validateDiscussionInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }
    
    const newDiscussion = new Discussion({
        text:req.body.text,
        name:req.user.name,
        project:req.body.project,
        avatar:req.user.avatar,
        user:req.user.id
    });
    newDiscussion.save().then(discussion => {
        return res.json(discussion);
    }).catch(err => console.log(err))

});

// @desc unlike Discussion
router.post("/unlike/:id",passport.authenticate("jwt",{session:false}),(req,res) => {
    Discussion.findById(req.params.id)
            .then((discussion) => {
                if(discussion.likes.filter(like => like.user.toString() === req.user.id).length === 0){
                    return res.status(404).json({error : true,
                        msg:"Kamu tidak melike Discussion ini"});
                }
                const removeIndex = discussion.likes
                    .map(item => item.user.toString())
                    .indexOf(req.user.id);
                if(removeIndex > -1){                    
                    discussion.likes.splice(removeIndex,1);
                    discussion.save().then(discussion => {return res.json(discussion)});
                }else{
                    return res.json({error : true,
                        msg:"Like tidak ditemukan"});
                }                

            })
            .catch(err => {
                console.log(err);
                return res.status(404).json({error : true,
                                msg:"Discussion Tidak ditemukan"});
            });
});

// @desc like Discussion
router.post("/like/:id",passport.authenticate("jwt",{session:false}),(req,res) => {
    const errors = {};
    Discussion.findById(req.params.id)
            .then((discussion) => {
                if(discussion.likes.filter(like => like.user.toString() === req.user.id).length > 0){
                    return res.status(404).json({error : true,
                        msg:"Kamu sudah melike discussion ini"});
                }
                discussion.likes.unshift({user:req.user.id});
                discussion.save().then(discussion => res.json(discussion)).catch(err =>console.log(err));

            })
            .catch(err => {
                console.log(err);
                return res.status(404).json({error : true,
                                msg:"Discussion Tidak ditemukan"});
            });
});

// @desc create comment
router.post("/comment/:id",passport.authenticate("jwt",{session:false}),(req,res) => {
    const {errors,isValid}  = validateCommentInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }
    Discussion.findById(req.params.id)
            .then((discussion) => {
                const newComment = new Comment({
                    text:req.body.text,
                    user:req.user.id,
                    name:req.user.name,
                });
                discussion.comments.unshift(newComment);
                discussion.save().then(discussion => res.json(newComment)).catch(err =>console.log(err));

            })
            .catch(err => {
                console.log(err);
                return res.status(404).json({error : true,
                                msg:"Discussion Tidak ditemukan"});
            });
});

// @desc delete komentar
router.delete("/comment/:id/:comment_id",passport.authenticate("jwt",{session:false}),(req,res) => {
    Discussion.findById(req.params.id)
            .then((discussion) => {
                const removeIndex = discussion.comments
                    .map(item => item._id.toString())
                    .indexOf(req.params.comment_id);
                if(removeIndex > -1){                    
                    discussion.comments.splice(removeIndex,1);
                    discussion.save().then(discussion => {return res.json(discussion)});
                }else{
                    return res.status(404).json({error : true,
                        msg:"Komentar tidak ditemukan"});
                }               

            })
            .catch(err => {
                console.log(err);
                return res.json({error : true,
                                msg:"discussion Tidak ditemukan"});
            });
});

// @desc delete Discussion
router.delete("/:id",passport.authenticate("jwt",{session:false}),(req,res) => {    
    Discussion.findById(req.params.id)
            .then((discussion) => {
                if(discussion.user.toString() !== req.user.id){
                    return res.status(401).json({error : true,
                        msg:"You are not Authorizhed"})
                }
                discussion.remove().then(()=> res.json({error : false,
                    msg:"discussion Berhasil dihapus"})).catch(err => console.log(err));
               
            })
            .catch(err => {
                console.log(err);
                return res.json({error : true,
                                msg:"discussion Tidak ditemukan"});
            });
});



module.exports = router;