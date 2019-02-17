
const fs = require('fs'); // allow read and write files
const path = require('path'); // configure abs paths
 
// require ExpressJS
const express = require('express');

// data rquire setup exports
const { accounts, users, writeJSON } = require('./data');

const accountRoutes = require('./routes/accounts');
const servicesRoutes = require('./routes/services');

///////////////////////
///      APP       ///
//////////////////////
const app = express();

// configure where views can be found
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // set view engine


///////////////////////
///   Middleware    ///
//////////////////////

// point at the public directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }))

///////////////////////
///     Routing    ///
//////////////////////

app.use('/account', accountRoutes);
app.use('/services', servicesRoutes);

// GET routes
app.get('/', (req, res) =>  {
    res.render('index', {   title: 'Account Summary', accounts });
}); 

app.get('/profile', (req, res) => {
    res.render('profile',  { user: users[0] });
});

///////////////////////
/// Server setup  ////
//////////////////////
app.listen(3000, () => {
    console.log('FinBin Banking Portal running on port 3000!')
});