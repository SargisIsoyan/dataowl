/**
 * Created by sargis.isoyan on 21/11/2017.
 */
const fs = require("fs"),
    path = require("path"),
    Sequelize = require("sequelize"),
    config = require('../config').postgres;

const Op = Sequelize.Op;
const sequelize = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    dialect: 'postgres',
    pool: {
        max: 100,
        min: 0,
        idle: 10000
    },
    logging: false,
    operatorsAliases: Op
});

let db = {};

fs.readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function (file) {
        let model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function (modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.isConnected = function (cb) {
    db.sequelize.authenticate()
        .then(function () {
            console.log('Db connected');
            cb();
        }).catch(function (err) {
        err.parent && err.parent.code == 'ECONNREFUSED' ? console.error('Can not connect to DB!') : console.error(err);
        cb(err);
    });
};

module.exports = db;