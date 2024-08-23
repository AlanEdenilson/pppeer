var express = require('express');
var router = express.Router();
var controlador = require('../controller/index')
var validator=require('../controller/validaciones')

/* GET home page. */
router.get('/',function(req, res) {
  res.render('inicio');
});
router.post('/',validator.Piniciar,controlador.IniciarSesion)

router.get('/registrar',function(req, res) {
  res.render('crear');
});
router.post('/registrar',validator.Pregistrarse,controlador.RegistrarCliente)

router.get('/recuperar_cuenta', function(req, res){
  res.render('recuperacion')
});
router.post('/recuperar_cuenta',validator.Precuperar,controlador.RecuperarCuenta)//validar correo

router.post('/rrrr1',controlador.insertregistrer)

router.get('/verificar_codigo', function(req, res){ //introdusircodgio
  res.render('codigo')
});
router.post('/vcodigo',controlador.vcodigo)//validar codigo

router.get('/nueva_pass', function(req, res){
  res.render('updata_contra')
});
router.post('/nueva_pass',validator.PnuevaPass,controlador.Nuevacontra)

router.get('/inicioC', function(req, res){
  res.render('cliente')
});

module.exports = router;//no borrar 
