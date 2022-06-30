import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'
import {useHistory} from 'react-router-dom';

function MovieList() {

    const history = useHistory();    
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    //click handler for details view, sending movie ID to reducer (reducer will pass id to... props? or store till sagas needs it)
    const handleClick=(myMovieID)=>{
        console.log('in handleClick, myMovieID:', myMovieID);
        // send movie ID that was clicked to reducer
        dispatch({type: 'STORE_MOVIE_ID', payload: myMovieID});
        // go to details view
        history.push('/details');
    }

    return (
        <main>
            <h1>MovieList</h1>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <div key={movie.id} >
                            <h3>{movie.title}</h3>
                            <img onClick={()=>handleClick(movie.id)} src={movie.poster} alt={movie.title}/>
                        </div>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;