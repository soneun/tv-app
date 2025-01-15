import React, { useEffect, useState } from "react";
import popcorn from "../assets/popcorn.png";
import "./MovieList.css";
import MovieCard from "./MovieCard";
import _ from "lodash";
import SearchBox from "./SearchBox";

export default function MovieList({ type, title, emoji }) {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filterMovies, setFilterMovies] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState({
    by: "default",
    order: "asc",
  });

  const handleSort = (e) => {
    const { name, value } = e.target;
    setSort((prev) => ({ ...prev, [name]: value }));
  };
  console.log(sort);

  const handleFilter = (rate) => {
    if (minRating === rate) {
      setMinRating(0);
      setFilterMovies(movies);
    } else {
      setMinRating(rate);

      const filtered = movies.filter((movie) => movie.vote_average >= rate);
      setFilterMovies(filtered);
    }
  };

  const fetchMoveis = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${type}?api_key=396a3dc80a27dc4e3614be3d35bc3898&language=ko`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
        setFilterMovies(data.results);
      })
      .catch((err) => console.log(err));
  };

  //검색어
  useEffect(() => {
    if (searchValue) {
      const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilterMovies(filteredMovies);
    } else {
      setFilterMovies(movies);
    }
  }, [searchValue, movies]); // Re-filter movies when searchValue changes

  //sort 값이 업데이트 될때 마다 실행
  useEffect(() => {
    if (sort.by !== "default") {
      const sortedMovies = _.orderBy(filterMovies, [sort.by], [sort.order]);
      setFilterMovies(sortedMovies);
    }
  }, [sort]);

  useEffect(() => {
    fetchMoveis();
  }, []);

  return (
    <section id={`${type}`} className="movie_list">
      <header className="align_center movie_list_header">
        <h2 className="align_center movie_list_heading">
          {title}
          <img src={emoji} alt="popcorn logo" className="list_logo"></img>
        </h2>

        <div className="align_center movie_list_fs">
          <ul className="align_center movie_filter">
            <li
              className={
                minRating === 8
                  ? "movie_filter_item_active"
                  : "movie_filter_item"
              }
              onClick={() => handleFilter(8)}
            >
              8+ 💕
            </li>
            <li
              className={
                minRating === 7
                  ? "movie_filter_item_active"
                  : "movie_filter_item"
              }
              onClick={() => handleFilter(7)}
            >
              7+ 💕
            </li>
            <li
              className={
                minRating === 6
                  ? "movie_filter_item_active"
                  : "movie_filter_item"
              }
              onClick={() => handleFilter(6)}
            >
              6+ 💕
            </li>
          </ul>

          <SearchBox
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />

          <select
            name="by"
            id=""
            onChange={handleSort}
            className="movie_sorting"
          >
            <option value="default">SortBy</option>
            <option value="release_date">Date</option>
            <option value="vote_average">Rating</option>
          </select>
          <select
            name="order"
            id=""
            onChange={handleSort}
            className="movie_sorting"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </header>

      <div className="movie_cards">
        {filterMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
