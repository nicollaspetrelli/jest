const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Repository = require('./repository');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const UserRepository = new Repository();

app.get('/', function (req, res) {
    res.send({
        status: true
    });
});

app.get('/user', function (req, res) {
    res.send({
        status: true,
        code: 200,
        data: Object.values(UserRepository.findAll())
    });
});

app.post('/user', function (req, res) {
    if (req.body.username) {
        req.body.username = req.body.username.trim();
    }
    if ((!req.body.username) || (!req.body.username.length)) {
        return res.status(401).send({
            status: false,
            code: 401,
            error: 'Username não especificado'
        });
    }

    const found = UserRepository.filter((id, row) => row.username === req.body.username);
    if (found) {
        return res.status(409).send({
            status: false,
            code: 409,
            error: 'Username já está em uso'
        });
    }

    const user = UserRepository.save({
        username: req.body.username
    });
    res.status(201).send({
        status: true,
        code: 201,
        data: user
    });
});

app.get('/user/:id', function (req, res) {
    const user = UserRepository.findById(req.params.id);
    if (!user) {
        res.status(404).send({
            status: false,
            code: 404,
            message: 'Usuário não encontrado'
        });
        return;
    }

    res.send({
        status: true,
        code: 200,
        data: user
    });
});

app.delete('/user/:id', function (req, res) {
    const user = UserRepository.findById(req.params.id);
    if (!user) {
        res.status(404).send({
            status: false,
            code: 404,
            message: 'Usuário não encontrado'
        });
        return;
    }

    if (!UserRepository.deleteById(req.params.id)) {
        res.status(500).send({
            status: false,
            code: 500,
            message: 'Houve um erro desconhecido ao apagar o usuário'
        });
        return;
    }

    res.send({
        status: true
    });
});

module.exports = app;
