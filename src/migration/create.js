import db from '../models/db'

const createUser= `CREATE TABLE IF NOT EXISTS Users(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(255) not null,
    lastname VARCHAR(255) not null,
    othername VARCHAR(255) not null,
    email VARCHAR(255) UNIQUE not null,
    password VARCHAR(255) not null,
    phoneNumber VARCHAR(255) not null,
    passportUrl VARCHAR(225) not null,
    registered TIMESTAMP DEFAULT NOW(),
    isAdmin BOOLEAN DEFAULT false)`

db.query(createUser).then((user)=>{
    console.log(user)
}).catch((err)=>{
    console.log(err)
})

const createParty= `CREATE TABLE IF NOT EXISTS Party(
    id SERIAL PRIMARY KEY,
    name  VARCHAR(225) UNIQUE not null,
    hqAddress VARCHAR(225) not null,
    logourl VARCHAR(225) not null
)`

db.query(createParty).then((party)=>{
 console.log(party)
}).catch((err)=>{
console.log(err.stack)
});

const createOffice= `CREATE TABLE IF NOT EXISTS Office(
    id SERIAL PRIMARY KEY,
    name  VARCHAR(225) UNIQUE not null,
    type VARCHAR(225) not null
);`

db.query(createOffice).then((office)=>{
    console.log(office)
}).catch((err)=>{
    console.log(err)
});

const createCandidate= `CREATE TABLE IF NOT EXISTS Candidate(
    id SERIAL UNIQUE,
    candidate INT UNIQUE NOT NULL REFERENCES Users(id) ON DELETE CASCADE,
    office INT NOT null REFERENCES Office(id)  ON DELETE CASCADE,
    party INT  not null REFERENCES Party(id)  ON DELETE CASCADE,
    registered TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (id,candidate,office)
)`

db.query(createCandidate).then((candidate)=>{
    console.log(candidate)
}).catch((err)=>{
    console.log(err)
});

const createVote= `CREATE TABLE IF NOT EXISTS Vote(
    id SERIAL UNIQUE,
    candidate INT NOT NULL REFERENCES Candidate(id) ON DELETE CASCADE,
    office INT NOT null REFERENCES Office(id)  ON DELETE CASCADE,
    voter INT UNIQUE not null REFERENCES Users(id)  ON DELETE CASCADE,
    name VARCHAR(255) not null,
    voted TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (id,candidate,office, voter)
)`

db.query(createVote).then((vote)=>{
    console.log(vote)
}).catch((err)=>{
    console.log(err)
});