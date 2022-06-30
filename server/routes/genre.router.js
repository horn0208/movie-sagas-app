const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/:id', (req, res) => {
  // Query to get all genres from my movie
  console.log('in genre/:id', req.params.id);
  const queryString = `SELECT genres.id, genres.name FROM genres
    JOIN movies_genres ON movies_genres.genre_id=genres.id
    JOIN movies ON movies.id=movies_genres.movie_id
    WHERE movies.id=$1;`;
  const values = [req.params.id];
  pool.query(queryString, values).then((result)=>{
    res.send(result.rows);
  }).catch(err=>{
    console.log('error in router: get genres', err);
    res.sendStatus(500);
  })
});

module.exports = router;