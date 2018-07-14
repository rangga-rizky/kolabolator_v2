const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Post = require("../../models/Post");
const validatePostInput = require("../../validation/post");
const validateCommentInput = require("../../validation/comment");

// @desc get All Post
router.get("/",passport.authenticate("jwt",{session:false}),(req,res) => {
    Post.find().sort({date:-1}).then(post => res.json(post)).catch(err=>res.status(404).json({nopostsfound:"tidak ditemukan post"}));    
});

// @desc get Post by ID
router.get("/:id",(req,res) => {
    Post.findById(req.params.id).then(post => res.json(post)).catch(err=>res.status(404).json({nopostfound:"tidak ditemukan post"}));    
});

// @desc create Post
router.post("/",passport.authenticate("jwt",{session:false}),(req,res) => {
    const {errors,isValid}  = validatePostInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }
    const newPost = new Post({
        text:req.body.text,
        name:req.user.name,
        avatar:req.user.avatar,
        user:req.user.id
    });
    newPost.save().then(post => {
        return res.json(post);
    }).catch(err => console.log(err))

});

// @desc unlike Post
router.post("/unlike/:id",passport.authenticate("jwt",{session:false}),(req,res) => {
    Post.findById(req.params.id)
            .then((post) => {
                if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
                    return res.status(404).json({error : true,
                        msg:"Kamu tidak melike Post ini"});
                }
                const removeIndex = post.likes
                    .map(item => item.user.toString())
                    .indexOf(req.user.id);
                if(removeIndex > -1){                    
                    post.likes.splice(removeIndex,1);
                    post.save().then(post => {return res.json(post)});
                }else{
                    return res.json({error : true,
                        msg:"Like tidak ditemukan"});
                }
                
                post.save().then(post => res.json(post)).catch(err =>console.log(err));

            })
            .catch(err => {
                console.log(err);
                return res.status(404).json({error : true,
                                msg:"Post Tidak ditemukan"});
            });
});

// @desc like Post
router.post("/like/:id",passport.authenticate("jwt",{session:false}),(req,res) => {
    const errors = {};
    Post.findById(req.params.id)
            .then((post) => {
                if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
                    return res.status(404).json({error : true,
                        msg:"Kamu sudah melike Post ini"});
                }
                post.likes.unshift({user:req.user.id});
                post.save().then(post => res.json(post)).catch(err =>console.log(err));

            })
            .catch(err => {
                console.log(err);
                return res.status(404).json({error : true,
                                msg:"Post Tidak ditemukan"});
            });
});

// @desc create comment
router.post("/comment/:id",passport.authenticate("jwt",{session:false}),(req,res) => {
    const {errors,isValid}  = validateCommentInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }
    Post.findById(req.params.id)
            .then((post) => {
                const newComment = new Post({
                    text:req.body.text,
                    user:req.user.id,
                    name:req.user.name,
                    avatar:req.user.avatar,
                });
                post.comments.unshift(newComment);
                post.save().then(post => res.json(post)).catch(err =>console.log(err));

            })
            .catch(err => {
                console.log(err);
                return res.status(404).json({error : true,
                                msg:"Post Tidak ditemukan"});
            });
});

// @desc delete komentar
router.delete("/comment/:id/:comment_id",passport.authenticate("jwt",{session:false}),(req,res) => {
    Post.findById(req.params.id)
            .then((post) => {
                const removeIndex = post.comments
                    .map(item => item._id.toString())
                    .indexOf(req.params.comment_id);
                if(removeIndex > -1){                    
                    post.comments.splice(removeIndex,1);
                    post.save().then(post => {return res.json(post)});
                }else{
                    return res.status(404).json({error : true,
                        msg:"Komentar tidak ditemukan"});
                }               

            })
            .catch(err => {
                console.log(err);
                return res.json({error : true,
                                msg:"Post Tidak ditemukan"});
            });
});

// @desc delete post
router.delete("/:id",passport.authenticate("jwt",{session:false}),(req,res) => {    
    Post.findById(req.params.id)
            .then((post) => {
                if(post.user.toString() !== req.user.id){
                    return res.status(401).json({error : true,
                        msg:"You are not Authorizhed"})
                }
                post.remove().then(()=> res.json({error : false,
                    msg:"Post Berhasil dihapus"})).catch(err => console.log(err));
               
            })
            .catch(err => {
                console.log(err);
                return res.json({error : true,
                                msg:"Post Tidak ditemukan"});
            });
});



module.exports = router;