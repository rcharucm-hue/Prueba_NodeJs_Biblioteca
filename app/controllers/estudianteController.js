const db = require("../models");
const Estudiante = db.estudiante;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.nombre) {
        res.status(400).send({
            message: "El contenido no puede estar vacio!"
        });
        return;
    }

    
    const estudiante = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        correo: req.body.correo,
        telefono: req.body.telefono
    };

    Estudiante.create(estudiante)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "no se pudo crear el estudiante."
            });
        });

        //Muestra toda la lista de estudiantes
    exports.findAll = (req, res) => {
        const nombre = req.query.nombre;
        var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

        Estudiante.findAll({ where: condition })
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Ocurrio un error al recuperar los estudiantes."
                });
            });
    }
    
    //Muestra un estudiante por id
    exports.findOne = (req, res) => {
        const id = req.params.id;

        Estudiante.findByPk(id)
            .then(data => {
                if (data) {
                    res.send(data);
                } else {
                    res.status(404).send({
                        message: "Estudiante no encontrado."
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error al recuperar el estudiante."
                });
            });
    };

    // actualiza un estudiante por id
    exports.update = (req, res) => {
        const id = req.params.id;

        Estudiante.update(req.body, {
            where: { id: id }
        })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: "Estudiante actualizado correctamente."
                    });
                } else {
                    res.send({
                        message: `No se puede actualizar el estudiante con id=${id}. Tal vez no se encontró el estudiante o el cuerpo de la solicitud está vacío!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error al actualizar el estudiante."
                });
            });
    };

    //Elimar un estudiante por id
    exports.delete = (req, res) => {
        const id = req.params.id;
        estudiante.destroy({
            where: { id: id }
        })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: "Estudiante eliminado correctamente!"
                    });
                } else {
                    res.send({
                        message: `No se puede eliminar el estudiante con id=${id} porque no se encontró el estudiante!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error al eliminar el estudiante."
                });
            });
    };

    //Eliminar todos los estudiantes
    exports.deleteAll = (req, res) => {
        estudiante.destroy({
            where: {},
            truncate: false
        })
            .then(nums => {
                res.send({ message: `${nums} Estudiantes eliminados correctamente!` });
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Ocurrio un error al eliminar todos los estudiantes."
                });
            }); 
};

// find all active Client, basado en el atributo status vamos a buscar que solo los clientes activos
    exports.findStatus = (req, res) => {
        estudiante.findAll({ where: { status: true } })
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Ocurrio un error al eliminar todos los estudiantes."
                });
            });
};
}
