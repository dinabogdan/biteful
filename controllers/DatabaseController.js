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

var Store = db.define('store', {
  name: {
    allowNull: false,
    type: Sequelize.STRING
  },
  logoUrl: {
    allowNull: false,
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
      isUrl: true
    }
  },
  pdfUrl: {
    allowNull: false,
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
      isUrl: true
    }
  }
});

var Address = db.define('address', {
  details: {
    allowNull: false,
    type: Sequelize.STRING
  }
});

var Delivery = db.define('delivery');

Store.hasMany(Location, {
  foreignKey: 'storeId'
});

Location.belongsTo(Store, {
  foreignKey: 'storeId'
});

Address.hasMany(Delivery, {
  foreignKey: 'addressId'
});

Delivery.belongsTo(Address, {
  foreignKey: 'addressId'
});

User.hasMany(Delivery, {
  foreignKey: 'customerId'
});

User.hasMany(Delivery, {
    foreignKey: 'courierId'
});

Delivery.belongsTo(User, {
  as: 'Customer',
  foreignKey: 'customerId'
});

Delivery.belongsTo(User, {
  as: 'Courier',
  foreignKey: 'courierId'
});

Store.hasMany(Delivery, {
  foreignKey: 'storeId'
});

Delivery.belongsTo(Store, {
  foreignKey: 'storeId'
});

Address.hasOne(User, {
  foreignKey: 'addressId'
})

User.belongsTo(Address, {
  foreignKey: 'addressId'
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

module.exports.addAddress = function(address) {
  return Address.create(address);
};

module.exports.findAllUsers = function(){
  return User.findAll();
};

module.exports.findUserByEmail = function(userEmail) {
  return User.find({
    where: {
      email: userEmail
    },
    include: [{
      model: Address,
      required: true
    }]
  });
};

module.exports.findLocations = function() {
  return Location.findAll({
    attributes: ['id', 'name', 'longitude', 'latitude', 'imageUrl']
  });
};

module.exports.findStores = function() {
  return Store.findAll({
    attributes: ['id', 'name', 'logoUrl', 'pdfUrl'],
    include: [{
      model: Location,
      required: true,
      attributes: ['id', 'name', 'longitude', 'latitude', 'imageUrl']
    }]
  });
};

module.exports.findStoreById = function(storeId) {
  return Store.find({
    attributes: ['id', 'name', 'logoUrl', 'pdfUrl'],
    where: {
      id: storeId
    },
    include: [{
      model: Location,
      required: true,
      attributes: ['id', 'name', 'longitude', 'latitude', 'imageUrl']
    }]
  });
};

module.exports.findAddresses = function() {
  return Address.findAll({
    attributes: ['id', 'details']
  });
};

module.exports.findDeliveries = function() {
  return Delivery.findAll({
      attributes: ['id'],
      include: [{
          model: Address,
          required: true,
          attributes: ['id', 'details']
      }
      ,
      {
          model: User,
          as: 'Customer',
          attributes: ['id', 'username', 'type'],
          required: true,
          where: {
            type: 'CLIENT_NORMAL'
          }
      },
      {
          model: User,
          as: 'Courier',
          attributes: ['id', 'username', 'type'],
          required: true,
          where: {
            type: 'COURIER'
          }
      },
      {
          model: Store,
          attributes: ['id', 'name'],
          required: true,
          include: [{
          model: Location,
          raw: false,
          required: true
          }]
      }]
  });
};

module.exports.findDeliveriesByUserIdAndType = function(userId, userType) {
  if(userType === 'COURIER') {
    return Delivery.findAll({
      attributes: ['id'],
      include: [{
        model: Address,
        required: true,
        attributes: ['id', 'details']
      },
      {
         model: User,
         as: 'Customer',
         attributes: ['id', 'username', 'type'],
         required: true
      },
      {
        model: User,
        as: 'Courier',
        attributes: ['id', 'username', 'type'],
        required: true,
        where: {
          id: userId
        }
      },
      {
        model: Store,
        attributes: ['id', 'name'],
        required: true,
        include: [{
          model: Location,
          raw: false,
          required: true
        }]
      }]
    });
  } else if(userType === 'CLIENT_NORMAL') {
    return Delivery.findAll({
      attributes: ['id'],
      required: true,
      include: [{
        model: Address,
        required: true,
        attributes: ['id', 'details']
      },
      {
        model: User,
        as: 'Customer',
        attributes: ['id', 'username', 'type'],
        required: true,
        where: {
          id: userId
        }
      },
      {
        model: User,
        attributes: ['id', 'username', 'type'],
        required: true
      },
      {
        mode: Store,
        attributes: ['id', 'name'],
        required: true,
        include: [{
          model: Location,
          raw: false,
          required: true
        }]
      }]
    })
  }
};

module.exports.findDeliveryById = function(deliveryId) {
  return Delivery.find({
    attributes: ['id'],
    where: {
      id: deliveryId
    },
    required: true,
    include: [{
        model: Address,
        required: true,
        attributes: ['id', 'details']
    },
    {
        model: User,
        as: 'Customer',
        attributes: ['id', 'username', 'type'],
        required: true,
        where: {
          type: 'CLIENT_NORMAL'
        }
    },
    {
        model: User,
        as: 'Courier',
        attributes: ['id', 'username', 'type'],
        required: true,
        where: {
          type: 'COURIER'
        }
    },
    {
        model: Store,
        attributes: ['id', 'name'],
        required: true,
        include: [{
        model: Location,
        raw: false,
        required: true
        }]
    }]
  });
};

module.exports.createDelivery = function(delivery) {
  return Delivery.create(delivery);
};
