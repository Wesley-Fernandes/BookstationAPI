
var uuid = require('uuid-random');

exports.books = (fastify) => {

    fastify.get('/books', (request, reply) => {
        fastify.pg.query(`SELECT * FROM books`).then((result) => {
            return reply.send(result.rows);
        }).catch((err) => {
            return reply.send({ error: err.message });
        });
    });


    fastify.get('/books/:id', async (request, reply) => {
        const id = request.params.id;
        console.log(id);
        await fastify.pg.query(`SELECT * FROM books WHERE id = '${id}'`).then((result) => {
            return reply.send(result.rows);
        }).catch((err) => {
            return reply.send({ error: err.message });
        });
    })

    fastify.post('/books', async (request, reply) => {
        const id = uuid();
        const {
            title,
            author,
            description,
            cover_image,
            publication_year,
            likes,
            categories
        } = request.body;


        await fastify.pg.query(`INSERT INTO books (id, title, author, description, cover_image, publication_year, likes, categories) VALUES (${id}, ${title}, ${author}, ${description}, ${cover_image}, ${publication_year}, ${likes}, ${categories}) RETURNING id`).then((result) => {
            return reply.send({ status: "Criado com sucesso." });
        }).catch((err) => {
            return reply.send({ error: err.message });
        });
    });


    fastify.put(('/books/:id'), async (request, reply) => {
        const id = request.params.id;

        const {
            title,
            author,
            description,
            cover_image,
            publication_year,
            likes,
            categories
        } = request.body;

        await fastify.pg.query(`update books SET title = ${title}, author = ${author}, description = ${description}, cover_image = ${cover_image}, publication_year = ${publication_year}, likes = ${likes}, categories = ${categories} WHERE id = '${id}'`).then((result) => {
            return reply.send({ status: "Atualizado com sucesso." });
        }).catch((err) => {
            return reply.send({ error: err.message });
        });
    })


    fastify.delete(('/books/:id'), async (request, reply) => {
        const id = request.params.id;

        await fastify.pg.query(`DELETE FROM books WHERE id = '${id}'`).then((result) => {
            return reply.send({ status: "Deletado com sucesso." });
        }).catch((err) => {
            return reply.send({ error: err.message });
        });

    });


}