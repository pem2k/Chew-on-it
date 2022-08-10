const express = require('express');
const router = express.Router();
const {Message, User, Follow, Review, Business} = require('../models');


router.get("/", async (req, res) => {
  try {
    const messages = await Message.findAll({
        include:[User, Review],
    })
   return res.status(200).json(messages)
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
      return res.status(404).json({msg: "No such Message exists!"})
     }
      res.json(messages)
  }).catch (err=>{
      res.status(500).json({
          msg:"internal server error!",
          err
      })
     if(!req.session.user){
        return res.redirect("/")
    }
      
})
});

router.post("/",async (req,res)=>{
  try{
      const newMessage = await Message.create({
          message_contents:req.body.message_contents,
          commenter_id:req.session.user.id,
          review_id:req.body.review_id,
      })
      res.status(201).json(newMessage)
  }catch(err){
      console.log(err)
      res.status(500).json({
          msg:"internal server error!",
          err
      })
  }
});

router.delete("/:id",(req,res)=>{
  Message.destroy({
      where:{
          id:req.params.id
      }
      }).then(message=>{
          if(!message){
              return res.status(404).json({msg:"No such Message Exists"})
          }
      res.json(message)
  }).catch(err=>{
      res.status(500).json({
          msg:"internal server error",
          err
      })
  })
})

module.exports = router;