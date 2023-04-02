const {Router} = require("express")
const {Videogame, Genre} = require("../db")
const {getAllVideogames, getById} = require("../controllers")


const router = Router();

//Hacemos una ruta para buscar los juegos por nombre

router.get("/", async(req,res)=>{
    const {name} = req.query;
    let videogamesTotal = await getAllVideogames()
    if(name){
        let gameName = await videogamesTotal.filter((el) => el.name.toLowerCase().includes(name.toLowerCase()));
        gameName.length ? 
        res.status(200).send(gameName) :
        res.status(404).send("The game was not found")
    } else{
        res.status(200).send(videogamesTotal)
    }
})

//Buscamos una juego por ID

router.get("/:id", async(req,res)=>{
    const {id} = req.params

    if(id){
        
        const gameId = await getById(id) 
        res.status(200).send(gameId)
    } else{
        res.status(404).send("The game ID was not found")
    }
})

//Creamos la ruta para crear nuestro juego

router.post("/", async(req,res)=>{
    const {name, image, released, description, rating, platforms, genres} = req.body
    const videogameCreate = await Videogame.create({
        name,
        image,
        released,
        rating,
        description,
     
        platforms,
    })
    
    const genreDb = await Genre.findAll({
    where: {name: genres}
})

    await videogameCreate.addGenre(genreDb)
    res.send(videogameCreate)
})


module.exports = router;

