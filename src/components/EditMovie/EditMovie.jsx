import { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
// MUI style imports
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import { MenuItem } from '@mui/material';

function EditMovie(){

    // get original movie and genre info from store via reducers
    const myMovie = useSelector(store => store.myMovie);
    const genres = useSelector(store => store.genres);

    // hold input values in local state. Default values = original movie info
    const [ title, setTitle ] = useState(myMovie[0].title);
    const [ poster, setPoster ] = useState(myMovie[0].poster);
    const [ description, setDescription ] = useState(myMovie[0].description);
    // const [ genre, setGenre ] = useState(myMovie[0].genre_id);

    const history = useHistory();
    const dispatch = useDispatch();

    

    const handleClick=()=>{
        //validate inputs:
        if(genre!==0 && title!=='' && poster!=='' && description!==''){
            // dispatch updated movie object to saga
            dispatch({
                type: 'EDIT_MOVIE', 
                payload: {
                    title: title,
                    poster: poster,
                    description: description,
                    genre_id: genre
            }});
            // reset inputs, may be unnecessary?
            // setTitle('');
            // setPoster('');
            // setDescription('');
            // setGenre(0);
            // go back to home view:
            history.push('/home');
        } else {
            alert('Please fill out all fields and select a genre before saving');
        }
    }

     
    return(
        <Box className='inputs-box'
            sx={{
                width: 700,
                maxWidth: '100%',
            }}>
            <Typography className='add-film' variant="h3">Edit Film</Typography>
            <div className='inputs-sm'>
            <TextField
                type="text" 
                label="Title"
                size="small"
                color='secondary'
                value={title} 
                onChange={(event)=>setTitle(event.target.value)}>
                </TextField>
            <TextField
                type="text" 
                label="Poster URL" 
                size="small"
                color='secondary'
                value={poster} 
                onChange={(event)=>setPoster(event.target.value)}>
                </TextField>
            
            {/* <Select
                size="small" 
                color='secondary'
                value={genre} 
                onChange={(event)=>setGenre(Number(event.target.value))}>
                    <MenuItem value="0">Genre</MenuItem>
                    <MenuItem value="1">Adventure</MenuItem>
                    <MenuItem value="2">Animated</MenuItem>
                    <MenuItem value="3">Biographical</MenuItem>
                    <MenuItem value="4">Comedy</MenuItem>
                    <MenuItem value="5">Disaster</MenuItem>
                    <MenuItem value="6">Drama</MenuItem>
                    <MenuItem value="7">Epic</MenuItem>
                    <MenuItem value="8">Fantasy</MenuItem>
                    <MenuItem value="9">Musical</MenuItem>
                    <MenuItem value="10">Romantic</MenuItem>
                    <MenuItem value="11">Science Fiction</MenuItem>
                    <MenuItem value="12">Space-Opera</MenuItem>
                    <MenuItem value="13">Superhero</MenuItem>
            </Select> */}
            </div>
            <br />
            <TextField 
                className='input-field'
                multiline 
                fullWidth 
                label="Description" 
                cols="40" 
                rows="7" 
                color='secondary'
                value={description} 
                onChange={(event)=>setDescription(event.target.value)}>
            </TextField>
            <br />
            <Button 
                color='secondary'
                onClick={handleClick}>Save
            </Button>
            <Button
                color='secondary' 
                onClick={()=>history.push('/home')}>Cancel
            </Button>
        </Box>
    );
}

export default EditMovie;