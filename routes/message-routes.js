const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const {Message} = require('../models');
const path = require("path");

router.get('/', async (req, res) => {
    if(!req.session.user){
      res.redirect("user/login")
      return res.status(403).json({msg:"Must login before viewing messages"})
  }
    res.render('messages', req.session.user)
  });
  
module.exports = router