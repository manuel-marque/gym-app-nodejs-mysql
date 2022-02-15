const getAll = () => {
    return db.query('select * from clientes');
}

const getByPage = (page, limit) => {
    return db.query('select * from clientes order by fecha_inscripcion desc limit ? offset ?', 
    [limit, (page - 1) * limit]
    );
}


const getById = (clienteId) => {
    return db.query(
        'select * from clientes where id = ?', [clienteId]
    );
}

const create = ({nombre, apellidos, direccion, edad, email, cuota, fecha_nacimiento, dni, genero}) => {
    return db.query(
        'insert into clientes (nombre, apellidos, direccion, edad, email, cuota, fecha_nacimiento, dni, genero) values (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [nombre, apellidos, direccion, edad, email, cuota, fecha_nacimiento, dni, genero]
    );
}

const update = (clienteId, {nombre, apellidos, direccion, edad, email, cuota, fecha_nacimiento, dni, genero}) => {
    return db.query(
        'update clientes set nombre = ?, apellidos = ?, direccion = ?, edad = ?, email = ?, cuota = ?, fecha_nacimiento = ?, dni = ?, genero = ? where id = ?',
        [nombre, apellidos, direccion, edad, email, cuota, fecha_nacimiento, dni, genero, clienteId]
    );
}

const deleteById = (clienteId) => {
    return db.query(
        'delete from clientes where id = ?',
        [clienteId]
    );
}

module.exports = {
    getAll, getByPage, create, getById, update, deleteById
}