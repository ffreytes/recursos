/* Aquí va el modelo de datos... consultas a bases de datos*/
const pool = require("../data/config");

const getEmpleadosWith = (string) => {
    const query = `SELECT * FROM empleados WHERE title LIKE '%${string}%'`;
    try {
      return pool.query(query);
    } catch (error) {
      error.message = error.code;
      return error;
    }
  };

const getAllEmpleados = async() => {
    const query = "SELECT * FROM empleados";
    try {
        return await pool.query(query)
    } catch (error) {
        error.message = error.code
        return error
    }
};

const getEmpleadosById = async(id) => {
    const query = `SELECT * FROM empleados WHERE id = ${id} LIMIT 1`
    try {
        return await pool.query(query)
    } catch (error) {
        error.message = error.code
        return error
    }
}

const registerEmpleados = async(empleado) => {
    const query = `INSERT INTO empleados SET ?`
    try {
        return await pool.query(query, empleado);
    } catch (error) {
        error.message = error.code;
        return error;
    }
}

/*const loginEmpleados = async(error) => {
    const query = `SELECT * FROM users WHERE email = '${error}'`
    try {
        return await pool.query(query)
    } catch (error) {
        error.message = error.code
        return error
    }
}*/

const editEmpleadosById = async(id, empleado) => {
    const query = `UPDATE empleados SET ? WHERE id = ${id}`;
    try {
        return await pool.query(query, empleado)
    } catch (error) {
        error.message = error.code
        return error
    }

};

const deleteEmpleadosById = async(id) => {
    const query = `DELETE FROM empleados WHERE id = ${id}`
    try {
        return await pool.query(query)
    } catch (error) {
        error.message = error.code
        return error
    }
}
module.exports = { getAllEmpleados, getEmpleadosById, registerEmpleados, deleteEmpleadosById, editEmpleadosById, getEmpleadosWith }