const { Model } = require("sequelize/types")

router.get("/feed", async (req, res) => {
    try{
        const foundModel = Model.findAll({
            //body content
        })
        //res.render
    }catch(err){
        if(err){
            res.status(500).json({ msg: "ERROR", err })
        }
    }
})

router.post("/", async (req, res) => {
    try{
        if(!req.session.user){
            return res.status(403).json({msg:"login before attempting to add content"})
        }
       const newModel = Model.create({
            UserId:req.session.user.id,
           
        })
        //res.render post here
    }catch(err){
        if(err){
            res.status(500).json({ msg: "ERROR", err })
        }
    }
})

router.delete("/feed", async (req, res) => {
    try{
        if(!req.session.user){
            return res.status(403).json({msg:"login before attempting to delete"})
        }
        

        const foundModel = await Model.findOne({
            where:{
                id: req.body.id,
              }
            })

        if (!foundModel) {
            return res.status(404).json({ msg: "Not found" })
          }

        Model.destroy (foundModel)
        
    }catch(err){
        if(err){
            res.status(500).json({ msg: "ERROR", err })
        }
    }
})