import React from "react";
import logo from "../assets/movie.png";
import "./Navbar.css";

export default function Navbar() {
  return (
    <div className="navbar">
      <h1>
        <a href="">
          <img className="navbar_logo" src={logo} alt="THE MOVIE" />
        </a>
        <br />
      </h1>
      <h5>THE MOVIE</h5>
      <p>항목별 영화 리스트</p>
      <div className="navbar_links">
        <a href="#popular">인기순</a>
        <a href="#top_rated">평점순</a>
        <a href="#upcoming">최신순</a>
      </div>
    </div>
  );
}
