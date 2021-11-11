module.exports = app => {
    const product = require("../controllers/product.controller.js");
    const {authJwt}  = require("../middleware")
    let router = require("express").Router();

   
    router.post("/", authJwt.verifyToken, product.uploadImg, product.create);

    // Retrieve all product
    router.get("/", authJwt.verifyToken, product.findAll);

   

    
    router.get("/:id", authJwt.verifyToken, product.findOne);

    
    router.put("/:id", authJwt.verifyToken, product.update);

    
    router.delete("/:id", authJwt.verifyToken, product.delete);

    
    router.delete("/", authJwt.verifyToken, product.deleteAll);

    app.use("/api/product", router);
}
