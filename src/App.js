import React, { useState, useEffect } from 'react';
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";
import "./App.css";


const API_URL = 'http://www.omdbapi.com?apikey=5b82cef2';

const movie1 = {
    "Poster": "https://m.media-amazon.com/images/M/MV5BYjFhN2RjZTctMzA2Ni00NzE2LWJmYjMtNDAyYTllOTkyMmY3XkEyXkFqcGdeQXVyNTA0OTU0OTQ@._V1_SX300.jpg",
    "Title":  "Italian Spiderman",
    "Type": "movie",
    "Year": "2007",
    "imdbID": "tt2705436"
}

const App = () => {

    const [movies, setMovies] = useState([]);
    const[searchTerm, setSearchTerm] = useState([]);

    const searchMovies = async(title) =>{
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

       setMovies(data.Search);
    }


    useEffect(() => {
        searchMovies('Spiderman');
    }, []);

    return(
        <div className='app'>
            <h1>MovieLand</h1>

            <div className='search'>
                <input 
                    placeholder='Search for movies'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <img 
                    src = {SearchIcon}
                    alt = "search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {
                movies?.length > 0 ?
                (
                    <div className='contianer'>
                        {movies.map((movie) => (
                            <MovieCard movie={movie} />
                        ))}
                        
                    </div>
                ) : (
                    <div className='empty'>
                        <h2>No Movies found</h2>
                    </div>
                )
            }
        </div>
    );
}

export default App;