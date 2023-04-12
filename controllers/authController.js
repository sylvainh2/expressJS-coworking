const sequelize = require('../db/sequelize');
const { UniqueConstraintError, ValidationError } = require("sequelize");
const {User} = require('../db/sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {privateKey} = require('../auth/privateKey');

const login = (req,res)=>{
    if(!req.body.username || !req.body.password){
        return res.status(400).json({message:"entrez un username et un password!"});
    }
    User.findOne({
        where:{username: req.body.username}
    })
    .then((user)=>{
        if(!user){
            return res.status(404).json({message:"l'utilisateur demandé n'existe pas"});
        }
        bcrypt.compare(req.body.password,user.password)
        .then((isValid)=>{
            if(!isValid){
                return res.status(404).json({message:"mot de passe ou username incorrecte"})
            }
            const token = jwt.sign({
                data:user.id
            },privateKey,{expiresIn: '1h'});
            return res.json({message:"utilisateur connecté", user, token})
        })
    })
    .catch(error =>{
        return res.status(500).json({message:error});
    })
}
const protect = (req,res,next)=>{
    const authorization = req.headers.authorization;
    if(!authorization){
        return res.status(401).json({message:"une authentification est nécessaire"})
    }
    try{
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token,privateKey);
        req.userId = decoded.data;
    }
    catch(err){
        return res.status(403).json({message:"authentification invalide"})
    }
     return next();
}
const restrictTo = (...roles)=>{
    return (req,res,next) =>{
        User.findByPk(req.userId)
            .then(user=>{
                if(!user || !(roles.every(role=>user.roles.includes(role)))){
                    return res.status(403).json({message:"Droits insuffisants"})
                }
                return next();
            })
            .catch(err=>{
                res.status(500).json({message:"erreur lors de l'utilisation", data:err})
            })
    }
}

const signup = (req,res)=>{
    bcrypt.hash(req.body.password,10)
    .then((hash) =>{
        return User.create({
            username:req.body.username,
            password:hash
        })
        .then((userCreated)=>{
            return res.json({message:`l'utilisateur ${userCreated.username} a été créé`,data:userCreated})
        })
    })
    .catch(error=>{
        if(error instanceof UniqueConstraintError || error instanceof ValidationError){
            return res.status(400).json({message:error.message,data: error})
        }
        return res.status(500).json({message:"probleme lors de la création"})
    })
}

module.exports = {login, protect, restrictTo, signup};