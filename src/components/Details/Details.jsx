import { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {useParams} from 'react-router-dom';


function Details(){

    const history = useHistory();
    const dispatch = useDispatch();
    // lets us use the id from the url path
    let {id} = useParams()

    // on page refresh, get details of movie
    useEffect(() => {
        // send movie id to saga to retrieve movie info
        dispatch({type: 'FETCH_MY_MOVIE', payload: id});
        // send movie id to saga to retrieve genre info
        dispatch({type: 'FETCH_MY_GENRES', payload: id});
    }, []);

    const myMovie = useSelector(store => store.myMovie);
    const genres = useSelector(store => store.genres);

    const handleClick=()=>{
        dispatch({type: 'SET_MY_MOVIE', payload: ['']});
        history.push('/home');
    }
     
    return(
        <div>
            <h2>{myMovie[0].title}</h2>
            <img src={myMovie[0].poster} alt="movie poster" />
            <h4>Genres: { genres.map(genre =>(`${genre.name}  `)) }</h4>
            <p>{myMovie[0].description}</p>
            <button onClick={handleClick}>Back to List</button>
        </div>
    );
}

export default Details;