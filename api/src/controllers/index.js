const axios = require("axios")
const {Videogame, Genre} = require("../db")
require("dotenv").config();
const {API_KEY} = process.env;

// Hacemos una función que nos traiga todos los datos que queremos de la API

const getApiInfo = async() => {
    let url = `https://api.rawg.io/api/games?key=${API_KEY}`  
    let videogame = [];

    for(let i = 0; i < 5; i++){

    const apiInfo = await axios.get(url)
    let game = apiInfo.data.results;

    game.map((el)=>{
        videogame.push({
            id: el.id,
            name: el.name,
            image: el.background_image,
            released: el.released,
            rating: el.rating,
            platforms: el.platforms?.map((el)=>el.platform.name),
            genres: el.genres?.map((el)=> el.name)
        })
    })
    url= apiInfo.data.next

    }
    return videogame;
}

//Hacemos lo mismo pero trayendo todo lo de bases de datos

const getDbInfo = async() =>{
    return await Videogame.findAll({
        include:{
            model: Genre,
            attributes: ["name"],
            through:{
                attributes: []
            }
        }
    })
}

//Unimos las peticiones que hicimos de la API y las de bases de datos

const getAllVideogames = async()=>{
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    // const infoTotal = apiInfo.concat(dbInfo)
    return [...dbInfo, ...apiInfo];
}

//Hacemos otra funcion para que nos traiga la peticion por ID y nos traiga la description

const getById = async(id)=>{
    if(!isNaN(id)){
        const numero = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
        const detail = numero.data
        const gameApiDetail = {
            id: detail.id,
            name: detail.name,
            image: detail.background_image,
            released: detail.released,
            description: detail.description,
            rating: detail.rating,
            platforms: detail.platforms?.map((el)=>el.platform.name),
            genres: detail.genres?.map((el)=> el.name)
        }
        return gameApiDetail
    }
    if(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(id)){
        const detailDb = await Videogame.findByPk(id, {
            include:[ {
                model: Genre,
                attributes:["name"],
                throught:{
                    attributes:[],
                }
            }]
        })
        return detailDb
    }
}


module.exports = {
    getAllVideogames,
    getById
}