module.exports = app => {
    const product = require("../controllers/product.controller.js");
    const {authJwt}  = require("../middleware")
    let router = require("express").Router();

    // Create a new post
    router.post("/", authJwt.verifyToken, product.uploadImg, product.create);

    // Retrieve all product
    router.get("/", authJwt.verifyToken, product.findAll);

    // Retrieve published product
    // router.get("/published", product.findAllPublished);

    // Retrieve single post
    router.get("/:id", authJwt.verifyToken, product.findOne);

    // Update post
    router.put("/:id", authJwt.verifyToken, product.update);

    // Delete single post
    router.delete("/:id", authJwt.verifyToken, product.delete);

    // Delete all product
    router.delete("/", authJwt.verifyToken, product.deleteAll);

    app.use("/api/product", router);
}
