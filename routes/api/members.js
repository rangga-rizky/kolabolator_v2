const express = require("express");
const router = express.Router();
const passport = require("passport");
const Notification = require("../../models/Notification");
const Project = require("../../models/Project");
const Member = require("../../models/Member");
const validateMemberInput = require("../../validation/Member");


// @desc request member
router.post("/request",passport.authenticate("jwt",{session:false}),(req,res) => {    
    const {errors,isValid}  = validateMemberInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }    
    
    Project.findById(req.body.project).then(project =>{
        const newMember = new Member({        
            project:req.body.project,
            status:"REQUEST",
            user:req.user.id
        });
        newMember.save().then(member => {
            const notif = new Notification({            
                user:project.user,
                type:"REQUEST_MEMBER",
                data:{
                    project_name:project.title,
                    project_id:project.id,
                    by:req.user.name
                }
            });  
            notif.save()
            return res.json(member);
        }).catch(err => console.log(err))
    }).catch(err => console.log(err));
   

});

// @desc invite member
router.post("/invite",passport.authenticate("jwt",{session:false}),(req,res) => {    
    const {errors,isValid}  = validateMemberInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }    

    Project.findById(req.body.project).then(project =>{
        if(req.user.id != project.user){
            errors.notOwner = "Hanya owener yang bisa menginvite";
            return res.status(401).json(errors);
        }  
        Member.findOne({project:req.body.project,user:req.user.id})
          .then(member => {
                if(member){
                    return res.json(member);
                }else{                    
                    const newMember = new Member({            
                        project:req.body.project,
                        status:"INVITED",
                        user:req.body.user
                    });        
                    newMember.save().then(member => {
                        const notif = new Notification({            
                            user:req.body.user,
                            type:"INVITATION",
                            data:{
                                project_name:project.title,
                                project_id:project.id,
                                by:req.user.name
                            }
                        });  
                        notif.save()
                        return res.json(member);
                    }).catch(err => console.log(err))
                }
          })        
    }).catch(err => {
        console.log(err);
        errors.notfound = "project tidak ditemukan";
        return res.status(404).json(errors);
    })
});

// @desc accept request member
router.post("/request/accept",passport.authenticate("jwt",{session:false}),(req,res) => {    
    const errors = {};
    Member.findById(req.body.id).then(member =>{
        Project.findById(member.project).then(project =>{
            if(req.user.id != project.user){
                errors.notOwner = "Hanya owener yang bisa menerima";
                return res.status(401).json(errors);
            }         
            member.status ="ACCEPTED";
            member.save().then(member => {
                return res.json(member);
            }).catch(err => console.log(err))
        }).catch(err => {
            errors.notfound = "project tidak ditemukan";
            return res.status(404).json(errors);
        })        
    }).catch(err => {
        errors.notfound = "member tidak ditemukan";
        return res.status(404).json(errors);
    })
});



module.exports = router;