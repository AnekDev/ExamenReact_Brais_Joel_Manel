var express = require('express');
var app = express();
var mysql = require('mysql');
var cors = require('cors')
var bodyParser = require('body-parser');
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// set port
app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});
module.exports = app;

// connection configurations
var dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'super3',
    database: 'app_missatgeria'
});

// connect to database
dbConn.connect();

// default route
app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
});

// Retorna tots els videos sense id i amb el nom del youtuber
app.get('/getAllUsuaris', function (req, res) {
    dbConn.query(
        `SELECT id_usuari as ID, username
        FROM usuaris`,
        function (error, results, fields) {
            if (error){
                res.send({ error: true, data: results, message: error.sqlMessage });
            }
            else{
                return res.send({ error: false, data: results, message: 'Llista de usuaris' });
            }
        }
    );
});

app.post('/login', function (req, res) {
    let username = req.body.username;
    let contrasenya = req.body.contrasenya;

    // Validar que s'han enviat els camps necessaris
    if (!username || !contrasenya) {
        return res.send({
            error: true,
            data: null,
            message: 'Username i contrasenya són obligatoris'
        });
    }

    dbConn.query(
        'SELECT id_usuari, username, contrasenya FROM usuaris WHERE username = ?',
        [username],
        function (error, results, fields) {
            if (error) {
                return res.send({
                    error: true,
                    data: null,
                    message: error.sqlMessage
                });
            }

            if (results.length === 0) {
                return res.send({
                    error: true,
                    data: null,
                    message: 'Username o contrasenya incorrectes'
                });

            }
            else{
                const usuari = results[0];

                if (usuari.contrasenya !== contrasenya) {
                    return res.send({
                        error: true,
                        data: null,
                        message: 'Username o contrasenya incorrectes'
                    });
                }
                else{
                    // Login correcte - retornar només l'id_usuari
                    return res.send({
                        error: false,
                        data: {
                            id_usuari: usuari.id_usuari,
                            username: usuari.username
                        },
                        message: 'Login correcte'
                    });
                }
            }
        }
    );
});


app.post('/setnewUser', function (req, res) {
    let dni = req.body.dni;
    let nom = req.body.nom;
    let cognoms = req.body.cognoms;
    let contrasenya = req.body.contrasenya;

    // Primer obtenim l'id_usuari i l'id_video a partir dels noms
    dbConn.query(
        'INSERT INTO usuaris SET ?',
        { dni: dni, nom: nom, cognoms:cognoms, contrasenya: contrasenya},
        function (error, results) {
            if (error) {
                res.send({success:true, error: true, data: results, message: error.sqlMessage });
            }
            else {
                return res.send({success:true, error: false, data: results, message: 'Usuari afegit correctament.' });
            }
        }
    );
});

app.post('/getMissatges', function (req, res) {
    let idemissor = req.body.idemissor;
    let idRemitent = req.body.idRemitent;

    if (idemissor===0 || idRemitent===0) {
        return res.send({
            error: true,
            data: {
                id1:idemissor,
                id2:idRemitent
            },
            message: 'Cal proporcionar id_usuari1 i id_usuari2'
        });
    }
    else{
        dbConn.query(
            `SELECT
             id_usuari_emisor,
             data_hora,
             missatge
         FROM converses
         WHERE
             (id_usuari_emisor = ? AND id_usuari_receptor = ?)
            OR
             (id_usuari_emisor = ? AND id_usuari_receptor = ?)
         ORDER BY data_hora ASC`,
            [idemissor, idRemitent, idRemitent, idemissor],
            function (error, results, fields) {
                if (error) {
                    return res.send({
                        error: true,
                        data: null,
                        message: error.sqlMessage
                    });
                }

                return res.send({
                    error: false,
                    data: results,
                    message: 'Missatges obtinguts correctament'
                });
            }
        )
    }
});

app.post('/sendMissatge', function (req, res) {
    let idemissor = req.body.idemissor;
    let idRemitent = req.body.idRemitent;
    let missatge = req.body.missatge;

    // Validacions
    if (missatge==="") {
        return res.send({ error: true, data: null, message: 'Falten missatge' });
    }

    dbConn.query(
        `INSERT INTO converses (id_usuari_emisor, id_usuari_receptor, missatge) 
         VALUES (?, ?, ?)`,
        [idemissor, idRemitent, missatge],
        function (error, results, fields) {
            if (error) {
                return res.send({ error: true, data: null, message: error.sqlMessage });
            }

            return res.send({
                error: false,
                data: { idemissor, idRemitent, missatge, data_hora: new Date() },
                message: 'Missatge afegit correctament'
            });
        }
    );
});