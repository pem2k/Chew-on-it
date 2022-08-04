const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const {User} = require('../models');

//signup
router.post("/", async (req, res) => {
    try {
        const res = await User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            birthday: req.body.birthday,
            email: req.body.email,
            password: req.body.password
        })
        res.json(data)
        //res.render users profile
    }catch(err){
        if(err){
            res.status(500).json({ msg: "ERROR", err })
        }
    }
       
})

//login
router.post("/login", async (req,res) => {
  const foundUser = await User.findOne({
        where:{
            email: req.body.email
        }
    }
    )
    if(!foundUser){
        return res.status(401).json({msg:"invalid login credentials"})
    
    }
    if(!bcrypt.compareSync(req.body.password,foundUser.password)){
        return res.status(401).json({msg:"invalid login credentials"})
    }
    req.session.user={
        id:foundUser.id,
        first_name:foundUser.first_name,
        last_name: foundUser.last_name,
        birthday: foundUser.birthday,
        email:foundUser.email
    }
    return res.status(200).json(foundUser)
    //res.render homepage/feed
})

//logout
router.delete("/logout",(req,res)=>{
    req.session.destroy();
    res.json({msg:"logged out!"})
})

module.exports = router;