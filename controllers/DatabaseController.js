'use strict'
const Sequelize = require('sequelize');
const config = require('config');

var dbConfig = config.get('config.dbConfig');
const db = new Sequelize(dbConfig);

var User = db.define('user', {
  username: {
    allowNull: false,
    type: Sequelize.STRING
  },
  email: {
    allowNull: false,
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
      isEmail: true
    }
  },
  password: {
    allowNull: false,
    type: Sequelize.STRING
  },
   type: {
     allowNull: false,
     type: Sequelize.STRING
   }
});

var Location = db.define('location', {
  name: {
    allowNull: false,
    type: Sequelize.STRING
  },
  longitude: {
    allowNull: false,
    type: Sequelize.DECIMAL(8, 6)
  },
  latitude: {
    allowNull: false,
    type: Sequelize.DECIMAL(8, 6)
  },
  imageUrl: {
    allowNull: false,
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
      isUrl: true
    }
  }
});

module.exports.createDb = function() {
  {force: true}
  db.sync()
    .then(function () {
        console.log('Database was created successfully!');
    })
    .catch(function (error) {
      console.log('The following error was thrown during the creation of database: ' + error);
    })
};

module.exports.createUser = function(user) {
  return User.create(user);
};

module.exports.findUserByEmail = function(userEmail) {
  return User.find({
    where: {
      email: userEmail
    }
  });
};

module.exports.findLocations = function() {
  return Location.findAll({
    attributes: ['id', 'name', 'longitude', 'latitude', 'imageUrl']
  });
};
