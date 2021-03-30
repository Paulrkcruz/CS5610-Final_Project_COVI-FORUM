// import logo from './logo.svg';
// import './App.css';
import SearchScreen from "./components/search-screen";
import DetailsScreen from "./components/details-screen";
import HomeScreen from "./components/home-screen";
import {BrowserRouter} from "react-router-dom"
import {Route} from "react-router";


function App() {
  return (
    <div className="container-fluid">
        <BrowserRouter>
            <Route path="/" exact={true}>
                <HomeScreen/>
            </Route>
            <Route path={["/search", "/search/:title"]} exact={true}>
                <SearchScreen/>
            </Route>
            <Route path="/details/:imdbID" exact={true}>
                <DetailsScreen/>
            </Route>
        </BrowserRouter>
    </div>
  );
}

export default App;
