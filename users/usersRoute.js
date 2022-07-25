
/*En este archivo pondremos la referencia a la ruta asociada y, si las hubiera, subrutas (por ejemplo, podríamos recibir todas las peticiones de /users, pero también de /users/otracosa... etc). Luego de recibir la petición diferenciando el verbo HTTP, enviaríamos al controlador apropiado. Si hubiera middlewares, se aplicarían en este archivo, entre la petición y el controlador*/
const { listAll, listOne, register, login, removeOne, editOne } = require("./usersControl")
const router = require("express").Router()

//TRAE TODOS LOS USUARIOS
router.get("/", listAll);

//TRAE LOS USUARIOS POR ID
router.get("/:id", listOne);

//AGREGAR UN NUEVO USUARIO
router.post("/register", register)

    //LOGIN DE USUARIO
router.post("/login", login)

//PARCHE DE USUARIO
router.patch("/:id", editOne)


//ELIMINAR UN USUARIO POR EL ID
router.delete("/:id", removeOne)


module.exports = router