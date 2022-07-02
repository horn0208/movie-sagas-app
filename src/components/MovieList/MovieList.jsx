import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'
import {useHistory} from 'react-router-dom';
//MUI style imports
import Typography from '@mui/material/Typography';
import { Grid, Paper } from "@material-ui/core";
import Link from '@mui/material/Link';


function MovieList() {

    const history = useHistory();    
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    //click handler for details view, sending movie ID to reducer & saga
    const handleClick=(myMovieID)=>{
        // send movie id to saga to retrieve movie info
        dispatch({type: 'FETCH_MY_MOVIE', payload: myMovieID});
        // send movie id to saga to retrieve genre info
        dispatch({type: 'FETCH_MY_GENRES', payload: myMovieID});
        // go to details view
        history.push(`/details/${myMovieID}`);
    }

    return (
        <main>
            <div className='add-link'>
                <Link 
                    color="secondary"
                    variant='button'
                    href='/#/addMovie'>Add Film
                </Link>
            </div>
            <Grid container spacing={2} >
                {movies.map(movie => {
                    return (
                        <Grid item xs={12} sm={4} lg={3} xl={2} key={movie.id}>
                            <Paper elevation={1} className='movie-paper'>
                                <Typography variant="h6">{movie.title}</Typography>
                                <img onClick={()=>handleClick(movie.id)} src={movie.poster} alt={movie.title}/>
                            </Paper>
                        </Grid>
                    );
                })}
            </Grid>
        </main>

    );
}

export default MovieList;