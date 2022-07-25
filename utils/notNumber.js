const notNumber = (id, res) => {
    if (isNaN(Number(id))) {
        res.status(400).json({ message: "El Numero de ID debe ser un Entero Positivo" })
        return true
    } else {
        return false
    }
};
module.exports = notNumber;