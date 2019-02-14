// require ExpressJS
const express = require('express');

// data rquire setup exports
const { accounts, writeJson } = require('./data');


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
         
        writeJson(); 

      res.render('transfer', {message: "Transfer Completed"});
    });
    app.post('/payment', (req, res) =>  {
        accounts.credit.balance -= req.body.amount;
        accounts.credit.available += parseInt(req.body.amount, 10);

        writeJson(); 

         res.render('payment', {message: 'Payment Sucessful', account: accounts.credit });
    });

///////////////////////
/// Server setup  ////
//////////////////////
app.listen(3000);