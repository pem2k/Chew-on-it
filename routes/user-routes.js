const express = require('express');
const router = express.Router()
const bcrypt = require("bcrypt");
const { User, Review, Message, Follow, Business } = require('../models');
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

router.get('/profile/:full_name', async (req, res) => {
    if (!req.session.user) {
        return res.redirect("/")
    }
    try {
        const userProfile = await User.findOne({
            where:{
                full_name: req.params.full_name
            },
            include: [{
				model: Review,
				include: [{
					model: User,
					attributes: ["id", "first_name", "last_name", "profile_pic_url"]
				},
				{
					model: Business,
					attributes: ["id", "business_name", "location", "phone_number"]
				}]
			}],
			order: [
				[Review, 'createdAt', 'DESC'],
				[Review, User, 'createdAt', 'DESC']
			]
        })
        if (!userProfile) {
            return res.render("404", { user: req.session.user })
        }



        res.render('profile', {
            profile : userProfile.toJSON(),
            user: req.session.user,
            otherProfile: (req.params.id != req.session.user.id) ? true : false
        })
    } catch (err) {
        if (err) {
            res.status(500).json({ msg: "ERROR", err })
        }
    }
});


// User directory.
router.get("/directory", (req, res) => {
	if (!req.session.user)
		return res.redirect("/");

	const follower = (req.session.user != undefined) ? req.session.user.id : 0;

	User.findAll({
		attributes: ["id", "first_name", "last_name", "profile_pic_url",
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
				where: { }
			},
			{ model: Review, attributes: [] }],
		//		{ model: Message, attributes: [] }],
		group: ["User.id"]
	}).then(results => results.map(user => user.toJSON()))
		.then(users => res.render("users", { users, user: req.session.user }));
});


//follow route
router.post('/follow', async (req, res) => {
	if (!req.session.user) {
		return res.redirect("/")

	}
	try {
		const addFollow = await Follow.create({
			follower_id: req.session.user.id,
			followed_id: req.body.followed_id
		})

		// Pull your data again to update following list.
		const foundUser = await User.findOne({
			where: {
				id: req.session.user.id
			},
			include: [{
				model: User,
				as: "follower",
				through: "Follow",
				attributes: ["id", "first_name", "last_name", "profile_pic_url"]
			}]
		})

		req.session.user = {
			id: foundUser.id,
			first_name: foundUser.first_name,
			last_name: foundUser.last_name,
			full_name: foundUser.full_name,
			email: foundUser.email,
			profile_pic_url: foundUser.profile_pic_url,
			friend: foundUser.follower.map(u => u.toJSON())
		}

		res.status(200).json(addFollow);

	} catch (err) {
		if (err) {
			res.status(500).json({ msg: "ERROR", err })
		}
	}
});


router.get("/", async (req, res) => {
	try {
		const allUsers = await User.findAll({ attributes: ["full_name"] })
		res.status(200).json(Object.values(allUsers))

	} catch (err) {
		if (err) {
			res.status(500).json({ msg: "ERROR", err })
		}
	}
})

router.put("/", async (req, res) => {
	try {
		const user = await User.update(
			{
				first_name: req.body.first_name,
				last_name: req.body.last_name
			},
			{ where: {
				id: req.session.user.id
			}});

		if (!user)
			return res.render("404", { user: req.session.user });

		const newUser = await User.findOne({
			where: {
				id: req.session.user.id
			},
			include: [{
				model: User,
				as: "follower",
				through: "Follow",
				attributes: ["id", "first_name", "last_name", "profile_pic_url"]
			}]
		});

		req.session.user = {
			id: newUser.id,
			first_name: newUser.first_name,
			last_name: newUser.last_name,
			full_name: newUser.full_name,
			email: newUser.email,
			profile_pic_url: newUser.profile_pic_url,
			friend: newUser.follower.map(u => u.toJSON())
		}
		return res.status(200).json({ msg: "Updated." });
	} catch (err) {
		if (err) {
			res.status(500).json({ msg: "ERROR", err })
		}
	}
});

//unfollow route
router.delete("/unfollow", async (req, res) => {
	try {
		const unfollowedUser = Follow.destroy({
			where: {
				follower_id: req.session.user.id,
				followed_id: req.body.followed_id
			}
		})

		// Pull your data again to update following list.
		const foundUser = await User.findOne({
			where: {
				id: req.session.user.id
			},
			include: [{
				model: User,
				as: "follower",
				through: "Follow",
				attributes: ["id", "first_name", "last_name", "profile_pic_url"]
			}]
		})

		req.session.user = {
			id: foundUser.id,
			first_name: foundUser.first_name,
			last_name: foundUser.last_name,
			full_name: foundUser.full_name,
			email: foundUser.email,
			profile_pic_url: foundUser.profile_pic_url,
			friend: foundUser.follower.map(u => u.toJSON())
		}

		res.status(200).json(unfollowedUser);

	} catch (err) {
		if (err) {
			res.status(500).json({ msg: "ERROR", err })
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
				id: req.session.user.id
			},
			include: [{
				model: User,
				as: "follower",
				through: "Follow",
				attributes: ["id", "first_name", "last_name", "profile_pic_url"]
			}]
		})

		const newPic = await foundUser.update({
			profile_pic_url: req.body.profile_pic_url
		})

		req.session.user = {
			id: foundUser.id,
			first_name: foundUser.first_name,
			last_name: foundUser.last_name,
			full_name: foundUser.full_name,
			email: foundUser.email,
			profile_pic_url: foundUser.profile_pic_url,
			friend: foundUser.follower.map(u => u.toJSON())
		}

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





