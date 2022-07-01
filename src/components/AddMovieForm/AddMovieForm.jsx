import { useState } from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
// MUI style imports
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { MenuItem } from '@mui/material';

function AddMovieForm(){
    // hold input values in local state:
    const [ title, setTitle ] = useState('');
    const [ poster, setPoster ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ genre, setGenre ] = useState(0);

    const history = useHistory();
    const dispatch = useDispatch();

    const handleClick=()=>{
        //validate inputs:
        if(genre!==0 && title!=='' && poster!=='' && description!==''){
            // dispatch new movie object to saga
            dispatch({
                type: 'POST_MOVIE', 
                payload: {
                    title: title,
                    poster: poster,
                    description: description,
                    genre_id: genre
            }});
            // reset inputs, may be unnecessary?
            setTitle('');
            setPoster('');
            setDescription('');
            setGenre(0);
            // go back to home view:
            history.push('/home');
        } else {
            alert('Please fill out all fields before saving');
        }
    }
     
    return(
        <Box
            sx={{
                width: 700,
                maxWidth: '100%',
            }}>
            <Typography variant="h3">Add A Movie</Typography>
            <TextField 
                type="text" 
                label="Title"
                size="small"
                value={title} 
                onChange={(event)=>setTitle(event.target.value)}>
                </TextField>
            <TextField 
                type="text" 
                label="Poster URL" 
                size="small"
                value={poster} 
                onChange={(event)=>setPoster(event.target.value)}>
                </TextField>
            <InputLabel></InputLabel>
                <Select size="small" value={genre} onChange={(event)=>setGenre(Number(event.target.value))}>
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
                </Select>
            <TextField 
                multiline 
                fullWidth 
                label="Description" 
                cols="20" 
                rows="8" 
                value={description} 
                onChange={(event)=>setDescription(event.target.value)}>
            </TextField>
            <br />
            <Button onClick={handleClick}>Save</Button>
            <Button onClick={()=>history.push('/home')}>Cancel</Button>
        </Box>
    );
}

export default AddMovieForm;
