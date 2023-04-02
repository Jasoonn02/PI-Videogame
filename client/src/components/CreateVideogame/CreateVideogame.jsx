import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { getGenre, postVideogame } from "../../action";
import { Link, useHistory } from "react-router-dom";
import "./CreateVideogame.css";


export default function CreateVideogame(){
    const dispatch = useDispatch()
    const history = useHistory()
    const [errors, setErrors] = useState({})
    const genre = useSelector((state)=> state.genre)
    const allGames = useSelector((state) => state.videogame)
    // console.log(genre);

    const [input, setInput] = useState({
        name: "",
        image: "",
        released: "",
        description:"",
        rating:"",
        platforms: [],
        genres: []
    })
    function validate(input) {
        let errors = {};
      
        if (!input.name) {
          errors.name = "Name is required.";
        } else if (!/^[a-zA-Z0-9-() .]+$/.test(input.name)) {
          errors.name =
            "Only letters, numbers, hyphens and parentheses are accepted.";
        }
      
        if (
          input.image.length !== 0 &&
          !/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/.test(input.image)
        ) {
          errors.image = "Invalid URL";
        }
      
        if (!input.description) {
          errors.description = "Description is required.";
        }
      
        if (!input.released) {
          errors.released = "Release date is required.";
        }
      
        if (!input.rating) {
          errors.rating = "Rating is required.";
        } else if (input.rating > 5) {
          errors.rating = "Raiting musn't be heigher than 5.";
        } else if (input.rating < 0) {
          errors.rating = "Rating musn't be a negative number.";
        }
      
        return errors; //la funcion validate devuelve el objeto errors, ya sea vacio o con alguna propiedad si es q encuentra un errors
      }


    useEffect(()=>{
        dispatch(getGenre())
    }, [dispatch])


    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(
            validate({
              ...input,
              [e.target.name]: [e.target.value],
            })
          );
        
    }

    function handleCheck(e){
        if(e.target.checked){
            setInput({
                ...input,
                platforms: [...input.platforms, e.target.value]
            })
        }
    }

    function handleSelect(e){
        if(input.genres.includes(e.target.value)){
            alert("You can't choose the same gender")
        } else if(input.genres.length < 3){
              setInput({
            ...input,
            genres: [...input.genres, e.target.value]
        })
        e.target.value = "Select the Genre"
        }else{
            alert("No puedes elegir mas de 3 generos")
        }

       
      
    }

    function handleDelete(e){
        setInput({
            ...input,
            genres: input.genres.filter(genre=> genre != e)
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        let noRepeat = allGames.filter((game) => game.name === input.name);
    if (noRepeat.length !== 0) {
      alert(
        "There is already a game with that name, please choose another one."
      );
    } else {
      let error = Object.keys(validate(input));
      if (
        error.length !== 0 ||
        !input.genres.length ||
        !input.platforms.length
      ) {
        alert("Please, fill in the fields correctly");
        return;
      } else {
        dispatch(postVideogame(input));
        alert("The game has been created!!")
        setInput({
          name: "",
          image: "",
          released: "",
          description: "",
          rating: "",
          platforms: [],
          genres: [],
        });
      }
      history.push("/home");
    }
  }
    

    let plataforms = [
    "PC",
    "PlayStation 5",
    "PlayStation 4",
    "Xbox Series S/X",
    "Xbox One",
    "Nintendo Switch",
    "iOS",
    "MacOs",
    "Nintendo",
    "PS Vita",
    "PSP",
    "Wii",
    "Game Boy",
    "SEGA",
    ]



    return(
        <div className="containercreate">
          <div className="herocreate">
            <Link to="/home"><button>Go Back</button></Link>
            <h2>Create  your game!</h2>
            <div className="form">
            <form onSubmit={e=> handleSubmit(e)}>
                <div className="inputcreate">
                    <label>Name: </label>
                    <input 
                    type="text"
                    value={input.name}
                    name = "name"
                    onChange={e=> handleChange(e)}
                    />
                    {errors.name && <p className="errors">{errors.name}</p>}
                </div>
                <div className="inputcreate">
                    <label>Released: </label>
                    <input 
                    type="date"
                    value={input.released}
                    name= "released"
                    onChange={e=> handleChange(e)}
                     />
                     {errors.released && <p className="errors"> {errors.released}</p>}
                </div>
                <div className="inputcreate">
                  <label>Description: </label>
                  <input 
                  type="text"
                  value={input.description}
                  name="description"
                  onChange={e=>handleChange(e)}
                  />
                </div>

                <div className="inputcreate">
                    <label>Rating: </label>
                    <input 
                    type="number"
                    value={input.rating}
                    name="rating"
                    onChange={e=> handleChange(e)}
                    />
                     {errors.rating && <p className="errors">{errors.rating}</p>}
                </div>
                <div className="inputcreate">
                    <label>Image: </label>
                    <input 
                    type="text"
                    value={input.image}
                    name="image"
                    onChange={e=> handleChange(e)}
                     />
                    {errors.image && <p className="errors">{errors.image}</p>}
                </div>
                <div className="inputcreate platform">
                    <label>Select the Platforms: </label>
                    <div>
                    {
                        plataforms.map((el)=>(
                            <label>
                                <input 
                                type="checkbox"
                                value={el}
                                name={el}
                                onChange={e=> handleCheck(e)}
                                />{el}</label>
                                
                        ))
                    }
                    </div>
                </div>

                    <select onChange={(e)=> handleSelect(e)}>
                        <option>Select the Genre</option>
                        {
                            genre.map(el=>(
                                <option key={el} value={el.name}>{el.name}</option>
                            ))
                        }
                    </select>
                <div className="delete">
                    {
                        input.genres.map(el=>{
                            return(
                                <div key={el}>
                                    <p>{el}</p>
                                    <button onClick={()=> handleDelete(el)} >x</button>
                                </div>
                            )
                        })
                    }
                  </div>
                    <button className="btncreate" type="submit">Create Game</button>
                   
                    
                
            </form>
            </div>
            </div>
        </div>
    )
}