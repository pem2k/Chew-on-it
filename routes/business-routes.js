const express = require('express');
const { beforeDefine } = require('../config/connection');
const router = express.Router();
const {Message, Post, Profile, Rest} = require('../models');

router.get("/",async (req,res)=>{
    try {
        const business = await Rest.findAll({
            include:[Message,Profile,Post],
        })
        res.status(200).json(business)
    } catch (err) {
        res.status(500).json({
            msg:"internal server error!",
            err
        })
    }
})

router.post("/",async (req,res)=>{
    try{
        const newBusiness = await Message.create({
            rest_name:req.body.rest_name,
            rest_location:body.rest_location,
            rest_review:body.rest_review,
            rest_details:body.rest_details,
            id:req.body.id
        })
        res.status(201).json(newBusiness)
    }catch(err){
        console.log(err)
        res.status(500).json({
            msg:"internal server error!",
            err
        })
    }
})


router.get("/:id",(req,res)=>{
    Rest.findByPk(req.params.id).then(business=>{
        if(!business){
            return res.status(404).json({msg:"No Such Restaurant exists in the Database!"})
        }
        res.json(business)
    }).catch(err=>{
        res.status(500).json({
            msg:"internal server error",
            err
        })
    })
})
router.put("/:id",(req,res)=>{
    Rest.update({
        rest_name:req.body.rest_name,
        rest_location:body.rest_location,
        rest_review:body.rest_review,
        rest_details:body.rest_details,
        id:req.body.id
    },
        {
        where:{
            id:req.params.id
        }
        }).then(business=>{
            if(!business[0]){
                return res.status(404).json({msg:"No such Restaurants Exists in the Database or the Change was Not Made!"})
            }
        res.json(business)
    }).catch(err=>{
        res.status(500).json({
            msg:"internal server error",
            err
        })
    })
})
router.delete("/:id",(req,res)=>{
    Rest.destroy({
        where:{
            id:req.params.id
        }
        }).then(business=>{
            if(!business){
                return res.status(404).json({msg:"No such Restaurants Exists in the Database"})
            }
        res.json(busines)
    }).catch(err=>{
        res.status(500).json({
            msg:"internal server error",
            err
        })
    })
})

module.exports = router;