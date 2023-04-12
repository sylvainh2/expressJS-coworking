const sequelize = require('../db/sequelize');
const {User} =require('../db/sequelize');

const findAll= (req,res)=>{
    User.findAll()
    .then((allusers)=>{
        res.json({message:`les users ont été récupérés`,data:allusers})
    })
    .catch(error => res.status(404).json({message:`pas de données`}))
}

const findByPk = (req,res)=>{
    User.findByPk(req.params.id)
    .then((user)=>{
        res.json({message:`le user n°${req.params.id} a été récupéré`,data:user})
    })
    .catch(error => res.status(404).json({message:`pas de données pour l'id ${req.params.id}`}))
}


module.exports = {
    findAll,
    findByPk
};