import React from "react";
import {Link} from "react-router-dom"
import notfound from "../Images/notfound.gif"
import "./PageNotFound.css"



export default function PageNotFound(){
    return(
        <div className="containerfound">
            <div className="notfound">
                <img src={notfound} alt="" className="imgfound" width="1000px" height="800px"/>
                
            </div>
                <Link to="/home">
                <button className="btnfound">Volver a Home</button>
                </Link>
        </div>
    )
}
