const router = require('express').Router();
const businessRoutes = require('./business-routes.js');
const reviewRoutes = require('./posting-routes');
const msgRoutes = require('./message-routes')
const userRoutes = require("./user-routes")
const express = require('express');
const bcrypt = require("bcrypt");
const { User, Review, Follow, Business, } = require('../models');
const path = require("path");


router.use('/users', userRoutes);
router.use('/businesses', businessRoutes);
router.use('/reviews', reviewRoutes);
router.use('/messages', msgRoutes);



router.get('/signup', async (req, res) => res.render('signup'));

router.post("/signup", async (req, res) => {
    try {
        const newUser = await User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            full_name: req.body.first_name + " " + req.body.last_name,
            email: req.body.email,
            password: req.body.password
        })

        req.session.user = {
            id: newUser.id,
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            full_name: newUser.full_name,
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
			}]
        })
        if (!userProfile) {
            return res.status(404).json({ msg: "User not found" })
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
    if (!req.session.user) {
        return res.render("about")
    }

    res.render('about', req.session.user)
});

//all reviews from following
router.get('/feed', async (req, res) => {
    if (!req.session.user) {
        return res.redirect("/")

  }

	Review.findAll({
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
				}]
		}]
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

