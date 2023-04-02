import React from "react";
import "./Card.css";

export default function Card({ name, genre, image, rating }) {
  return (
    <div className="hero2">
      <div className="img">
        <img
          src={image}
          alt="videogame not found"
          width="250px"
          height="250px"
        />
      </div>
      <div className="name">
        <h3>{name}</h3>
      </div>
      <div>
        <h4>Genre:  
          {typeof genre[0] === "string"
            ? genre?.map((el) => el + " ")
            : genre.map((el) => el.name + " ")}
        </h4>
      </div>
      <div>
        <h5 className="rating">
        ⭐{rating}
        </h5>
      </div>
    </div>
  );
}
