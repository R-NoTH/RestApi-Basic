const express = require ('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();

//setting
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

//middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//routes
app.use(require('./routes/index.js'));
app.use(('/api/movies'),require('./routes/movies'));
app.use(('/api/users'),require('./routes/user'));


//starting the serve
app.listen(app.get('port'),()=>{
  console.log(`server on port ${app.get('port')}`);
});