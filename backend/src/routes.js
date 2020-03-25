const express = require('express');
const ongcontrolle = require('./controllers/ongcontroller');
const incidentcontroller = require('./controllers/incidentscontroller');
const profileController = require('./controllers/profilecontroller');
const sessionscontroller = require ('./controllers/sessioncontroller');

const routes = express.Router();

/*Rota para iniciar a sessão da ong */

routes.post('/sessioncontroller', sessionscontroller.create);

//Rota para listagem de todas as ongs Cadastradas
routes.get('/ongs',ongcontrolle.index);
 // Rota para inserção de dados na tabela ongs
routes.post('/ongs', ongcontrolle.create); 
/*************************** */
routes.get('/profile',profileController.index);
// Rota para inserção de dados na tabela casos
routes.post('/incidents', incidentcontroller.create);
//Rota para listagem de todas os casos Cadastrados
routes.get('/incidents',incidentcontroller.index);
//Rota para deletar o caso Cadastrado
routes.delete('/incidents/:id',incidentcontroller.delete);

module.exports = routes;