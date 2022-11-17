//first name, last name, email, password all strings

'use strict';
const { Model, Datatypes, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class User extends Model {}
    User.init({
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

    return User;
}