const express = require('express');
const router = express.Router();
const {Message, Post, Profile, Rest} = require('../models');

router.get("/",async (req,res)=>{
    try {
        const reviews = await Message.findAll({
            include:[Rest,Profile,Post],
        })
        res.status(200).json(reviews)
    } catch (err) {
        res.status(500).json({
            msg:"internal server error!",
            err
        })
    }
})

router.post("/",async (req,res)=>{
    try{
        const newReview = await Message.create({
            rest_name:req.body.rest_name,
            id:req.body.id
        })
        res.status(201).json(newReview)
    }catch(err){
        console.log(err)
        res.status(500).json({
            msg:"internal server error!",
            err
        })
    }
})


router.get("/:id",(req,res)=>{
    Message.findByPk(req.params.id).then(review=>{
        if(!review){
            return res.status(404).json({msg:"No Such Review exists in the Database!"})
        }
        res.json(review)
    }).catch(err=>{
        res.status(500).json({
            msg:"internal server error",
            err
        })
    })
})
router.put("/:id",(req,res)=>{
    Message.update({
        rest_review:req.body.rest_review,
        id:req.body.id,
    },
        {
        where:{
            id:req.params.id
        }
        }).then(review=>{
            if(!review[0]){
                return res.status(404).json({msg:"No such Review Exists or the Change was Not Made!"})
            }
        res.json(review)
    }).catch(err=>{
        res.status(500).json({
            msg:"internal server error",
            err
        })
    })
})
router.delete("/:id",(req,res)=>{
    Message.destroy({
        where:{
            id:req.params.id
        }
        }).then(review=>{
            if(!review){
                return res.status(404).json({msg:"No such Review Exists"})
            }
        res.json(review)
    }).catch(err=>{
        res.status(500).json({
            msg:"internal server error",
            err
        })
    })
})

module.exports = router;