'use strict';
const { Model, DataTypes } = require('sequelize');

/* 
title (String)
description (Text)
estimatedTime (String)
materialsNeeded (String)
userId (created in the model associations with the foreignKey property, and equals the id from the users table)
*/

module.exports = (sequelize) => {
    class Course extends Model {}
    Course.init({
        title: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.TEXT
        },
        estimatedTime: {
            type: DataTypes.STRING
        },
        materialsNeeded: {
            type: DataTypes.STRING
        },
        userId: {
            type: DataTypes.STRING
        }

    }, { sequelize });

    return Course;
}