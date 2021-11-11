module.exports = app => {
    const controller = require('../controllers/auth.controller')
    let router = require("express").Router();
    router.post('/',controller.signup )
    router.post('/signin',controller.signin )

    app.use('/api/jwt', router)
}