const router = require('express').Router();
const ClienteModel = require('../models/cliente.model');
const dayjs = require('dayjs');

//http://localhost:3000/clientes?page=2&limit=20

//Lista con todos los clientes
router.get('/', async (req, res) => {

    //Recupero los valores de la URL (page y limit)
    //sino viene definido la pagina tomara la pagina 1
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // console.log(page, limit);


    //1 - Recuperar todos los clientes de la base de datos
    const [arrClientes] = await ClienteModel.getByPage(page, limit);
    // console.log(arrClientes);

    //2 - Renderizar vista con todos los clientes
    res.render('clientes/list', {
        clientes: arrClientes,
        page: page
    });
    // res.send('prueba que funciona');

});

router.get('/new',  (req, res) => {
    res.render('clientes/form');

});

router.get('/edit/:clienteId', async (req, res) => {
    //Recupera el cliente por ID
    const [clienteUnico] = await ClienteModel.getById(req.params.clienteId);

    clienteUnico[0].fecha_nacimiento = dayjs(clienteUnico[0].fecha_nacimiento).format('YYYY-MM-DD');

    //Renderizar la vista con el cliente
    res.render('clientes/formEdit.pug', {
        cliente: clienteUnico[0]

    })

});

router.get('/delete/:clienteId', async (req, res) => {
    const [result] = await ClienteModel.deleteById(req.params.clienteId);
    res.redirect('/clientes');

});

router.get('/:clienteId', async (req, res) => {
    // 1 - Generar el metodo getById dentro del modelo de cliente para recuperar UN UNICO CLIENTE

    const [clienteUnico] = await ClienteModel.getById(req.params.clienteId);
    // console.log(clienteUnico);

    //Formateo de fecha

    clienteUnico[0].fecha_nacimiento = dayjs(clienteUnico[0].fecha_nacimiento).format('DD-MM-YYYY');

    // 2 - Renderizar la vista clientes/details.pug pasandole los datos del cliente recuperado y mostrandolos en el HTML
    res.render('clientes/detail', {
        cliente: clienteUnico[0]
    
    });

    // Dentro de la vista no tengo que iterar

});

router.post('/create', async (req, res) => {
    const [result] = await ClienteModel.create(req.body);
    console.log(result);
    //En req.body recibimos todos los datos del formulario
    console.log(req.body);
    // res.send('Funciona el POST formulario');
    res.redirect('/clientes');

});

router.post('/update', async (req, res) => {
    // console.log(req.body);
    const [result] = await ClienteModel.update(req.body.clienteId, req.body);

    res.redirect('/clientes/'+req.body.clienteId)

});

module.exports = router;