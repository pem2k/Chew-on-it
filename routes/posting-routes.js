const express = require('express');
const router = express.Router();
const {Review,Follow,Message,Business,User} = require('../models');

router.get("/",async (req,res)=>{
    try {
        const reviews = await Review.findAll({
            include:[User,Business],
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
        const newReview = await Review.create({
            id:req.body.id,
            content:req.body.content,
            business_id:req.body.business_id,
            user_id:req.body.user_id,
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
    Review.findByPk(req.params.id).then(review=>{
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
    // router.put("/:id", (req, res) => {
    //     try {
    //         const updateReview = await Review.update({
    //             id: req.body.id,
    //             content: req.body.content,
    //             business_id: req.body.business_id,
    //             user_id: req.body.user_id,
    //         }, {
    //             where: {
    //                 id: req.params.id
    //             }
    //         }).then(updateReview) => {
    //             if (!updateReview[0]) {
    //                 return res.status(404).json({
    //                     msg: "No such Review Exists or the Change was Not Made!"
    //                 })
    //             }
    //             res.json(updateReview)
    //         }
    //     } catch (err) => {
    //         res.status(500).json({
    //             msg: "internal server error",
    //             err
    //         })
    //     }
// try-catch needs to be setup correctly
router.delete("/:id",(req,res)=>{
    Review.destroy({
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