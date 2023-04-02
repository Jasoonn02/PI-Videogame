

const initialState = {
  videogame: [],
  allVideogames: [],
  genre: [],
  detail: [],
  currentPage: 1
  
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_VIDEOGAME":
      return {
        ...state,
        videogame: action.payload,
        allVideogames: action.payload
      }
      case "GET_GENRE":
        return {
          ...state,
          genre: action.payload
        }
        case "GET_NAME_GAME":
            return{
              ...state,
              videogame: action.payload
            }
        case "GET_DETAIL":
          return{
            ...state,
            detail: action.payload
          }
          case "FILTER_BY_GENRE":
        const games = state.allVideogames;
        let filterGenre;

        if(action.payload === "all"){
          filterGenre = games
        } else {
          filterGenre = games.filter((el)=>{
            if(el.genres.some((p) => p.name === action.payload)){
              return el.genres.map((el)=> el.genres === action.payload)
            }else {
              return el.genres.includes(action.payload)
            }
          })
        }

        return {
          ...state,
          videogame: filterGenre
        }
        case "FILTER_CREATED":
          const allGames = state.allVideogames
          const createdFilter = action.payload === "created" ? allGames.filter(el => el.createInDb) : 
          allGames.filter(el => !el.createInDb)
          
          return{
            ...state,
            videogame: action.payload === "all" ? allGames : createdFilter
          }
    case "ORDER_BY_NAME":
        const order = action.payload === "asc" ?
        state.allVideogames.sort((a,b)=>{
          return a.name.localeCompare(b.name)
        }) :
        state.allVideogames.sort((a,b)=>{
          return b.name.localeCompare(a.name)
        })

        return{
          ...state,
          videogame: order
        }
    case "ORDER_BY_RATING":
        let orderRating
        
       if(action.payload === "Hrat"){
        orderRating = state.videogame.sort((a,b)=>{
          if(a.rating > b.rating){
            return -1
          }
          if(a.rating < b.rating){
            return 1
          }
          return 0
        })
      }
        if(action.payload === "Lrat"){
          orderRating = state.videogame.sort((a,b)=>{
            if(b.rating > a.rating){
              return -1
            }
            if(b.rating < a.rating){
              return 1
            }
            return 0
          })
        }
       

        return{
          ...state,
          videogame: orderRating
        }
    case "POST_VIDEOGAME":
        return{
          ...state
        }
    case "UPDATE_PAG":
        return{
          ...state,
          currentPage: action.payload
        }

    case "CLEAN_DETAIL":
      return{
        ...state,
        detail: action.payload
      }
      
    
    default:
      return state;
  }
}

export default rootReducer;
