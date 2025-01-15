import React from "react";

function SearchBox({ onSearch }) {
  function handleChange(e) {
    onSearch(e.target.value);
  }
  return (
    <div className="search-box">
      <input
        onChange={handleChange}
        className="form-control"
        placeholder="영화검색..."
      ></input>
    </div>
  );
}

export default SearchBox;
