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
		return res.redirect("/")
	}
	req.session.destroy();
	res.json({ msg: "logged out!" })
})

// User directory.
router.get("/directory", (req, res) => {
	const follower = (req.session.user != undefined) ? req.session.user.id : 0;

	User.findAll({
		attributes: ["id", "first_name", "last_name",
			[sequelize.fn("COUNT", sequelize.col("follower_id")), "following"],
			[sequelize.literal(`CASE WHEN follower_id = ${follower} THEN 1 ELSE 0 END`), "follow"],
			[sequelize.fn("COUNT", sequelize.col("business_id")), "reviews"]],
	//		[sequelize.fn("COUNT", sequelize.col("commenter_id")), "comments"]],
		include: [
			{
				model: User,
				as: "followed",
				through: "Follow",
				attributes: [],
			},
			{ model: Review, attributes: [] }],
	//		{ model: Message, attributes: [] }],
		group: ["User.id"]
	}).then(results => results.map(user => user.toJSON()))
	.then(users => {
		const data = { users, user: req.session.user };
		res.render("users", data);
	});
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
  });

//unfollow route
router.delete("/unfollow", async (req, res) => {
	try{
		const unfollowedUser = Follow.destroy({where:{
		follower_id: req.session.user.id,
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


router.put('/profilePic', async (req, res) => {
    if (!req.session.user) {
		return res.redirect("/")
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





