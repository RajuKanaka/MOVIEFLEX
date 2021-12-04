import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  createTheme,
  ThemeProvider,
  Tabs,
  Tab,
} from "@material-ui/core";

import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import CustomPagination from "../CustomPagination/CustomPagination";
import SingleComponent from "../SingleComponent/SingleComponent";

const Search = () => {
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const darktheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#fff",
      },
    },
  });
  const fetchSearch = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
        process.env.REACT_APP_API_KEY
      }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
    );
    console.log(data.results);
    setContent(data.results);
    setTotalPages(data.total_pages);
  };
  useEffect(() => {
    fetchSearch();
  }, [page, type]);
  return (
    <div className="pageTitle">
      <span className="page-title"> search</span>
      <ThemeProvider theme={darktheme}>
        <div className="form" style={{ display: "flex" }}>
          <TextField
            style={{ flex: 1 }}
            className="searchBox"
            label="search"
            variant="filled"
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <Button
            variant="contained"
            style={{ marginLeft: "10px" }}
            onClick={fetchSearch}
          >
            <SearchIcon color="white" />
          </Button>
        </div>
        <Tabs
          style={{ display: "flex", justifyContent: "center" }}
          value={type}
          indicatorColor="primary"
          textColor="primary"
          onChange={(e, newValue) => {
            setType(newValue);
            setPage(1);
          }}
        >
          <Tab style={{ width: "50%" }} label="search Movies" />
          <Tab style={{ width: "50%" }} label="search TV series" />
        </Tabs>
      </ThemeProvider>
      {totalPages > 1 && (
        <CustomPagination setPage={setPage} numberOfPages={totalPages} />
      )}
      <div className="movies">
        {content &&
          content.map((c) => {
            return (
              <SingleComponent
                key={c.id}
                id={c.id}
                name={c.title || c.original_name}
                image={c.poster_path}
                vote={c.vote_average}
                media={type ? "tv" : "movie"}
                date={c.release_date || c.first_air_date}
              />
            );
          })}
        {searchText &&
          !content &&
          (type ? <h2>No Series found</h2> : <h2>No Movies Found</h2>)}
      </div>
    </div>
  );
};

export default Search;
