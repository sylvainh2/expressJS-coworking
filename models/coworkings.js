const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Coworking', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique:true
        },
        picture: {
            type: DataTypes.STRING,
        },
        superficy: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{isInt:
            {msg:"la superficie doit etre un entier"}
        }
        },
        capacity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: DataTypes.JSON,
            allowNull: false,
            validate:{
                customValidator(value){
                    if(value.hour ===null && value.day ===null && value.month ===null){
                        throw new Error("au moins un prix doit etre spécifié")
                    }
                }
            }
        },
        address: {
            type: DataTypes.JSON,
        }
    }, {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    })
}