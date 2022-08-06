const express = require('express');
const router = express.Router();
const {Message, Follow, User, Business, Review} = require('../models');

router.get("/",async (req,res)=>{
    try {
        const business = await Business.findAll({
            include:[Message,User,Follow, Review, Business],
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
        const newBusiness = await Business.create({
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
    Business.findByPk(req.params.id).then(business=>{
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
    Business.update({
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
    Business.destroy({
        where:{
            id:req.params.id
        }
        }).then(business=>{
            if(!business){
                return res.status(404).json({msg:"No such Restaurants Exists in the Database"})
            }
        res.json(business)
    }).catch(err=>{
        res.status(500).json({
            msg:"internal server error",
            err
        })
    })
})

module.exports = router;