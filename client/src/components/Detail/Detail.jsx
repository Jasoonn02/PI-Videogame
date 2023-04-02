import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { cleanState, getDetail } from "../../action";
import "./Detail.css";


export default function Detail(props) {
  const dispatch = useDispatch();

  let regex = /(<([^>]+)>)/gi;

  const myGames = useSelector((state) => state.detail);
  
  useEffect(()=>{
    dispatch(cleanState());
    dispatch(getDetail(props.match.params.id));  
  }, [])

 if(myGames.length === 0) return <h1>Cargando</h1>

  

  return (
    <div className="contenedordetail">
 
      <div className="containercard">
    
        <div>
        <img
          src={myGames.image}
          width="300px"
          height="300px"
          className="imgcard"
        />
        <h4>Name: {myGames.name}</h4>
        <h4 className="released">Released: {myGames.released}</h4>
        <h4>
          Genres:
          {!myGames.createInDb
            ? myGames.genres + " "
            : myGames.genres.map((el) => el.name + " ")}
        </h4>
        <h4>Platforms: 🎮{myGames.platforms + " "}</h4>
        <h4>Rating: ⭐{myGames.rating}</h4>
        <div className="description">
          <h4 >
            <p>Description:</p> 
            {
              
              myGames.description?.replace(regex, "").replace("&#39;s", "")
            }
          </h4>
        </div>
        </div>
        <Link to="/home">
          <button className="btndetail">Volver</button>
        </Link>
      </div> 
      
     
    </div>
  );
}
