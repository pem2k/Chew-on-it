const express = require('express');
const router = express.Router();
const {Review,Follow,Message,Business,User} = require('../models');

// router.get("/",async (req,res)=>{
//     try {
//         const reviews = await Review.findAll({
//             include:[User,Business,Follow, Message],
//         })
//         res.status(200).json(reviews)
//     } catch (err) {
//         res.status(500).json({
//             msg:"internal server error!",
//             err
//         })
//     }
// })

router.post("/", async (req,res)=>{
    try{
        const newReview = await Review.create({
            content:req.body.content,
            restaurant_name: req.body.restaurant_name,
            restaurant_address: req.body.restaurant_address,
            // business_id:req.body.business_id,
            user_id:req.session.user.id,
            // review_pic_url: req.body.review_pic_url
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
            return res.render("404", req.session.user)
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
                return res.render("404", req.session.user)
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