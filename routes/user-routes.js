const express = require('express');
const router = express.Router()
const bcrypt = require("bcrypt");
const { User, Review, Follower } = require('../models');
const path = require("path");

//signup



//login
//render routes


router.post("/login", async (req, res) => {
    if(req.session.user){
       return res.redirect("profile")
    }
    const foundUser = await User.findOne({
        where: {
            email: req.body.email
        }
    }
    )
    if (!foundUser) {
        return res.status(401).json({ msg: "invalid login credentials" })

    }
    if (!bcrypt.compareSync(req.body.password, foundUser.password)) {
        return res.status(401).json({ msg: "invalid login credentials" })
    }
    req.session.user = {
        id: foundUser.id,
        first_name: foundUser.first_name,
        last_name: foundUser.last_name,
        email: foundUser.email
    }
    return res.status(200).json(foundUser)
    //res.render homepage/feed
})


//logout
router.delete("/logout", (req, res) => {
    if (!req.session.user) {
       return res.redirect("login")
    }
    req.session.destroy();
    res.json({ msg: "logged out!" })
})

//profile routes


//other user profiles
//other user profiles


router.get('/feed', async (req, res) => {
    if(!req.session.user){
      return res.redirect("login")
      
  }
    try{
  
    }catch(err){
      if(err){
        res.status(500).json({msg:"ERROR",err})
      }
    }
    res.render('feed', req.session.user)
  });

module.exports = router;