

const {Favorites} =require("../models/favoriteModel")
const { Properties } = require("../models/propertyModel")
const { Users } = require("../models/userModel")

const createFavorite = async (req,res) =>{
    const {UserId,PropertyId}=req.body
    if(!UserId ||!PropertyId){
        res.status(400).send({message:"faltan datos"})

    }
    const created = await Favorites.create({UserId,PropertyId})
    if(created){res.status(200).send("todo bien")}else{res.status(401).send("error")}
}

const getFavoritesByUserId = async (req,res) =>{
    const {UserId} = req.params
    
    const favs = await Users.findOne({where:{id:UserId},include:Properties})
    res.send(favs)
}

const deleteFavorite = async (req,res) =>{
    const {UserId,PropertyId} = req.query
    await Favorites.destroy({
        where:{UserId,PropertyId}
    })

}


module.exports={
    createFavorite,
    getFavoritesByUserId,
    deleteFavorite
}