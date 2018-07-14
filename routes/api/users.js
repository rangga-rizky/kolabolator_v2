const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("../../config/keys").secret;
const passport = require("passport");
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

router.get("/",(req,res) => {
    User.find({},{password:0}).then(users => {
        return res.json(users);
    }).catch(err => console.log(err))
});

router.post("/register",(req,res) =>{
    const {errors,isValid} = validateRegisterInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }

    User.findOne({email: req.body.email})
        .then(user => {
            if(user){
                return res.status(400).json({'email' : 'Alamat email sudah digunakan'});
            }else{
                const avatar = gravatar.url(req.body.email,{
                    s:'200', //size
                    r:'pg', //rating
                    d:'mm' //default
                }); 
                const newUser = new User({
                    name : req.body.name,
                    email : req.body.email,
                    userType : req.body.userType,
                    avatar,
                    password : req.body.password
                });
                bcrypt.genSalt(10,(err,salt) => {
                    bcrypt.hash(newUser.password,salt,(err,hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))
                        return res.json(newUser);
                    })
                });
            }
        })
});


router.post("/login",(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const {errors,isValid} = validateLoginInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }
    User.findOne({email})
    .then(user => {
        if(!user){
            return res.status(404).json({'email':'email tidak ditemukan'})
        }
        bcrypt.compare(password,user.password)
            .then(isMatch =>{
                if(isMatch){
                    const payload = {id:user.id , name:user.name , avatar:user.avatar ,userType : user.userType};
                    jwt.sign(payload,secret,{expiresIn:7200},(err,token) =>{                        
                        res.json({
                                    msg:'Login Berhasil',
                                    success:true,
                                    token:'Bearer '+ token
                                });
                    });
                }else{
                    return res.status(404).json({'password':'email dan password tidak cocok'})
                }
            })
        
    })
});

router.get("/current",passport.authenticate("jwt",{session:false}),(req,res) => {
    res.json({
        id : req.user.id,
        name : req.user.name,
        userType : req.user.userType
    });
});

module.exports = router;