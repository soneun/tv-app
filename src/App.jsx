import "./App.css";
import MovieList from "./components/MovieList";
import Navbar from "./components/Navbar";
import cinema from "./assets/cinema.png";
import play from "./assets/play.png";
import popcorn from "./assets/popcorn.png";
import SearchBox from "./components/SearchBox";

function App() {
  return (
    <div className="app">
      <Navbar />
      <SearchBox />
      <MovieList type="popular" title="인기순" emoji={popcorn} />
      <MovieList type="top_rated" title="평점순" emoji={cinema} />
      <MovieList type="upcoming" title="최신순" emoji={play} />
    </div>
  );
}

export default App;
