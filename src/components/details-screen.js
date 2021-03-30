import React, {useEffect, useState} from 'react'
import {useHistory, useParams} from "react-router-dom";
import movieService from '../services/movie-service'

const DetailsScreen = () => {
    const {imdbID} = useParams()
    const history = useHistory()
    const [movie, setMovie] = useState({})
    useEffect(() => {
        findMovieByImdbID()
    }, [])
    const findMovieByImdbID = () => {
        movieService.findMovieByImdbID(imdbID)
            .then((data) => {
                setMovie(data)
            })
    }
    return(
        <div>
            <button onClick={() => {history.goBack()}}>Back</button>
            <h1>{movie.Title}</h1>
            <p>
                <img src={movie.Poster} width={150} style={{float: "right"}}/>
                {movie.Plot}
            </p>
            <div>
                {movie.Actors}
                <ul>
                    {
                        movie.Actors && movie.Actors.split(",")
                            .map((actor) => {
                                return(
                                    <li>{actor}</li>
                                )
                        })
                    }
                </ul>
            </div>
            {JSON.stringify(movie)}
        </div>
    )
}

export default DetailsScreen