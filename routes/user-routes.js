const express = require('express');
const router = express.Router()
const bcrypt = require("bcrypt");
const { User, Review, Follower } = require('../models');
const path = require("path");

//signup



//login
//render routes





//logout
router.delete("/logout", (req, res) => {
    if (!req.session.user) {
        return res.redirect("login")
    }
    req.session.destroy();
    res.json({ msg: "logged out!" })
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

router.get('/feed', async (req, res) => {
    if (!req.session.user) {
        return res.redirect("login")
    }
    try {

    } catch (err) {
        if (err) {
            res.status(500).json({ msg: "ERROR", err })
        }
    }
    res.render('feed', req.session.user)
});

module.exports = router;
//other user profiles
//other user profiles





