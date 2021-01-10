const { db } = require("../cnn")

const getCajeroLog = async (req, res) => {

    //const {cedula,clave} = req.query
    const cedula = req.params.cedula
    const clave = req.params.clave
    const rol = req.params.rol
    const response = await db.any("select * from usuario where usuario_id=$1 and usuario_rol_id=$2 and usuario_clave=$3;", [cedula, rol, clave])

    if (response.length > 0) {
        const user = await db.any("select per.*, rol.*, us.* from usuario us inner join persona per on us.usuario_id = per.persona_id inner join rol rol on us.usuario_rol_id = rol.rol_id where us.usuario_id =$1 and us.usuario_rol_id=$2;", [cedula, rol])
        res.json(user)
    } else {
        res.json({
            message: 'Credenciales erroneas',
        })
    }
}

const getPersona = async (req, res) => {
    const cedula = req.params.cedula
    const user = await db.any("select * from persona where persona_id=$1;", [cedula])
    res.json(user)
}

const getRolesPersona = async (req, res) => {
    const cedula = req.params.cedula
    const persona = await db.any("select * from usuario where usuario_id=$1;", [cedula])
    res.json(persona)
}


const postUsuarioPersona = async (req, res) => {

    const { rol_id, clave } = req.query
    const { cedula, persona_nombre, persona_apellido,
        persona_direccion, persona_telefono, persona_ciudad,
        persona_correo, persona_fechanacimiento } = req.query

    const persona = await db.query("insert into persona values($1, $2, $3, $4, $5, $6, $7, $8)",
        [cedula, persona_nombre, persona_apellido,
            persona_direccion, persona_telefono, persona_ciudad,
            persona_correo, persona_fechanacimiento])

    const user = await db.query("insert into usuario(usuario_id, usuario_rol_id, usuario_clave, usuario_estado) values($1, $2, $3, $4)",
        [cedula, rol_id, clave, true])

    res.json({
        message: 'Usuario creado exitosamente!',
    })
}

const postUsuario = async (req, res) => {

    const { cedula, rol_id, clave } = req.query
    const user = await db.query("insert into usuario(usuario_id, usuario_rol_id, usuario_clave, usuario_estado) values($1, $2, $3, $4)", [cedula, rol_id, clave, true])
    res.json({
        message: 'Rol asignado exitosamente!',
    })
}

const putUsuario = async (req, res) => {

    const { clave, estado, cedula, rol_id } = req.query
    const user = await db.query("update usuario set usuario_clave=$1, usuario_estado=$2 where usuario_id=$3 and usuario_rol_id=$4", [clave, estado, cedula, rol_id])
    res.json({
        message: 'Usuario modificado exitosamente!',
    })
}

const putPersona = async (req, res) => {

    const { cedula, persona_nombre, persona_apellido,
        persona_direccion, persona_telefono, persona_ciudad,
        persona_correo, persona_fechanacimiento } = req.query
    const user = await db.query("update persona set persona_nombre=$1, persona_apellido=$2, persona_direccion=$3, persona_telefono=$4, persona_ciudad=$5, persona_correo=$6, persona_fechanacimiento=$7 where persona_id=$8 ", 
       [ persona_nombre, persona_apellido,
        persona_direccion, persona_telefono, persona_ciudad,
        persona_correo, persona_fechanacimiento, cedula])
    
    res.json({
        message: 'Datos modificados exitosamente!',
    })

}


const getCajeros = async (req, res) => {
    const response = await db.any("select per.*, rol.*, us.* from usuario us inner join persona per on us.usuario_id = per.persona_id inner join rol rol on us.usuario_rol_id = rol.rol_id;")
    res.json(response)
}


module.exports = {
    getCajeros,
    getCajeroLog,
    postUsuarioPersona,
    postUsuario,
    getRolesPersona,
    getPersona,
    putUsuario,
    putPersona
}
