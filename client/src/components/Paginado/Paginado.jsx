import React from "react";
import "./Paginado.css"


export default function Paginado({allVideogames, gamesPerPage, paginado}){
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(allVideogames/gamesPerPage); i++){
        pageNumbers.push(i)
    }

    return(
    <div className="paginado">
        
            {
                pageNumbers?.map((number)=>(
                    <span key={number}>
                        <button onClick={()=>paginado(number)}>{number}</button>
                    </span>
                ))
            }
        
    </div>
    )
}