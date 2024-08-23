const nodemailer = require('nodemailer')
const emailConfig = require('../config/email.js')
const fs = require('fs')
const util = require('util')
const ejs = require('ejs')
const { host, port } = require('../config/email')

let transport = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    auth: {
        user: emailConfig.user,
        pass: emailConfig.pass
    }
})

exports.enviarEmail = async (opciones) => {
    console.log(opciones)

    //Leer el archivo para el email
    const archivo = __dirname + `../views/${opciones.archivo}.ejs`
    
    //compilarlo
    const compilado = ejs.compile(fs.readFileSync(archivo, 'utf-8'))

    //crear html

    //configurar opciones de email

    //enviar email
}