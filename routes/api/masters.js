const express = require("express");
const router = express.Router();
const Master = require("../../models/Master");

router.get("/user_types",(req,res) => {
    Master.findOne()
            .then(master => res.json(master.user_type))
            .catch(err => console.log(err))
});

router.get("/project_types",(req,res) => {
    Master.findOne()
            .then(master => res.json(master.project_type))
            .catch(err => console.log(err))
});


module.exports = router;