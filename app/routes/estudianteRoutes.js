module.exports = (app) => {
    const estudianteController = require("../controllers/estudianteController");
    const router = require("express").Router();

    router.post("/", estudianteController.create);

    router.get("/", estudianteController.findAll);

    router.get("/status", estudianteController.findAllStatus);

    router.get("/:id", estudianteController.findOne);

    router.put("/:id", estudianteController.update);

    router.delete("/:id", estudianteController.delete);
    
    router.delete("/", estudianteController.deleteAll);

    app.use("/api/estudiante", router);
};