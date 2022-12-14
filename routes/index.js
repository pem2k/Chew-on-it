const router = require('express').Router();
const businessRoutes = require('./business-routes.js');
const reviewRoutes = require('./posting-routes');
const msgRoutes = require('./message-routes')
const userRoutes = require("./user-routes")
const express = require('express');
const bcrypt = require("bcrypt");
const { User, Review, Follow, Business, Message, } = require('../models');
const path = require("path");
const sequelize = require("sequelize");


router.use('/users', userRoutes);
router.use('/businesses', businessRoutes);
router.use('/reviews', reviewRoutes);
router.use('/messages', msgRoutes);




router.post("/signup", async (req, res) => {
    try {
        const newUser = await User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            full_name: req.body.first_name + " " + req.body.last_name,
            email: req.body.email,
            password: req.body.password
        })

		// Pull created user's full data.
		const foundUser = await User.findOne({
			where: {
				email: req.body.email
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

        return res.redirect("profile")

    } catch (err) {
        if (err) {
            res.status(500).json({ msg: "ERROR", err })
        }
    }

})
//login
router.get('/', async (req, res) => {
    if (req.session.user)
        return res.redirect("/feed");

    res.render('login');
})

router.post("/login", async (req, res) => {
    if (req.session.user) {
        return res.redirect("/feed");
    }
    const foundUser = await User.findOne({
        where: {
            email: req.body.email
        },
		include: [{
			model: User,
			as: "follower",
			through: "Follow",
			attributes: ["id", "first_name", "last_name", "profile_pic_url"]
		}]
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
		full_name: foundUser.full_name,
		email: foundUser.email,
		profile_pic_url: foundUser.profile_pic_url,
		friend: foundUser.follower.map(u => u.toJSON())
	}

    return res.status(200).json(foundUser)
    //res.render homepage/feed
})

//profile routes

//self profile
router.get('/profile', async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/')
    } else
        return res.redirect(`/profile/${req.session.user.id}`);
});


//other user profiles
router.get('/profile/:id', async (req, res) => {
    if (!req.session.user) {
        return res.redirect("/")
    }
    try {
        const userProfile = await User.findByPk(req.params.id, {
			attributes: ["id", "first_name", "last_name", "profile_pic_url",
			[sequelize.literal(`CASE WHEN follower_id = ${req.session.user.id} THEN 1 ELSE 0 END`), "follow"]],
            include: [{
				model: Review,
				subQuery: false,
				attributes: ["id", "content", "review_pic_url", "restaurant_name", "restaurant_address", ["createdAt", "creation"]],
				include: [{
					model: User,
					attributes: ["id", "first_name", "last_name", "profile_pic_url"]
				},
				{
					model: Business,
					attributes: ["id", "business_name", "location", "phone_number"]
				},
				{
					model: Message,
					attributes: ["id", "message_contents", "updatedAt"],
					include: [{
						model: User,
						attributes: ["id", "first_name", "last_name", "profile_pic_url"]
					}]
				}]
			},
			{
				model: User,
				as: "followed",
				through: "Follow",
				attributes: [],
				where: {
					id: req.session.user.id
				},
				required: false
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

router.get("/about", (req, res) => {
    res.render('about', { user: req.session.user })
});

//all reviews from following
router.get('/feed', async (req, res) => {
    if (!req.session.user) {
        return res.redirect("/")

  }

	Review.findAll({
		order: [['createdAt', 'DESC']],
		attributes: ["id", "content", "review_pic_url", "restaurant_name", "restaurant_address", ["createdAt", "creation"]],
		include: [{
			model: Business,
			attributes: ["id", "business_name", "location", "phone_number"]
		}, {
			model: User,
			attributes: ["id", "first_name", "last_name", "profile_pic_url"],
			include: [
				{
					model: User,
					as: "followed",
					through: "Follow",
					attributes: [],
					where: {
						id: req.session.user.id
					}
				}],
			where: { }
		},
		{
			model: Message,
			attributes: ["id", "message_contents", "updatedAt"],
			include: [{
				model: User,
				attributes: ["id", "first_name", "last_name", "profile_pic_url"]
			}]
		}
	]
	}).then(raw => raw.map(r => r.toJSON()))
	.then(results => {
		res.render("feed", {
			reviews: results,
			user: req.session.user
		})
	}).catch(err => {
		if (err) {
			res.status(500).json({ msg: "ERROR", err });
		}
	})
});



//

module.exports = router;

