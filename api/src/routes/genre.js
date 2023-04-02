require("dotenv").config();
const {API_KEY} = process.env
const {Router} = require("express")
const axios = require("axios")
const {Genre} = require("../db")

// Hacemos una petición a la ruta de nuestra API, para traernos todos los géneros y guardarlos en nuestra base de datos
const router = Router();

router.get("/", async(req,res)=>{
    const genreApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    const genres = genreApi.data.results;

    let genreName = []

    for(let i = 0; i < genres.length; i++) genreName.push(genres[i].name)

    genreName.forEach(el =>{
        Genre.findOrCreate({
            where: {name: el}
        })
    })

    const allGenres = await Genre.findAll();
    res.status(200).send(allGenres)

})

module.exports = router;