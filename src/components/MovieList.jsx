import React, { useEffect, useState } from "react";
import popcorn from "../assets/popcorn.png";
import "./MovieList.css";
import MovieCard from "./MovieCard";
import _ from "lodash";

export default function MovieList({ type, title, emoji }) {
  const [movies, setMovies] = useState([]);

  const [filterMovies, setFilterMovies] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState({
    by: "default",
    order: "asc",
  });
  //serchQuery 추가
  const [searchQuery, setSearchQuery] = useState("");
  //선호작 추가
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const handleAddFavorite = (movie) => {
    //이미 선호작에 존재하면 추가하지 않도록 방지
    if (!favoriteMovies.some((fav) => fav.id === movie.id)) {
      setFavoriteMovies((prev) => [...prev, movie]);
    }
  };
  //페이지가 로드될 때 로컬 저장소에서 선호작 목록 불러오기
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favoriteMovies"));
    if (storedFavorites) {
      setFavoriteMovies(storedFavorites);
    }
  }, []);
  //선호작 목록을 로컬 저장소에 저장
  useEffect(() => {
    if (favoriteMovies.length > 0) {
      localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));
    }
  }, [favoriteMovies]);

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

  //검색 기능 url 추가
  const fetchMoveis = (query = "") => {
    const url = query
      ? `https://api.themoviedb.org/3/search/movie?api_key=396a3dc80a27dc4e3614be3d35bc3898&language=ko&query=${query}`
      : `https://api.themoviedb.org/3/movie/${type}?api_key=396a3dc80a27dc4e3614be3d35bc3898&language=ko`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
        setFilterMovies(data.results);
      })
      .catch((err) => console.log(err));
  };

  //sort 값이 업데이트 될때 마다 실행
  useEffect(() => {
    if (sort.by !== "default") {
      const sortedMovies = _.orderBy(filterMovies, [sort.by], [sort.order]);
      setFilterMovies(sortedMovies);
    }
  }, [sort]);

  //type 추가(첫번재 실행)
  useEffect(() => {
    fetchMoveis();
  }, [type]);

  //검색기능 함수
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  //검색어 바뀔때 리셋
  useEffect(() => {
    if (searchQuery.trim() !== "") {
      fetchMoveis(searchQuery);
    } else {
      fetchMoveis();
    }
  }, [searchQuery]);
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
          {/* 검색창 */}
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="영화 검색..."
            className="movie_search_input"
          />
        </div>
      </header>

      <div className="movie_cards">
        {filterMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie}>
            {/* 선호작 추가 버튼 */}
            <button onClick={() => handleAddFavorite(movie)}>
              선호작 등록
            </button>
          </MovieCard>
        ))}
      </div>

      <div>
        <h3>선호작 목록</h3>
        <div className="movie_cards">
          {favoriteMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </section>
  );
}
