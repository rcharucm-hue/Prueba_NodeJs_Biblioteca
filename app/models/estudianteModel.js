module.exports = (sequelize, Sequelize) => {

    const Estudiante = sequelize.define("estudiante",{

        nombre:{
            type: Sequelize.STRING
        },
        carnet:{
            type: Sequelize.STRING
        },
        correo:{
            type: Sequelize.STRING
        }
    })
    return Estudiante;
}