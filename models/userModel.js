const { NUMBER } = require("sequelize")


module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define("user", {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false

        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
          
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: [true, ' User Already Exist with this Phone Number'],
           
        },
        address: {
            type: DataTypes.STRING
        },

        walletAccount: {
            type: DataTypes.STRING,
            allowNull: false
        },
        wallet: {
            type: DataTypes.FLOAT,
            defaultValue: 0,
            allowNull: false
        },
        loanAmmount: {
            type: DataTypes.FLOAT,
            defaultValue: 0,
            allowNull: false
        },
        loanBalance: {
            type: DataTypes.FLOAT,
            defaultValue: 0,
            allowNull: false
        }
    })

    return User
}
