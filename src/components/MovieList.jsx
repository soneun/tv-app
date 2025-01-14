import React, { useEffect, useState } from "react";
import popcorn from "../assets/popcorn.png";
import "./MovieList.css";
import MovieCard from "./MovieCard";

export default function MovieList() {
  const [movies, setMovies] = useState([]);

  const fetchMoveis = () => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=396a3dc80a27dc4e3614be3d35bc3898&language=ko"
    )
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchMoveis();
  }, []);

  return (
    <section className="movie_list">
      <header className="align_center movie_list_header">
        <h2 className="align_center movie_list_heading">
          인기순{" "}
          <img src={popcorn} alt="popcorn logo" className="list_logo"></img>
        </h2>

        <div className="align_center movie_list_fs">
          <ul className="align_center movie_filter">
            <li className="movie_filter_item_active">8+ 💕</li>
            <li className="movie_filter_item">7+ 💕</li>
            <li className="movie_filter_item">6+ 💕</li>
          </ul>

          <select name="" id="" className="movie_sorting">
            <option value="">SortBy</option>
            <option value="">Date</option>
            <option value="">Rating</option>
          </select>
          <select name="" id="" className="movie_sorting">
            <option value="">Ascending</option>
            <option value="">Descending</option>
          </select>
        </div>
      </header>

      <div className="movie_cards">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
