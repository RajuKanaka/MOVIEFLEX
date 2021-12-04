import "./styles.css";
import movielogoL from "../../Assests/Images/movie_white_24dp.svg";
import expandL from "../../Assests/Images/expand_more_white_24dp.svg";
import seriesL from "../../Assests/Images/series_white_24dp.svg";
import trendingL from "../../Assests/Images/trending_up_white_24dp.svg";
import searchL from "../../Assests/Images/search_white_24dp.svg";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        <ul className="navbar-nav">
          <li className="logo">
            <Link to="/" className="nav-link">
              <span className="link-text">MOVIEFLEX</span>
              <img src={expandL} className="nav-image" alt="" />
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link">
              <img src={trendingL} alt="" />
              <span className="link-text">Trending</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/movies" className="nav-link">
              <img src={movielogoL} alt="" />
              <span className="link-text">Movie</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/series" className="nav-link">
              <img src={seriesL} alt="" />
              <span className="link-text">Web series</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/search" className="nav-link">
              <img src={searchL} alt="" />
              <span className="link-text">Search</span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};
export default Navbar;
