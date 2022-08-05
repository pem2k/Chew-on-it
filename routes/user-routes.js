const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const { User, Review, Follower } = require('../models');
const path = require("path");

//signup
router.get('/signup', async (req, res) => res.render('signup'));
router.post("/signup", async (req, res) => {
    try {
        const newUser = await User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password
        })

        req.session.user = {
            id: newUser.id,
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email
        }

       return res.redirect("profile")
        
    } catch (err) {
        if (err) {
            res.status(500).json({ msg: "ERROR", err })
        }
    }

})

//login
//render routes
router.get('/login', async (req, res) => res.render('login'));

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
       return res.redirect("/login")
    }
    req.session.destroy();
    res.json({ msg: "logged out!" })
})

//profile routes

//self profile
router.get('/profile', async (req, res) => {
    if (!req.session.user) {
        console.log("here 1")
        return res.redirect('login')
    }

    try {
        console.log("here 2")
        const userProfile = await User.findByPk(req.session.user.id, {
            include: [Review]
          })

          if (!userProfile) {
            return res.status(404).json({ msg: "User not found" })
          }
      
          res.render('profile', userProfile)
    } catch (err) {
        if (err) {
            console.log("here 3")
            res.status(500).json({ msg: "ERROR", err })
        }
    }
    
});

//other user profiles
router.get('/:id', async (req, res) => {
    if (!req.session.user) {
        return res.redirect("login")
    }
    try {
        const userProfile = await User.findByPk(req.params.id, {
            include: [Review]
          })
          if (!userProfile) {
            return res.status(404).json({ msg: "User not found" })
          }
      
          res.render('profile', userProfile)
    } catch (err) {
        if (err) {
            res.status(500).json({ msg: "ERROR", err })
        }
    }
    res.render('profile', req.session.user)
});

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