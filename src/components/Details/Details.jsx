import { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import './Details.css'
// MUI style imports
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

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
        <Grid container justifyContent="center" >
            <Grid item xs={11} md={8} lg={6}>
                <Paper className='paper-details' elevation={3}>
                    <Typography variant="h3">{myMovie[0].title}</Typography>
                    <img className='img-details' src={myMovie[0].poster} alt="movie poster" />
                    <Typography variant="h6">Genres: { genres.map(genre =>(`${genre.name}  `)) }</Typography>
                    <Typography className='description' variant="body1">{myMovie[0].description}</Typography>
                    <Button 
                        color='secondary'
                        onClick={handleClick}>Back to List
                    </Button>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default Details;