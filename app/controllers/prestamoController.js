const db = require("../models");
const Prestamo = db.prestamo;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  try {
    const { libroId, estudianteId, fechaPrestamo } = req.body;

    // validación de entrada
    if (!libroId || !estudianteId) {
      return res.status(400).json({
        mensaje: "libroId y estudianteId son obligatorios"
      });
    }
  
    // Verificar si el libro existe
    const libro = await db.libro.findByPk(libroId);
    if (!libro) {
      return res.status(404).json({
        mensaje: "Libro no encontrado"
      });
    }

    // Verificar si el estudiante existe
    const estudiante = await db.estudiante.findByPk(estudianteId);
    if (!estudiante) {
      return res.status(404).json({
        mensaje: "Estudiante no encontrado"
      });
    }   

    //validacion para no prestar un libro que no esta disponible o ya fue preastado 
    if (!libro.disponible) {
      return res.status(400).json({
        mensaje: "El libro no está disponible"
      });
    }

    // Crear el préstamo
    const prestamo = await Prestamo.create({
      libroId,
      estudianteId,
      fechaPrestamo: fechaPrestamo || new Date(),
      fechaDevolucion: null
    });

    // Actualizar la disponibilidad del libro       
    libro.disponible = false;
    await libro.save();

    res.status(201).json(prestamo);
  } catch (error) {
    console.error(error);
    res.status(500).json({
        mensaje: "Error al crear el préstamo"
    });
  } 

  //Actualizar un prestamo 
  exports.update = async (req, res) => {
    try {
      const { id } = req.params;
      const { fechaDevolucion } = req.body;

      //busca si el prestamo existe
        const prestamo = await Prestamo.findByPk(id);
        if (!prestamo) {
            return res.status(404).json({
                mensaje: "Prestamo no encontrado"
            });
        }

        //validar que envien la fecha de devolucion
        if (!fechaDevolucion) {
            return res.status(400).json({
                mensaje: "La fecha de devolucion es obligatoria"
            });
        }
        // hay que actualizar el prestamo
        prestamo.fechaDevolucion = fechaDevolucion || prestamo.fechaDevolucion;
        await prestamo.save();

        //hay que actualizar la disponibilidad del libro
        const libro = await db.libro.findByPk(prestamo.libroId);
        libro.disponible = true;
        await libro.save();

        res.status(200).json(prestamo);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al actualizar el prestamo"
        });
    }
};

    //find all prestamos
    exports.findAll = (req, res) => {
        Prestamo.findAll({
            include: [
                {model: db.libro, as: "libro"},
                {model: db.estudiante, as: "estudiante"}
            ]
        })
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({
                    mensaje: "Error al obtener los préstamos"
                });
            });
    };

    //find one prestamo id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Prestamo.findByPk(id, {
        include: [
            {model: db.Libro, as: "libro"},
            {model: db.Estudiante, as: "estudiante"}
        ]
    })
        .then(data => {
            if (data) {
                res.status(200).json(data);
            } else {
                res.status(404).json({
                    mensaje: `Préstamo con id=${id} no encontrado.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                mensaje: "Error al recuperar el préstamo.",
                error: err.message
            });
        });
};

    //Eliminar un prestamo por id
    exports.delete = (req, res) => {
        const id = req.params.id;

        Prestamo.destroy({
            where: { id }
        })
            .then(() => {
                res.status(200).json({
                    mensaje: "Préstamo eliminado exitosamente."
                });
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({
                    mensaje: "Error al eliminar el préstamo."
                });
            });
    };
}