module.exports = (app) => {
    const libroController = require("../controllers/libroController");
    const router = require("express").Router();

    router.post("/", libroController.create);

    router.get("/", libroController.findAll);

    router.get("/status", libroController.findAllStatus);

    router.get("/:id", libroController.findOne);

    router.put("/:id", libroController.update);

    router.delete("/:id", libroController.delete);
    
    router.delete("/", libroController.deleteAll);

    app.use("/api/libro", router);
};