"use strict";
module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define("users", {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email_address: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    password_digest: DataTypes.STRING,
    pa
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return users;
};