exports.home = (req, res)=>{
    res.render('layout', {
        body: 'inicio.ejs',
        nombrePagina: 'Inicio'
    })
}