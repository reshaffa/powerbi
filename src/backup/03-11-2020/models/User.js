const { Model , DataTypes } = require('sequelize');

class User extends Model {
    static init(sequelize){
        super.init({
            nip: DataTypes.STRING,
            phone: DataTypes.STRING,
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            status: DataTypes.SMALLINT,
            photo: DataTypes.TEXT,
            role: DataTypes.STRING
        },{
            sequelize
        })
    }
}

module.exports = User;