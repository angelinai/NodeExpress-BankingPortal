const fs = require('fs'); // allow read and write files
const path = require('path'); // configure abs paths

// require express
const express = require('express');

const app = express();

// configure where views can be found
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // set view engine
//app.engine('html', require('ejs').renderFile);
//app.set('view engine', 'html');

// point at the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.render('index', { title: 'Index Page'}));

app.listen(3000, () => console.log('Project running on port 3000!'))