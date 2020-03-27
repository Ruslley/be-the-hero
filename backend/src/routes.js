const express = require('express');
const {celebrate, Segments, Joi} = require ('celebrate');
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
 /**
  * Query
  * Route
  * Body
  */
routes.post('/ongs', celebrate({
[Segments.BODY]: Joi.object().keys({
name: Joi.string().required(),
email: Joi.string().required().email(),
whatsapp: Joi.string().required().min(10).max(11),
city: Joi.string().required(),
//uf: Joi.string().required().min(2).max(2)
uf: Joi.string().required().length(2)
})
}), ongcontrolle.create); 
/*************************** */
routes.get('/profile',celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), profileController.index);

// Rota para inserção de dados na tabela casos
routes.post('/incidents', incidentcontroller.create);


//Rota para listagem de todas os casos Cadastrados
routes.get('/incidents',celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}) ,incidentcontroller.index);



//Rota para deletar o caso Cadastrado
routes.delete('/incidents/:id',celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), incidentcontroller.delete);

module.exports = routes;