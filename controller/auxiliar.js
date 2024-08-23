function sino(res,ruta) {
    if(ruta==="3" ||ruta===3){
        res.render('cliente');
    }else if(ruta==="2" ||ruta===2){
        res.render('ventanaRpartidor');
    }     
}


module.exports={
    mostrarVentanas2:function (res,rol) {
        sino(res,rol);

},


}