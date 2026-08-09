const dbConfig = require("../config/db.config.js");

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
db.Sequelize = Sequelize;

// Un Libro puede tener muchos Prestamos
db.Libro.hasMany(db.Prestamo, {
  foreignKey: "libroId",
  as: "prestamos"
});
db.Prestamo.belongsTo(db.Libro, {
  foreignKey: "libroId",
  as: "libro"
});

// Un Estudiante puede tener muchos Prestamos
db.Estudiante.hasMany(db.Prestamo, {
  foreignKey: "estudianteId",
  as: "prestamos"
});
db.Prestamo.belongsTo(db.Estudiante, {
  foreignKey: "estudianteId",
  as: "estudiante"
});

db.estudiantes = require("./estudianteModel.js")(sequelize, Sequelize);
db.libros = require("./libroModel.js")(sequelize, Sequelize);
db.prestamos = require("./prestamoModel.js")(sequelize, Sequelize);

module.exports = db;