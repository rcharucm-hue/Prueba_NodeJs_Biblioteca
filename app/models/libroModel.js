module.exports = (sequelize, Sequelize) => {

    const Libro = sequelize.define("libro",{
        titulo:{
            type: Sequelize.STRING},
        autor:{
            type: Sequelize.STRING
        },
        publicacion:{
            type: Sequelize.INTEGER
        },
        genero:{
            type: Sequelize.STRING
        },
        disponible:{
            type: Sequelize.BOOLEAN
        }
    });
    return Libro;
};
