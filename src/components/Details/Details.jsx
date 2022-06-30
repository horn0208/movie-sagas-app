import { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

function Details(){

    const history = useHistory();
    const myMovie = useSelector(store => store.myMovie);
    const genres = useSelector(store => store.genres);
     
    return(
        <div>
            <h2>Details</h2>
            <h3>Genres: { genres.map(genre =>(`${genre.name}  `)) }</h3>
            <p>myMovie: { JSON.stringify(myMovie) }</p>
            <button onClick={()=>history.push('/home')}>Back to List</button>
        </div>
    );
}

export default Details;