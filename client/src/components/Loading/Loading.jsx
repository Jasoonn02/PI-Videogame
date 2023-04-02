import React from "react";
import loading from "../Images/mario.gif";
import "./Loading.css"


export default function Loading(){
    return(
        <div className="containerloading">
            <div className="containerdiv">
            <img src={loading} className="imgloading" alt="" width="900px" height="600px" />
            <h1 className="heroloading">Loading...</h1>
            </div>
        </div>
    )
}