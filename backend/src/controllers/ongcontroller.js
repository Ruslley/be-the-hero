//const crypto = require('crypto');
const generateUniqueId = require ('../utils/generateUniqueId');

const connection = require('../database/connection'); // importando arquivo de conexão

module.exports = {

    //Listagem dos dados de todas as Ong's

    async index (request, response){
        const ongs = await connection('ongs').select('*');
        return response.json(ongs);

    }, // ',' para iniciar o proximo comando

    //Criando as informações no banco de dados

  async create(request,response){
    const {name,email,whatsapp,city,uf} = request.body;

    const id = generateUniqueId();
    /**
     * SOLICITA O PACOTE CRYPTO A FUNÇÃO PARA GERAR O ID DA ONG
     * COM 4 BYTES E CONVERTE PARA UMA STRING HEXADECIMAL.
     */
    
     /**
      * Adicionando os dados no banco de dados 
      */
    await connection('ongs').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf,
    });

    return response.json({id});

}

  };