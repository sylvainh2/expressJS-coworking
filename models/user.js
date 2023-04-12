
const userRoles = ['user','admin','superAdmin'];
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull:false,
        unique:"username déjà pris!!" 
      },
      password: {
        type: DataTypes.STRING
      },
      roles:{
        type: DataTypes.STRING,
        set(roles){
            this.setDataValue('roles',roles.join())
        },
        get(){
            return this.getDataValue("roles".split(','));
        },
        defaultValue:"user",
        validate: {
            areRolesValid(roles){
                if(!roles){
                    throw new Error('un utilisateur doit avoir au moins un role')
                }
                roles.split(',').forEach(role=>{
                    if(!userRoles.includes(role)){
                        throw new Error("les roles d'un utilisateur doivent appartenir a la liste")
                    }
                })
            }
        }
      }
    })
  }