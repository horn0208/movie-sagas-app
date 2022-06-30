import { useState } from 'react';

function Details( props ){
    // template hook
    const [ hook, setHook ] = useState( null );
     
    return(
        <div>
            <h2>Details</h2>
            <p>Props: { JSON.stringify( props ) }</p>
        </div>
    );
}

export default Details;