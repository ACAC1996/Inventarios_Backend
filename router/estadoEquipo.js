const {Router} = require('express');
const { validarEstadoEquipo } = require('../helpers/validar-estadoEquipo');
const EstadoEquipo = require('../models/EstadoEquipo');

const router = Router();

router.post('/', async function(req,res){
    try{
        const validaciones= validarEstadoEquipo(req);

        if(validaciones.lenght > 0){
            return res.status(400).send(validaciones());
        }

        let estadoEquipo =new EstadoEquipo();
        estadoEquipo.nombre = req.body.nombre;
        estadoEquipo.estado = req.body.estado;
        estadoEquipo.fechaCreacion = new Date();
        estadoEquipo.fechaActualizacion = new Date();
        estadoEquipo= await estadoEquipo.save();
        res.send(estadoEquipo);
    }catch(error){
        console.log(error);
        res.send('Ocurrió un error');
    }
});

router.get('/', async function(req,res){
    try{
        const tipos = await EstadoEquipo.find();
        res.send(tipos);
    }catch(error){
        console.log(error);
        res.send('Ocurrió un error');
    }
});

router.put('/:estadoEquipoId', async function(req,res){
    try{
        const validaciones= validarEstadoEquipo(req);

        if(validaciones.lenght > 0){
            return res.status(400).send(validaciones());
        }

        let estadoEquipo = await EstadoEquipo.findById(req.params.estadoEquipoId);
        if(!estadoEquipo){
            return res.send('No existe estado');
        }
        estadoEquipo.nombre = req.body.nombre;
        estadoEquipo.estado = req.body.estado;
        estadoEquipo.fechaActualizacion = new Date();
        estadoEquipo= await estadoEquipo.save();
        res.send(estadoEquipo);
    }catch(error){
        console.log(error);
        res.send('Ocurrió un error');
    }
});

router.get('/:estadoEquipoId', async function(req, res){
    try{
        const estadoEquipo = await EstadoEquipo.findById(req.params.estadoEquipoId);
        if(!estadoEquipo){
            return res.status(404).send('Inventario no existe');
        }
        res.send(estadoEquipo);
    }catch(error){
        console.log(error);
        res.status(500).send('Ocurrió un error al consultar usuarios');
    }
});
module.exports = router;