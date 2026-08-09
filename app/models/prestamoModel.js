module.exports = (sequelize, Sequelize) =>{

    const Prestamo = sequelize.define("prestamo",{
    
        EstudianteId:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        LibroId:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        fechaPrestamo:{
            type: Sequelize.DATE
        },
        fechaDevolucion:{
            type: Sequelize.DATE
        }

    })
    return Prestamo;
}