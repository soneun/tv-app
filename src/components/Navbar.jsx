import React from "react";
import logo from "../assets/movie.png";
import "./Navbar.css";

export default function Navbar() {
  return (
    <div className="navbar">
      <h1>
        <a href="">
          <img className="navbar_logo" src={logo} alt="THE MOVIE" />
        </a>{" "}
        <br />
        <h5>THE MOVIE</h5>
      </h1>
      <p>항목별 영화 리스트</p>
      <ul className="narbar_links">
        <li>
          <a
            href=""
            onClick={(e) => {
              e.preventDefault();
              this.props.onChangeYear("인기순");
            }}
          >
            인기순
          </a>
        </li>
        <li>
          <a
            href=""
            onClick={(e) => {
              e.preventDefault();
              this.props.onChangeYear("평점순");
            }}
          >
            평점순
          </a>
        </li>
        <li>
          <a
            href=""
            onClick={(e) => {
              e.preventDefault();
              this.props.onChangeYear("최신순");
            }}
          >
            최신순
          </a>
        </li>
      </ul>
    </div>
  );
}
