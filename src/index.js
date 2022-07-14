import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('POST_MOVIE', postMovie);
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('FETCH_MY_MOVIE', fetchMyMovie);
    yield takeEvery('FETCH_MY_GENRES', fetchMyGenres);
}

function* postMovie(action){
    try {
        //action.payload.title, .poster, .genre_id, and .description
        console.log('in postMovie, genre payload:', action.payload.genre_id);
        //send new movie to server
        yield axios.post('/api/movie', action.payload);
        // run saga that gets all the movies
        yield put({type: 'FETCH_MOVIES'});
    } catch(err) {
        console.log('post movie error', err);
    }
}

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all error');
    }
        
}

function* fetchMyMovie(action){ 
    try {
        // action.payload is movie ID
        // GET movie data from server
        const myMovie = yield axios.get(`/api/movie/details/${action.payload}`);
        console.log('fetchMyMovie, myMovie.data:', myMovie.data);
        // send movie data to reducer
        yield put({type: 'SET_MY_MOVIE', payload: myMovie.data});
    } catch(err) {
        console.log('get my movie error', err);
    }
}

function* fetchMyGenres(action){
    try {
        // action.payload is movie ID
        // GET genres from server
        const myGenres = yield axios.get(`/api/genre/${action.payload}`);
        // send genres to reducer
        yield put({type: 'SET_GENRES', payload: myGenres.data});
    } catch(err) {
        console.log('get genres error', err);
    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// reducer to store details of movie selected
    
const myMovie = (state = [''], action) =>{ 
    switch(action.type){
        case 'SET_MY_MOVIE':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        myMovie
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
        <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
