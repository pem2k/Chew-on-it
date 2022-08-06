const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const {Message, User} = require('../models');
const path = require("path");

router.get('/', (req, res) => {
    if(!req.session.user){
      return res.redirect("login")
  }
    res.render('messages')
  });
  
  router.get('/:id', (req, res) => {
    if(!req.session.user){
      return res.redirect("login")
  }
    res.render('messages')
  });
module.exports = router