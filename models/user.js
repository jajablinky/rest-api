//first name, last name, email, password all strings

'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class User extends Model {}
    User.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
        firstName: {
            type: DataTypes.STRING
        },
        lastName: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        }

    }, { sequelize });

    User.associate = (models) => {
        User.hasMany(models.Course, { foreignKey: 'userId'})
    };
    return User;
}