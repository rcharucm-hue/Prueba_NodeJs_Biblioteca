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
}