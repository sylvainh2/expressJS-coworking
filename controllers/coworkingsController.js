
const sequelize = require('../db/sequelize');
const {Coworking} = require('../db/sequelize');
const { Op } = require("sequelize");

const findAll =(req, res) => {
    // Coworking.findAll()
    // .then((allCoworkings)=> {
    //     res.json({message: 'les coworkings sont récupérés', data: allCoworkings})
    // })
    // .catch(error => res.status(404).json({message:`pas de données`}))
    Coworking.findAll({
        where:{
            superficy:{[Op.gte]:req.query.superficy}
        }
    })
    .then((allCoworkings)=> {
        res.json({message: 'les coworkings sont récupérés', data: allCoworkings})
    })
    .catch(error => res.status(404).json({message:`pas de données`}))
};

const updateById =(req,res)=>{
    let oldCoworkingId={}
    Coworking.findByPk(req.params.id)
    .then((coworkingId)=> {
        oldCoworkingId=coworkingId
        Coworking.update({
            name:req.body.name || oldCoworkingId.name,
            superficy:req.body.superficy || oldCoworkingId.superficy,
            capacity:req.body.capacity || oldCoworkingId.capacity,
            price:req.body.price || oldCoworkingId.price,
            address:req.body.address || oldCoworkingId.address
        },{
            where:{
                id:req.params.id
            }
        })
        .then(()=> {
            Coworking.findByPk(req.params.id)
            .then((newCoworking)=>{
                res.json({message:`le coworking n°${newCoworking.id} a été modifié`,data:newCoworking})
            })
            .catch(error => res.status(404).json({message:`pas de cowork n°${req.params.id}`}))
        })
        .catch(error => res.status(400).json({message:`problème sur les modifications du coworking n°${req.params.id}`}))
    })
    .catch(error => res.status(404).json({message:`pas de cowork n°${req.params.id}`}))
};

const findCoworkingByPk =(req, res) => {

    Coworking.findByPk(req.params.id)
    .then((coworkingId)=> {
        res.json({message: `le coworking n°${coworkingId.id} est récupéré`, data: coworkingId})
    })
    .catch(error => res.status(404).json({message:`pas de cowork n°${req.params.id}`}))
    
};

const createCoworking =(req,res)=>{
    
        let newCoworking = req.body;
        Coworking.create({
            name: req.body.name,
            price: req.body.price,
            address: req.body.address,
            picture: "",
            superficy: req.body.superficy,
            capacity: req.body.capacity
        })
        .then(()=> {
            res.json({message:'le nouveau coworking a bien été crée',data:newCoworking})
        })
        .catch(error => res.status(400).json({message:`problème à la création du coworking`}))
};

const deleteById =(req,res)=>{
    let oldCoworkingId={}
    Coworking.findByPk(req.params.id)
    .then((coworkingId)=> {
        if(coworkingId.dataValues){
            oldCoworkingId=coworkingId.dataValues;
            Coworking.destroy({
                where:{
                    id:req.params.id
                }
            })
            .then((deleteCoworkingId)=> {
                res.json({message: `le coworking n°${oldCoworkingId.id} a été détruit`, data: oldCoworkingId})
            })
            .catch(error => res.status(400).json({message:`problème lors du delete du coworking n°${req.params.id} ${error}`}))
        }
    })
    .catch(error => res.status(404).json({message:`pas de coworking n°${req.params.id} ${error}`}))
};

module.exports ={
    findAll,
    updateById,
    findCoworkingByPk,
    createCoworking,
    deleteById
} 