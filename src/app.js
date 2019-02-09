const fs = require('fs'); // allow read and write files
const path = require('path'); // configure abs paths

// require express
const express = require('express');

const app = express();

// configure where views can be found
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // set view engine
 
// point at the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Load mock data from accounts.js, load here
const accountData = fs.readFileSync(
    path.join(__dirname, 'json', 'accounts.json'), 'utf8'
)
// Load mock data from users.js, load here
const userData = fs.readFileSync(
    path.join(__dirname, 'json', 'users.json'), 'utf8'
)
// Parese mock data 
const accounts = JSON.parse(accountData);
const users = JSON.parse(userData);

///////////////////////
///     Routing    ///
//////////////////////
app.get('/', (req, res) =>  {
    res.render('index', {   title: 'Account Summary', accounts });
});

app.get('/savings', (req, res) => {
    res.render('account',  { account: accounts.savings });
});

app.get('/checking', (req, res) => {
    res.render('account',  { account: accounts.checking });
});

app.get('/credit', (req, res) => {
    res.render('account',  { account: accounts.credit });
});

app.get('/profile', (req, res) => {
    res.render('profile',  { user: users[0] });
});

///////////////////////
/// Server setup  ////
//////////////////////
app.listen(3000, () => {
    console.log('Project running on port 3000!')
});