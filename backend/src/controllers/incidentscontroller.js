const connection = require('../database/connection');

module.exports ={

//Listagem dos dados de todas os casos

async index (request, response){
    /*Limitando a listagem a cada 5 registros */
    const {page = 1} = request.query;
    /*Contando o total de Incidentes (casos)  */
    const [count] = await connection('incidents')
    .count();
    
    /****************Fim contador***************************/
    const casos = await connection('incidents')
    .join('ongs','ongs.id','=','incidents.ong_id')
    .limit(5) //Limite de 5 incidents
    .offset((page - 1) * 5)
    .select(['incidents.*', 
    'ongs.name',
    'ongs.email',
    'ongs.whatsapp',
    'ongs.city',
    'ongs.uf']);

    /**retornando a quantidade de incidencias pelo o cabeçalho da requisição*/
    response.header('X-Total-Count', count['count(*)']);
    /**********************************************************/
    return response.json(casos);

},
       // Inserindo dados na tabela incidents / Casos
    async create(request,response){
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });
        return response.json({id});
    },


    async delete(request, response){
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const casos = await connection('incidents')
        .where('id',id)
        .select('ong_id')
        .first();

        if (casos.ong_id != ong_id) {
            return response.status(401).json({error: 'Operartion not permitted'});
        }

        await connection('incidents').where('id',id).delete();
        return response.status(204).send();

    }
};