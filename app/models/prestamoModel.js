module.exports = (sequelize, Sequelize) =>{

    const Prestamo = sequelize.define("prestamo",{
    
        EstudianteId:{
            type: sequelize.INTEGER,
            allowNull: false
        },
        LibroId:{
            type: sequelize.INTEGER,
            allowNull: false
        },
        fechaPrestamo:{
            type: sequelize.DATE
        },
        fechaDevolucion:{
            type: sequelize.DATE
        }

    })
    return Prestamo;
}