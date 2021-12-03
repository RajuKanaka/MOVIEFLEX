import { Navbar, Movies, Trending, Series, Search } from "./components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "@material-ui/core";
import "./App.css";
function App() {
  return (
    <>
      <Navbar />
      <Container>
        <Switch>
          <Route path="/" component={Trending} exact />
          <Route path="/series" component={Series} />
          <Route path="/search" component={Search} />
          <Route path="/movies" component={Movies} />
        </Switch>
      </Container>

    </>
  );
}
export default App;
