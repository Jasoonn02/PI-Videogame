import axios from "axios";


export function getVideogame(){
    return async function(dispatch){
        const games = await axios.get("http://localhost:3001/videogame")
        return dispatch({
            type: "GET_VIDEOGAME",
            payload: games.data
        })

    }
}

export function getGenre(){
    return async function(dispatch){
        const genre = await axios.get("http://localhost:3001/genre")
        return dispatch({
            type: "GET_GENRE",
            payload: genre.data
        })
    }
}

export function getDetail(id){
    return async function(dispatch){
        let detail = await axios.get("http://localhost:3001/videogame/" + id)
        return dispatch({
            type: "GET_DETAIL",
            payload: detail.data
        })
    }
}

export function filterByGenre(payload){
    // console.log(payload)
    return{
        type: "FILTER_BY_GENRE",
        payload
    }
}

export function filterCreated(payload){
    return{
        type: "FILTER_CREATED",
        payload
    }
}

export function orderByName(payload){
    return{
        type: "ORDER_BY_NAME",
        payload
    }
}

export function orderRating(payload){
    return{
        type: "ORDER_BY_RATING",
        payload
    }
}

export function getNameGame(name){
    return async function(dispatch){
        let json = await axios.get("http://localhost:3001/videogame?name=" + name)
        return dispatch({
            type: "GET_NAME_GAME",
            payload: json.data
        })
    }
}

export function postVideogame(payload){
    return async function(dispatch){
        let postGame = await axios.post("http://localhost:3001/videogame", payload)
        return postGame
    }
}

export function statePag(payload){
     return{
        type: "UPDATE_PAG",
        payload
     }
}

export function cleanState(){
    return function(dispatch){
        dispatch({
            type: "CLEAN_DETAIL",
            payload: []
        })
    }
}
