const express = require('express')
const router = express.Router()
const homeController = require('../controller/homeController')
const usuariosController = require('../controller/usuariosController')


module.exports = () => {
    router.get('/', homeController.home)

    router.get('/crear-cuenta', usuariosController.formCrearCuenta)
    router.post('/crear-cuenta', usuariosController.crearNuevaCuenta)

    router.get('/iniciar-sesion', usuariosController.formIniciarSesion)



    return router
}