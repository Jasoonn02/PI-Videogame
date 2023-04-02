import React from "react";
import { Link } from "react-router-dom";
import counter from "../Images/counter.jpg"
import "./Landing.css"




export default function LandingPage() {
  return (
    <div className="container">
        <img src={counter} className="image" />
      <div className="title">
        <h1>Bienvenidos a mi PI de VideoGames</h1>
        <Link to="/home">
          <button className="btn">Go!Go!Go!</button>
        </Link>
      </div>
      
    </div>
    
  );
}
