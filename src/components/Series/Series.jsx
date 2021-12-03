import { React, useState, useEffect } from "react";
import axios from "axios";
import CustomPagination from "../CustomPagination/CustomPagination";
import SingleComponent from "../SingleComponent/SingleComponent";
import "./styles.css";
const Series = () => {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const fetchSeries = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`
    );

    setContent(data.results);
    setTotalPages(data.total_pages);
  };
  useEffect(() => {
    fetchSeries();
  }, [page]);
  return (
    <div className="pageTitle">
      <span className="page-title">Series</span>
      <CustomPagination setPage={setPage} numberOfPages={totalPages} />
      <div className="series">
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
    </div>
  );
};

export default Series;
