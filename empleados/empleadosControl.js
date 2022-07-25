const { getEmpleadosWith, getAllEmpleados, getEmpleadosById, deleteEmpleadosById } = require("./empleadosModel");
const notNumber = require("../utils/notNumber");
const { getConnection } = require("../data/config");
//const { hashPassword, checkPassword } = require("../utils/handlePassword")

//get all users (Muestra toos los Empleados)
const listAll = async (req, res, next) => {
    let dbResponse = null;
    if (req.query.nombre) {
      dbResponse = await getEmpleadosWith(req.query.nombre);
    } else {
      dbResponse = await getAllEmpleados();
    }
    if (dbResponse instanceof Error) return next(dbResponse);
    dbResponse.length ? res.status(200).json(dbResponse) : next();
  }

  const listOne = async function(req, res, next) {
    if (notNumber(req.params.id, res)) return;
    const dbResponse = await getEmpleadosById(Number(req.params.id))
    if (dbResponse instanceof Error) return next(dbResponse);
    dbResponse.length ? res.status(200).json(dbResponse) : next()
}
//(Eliminar un Empleado Por Id)
const removeOne = async(req, res, next) => {
  if (notNumber(req.params.id, res)) return;
  const dbResponse = await deleteEmpleadosById(+req.params.id)
  console.log(dbResponse)
  if (dbResponse instanceof Error) return next(dbResponse);
  dbResponse.affectedRows ? res.status(204).end() : next()
}

// Agrega un Empleado
const register = async(req, res, next) => {
  const nombreempleado = await hashPassword(req.body.nombreempleado)
  //const dbResponse = await registerUser({...req.body, password }) //ES6 password: password
  dbResponse instanceof Error ? next(dbResponse) : res.status(201).json(`Empleados  ${req.body.nombreempleado} created!`)
}

 

module.exports = {listAll, listOne, removeOne, register }