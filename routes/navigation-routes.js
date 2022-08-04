const express = require('express');
const router = express.Router();
const {User} = require("../models")

router.get("/feed", async (req, res) => {
    try{
        
        //res.render feed here
    }catch(err){
        if(err){
            res.status(500).json({ msg: "ERROR", err })
        }
    }
})

router.get("/messages", async (req, res) => {
    try{

        //res.render messages here
    }catch(err){
        if(err){
            res.status(500).json({ msg: "ERROR", err })
        }
    }
})

router.get("/Profile", async (req, res) => {
    try{

        //res.render profile here
    }catch(err){
        if(err){
            res.status(500).json({ msg: "ERROR", err })
        }
    }
})


module.exports = router;