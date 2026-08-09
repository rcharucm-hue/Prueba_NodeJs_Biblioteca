module.exports = (sequelize, Sequelize) => {

    const Estudiante = sequelize.define("estudiante",{

        nombre:{
            type: sequelize.STRING
        },
        carnet:{
            type: sequelize.STRING
        },
        correo:{
            type: sequelize.STRING
        }
    })
    return Estudiante;
}