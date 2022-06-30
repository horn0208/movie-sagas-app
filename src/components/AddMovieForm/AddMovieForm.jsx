import { useState } from 'react';
import {useHistory} from 'react-router-dom';

function AddMovieForm(){
    // store input values in local state:
    const [ title, setTitle ] = useState('');
    const [ poster, setPoster ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ genre, setGenre ] = useState(0);

    const history = useHistory();

    const handleClick=()=>{
        console.log(genre);
    }
     
    return(
        <div>
            <h2>Add A Movie</h2>
            <input type="text" placeholder="Title" value={title} onChange={(event)=>setTitle(event.target.value)}/>
            <input type="text" placeholder="Poster URL" value={poster} onChange={(event)=>setPoster(event.target.value)}/>
            <label> Genre:
                <select value={genre} onChange={(event)=>setGenre(Number(event.target.value))}>
                    <option value="1">Adventure</option>
                    <option value="2">Animated</option>
                    <option value="3">Biographical</option>
                    <option value="4">Comedy</option>
                    <option value="5">Disaster</option>
                    <option value="6">Drama</option>
                    <option value="7">Epic</option>
                    <option value="8">Fantasy</option>
                    <option value="9">Musical</option>
                    <option value="10">Romantic</option>
                    <option value="11">Science Fiction</option>
                    <option value="12">Space-Opera</option>
                    <option value="13">Superhero</option>
                </select>
            </label>
            <br />
            <textarea placeholder="Description" cols="30" rows="10" value={description} onChange={(event)=>setDescription(event.target.value)}></textarea>
            <button onClick={handleClick}>Save</button>
            <button onClick={()=>history.push('/home')}>Cancel</button>
        </div>
    );
}

export default AddMovieForm;