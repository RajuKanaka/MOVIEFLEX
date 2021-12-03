import { React, useState, useEffect } from "react";
import axios from "axios";
import "./Styles.css";
import SingleComponent from "../SingleComponent/SingleComponent";
import CustomPagination from "../CustomPagination/CustomPagination";

const Trending = () => {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
    );
    setContent(data.results);
  };
  useEffect(() => {
    fetchTrending();
  }, [page]);

  return (
    <main className="pageTitle">
      <span className="page-title"> Trending</span>
      <CustomPagination setPage={setPage} />
      <div className="trending">
        {content &&
          content.map((c) => {
            return (
              <SingleComponent
                key={c.id}
                id={c.id}
                name={c.title || c.original_name}
                image={c.poster_path}
                vote={c.vote_average}
                media={c.media_type}
                date={c.release_date || c.first_air_date}
              />
            );
          })}
      </div>
    </main>
  );
};
export default Trending;
