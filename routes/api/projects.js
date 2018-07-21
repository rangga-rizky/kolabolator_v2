const express = require("express");
const router = express.Router();
var multer = require('multer');
const passport = require("passport");
const mongoose = require("mongoose");
const Project = require("../../models/Project");
const User = require("../../models/User");
const Discussion = require("../../models/Discussion");
const Member = require("../../models/Member");
const storage = require("../../config/multer").storage;
const fileFilter = require("../../config/multer").fileFilter;
var upload = multer({ storage: storage, fileFilter: fileFilter}).single('image');
const validateProjectInput = require("../../validation/project");

//@describe create projects
router.post("/",passport.authenticate("jwt",{session:false}),(req,res) => {    
    upload(req, res, function (err) {
        const projectField = {};
        const {errors,isValid}  = validateProjectInput(req.body);
        if(!isValid){
            return res.status(400).json(errors);
        }
        if (err) {          
            errors.image = "Format gambar tidak sesuai";
            return res.status(400).json(errors);
        }  
        
        if(req.file) projectField.image = req.file.filename;
        projectField.user ;
        projectField.text=req.body.text;
        projectField.user=req.user.id;
        projectField.title=req.body.title;
        projectField.type=req.body.type;
        projectField.creator=req.user.name;        
        new Project(projectField).save()
            .then(profile => {return res.json(profile)})
            .catch(err => console.log(err));
    });
});

//@describe get all projects
router.get("/",passport.authenticate("jwt",{session:false}),(req,res) => {    
    type = {};
    if(req.query.type){
        type = {type:req.query.type}
    }
    Project.find(type).populate('user',['name','avatar','userType']).sort({date:-1}).then(post => res.json(post)).catch(err=>res.status(404).json({noprojectfound:"tidak ditemukan project"}));   
});

//@describe get projects
router.get("/:id",passport.authenticate("jwt",{session:false}),(req,res) => {
    Project.findById(req.params.id).populate('user',['name','avatar','userType'])
        .then(project => {
            if(project.member.map(item => item.user.toString()).indexOf(req.user.id) != -1){                
                Discussion.find({project:project.id})
                .then(discussion => {
                    res.json({
                        project:project,
                        isMember:true,
                        discussion:discussion
                    })
                })
            .catch(err=> console.log(err))
            }else if(project.user.id == req.user.id){
                Discussion.find({project:project.id})
                .then(discussion => {
                    res.json({
                        project:project,
                        isMember:true,
                        isOwner:true,
                        discussion:discussion
                    })
                })
            }else{
                Member.find({project:req.params.id,user:req.user.id,status:"REQUEST"})
                 .then(member => {
                        if(member.length == 0){                            
                            return res.json({
                                project:project,
                                isMember:false,
                                discussion:[]
                            })
                        }else{
                            return res.json({
                                project:project,
                                isWaitingAccepted:true,
                                isMember:false,
                                discussion:[]
                            })
                        }
                    }
                 )
            }
        }).catch(err=>{
            console.log(err);
            res.status(404).json({noprojectfound:"tidak ditemukan project"})
        });    
});

//@describe get Non Members of project
router.get("/:id/nonmembers",passport.authenticate("jwt",{session:false}),(req,res) => {    
    Project.findById(req.params.id).populate('user',['name','avatar','userType'])
    .then(project => {
        let members = project.member.map(member => member.user);
        members.push(project.user);
        console.log(members);
        User.where("_id").nin(members)
            .then(users =>  res.json(users))
            .catch(err  => cosnole.log(err))
    }).catch(err=>{
        console.log(err);
        res.status(404).json({noprojectfound:"tidak ditemukan project"})
    });    
     
});


module.exports = router;