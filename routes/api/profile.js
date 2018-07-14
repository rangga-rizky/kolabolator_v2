const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");

router.get("/",passport.authenticate("jwt",{session:false}),(req,res) => {
    let errors = {};
    Profile.findOne({user:req.user.id})    
        .populate('user',['name','avatar'])
        .then(profile => {
            if(!profile){
                errors.noprofile = "profile tidak ditemukan";
                return res.status(404).json(errors);
            }
            return res.json(profile);
        })
        .catch(err => console.log(err))
});

router.get("/all",(req,res) => {
    let errors = {};
    Profile.find()
            .populate('user',['name','avatar','userType'])
            .then(profiles => {
                if(!profiles){
                    errors.noprofile = "profile tidak ditemukan";
                    return res.status(404).json(errors);
                }
                return res.json(profiles);

            })
            .catch(err => console.log(err));
});

router.get("/handle/:handle",(req,res) => {
    let errors = {};
    Profile.findOne({handle:req.params.handle})
            .populate('user',['name','avatar'])
            .then(profile => {
                if(!profile){
                    errors.noprofile = "profile tidak ditemukan";
                    return res.status(404).json(errors);
                }
                return res.json(profile);

            })
            .catch(err => console.log(err));
});

router.get("/user/:user_id",(req,res) => {
    let errors = {};
    Profile.findOne({user:req.params.user_id})
            .populate('user',['name','avatar'])
            .then(profile => {
                if(!profile){
                    errors.noprofile = "profile tidak ditemukan";
                    return res.status(404).json(errors);
                }
                return res.json(profile);

            })
            .catch(err => {
                console.log(err);
                errors.noprofile = "profile tidak ditemukan";
                return res.status(404).json(errors);
            });
});

router.post("/",passport.authenticate("jwt",{session:false}),(req,res) => {
    const profileFields = {};
    const {errors,isValid}  = validateProfileInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }

    profileFields.user = req.user.id;
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.company) profileFields.company = req.body.company;
    if(req.body.location) profileFields.location = req.body.location;
    if(req.body.website) profileFields.website = req.body.website;
    if(req.body.location) profileFields.location = req.body.location;
    if(req.body.bio) profileFields.bio = req.body.bio;
    if(req.body.status) profileFields.status = req.body.status;
    if(req.body.githubUserName) profileFields.githubUserName = req.body.githubUserName;

    if(typeof(req.body.skills) !== undefined){
        profileFields.skills = req.body.skills.split(',');
    }

    profileFields.social = {};
    if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if(req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({user:req.user.id}).then(profile =>{
        if(profile){
            Profile.findOneAndUpdate(
                {user:req.user.id},
                {$set:profileFields},
                {new:true},            
            ).then(profile =>{
                return res.json(profile);
            })
        }else{
            Profile.findOne({handle:profileFields.handle}).then(profile =>{
                if(profile){
                    errors.handle ="Handle sudah ada";
                    return res.status(400).json(errors);
                }                
                new Profile(profileFields).save().then(profile => {return res.json(profile)});
            }).catch(err=>console.log(err));

        }
    })

});


router.post("/experience",passport.authenticate("jwt",{session:false}),(req,res) => {
    const {errors,isValid}  = validateExperienceInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }
    Profile.findOne({user:req.user.id})
            .then(profile => {
                const newExp = {
                    title:req.body.title,
                    company:req.body.company,
                    location:req.body.location,
                    from:req.body.from,
                    to:req.body.to,
                    current:req.body.current,
                    description:req.body.description,
                }

                profile.experience.unshift(newExp);
                profile.save().then(profile =>{
                    return res.json(profile);
                })
            })
            .catch(err => console.log(err));
});

router.post("/education",passport.authenticate("jwt",{session:false}),(req,res) => {
    const {errors,isValid}  = validateEducationInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }
    Profile.findOne({user:req.user.id})
            .then(profile => {
                const newEdu = {
                    school:req.body.school,
                    deegre:req.body.deegre,
                    fieldOfStudy:req.body.fieldOfStudy,
                    from:req.body.from,
                    to:req.body.to,
                    current:req.body.current,
                    description:req.body.description,
                }

                profile.education.unshift(newEdu);
                profile.save().then(profile =>{
                    return res.json(profile);
                })
            })
            .catch(err => console.log(err));
});

router.delete("/",passport.authenticate("jwt",{session:false}),(req,res) => {
    const errors = {};
    Profile.findOneAndRemove({user:req.user.id})
            .then(() => {
                User.findOneAndRemove({user:req.user.id})
                .then(() => {
                    return res.json({error : false,
                        msg:"user dan profile berhasil dihapus"});                   
                
                })
                .catch(err => {
                    console.log(err);
                    return res.json({error : true,
                                    msg:"user gagal dihapus"});
                });                   
               
            })
            .catch(err => {
                console.log(err);
                return res.json({error : true,
                                msg:"profile gagal dihapus"});
            });
});


router.delete("/experience/:exp_id",passport.authenticate("jwt",{session:false}),(req,res) => {
    const errors = {};
    Profile.findOne({user:req.user.id})
            .then(profile => {

                if(!profile){
                    errors.noprofile = "profile tidak ditemukan";
                    return res.status(404).json(errors);
                }

               const removeIndex = profile.experience
                    .map(item => item.id)
                    .indexOf(req.params.exp_id);
                
                if(removeIndex > -1){                    
                    profile.experience.splice(removeIndex,1);
                    profile.save().then(profile => {return res.json(profile)});
                }else{
                    errors.noexperience = "Pengalaman tidak ditemukan";
                    return res.status(404).json(errors); 
                }

            })
            .catch(err => console.log(err));
});

router.delete("/education/:edu_id",passport.authenticate("jwt",{session:false}),(req,res) => {
    const errors = {};
    Profile.findOne({user:req.user.id})
            .then(profile => {

                if(!profile){
                    errors.noprofile = "profile tidak ditemukan";
                    return res.status(404).json(errors);
                }

               const removeIndex = profile.education
                    .map(item => item.id)
                    .indexOf(req.params.edu_id);
                if(removeIndex > -1){                    
                    profile.education.splice(removeIndex,1);
                    profile.save().then(profile => {return res.json(profile)});
                }else{
                    errors.noeducation = "Pendidikan tidak ditemukan";
                    return res.status(404).json(errors); 
                }
            })
            .catch(err => console.log(err));
});

module.exports = router;