const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const Myvideogame = require("./videogame")
const Mygenre = require("./genre")


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/videogame", Myvideogame)
router.use("/genre", Mygenre)


module.exports = router;
