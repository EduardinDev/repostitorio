const {Router} = require("express")
const router = Router()

const {getCajeros, getCajeroLog, getPersona,
    getRolesPersona, postUsuarioPersona, postUsuario, 
    putUsuario, putPersona} = require("../controllers/cajeroController")


router.get("/cajero",getCajeros)
router.get("/cajeroLog/:cedula/:clave/:rol",getCajeroLog)
router.get("/persona/:cedula",getPersona)
router.get("/Rolespersona/:cedula",getRolesPersona)
router.post("/crearUsuarioPersona",postUsuarioPersona)
router.post("/asignarUsuario",postUsuario)
router.put("/actualizarUsuario",putUsuario)
router.put("/actualizarPersona",putPersona)

//router.post("/pizzas",createPizza)

module.exports = router