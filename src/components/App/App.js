import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList'
import Details from '../Details/Details';
import AddMovieForm from '../AddMovieForm/AddMovieForm';
import EditMovie from '../EditMovie/EditMovie';
//MUI Imports
import Typography from '@mui/material/Typography';

function App() {
  return (
    <div className="App">
      <Typography variant="h1">Film Collection</Typography>
      <Router>        
        <Route path="/" exact>
          <MovieList />
        </Route>
        <Route path="/home">
          <MovieList />
        </Route>
        {/* Details page */}
        <Route path ="/details/:id">
          <Details />
        </Route>
        {/* Add Movie page */}
        <Route path="/addMovie">
          <AddMovieForm />
        </Route>
        <Route path="/editMovie">
          <EditMovie />
        </Route>
      </Router>
    </div>
  );
}


export default App;
