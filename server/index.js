const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
});

let albums =  [
    { id: 1, title: 'Number of the Beast', author: 'Iron Maiden', year: 1982, genre: 'ROCK' },
    { id: 2, title: 'Dark Side of the Moon', author: 'Pink Floyd', year: 1980, genre: 'ROCK' }
];
let nextId = 3;

app.get('/albums', (req, res) => {
    res.json( albums );
});

app.get('/albums/:id', (req, res) => {
    const id = parseInt( req.params.id );

    const album = albums.find( a => a.id === id)

    if ( album ) {
        res.json( albums.find( a => a.id === id) );
    } else {
        res.status(404).send();
    }
    
});

app.post('/albums', (req, res) => {

    const album = req.body;
    album.id = nextId++;
    
    albums.push( album );

    res.status(200).json( { id: album.id, message: 'OK' } );
} );

app.delete('/albums/:id', (req, res) => {
    const id = parseInt( req.params.id );
  
    albums = albums.filter( a=> a.id !== id );

    res.status(200).json( { message: 'OK' } );
} );

app.put('/albums/:id', (req, res) => {
    const id = parseInt( req.params.id );

    const album = req.body;
    album.id = id;


    albums = albums.filter( a=> a.id !== id );
    albums.push( album );

    res.status(200).json( { id: album.id, message: 'OK' } );
} );



app.listen(port, () => console.log(`Example app listening on port ${port}!`))