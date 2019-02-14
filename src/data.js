const fs = require('fs'); // allow read and write files
const path = require('path'); // configure abs paths

// Load mock data from accounts.js, load here
const accountData = fs.readFileSync(
    path.join(__dirname, 'json', 'accounts.json'), 'utf8'
)
const accounts = JSON.parse(accountData);


// Load mock data from users.js, load here
const userData = fs.readFileScync(
    path.join(__dirname, 'json', 'users.json'), 'utf8'
)
const users = JSON.parse(userData);
 

const writeJson = () =>  {
    const accountsJSON = JSON.stringify(accounts, null, 4);

    // write to file
    fs.writeFileSync(path.join(__dirname, 'json', 'accounts.json'), accountsJSON, 'utf8');
};

// export
module.exports = { accounts, users, writeJson }