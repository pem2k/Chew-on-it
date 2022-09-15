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
	return res.redirect("/")
})

router.get('/profile/:full_name', async (req, res) => {
    if (!req.session.user) {
        return res.redirect("/")
    }
    try {
        const userProfile = await User.findOne({
            where:{
                full_name: req.params.full_name
            }
		})

		if (!userProfile) {
            return res.render("404", { user: req.session.user })
        }

		res.redirect(`/profile/${userProfile.id}`)
    } catch (err) {
        if (err) {
            res.status(500).json({ msg: "ERROR", err })
        }
    }
});


// User directory.
router.get("/directory", (req, res) => {
	if (!req.session.user) {
        return res.redirect("/")
    }
	res.redirect("/users/directory/1");
});
router.get("/directory/:page", (req, res) => {
	if (!req.session.user)
		return res.redirect("/");

	User.findAndCountAll({
		attributes: ["id", "first_name", "last_name", "profile_pic_url",

			[sequelize.literal(`CASE WHEN follower_id = ${req.session.user.id} THEN 1 ELSE 0 END`), "follow"]
			],
		include: [
			{
				model: User,
				as: "followed",
				through: "Follow",
				attributes: [],
				required: false,
				where: {
					id: req.session.user.id
				}
			},
			{
				model: Review,
				attributes: [
					[sequelize.literal("(SELECT COUNT(*) FROM review WHERE user_id = user.id)"), "review_count"]
				]
			},
			{
				model: Message,
				attributes: [
					[sequelize.literal("(SELECT COUNT(*) FROM message WHERE user_id = user.id)"), "message_count"]
				]
			},
//			{
//				model: User,
//				as: "follower",
//				through: "Follow",
//				attributes: [
//					[sequelize.literal("(SELECT COUNT(*) FROM follow AS poop WHERE poop.follower_id = user.id)"), "following_count"]
//				]
//			}
			],
		subQuery: false,
		limit: 20,
		offset: 20 * (req.params.page - 1),
		group: ["User.id"]
	}).then(results => {
		const users = results.rows.map(user => user.toJSON());
		const pages = () => {
			let pageCount = results.count.length / 20;
			let pages = [];

//			if (results.count.length % 20)
//				pageCount++;
			for (let i = 0; i < pageCount; i++) {
				pages.push({
					page: i + 1,
					extra: "",
					current: (i + 1 == req.params.page)
				})
			}
			if (req.params.page > 6)
				pages.splice(3, req.params.page - 4, { page: "...", current: true })
			if (req.params.page + 5 < pageCount)
				pages.splice(req.params.page + 2, pageCount - 4, { page: "...", current: true })

			for (let i = 0; i < pages.length; i++) {
				if (i + 1 < pages.length) {
				 	if (pages[i].page != "..." && pages[i + 1].page != "...")
						pages[i].extra = ", ";
				}
			}

			return pages;
		}
		return {
			users,
			pages: pages()
		}
	})
	.then(results => { res.render("users", { users: results.users, user: req.session.user, pages: results.pages })});
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
				last_name: req.body.last_name,
				full_name: req.body.first_name + " " + req.body.last_name
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
	if (!req.session.user)
		return res.redirect("/");

	try {
		const removeFollow = await Follow.destroy({
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

		res.status(200).json(removeFollow);

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





