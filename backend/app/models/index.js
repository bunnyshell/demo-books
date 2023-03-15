const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(`postgres://${dbConfig.USER}:${dbConfig.PASSWORD}@${dbConfig.HOST}/${dbConfig.DB}?options=project%3D${dbConfig.ENDPOINT}&ssl=true`, {
  dialect: dbConfig.dialect,

  retry: {
    match: [Sequelize.ConnectionError],
    max: 5
  },

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.books = require("./book.model.js")(sequelize, Sequelize);

module.exports = db;
