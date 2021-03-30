import React, {useState, useEffect} from 'react'
import {Link, useParams, useHistory} from "react-router-dom";
import movieService from "../services/movie-service"

const SearchScreen = () => {
    const history = useHistory()
    const {title} = useParams()
    const [searchTitle, setSearchTitle] = useState(title)
    const [results, setResults] = useState({Search: []})
    useEffect(() => {
        setSearchTitle(title)
        findMoviesByTitle(title)
    }, [])
    const findMoviesByTitle = (title) => {
        history.push(title)
        movieService.findMoviesByTitle(title)
            .then((results) => {
                setResults(results)
            })
    }
    return(
        <div>
            <h1>Search Screen</h1>
            <input value={searchTitle}
                   onChange={(event) => {
                       setSearchTitle(event.target.value)
                   }}
                   className="form-control"/>
            <button
                onClick={() => {
                    findMoviesByTitle(searchTitle)
                }}
                className="btn btn-primary">
                Search
            </button>
            <ul className="list-group">
                {
                    results && results.Search && results.Search.map((movie) => {
                        return (
                            <li className="list-group-item">
                                <Link to={`/details/${movie.imdbID}`}>
                                    {movie.Title}
                                </Link>
                            </li>
                        )
                    })
                }
                {/*<li className="list-group-item">*/}
                {/*    <Link to={`/details/imdbID123`}>*/}
                {/*        Avatar*/}
                {/*    </Link>*/}
                {/*</li>*/}
                {/*<li className="list-group-item">*/}
                {/*    <Link>*/}
                {/*        Titanic*/}
                {/*    </Link>*/}
                {/*</li>*/}
                {/*<li className="list-group-item">*/}
                {/*    <Link>*/}
                {/*        Terminator 2*/}
                {/*    </Link>*/}
                {/*</li>*/}
                {/*<li className="list-group-item">*/}
                {/*    <Link>*/}
                {/*        Aliens*/}
                {/*    </Link>*/}
                {/*</li>*/}
            </ul>
        </div>
    )
}

export default SearchScreen