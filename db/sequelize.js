const {Sequelize, DataTypes} = require('sequelize');
const coworks = require('../cowormod');
const CoworkingModel = require('../models/coworkings');

const sequelize = new Sequelize('lapiscine_coworking', 'root', '', {
    host: 'localhost',
    dialect:'mariadb',
    logging: false,
});

const Coworking = CoworkingModel(sequelize, DataTypes);

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
    })
    .then(()=>{console.log(`les ${coworks.length} ont bien été synchronsés`)})
    .catch(error => console.log('il manque')+error)
}
    
    sequelize.authenticate()
    .then(()=>console.log('la connexion est ok'))
    .catch(error => console.error('impossible de se connecter'+error))
    

module.exports = {sequelize, Coworking, initDb};
