const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {

  const query = `SELECT * FROM movies ORDER BY "title" ASC`;
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })

});

// PUT update selected movie
router.put('/', (req, res)=>{
  console.log('in router PUT', req.body.id);
  let queryString = `UPDATE movies SET title=$1, 
    poster=$2, 
    description=$3 
    WHERE ID=$4`
  let values = [req.body.title, req.body.poster, req.body.description, req.body.id]
  pool.query(queryString, values).then((results)=>{
    res.sendStatus(200);
  }).catch(err=>{
    console.log('ERROR: UPDATE movie',err);
    res.sendStatus(500);
  })
}); 

// GET info for selected movie
router.get('/details/:id', (req, res)=>{
  console.log('in movie/details/:id, req.params:', req.params.id);
  const queryString = `SELECT * FROM movies WHERE id=$1;`
  const values = [req.params.id];
  pool.query(queryString, values).then((result)=>{
    res.send(result.rows);
  }).catch(err=>{
    console.log('ERROR in router: get my movie', err);
    res.sendStatus(500);
  })
})

router.post('/', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`

  // FIRST QUERY MAKES MOVIE
  pool.query(insertMovieQuery, [req.body.title, req.body.poster, req.body.description])
  .then(result => {
    console.log('New Movie Id:', result.rows[0].id); //ID IS HERE!
    
    const createdMovieId = result.rows[0].id

    // Now handle the genre reference
    const insertMovieGenreQuery = `
      INSERT INTO "movies_genres" ("movie_id", "genre_id")
      VALUES  ($1, $2);
      `
      // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
      pool.query(insertMovieGenreQuery, [createdMovieId, req.body.genre_id]).then(result => {
        //Now that both are done, send back success!
        res.sendStatus(201);
      }).catch(err => {
        // catch for second query
        console.log(err);
        res.sendStatus(500)
      })

// Catch for first query
  }).catch(err => {
    console.log(err);
    res.sendStatus(500)
  })
})

module.exports = router;