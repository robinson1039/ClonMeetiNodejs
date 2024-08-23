const  { check, validationResult, body } = require('express-validator')
const enviarEmail = require('../handler/emails')
const Usuarios = require("../models/Usuarios")

exports.formCrearCuenta = (req, res)=>{
    res.render('layout', {
        body: 'crear-cuenta.ejs',
        nombrePagina: 'Crea tu cuenta'
    })
}

exports.crearNuevaCuenta = async (req, res) => {
    const usuario = req.body

    await check('confirmar').notEmpty().trim().withMessage('Repetir password no puede ir vacio').run(req)
    await check('confirmar').trim().equals(req.body.password).withMessage('Los password no coinciden').run(req);

    //leer los errores de xpress
    const erroresExpress = validationResult(req)

    try {
        await Usuarios.create(usuario)
        //url de confirmacion
        const url = `http://${req.headers.host}/confirmar-cuenta/${usuario.email}`

        //enviar email de confirmacion
        await enviarEmail.enviarEmail({
            usuario,
            url,
            subject: 'Confirmar tu cuenta',
            archivo: 'confirmar-cuenta'
        })

        //flash message y redireccionar
        req.flash('exito', 'Hemos enviado un email para confirmar tu identidad')
        res.redirect('/iniciar-sesion')
    } catch (error) {
        const erroresSequelize = error.errors.map(err => err.message)

        const errExpress = erroresExpress.errors.map(err => err.msg)

        //unir errores de express y sequelize
        const listaErrores = [...erroresSequelize, ...errExpress]

        req.flash('error', listaErrores)
        res.redirect('/crear-cuenta')
    }
}

exports.formIniciarSesion = async (req, res) => {
    res.render('layout', {
        body: 'iniciar-sesion.ejs',
        nombrePagina: 'Iniciar sesion'
    })
}