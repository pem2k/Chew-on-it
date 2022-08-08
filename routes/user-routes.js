const express = require('express');
const router = express.Router()
const bcrypt = require("bcrypt");
const { User, Review, Message, Follow } = require('../models');
const path = require("path");
const sequelize = require('../config/connection');
//const { Sequelize } = require('sequelize/types');


//logout
router.delete("/logout", (req, res) => {
	if (!req.session.user) {
		return res.redirect("login")
	}
	req.session.destroy();
	res.json({ msg: "logged out!" })
})

// User directory.
router.get("/followed", async (req, res) => {
    if(!req.session.user){
      return res.redirect("/")
      
  }
    try{
        const allFollowed = await  User.findAll({ include: [{model: User, as: "followed", through: "Follow", where:{
            id: req.session.user.id}
       }]
    })
        
       res.status(200).json(allFollowed)

    }catch(err){
      if(err){
        res.status(500).json({msg:"ERROR",err})
      }
    }
    //res.render('feed', req.session.user)
  });

  router.get("/followers", async (req, res) => {
    if(!req.session.user){
      return res.redirect("/")
      
  }
    try{
        const allFollowers = await  User.findAll({ include: [{model: User, as: "follower", through: "Follow", where:{
            id: req.session.user.id,}
       }]
    })
        
       res.status(200).json(allFollowers)

    }catch(err){
      if(err){
        res.status(500).json({msg:"ERROR",err})
      }
    }
    //res.render('feed', req.session.user)
  });
	
//follow route
router.post('/follow', async (req, res) => {
    if(!req.session.user){
      return res.redirect("/")
      
  }
    try{
        const addFollow = await Follow.create({
			follower_id: req.session.user.id,
			followed_id: req.body.followed_id
		})
        
       res.status(200).json(addFollow)

    }catch(err){
      if(err){
        res.status(500).json({msg:"ERROR",err})
      }
    }
    //res.render('feed', req.session.user)
  });

//unfollow route
router.delete("unfollow", async (req, res) => {
	try{
		const unfollowedUser = Follow.destroy({where:{
		follower_id: req.session.id,
		followed_id: req.body.followed_id
	}
})

	res.status(200).json(unfollowedUser)

}catch(err){
		if(err){
			res.status(500).json({msg:"ERROR",err})
		}
	}
})

//profile routes
router.get('/', async (req, res) => {
	if (!req.session.user) {
		return res.redirect("login")
	}

	try {
		const allUsers = await User.findAll()
		res.json(allUsers)

	} catch (err) {
		if (err) {
			res.status(500).json({ msg: "ERROR", err })
		}
	}

});


router.put('/profilePic', async (req, res) => {
    if (!req.session.user) {
		return res.redirect("login")
	}
    try {

        const foundUser = await User.findOne({
            where: {
                id:req.session.user.id
            }
        })
        const newPic = await foundUser.update({
            profile_pic_url: req.body.profile_pic_url
        })
        return res.status(200).json(newPic)
	} catch (err) {
		if (err) {
			res.status(500).json({ msg: "ERROR", err })
		}
	}
})

module.exports = router;
//other user profiles
//other user profiles





