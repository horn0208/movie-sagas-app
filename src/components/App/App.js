import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList'
import Details from '../Details/Details';
import AddMovieForm from '../AddMovieForm/AddMovieForm';

function App() {
  return (
    <div className="App">
      <h1>The Movies Saga!</h1>
      <Router>        
        <Route path="/" exact>
          <MovieList />
        </Route>
        <Route path="/home">
          <MovieList />
        </Route>
        {/* Details page */}
        <Route path ="/details">
          <Details />
        </Route>
        {/* Add Movie page */}
        <Route path="/addMovie">
          <AddMovieForm />
        </Route>
      </Router>
    </div>
  );
}


export default App;
