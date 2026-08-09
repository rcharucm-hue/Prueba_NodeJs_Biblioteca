const db = require("../models");
const Libro = db.libro;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.titulo) {
        res.status(400).send({
            message: "El titulo no puede estar vacio!"
        });
        return;
    }

    
    const libro = {
        titulo: req.body.titulo,
        autor: req.body.autor,
        publicacion: req.body.publicacion,
        genero: req.body.genero,
        disponible: req.body.disponible
    };

    Libro.create(libro)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "no se pudo crear el libro."
            });
        });

        //Muestra toda la lista de libros
    exports.findAll = (req, res) => {
        const titulo = req.query.titulo;
        var condition = titulo ? { titulo: { [Op.iLike]: `%${titulo}%` } } : null;

        Libro.findAll({ where: condition })
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Ocurrio un error al recuperar los libros."
                });
            });
    }
    
    //Muestra un libro por id
    exports.findOne = (req, res) => {
        const id = req.params.id;

        Libro.findByPk(id)
            .then(data => {
                if (data) {
                    res.send(data);
                } else {
                    res.status(404).send({
                        message: "Libro no encontrado."
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error al recuperar el libro."
                });
            });
    };

    // actualiza un libro por id
    exports.update = (req, res) => {
        const id = req.params.id;

        Libro.update(req.body, {
            where: { id: id }
        })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: "Libro actualizado correctamente."
                    });
                } else {
                    res.send({
                        message: `No se puede actualizar el libro con id=${id}. Tal vez no se encontró el libro o el cuerpo de la solicitud está vacío!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error al actualizar el libro."
                });
            });
    };

    //Elimar un libro por id
    exports.delete = (req, res) => {
        const id = req.params.id;
        Libro.destroy({
            where: { id: id }
        })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: "Libro eliminado correctamente!"
                    });
                } else {
                    res.send({
                        message: `No se puede eliminar el libro con id=${id} porque no se encontró el libro!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error al eliminar el libro."
                });
            });
    };

    //Eliminar todos los libros
    exports.deleteAll = (req, res) => {
        Libro.destroy({
            where: {},
            truncate: false
        })
            .then(nums => {
                res.send({ message: `${nums} Libros eliminados correctamente!` });
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Ocurrio un error al eliminar todos los libros."
                });
            }); 
};

// find all active Client, basado en el atributo status vamos a buscar que solo los clientes activos
    exports.findStatus = (req, res) => {
        Libro.findAll({ where: { status: true } })
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Ocurrio un error al eliminar todos los libros."
                });
            });
};
}
