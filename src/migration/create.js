import db from '../models/db'

// const createTable= `CREATE TABLE IF NOT EXISTS Users(
//     id SERIAL PRIMARY KEY,
//     firstname VARCHAR(255) not null,
//     lastname VARCHAR(255) not null,
//     othername VARCHAR(255) not null,
//     email VARCHAR(255) UNIQUE not null,
//     password VARCHAR(255) UNIQUE not null,
//     phoneNumber VARCHAR(255) not null,
//     registered TIMESTAMP DEFAULT NOW(),
//     isAdmin BOOLEAN DEFAULT false);`

const createParty= `CREATE TABLE IF NOT EXISTS Party(
    id SERIAL PRIMARY KEY,
    name VARCHAR(225) not null,
    hqAddress VARCHAR(225) not null,
    logourl VARCHAR(225) not null
);`

db.query(createParty).then((party)=>{
 console.log(party)
}).catch((err)=>{
console.log(err.stack)
});

const createOffice= `CREATE TABLE IF NOT EXISTS Office(
    id SERIAL PRIMARY KEY,
    name VARCHAR(225) not null,
    type VARCHAR(225) not null
);`

db.query(createOffice).then((office)=>{
    console.log(office)
}).catch((err)=>{
    console.log(err)
})