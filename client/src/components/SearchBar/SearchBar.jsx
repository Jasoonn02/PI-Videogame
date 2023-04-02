import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameGame, statePag } from "../../action";
import "./SearchBar.css"

export default function SearchBar(){

    const dispatch = useDispatch()
    const [name, setName] = useState("");


    function handleInput(e){
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
  
             dispatch(getNameGame(name))
             setName("")
             dispatch(statePag(1))
      
       
        
        
    }

    return(
        <div className="search">
            <input
            className="input"
            type="text"
            placeholder="Search..."
            onChange={e=> handleInput(e)}
            />
            
            <button type="submit" onClick={e => handleSubmit(e)}>Search</button>
        </div>
    )
}