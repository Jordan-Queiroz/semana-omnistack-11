const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('incidents').count();

        // With pagination
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            // get only 5 elements
            .limit(5)
            // Skip N elements and get the next 5 ones
            .offset((page - 1) * 5)
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);

        // Returns total elements in DB
        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        /**
         * A inserção é de apenas um elemento. Logo o array do resultado vai 
         * conter apenas 1 elemento. [id] -> pega o id do primeiro elemento do 
         * array
         */
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        // Retorna o id do incident criado
        return response.json({ id })
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        /**
         * Gets the incident by ID create by the ONG
         * Since an incident is unique, there is no problem to get the first
         *  */
        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if (incident.ong_id !== ong_id) {
            return response.status(401).json({ error: 'Operation not permitted'});
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    }
}