const express = require('express')
const router = require('./routes/index')
const path = require('path')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const expressLayouts = require('express-ejs-layouts')
const expressValidator = require('express-validator')
const db = require('./config/db')

// configuracion y modelos BD
db.sync().then(()=> console.log('db Conectada')).catch((error)=>console.log(error))
require('./models/Usuarios')

//Variables de entorno o desarrollo
require('dotenv').config({path: '.env'})

//Servidor o aplicacion principal
const app = express()

//Body parser, leer formularios
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//Habilitar cookie parser
app.use(cookieParser())

//Crear la sesion
app.use(session({
    secret:process.env.SECRETO,
    key:process.env.KEY,
    resave: false,
    saveUninitialized: false
}))

//Agregar flash message
app.use(flash())

//middleware (usuario logueado, flash message, fecha Actual)
app.use((req, res, next)=>{
    res.locals.mensajes = req.flash()
    const fecha = new Date()
    res.locals.year = fecha.getFullYear()
    next()
})

//Rutas
app.use('/', router())

//habilitamos el template engine
app.set('view engine', 'ejs')

//Ubicamos la ruta de las vistas 
app.set('views', path.join(__dirname, './views'))

//Archivos estaticos
app.use(express.static('public'))
app.use(expressLayouts)


//Puerto
app.listen(process.env.PORT)