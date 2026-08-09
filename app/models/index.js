const dbConfig = require("../config/dbConfig.js");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,            
  dialect: dbConfig.dialect,      

  dialectOptions: {
    ssl: {
      require: true,              
      rejectUnauthorized: false   
    }
  },

  pool: {
    max: dbConfig.pool.max,       // Máximo de conexiones simultáneas
    min: dbConfig.pool.min,       // Mínimo de conexiones
    acquire: dbConfig.pool.acquire, // Tiempo máximo para obtener una conexión antes de lanzar error
    idle: dbConfig.pool.idle      // Tiempo que una conexión puede estar inactiva antes de ser liberada
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Estudiante = require("./estudianteModel.js")(sequelize, Sequelize);
db.Libro = require("./libroModel.js")(sequelize, Sequelize);
db.Prestamo = require("./prestamoModel.js")(sequelize, Sequelize);

db.Libro.hasMany(db.Prestamo, {
  foreignKey: "libroId",
  as: "prestamos"
});
db.Prestamo.belongsTo(db.Libro, {
  foreignKey: "libroId",
  as: "libro"
});

db.Estudiante.hasMany(db.Prestamo, {
  foreignKey: "estudianteId",
  as: "prestamos"
});
db.Prestamo.belongsTo(db.Estudiante, {
  foreignKey: "estudianteId",
  as: "estudiante"
});

module.exports = db;