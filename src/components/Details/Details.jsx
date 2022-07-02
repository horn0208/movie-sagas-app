import { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {useParams} from 'react-router-dom';
// MUI style imports
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

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
        history.push('/home');
    }
     
    return(
        <Paper elevation={3}>
            <Typography variant="h3">{myMovie[0].title}</Typography>
            <img src={myMovie[0].poster} alt="movie poster" />
            <Typography variant="h6">Genres: { genres.map(genre =>(`${genre.name}  `)) }</Typography>
            <Typography variant="body1">{myMovie[0].description}</Typography>
            <button onClick={handleClick}>Back to List</button>
        </Paper>
    );
}

export default Details;