import Books from '../Controllers/Books.cjs';

exports.BookRoutes = (server) => {
    const books = new Books();

    server.get('/books', async (request, reply) => {
        const search = request.query.search;
        const books = await books.list(search);
        return reply.status(200).send(books);
    });

    //Criar dados
    server.post('/books', async (request, reply) => {

        const title = request.body.title;
        const author = request.body.author;
        const description = request.body.description;
        const cover_image = request.body.cover_image;
        const publication_year = request.body.publication_year;
        const likes = request.body.likes;
        const categories = request.body.categories;

        try {
            await books.create({
                title,
                author,
                description,
                cover_image,
                publication_year,
                likes,
                categories
            });

            return reply.status(201).send();

        } catch (error) {

            return reply.status(400).send(error);
        }

    });

    //Buscar por ID
    server.get('/books/:id', async (request, reply) => {

        const id = request.params.id;
        console.log(id);

        try {
            const book = await books.choice({ id: id });
            return reply.status(201).send(book);

        } catch (error) {

            return reply.status(400).send(error);
        }

    });

    //Atualizar dados
    server.put('/books/:id', async (request, reply) => {

        const { id } = request.params;
        const title = request.body.title;
        const author = request.body.author;
        const description = request.body.description;
        const cover_image = request.body.cover_image;
        const publication_year = request.body.publication_year;
        const likes = request.body.likes;
        const categories = request.body.categories;

        try {
            await books.update(id, {
                title,
                author,
                description,
                cover_image,
                publication_year,
                likes,
                categories
            });

            return reply.status(201).send("Atualizado com sucesso.");

        } catch (error) {

            return reply.status(400).send(error);
        }

    });

    //Deletar dados
    server.delete('/books/:id', async (request, reply) => {

        const { id } = request.params;

        try {
            await books.delete(id);
            return reply.status(200).send("Deletado com sucesso");
        } catch (error) {
            return reply.status(400).send(error);
        }

    });

}