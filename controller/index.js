var conexion = require('../config/index')
var consulta = require('../model/index')
var email= require('../controller/enviargmail')
var aux=require('../controller/auxiliar')

var gcodigo;

module.exports={

    RegistrarCliente:function(req,res){
       // console.log("datos"+req.body)
      // const {nom,apell,correo,pass} = req.body;

       req.session.datos=req.body;
   
       res.render('usuario')

    },


    insertregistrer:function (req,res) {

        console.log('datos para ingresar'+req.session.datos.nom)
        var nom=req.session.datos.nom;
        var apell=req.session.datos.apell;
        var correo=req.session.datos.correo;
        var pass=req.session.datos.pass;
        var username = req.body.usuario
        console.log(username)



        consulta.RegistrarCliente(conexion,{nom,apell,username,correo,pass})
        .then(datos => {
            console.log('datos insertados con exito',datos)
            res.redirect('/inicioC')
        })
        .catch(error => {
            console.error('error al insertar', error)
            res.status(500).send('Error al insertar')
        })
      
    },



    IniciarSesion:function(req, res){

        async  function para() {
            var username=req.body.username; 
            var password=req.body.password;
            // buscando usuario en la bd
            try {
                var  respuestabd = await consulta.buscarusuario(conexion,username,password)
                console.log("tu respuesta de la bd es  ; " + respuestabd)
                res.render('cliente');

                
    
    
             /*   const payload = {
                    rol:respuestabd.id_rol,
                    nombre:respuestabd.usuario,
                    email:respuestabd.correo,
                }
    
    
                const payload2 = {
                    rol:respuestabd.id_rol,
                    nombre:respuestabd.usuario,
                    email:respuestabd.correo,
                    refresh:'true'
                }
    
                console.log(payload)
               
                const token = Gtoken.generarToken(payload);
                res.cookie('authToken', token, { httpOnly: true,secure: true });
               // res.cookie('correo', respuestabd.correo,);
               // console.log("cokkie de correo almacenado con exito")
                const refreshToken = Gtoken.refreshToken(payload2);
                res.cookie('refreshToken', refreshToken, { httpOnly: true,secure: true });
                res.cookie('correo', respuestabd.correo, { httpOnly: true,secure: true });*/
    
              
                //aux.craertokens(res,respuestabd)
            } catch (error) {
                console.error('Error al buscar usuario:', error.message);
                res.render('inicio',{err:"usuario o contraseña no valido por ⬇ favor  crea una cuenta "});
            }
            
            }
    
            para()
        },

       /* req.session.correo;
        const {user, pass} = req.body;

        consulta.IniciarSesion(conexion, {user, pass})
        .then(datos => {
            console.log('sesion iniciada con exito', datos)
             res.redirect('/inicioC')
        })
        .catch(error => {
            console.error('error al iniciar sesion', error)
            res.status(500).send('Error al iniciar sesion')
        })

    },*/

    RecuperarCuenta:function(req, res){
        const {correo} = req.body;

                req.session.correo=correo;


        consulta.RecuperarCuenta(conexion, {correo})
        .then(datos => {
            console.log('cuenta encontrada', datos)

            
             async function enviar () {
            
            
                try {
                  
                    const codigo = await email.generarcodigo()
                    console.log('tu codigo es : ' + codigo)
                    gcodigo = codigo;
                   // req.session.codigo[req.body.email] = codigo
                   
                   // console.log(req.session.codigo[req.body.email])
                   // console.log( "::::" + Object.keys(Verificacioncodes)+":::"+Object.values(Verificacioncodes) )
                  // res.render('login/codigo',{correo: req.session.correo})
                  res.redirect('/verificar_codigo')
                    const respuesta = await email.enviaremail(req.body.correo,codigo)
                   
                    console.log('Correo enviado correctamente : '+ respuesta);
                } catch (error) {
                    console.error('Error al enviar el correo : ', error);
                    res.status(500).send('Error al enviar el correo');
                    
                }
            }
    
         
              enviar();



        })
        .catch(error => {
            console.error('error al encontrar la cuenta', error)
            res.status(500).send('error al encontrar la cuenta')
        })


        



    },
    vcodigo:function(req,res){
        console.log(req.body)
        console.log("codigo generado :"+gcodigo)

        if (req.body.codigo==gcodigo) {
             res.redirect('/nueva_pass');
        } else {
            
             res.send("El codigo es incorrecto");
            
        }

        
        
    },
    Nuevacontra:function(req, res){
        const pass = req.body.pass;
        console.log("tu correo que pedi es ;" + req.session.correo)

        consulta.Nuevacontra(conexion,pass,req.session.correo)
        .then(datos => {
            console.log('contraseña actualizada', datos)
            res.send("contraseña actualiada con exito");

           //  res.redirect('/')
        })
        .catch(error => {
            console.error('error al actualizar la contraseña', error)
            res.status(500).send('error al actualizar la contraseña')
        })

    },
    findByEmail: async function (email) {
        try {
          return await consulta.FindByEmail(conexion,email);
        } catch (error) {
            console.error('correo no encontrado');
        }
    },
   
   
}//fin de modules exports no idont delet