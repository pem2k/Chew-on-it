const express = require('express');
const router = express.Router();
const {Message, Follow, User, Business, Review} = require('../models');


router.get("/",async (req,res)=>{
    if (!req.session.user) {
        return res.redirect("/")
    }
    try {
        // const business = await Business.findAll({
        //     include:[Message,User,Follow, Review],
        // })
        // res.status(200).json(business)
        res.render("businesses", {user:req.session.user})
        //git

    } catch (err) {
        res.status(500).json({
            msg:"internal server error!",
            err
        })
    }
})

    // Business.findAll({
    //     include:[{
    //         model:Review,
    //     }],
    // }).then(results => results.map(business => business.toJSON()))
    // .then(businesses => {
    //     const data = { users, user: req.session.user };
    //     res.render("users", data);
    // });
//     }).then(business=>{
//         if(!business){
//             return res.status(404).json({msg:"No Such Restaurant exists in the Database!"})
//         }
//         res.render("businesses",(business.toJSON()))
        
//     }).catch(err=>{
//         console.log(err)
//         res.status(500).json({
//             msg:"internal server error",
//             err
//         })
//     })
// })
// router.get("/",async (req,res)=>{
//     res.render("businesses", req.session.User)
//  })


router.post("/",async (req,res)=>{
    try{
        const newBusiness = await Business.create({
            business_name:req.body.business_name,
            location:req.body.location,
            phone_number:req.body.phone_number,
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
        business_name:req.body.business_name,
        location:req.body.location,
        phone_number:req.body.phone_number,
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
});

module.exports = router;