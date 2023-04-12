const {Sequelize, DataTypes} = require('sequelize');
const bcrypt = require ('bcrypt');
const coworks = require('../cowormod');
const CoworkingModel = require('../models/coworkings');
const UserModel = require('../models/user');

const sequelize = new Sequelize('lapiscine_coworking', 'root', '', {
    host: 'localhost',
    dialect:'mariadb',
    logging: false,
});

const Coworking = CoworkingModel(sequelize, DataTypes);
const User = UserModel(sequelize,DataTypes);

const initDb = ()=>{
    
    return sequelize.sync({ force: true })
    .then(()=>{
        coworks.map((data)=>{
            Coworking.create({
                name: data.name,
                price: data.price,
                address: data.address,
                picture: "",
                superficy: data.superficy,
                capacity: data.capacity
            })
            .then(()=> {console.log('la base a bien été synchronsée')})
            .catch(error => console.log('il manque')+error)
        })
        bcrypt.hash('mdp',10)
        .then((hash) =>{
            User.create({
                username:'Paul',
                password:hash,
                roles:["user","admin"]
            })
        })
        .catch(err=>console.log(err))
        
        bcrypt.hash('mdp',10)
        .then((hash) =>{
            User.create({
                username:'Pierre',
                password:hash,
                roles:["user"]
            })
        })
        .catch(err=>console.log(err))
    })
    .then(()=>{console.log(`les ${coworks.length} ont bien été synchronsés`)})
    .catch(error => console.log('il manque')+error)
}
    
    sequelize.authenticate()
    .then(()=>console.log('la connexion est ok'))
    .catch(error => console.error('impossible de se connecter'+error))
    

module.exports = {sequelize, Coworking, User, initDb};
