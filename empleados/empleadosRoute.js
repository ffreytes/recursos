const Connection = require("mysql/lib/Connection");
const  {listAll, listOne, removeOne, register }  = require("./empleadosControl");

const router = require("express").Router()

//MUESTRA TODOS LOS EMPLEADOS
router.get("/", listAll);

//MUESTRA LOS EMPLEADOS POR ID
router.get("/:id", listOne);

//ELIMINAR UN USUARIO POR EL ID
router.delete("/:id", removeOne)

//AGREGAR UN NUEVO EMPLEADO
router.post('/',(req, res, next)=>{
    let data = [req.body.numerolegajo, req.body.nombreempleado, req.body.apellidoempleado, req.body.dni, req.body.fechanacimiento, req.body.fechadeingreso, req.body.domicilioemplado];
    Connection.query('INSET INTO empleados (numerolegajo, nombreempleado, apellidoempleado, dni, fechanacimiento, fechaingreso, domicilioempleado ) VALUES (?, ?, ?)', data, (err, results, fields)=>{
        !err ? res.json(results) : res.json(err);
    })
    res.send('Nueva Persona');
})

module.exports = router