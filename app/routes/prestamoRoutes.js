module.exports = (app) => {
    const prestamoController = require("../controllers/prestamoController");
    const router = require("express").Router();

    router.post("/", prestamoController.create);

    router.get("/", prestamoController.findAll);

    router.get("/:id", prestamoController.findOne);

    router.put("/:id", prestamoController.update);
    
    router.delete("/:id", prestamoController.delete);

    app.use("/api/prestamo", router);
};