var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    nombre: 'eduardo',
    animales: ['perro', 'loro', 'pato', '', 'gato'],
    // animales: [],
    productos: 10,
    activo: false,
    personas: [
      {nombre: 'Eduardo', apellidos: 'Gonzales', direccion: 'Calle toledo', edad: 38},
      {nombre: 'Laura', apellidos: 'Lopez', direccion: 'Calle hamburgo', edad: 21},
      {nombre: 'Luis', apellidos: 'Garcia', direccion: 'Calle ballesta', edad: 51},
      {nombre: 'Alberto', apellidos: 'Martin', direccion: 'Calle mayor', edad: 65},
      {nombre: 'Alicia', apellidos: 'Rodrigues', direccion: 'Calle lyon', edad: 49}],
    // personas: [],
   });
});

//localhost:3001/about
router.get('/about', (req, res) => {
  res.render('about');

});

module.exports = router;
