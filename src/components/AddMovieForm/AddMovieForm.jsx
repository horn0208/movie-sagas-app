import { useState } from 'react';

function AddMovieForm( props ){
    // template hook
    const [ hook, setHook ] = useState( null );
     
    return(
        <div>
            <h2>AddMovieForm</h2>
            <p>Props: { JSON.stringify( props ) }</p>
        </div>
    );
}

export default AddMovieForm;