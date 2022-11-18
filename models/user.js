const { Model, DataTypes } = require("sequelize");
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
  class User extends Model {}
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "A first name is required",
          },
          notEmpty: {
            msg: "Please provide a first name",
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "A last name is required",
          },
          notEmpty: {
            msg: "Please provide a last name",
          },
        },
      },
      emailAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        isEmail: true,
        unique: {
          msg: "That email has already been submitted, pleast try again.",
        },
        validate: {
          notNull: {
            msg: "An email is required",
          },
          notEmpty: {
            msg: "Please provide an email",
          },
          isEmail: {
            msg: "Please provide a correct email",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "A password is required",
          },
          notEmpty: {
            msg: "Please provide a password",
          },
        },
        set(val) {
            const hashedPassword = bcrypt.hashSync(val, 10);
            this.setDataValue('password', hashedPassword);
        },
      },
    },
    { sequelize });

  User.associate = (models) => {
    User.hasMany(models.Course, { foreignKey: "userId" });
  };
  return User;
};
