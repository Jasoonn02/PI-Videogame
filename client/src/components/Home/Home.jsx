import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getVideogame,
  getGenre,
  filterByGenre,
  filterCreated,
  orderByName,
  orderRating,
  statePag,
} from "../../action";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";
import "./Home.css";
import videogame from "../Images/videogame.jpg";
import callofduty from "../Images/callofduty.gif";
import Loading from "../Loading/Loading";

export default function Home() {
  const dispatch = useDispatch();

  const allVideogames = useSelector((state) => state.videogame);
  console.log(allVideogames);
  const allGenres = useSelector((state) => state.genre);
  // console.log(allGenres);
  const [order, setOrder] = useState(" ");

  const currentPage = useSelector((state) => state.currentPage);
  // const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage, setGamePerPage] = useState(15);

  const indexOfLastVideogame = currentPage * gamesPerPage;
  const indexOfFirstVideogame = indexOfLastVideogame - gamesPerPage;
  const currentGames = allVideogames.slice(
    indexOfFirstVideogame,
    indexOfLastVideogame
  );

  const paginado = (currentPage) => {
    dispatch(statePag(currentPage));
  };

  useEffect(() => {
    dispatch(getVideogame());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getGenre());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getVideogame());
    // setCurrentPage(1)
  }

  function handleFilterGenre(e) {
    dispatch(filterByGenre(e.target.value));
    // setCurrentPage(1);
    dispatch(statePag(1));
  }

  function handleCreated(e) {
    dispatch(filterCreated(e.target.value));
  }

  function handleOrderByName(e) {
    dispatch(orderByName(e.target.value));
    // setCurrentPage(1);
    setOrder(`${e.target.value}`);
  }

  function handleRating(e) {
    dispatch(orderRating(e.target.value));
    // setCurrentPage(1);
    setOrder(`${e.target.value}`);
  }

  return (
    <div className="container2">
      <img src={callofduty} alt="" className="gif" />
      <img src={videogame} alt="" className="imgvideogame" />
      <div className="hero">
        <div className="create">
          <Link to="/creategame">
            <button>Create VideoGame</button>
          </Link>
        </div>
        <button className="btnreaload" onClick={(e) => handleClick(e)}>
          Reload Games
        </button>
        <div>
          <select className="select" onChange={(e) => handleOrderByName(e)}>
            <option>Alphabetical Order</option>
            <option value="asc">A - Z</option>
            <option value="desc">Z - A</option>
          </select>
          <select className="select" onChange={(e) => handleRating(e)}>
            <option>Ranking</option>
            <option value="Hrat">More Rating</option>
            <option value="Lrat">Less Rating</option>
          </select>
          <select className="select" onChange={(e) => handleFilterGenre(e)}>
            <option value="all">All Genres</option>
            {allGenres ? (
              allGenres.map((el) => (
                <option key={el} value={el.name}>
                  {el.name}
                </option>
              ))
            ) : (
              <option>Loading genres...</option>
            )}
          </select>
          <select className="select" onChange={(e) => handleCreated(e)}>
            <option value="all">All VideoGames</option>
            <option value="api">Existing</option>
            <option value="created">Created</option>
          </select>

          <Paginado
            gamesPerPage={gamesPerPage}
            allVideogames={allVideogames.length}
            paginado={paginado}
          />

          <SearchBar />

          {currentGames.length ? (
            currentGames?.map((el) => {
              return (
                <fragment>
                  <Link to={"/detail/" + el.id}>
                    <Card
                      image={el.image}
                      name={el.name}
                      genre={el.genres}
                      rating={el.rating}
                    />
                  </Link>
                </fragment>
              );
            })
          ) : (
            <p>
              <Loading />
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
