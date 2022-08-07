const express = require('express');
const router = express.Router();
const {Message, User, Follow, Review, Business} = require('../models');


router.get("/", async (req, res) => {
  try {
    const messages = await Message.findAll({
        include:[User, Review],
    })
    res.status(200).json(messages)
} catch (err) {
    res.status(500).json({
        msg:"internal server error!",
        err
    })
}
    if(!req.session.user){
      return res.redirect("login")
  }
    res.render('messages')
  });
  

  router.get('/:id', async (req, res) => {
    Message.findByPk(req.params.id).then(messages  =>{
     if(!messages){
      return res.status(404).json({msg: "No such Message exits!"})
     }
      res.json(messages)
  }).catch (err=>{
      res.status(500).json({
          msg:"internal server error!",
          err
      })
     if(!req.session.user){
        return res.redirect("login")
    }
      res.render('messages')
})
});
 

module.exports = router;