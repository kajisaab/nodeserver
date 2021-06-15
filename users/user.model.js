const sequelize = require('sequelize');
 
module.exports = model; 

function model(sequelize){
    const attributes = {
        firstName: {type: DataTypes.STRING, allowNull: false},
        lastName: {type: DataTypes.STRING, allowNull: false},
        age: {type: DataTypes.STRING, allowNull: false},
        phoneNumber: {type: DataTypes.STRING, allowNull: false},
        address: {type: DataTypes.STRING, allowNull: false},
        gender: {type: DataTypes.STRING, allowNull: false},
        workingHospital: {type: DataTypes.STRING, allowNull: false},
        experience: {type: DataTypes.STRING, allowNull: false},
        specialization: {type: DataTypes.STRING, allowNull: false},
        email: {type: DataTypes.STRING, allowNull: false},
        hash: {type: DataTypes.STRING, allowNull: false}
    };
    
    const options = {
        defaultScope: {
            // exclude hash by default
            attributes: { exclude: ['hash']}
        },
        scopes: {
            //include hash with this scope
            withHash: { attributes: {}, }
        }
    };

    return sequelize.define('User', attributes, options);
}