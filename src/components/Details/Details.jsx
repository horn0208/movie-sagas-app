import { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

function Details(){

    const history = useHistory();
    const myMovie = useSelector(store => store.myMovie);
    const genres = useSelector(store => store.genres);
     
    return(
        <div>
            <h2>{myMovie[0].title}</h2>
            <img src={myMovie[0].poster} alt="movie poster" />
            <h4>Genres: { genres.map(genre =>(`${genre.name}  `)) }</h4>
            <p>{myMovie[0].description}</p>
            <button onClick={()=>history.push('/home')}>Back to List</button>
        </div>
    );
}

export default Details;