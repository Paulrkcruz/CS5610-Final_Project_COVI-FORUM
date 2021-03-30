import React from 'react'
import {Link} from "react-router-dom";

const HomeScreen = () => {
    return(
        <div>
            <h1>Home Screen</h1>
            <Link to="/search">
                Search
            </Link>
            <br/>
            <Link to="/details">
                Details
            </Link>
        </div>
    )
}

export default HomeScreen