const fs = require('fs'); // allow read and write files
const path = require('path'); // configure abs paths

// require express
const express = require('express');

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
    
// GET routes
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

    app.get('/transfer', (req, res) =>  {
        res.render('transfer');
    });
    
    app.get('/payment', (req, res) =>  {
        res.render('payment',  { account: accounts.credit });
    });
 
// POST routes
    app.post('/transfer', (req, res) =>  {
       accounts[req.body.from].balance = accounts[req.body.from].balance - req.body.amount;
       accounts[req.body.to].balance = parseInt(accounts[req.body.to].balance) + 
        parseInt(req.body.amount, 10);
         
        const accountsJSON = JSON.stringify(accounts, null, 4);
        // write to file
        fs.writeFileSync(path.join(__dirname, 'json/accounts.json'), accountsJSON, 'utf8');
      res.render('transfer', {message: "Transfer Completed"});
    });
    app.post('/payment', (req, res) =>  {
        accounts.credit.balance -= req.body.amount;
        accounts.credit.available += parseInt(req.body.account, 10);
        const accountsJSON = JSON.stringify(accounts, null, 4);

         // write to file
         fs.writeFileSync(path.join(__dirname, 'json', 'accounts.json'), accountsJSON, 'utf8');
         res.render('payment', {message: 'Payment Sucessful', account: accounts.credit });
    });

///////////////////////
/// Server setup  ////
//////////////////////
app.listen(3000, () => {
    console.log('Project running on port 3000!')
});