
const { getAllUsers, getUserById, registerUser, loginUser, deleteUserById, editUserById } = require("./usersModel")
const notNumber = require("../utils/notNumber")
const { hashPassword, checkPassword } = require("../utils/handlePassword")

//(Muestra toos los Usuarios)
const listAll = async(req, res, next) => {
    const dbResponse = await getAllUsers()
    dbResponse instanceof Error ? next(dbResponse) : res.status(200).json(dbResponse)
}

/*-------------------*/
//(muestra Usuarios por ID)
const listOne = async function(req, res, next) {
        if (notNumber(req.params.id, res)) return;
        const dbResponse = await getUserById(Number(req.params.id))
        if (dbResponse instanceof Error) return next(dbResponse);
        dbResponse.length ? res.status(200).json(dbResponse) : next()
    }
    //patch existing user (Modificar Un Usuario )
const editOne = async(req, res, next) => {
    if (notNumber(req.params.id, res)) return;
    const dbResponse = await editUserById(+req.params.id, req.body)
    if (dbResponse instanceof Error) return next(dbResponse);
    dbResponse.affectedRows ? res.status(200).json(req.body) : next()
}

//(Agregar Un Nuevo Usuario)
const register = async(req, res, next) => {
    const password = await hashPassword(req.body.password)
    const dbResponse = await registerUser({...req.body, password }) //ES6 password: password
    dbResponse instanceof Error ? next(dbResponse) : res.status(201).json(`User ${req.body.name} created!`)
}

//(El Login de Usuario)
const login = async(req, res, next) => {
    const dbResponse = await loginUser(req.body.email)
    if (!dbResponse.length) return next();
    if (await checkPassword(req.body.password, dbResponse[0].password)) {
        res.status(200).json({ message: "Ok" })
    } else {
        let error = new Error
        error.status = 401
        error.message = "Unauthorized"
        next(error)
    }
}

//(Eliminar un Usuario Por Id)
const removeOne = async(req, res, next) => {
    if (notNumber(req.params.id, res)) return;
    const dbResponse = await deleteUserById(+req.params.id)
    console.log(dbResponse)
    if (dbResponse instanceof Error) return next(dbResponse);
    dbResponse.affectedRows ? res.status(204).end() : next()
}

module.exports = { listAll, listOne, register, login, removeOne, editOne }