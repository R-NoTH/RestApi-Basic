const { Router } = require('express');
const { route } = require('.');
const router = Router();
const _ = require('underscore');

/*const bodyParser = require('body-parse');
app.use(bodyParser.json());*/
const movies = require('../sample.json');
console.log(movies);

router.get('/', (req, res) => {
  res.json(movies);
});

router.post('/', (req, res) => {
  // console.log(req.body);
  const { title, director, year, rating } = req.body;
  if (title && director && year && rating) {
    const movies_id = movies.length + 1;
    const newMovie = { ...req.body, movies_id };
    movies.push(newMovie);
    console.log(newMovie);
    res.json('saved');
  } else {
    res.status(500).json({ error: 'Wrong Request' });
  }
});

router.put('/:id',(req,res)=>{
  const { id } = req.params;
  const { title, director, year, rating } = req.body;
  if (title && director && year && rating) {
    _.each(movies, (movie, i) => {
      if (movie.movie_id == id) {
        movie.title = title;
        movie.director = director;
        movie.year = year;
        movie.rating = rating;
        
      }
    });
    res.json(movies);
  }else{
    res.status(500).json({error:'There was an error'});
  }
});

router.delete('/:id', (req, res) => {
  console.log(req.params);
  const { id } = req.params
  _.each(movies, (movie, i) => {
    if (movie.movie_id == id) {
      movies.splice(i, 1);
    }
  });
  res.send(movies);
});
module.exports = router;
