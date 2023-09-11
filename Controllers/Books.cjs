const { randomUUID } = require('node:crypto');
const sql = require('../Database/db.js');

module.export = class Books {

    async list(search) {
        let books;

        if (search) {
            books = await sql`Select * from books where title ilike ${'%' + search + '%'}`
        } else {
            books = await sql`Select * from books`
        }

        return books;
    }

    async choice(id) {
        let books;
        books = await sql`SELECT * FROM books WHERE id = ${String(id.id)}`;
        return books;
    }

    async create(book) {
        const id = randomUUID();
        const { title, author, description, cover_image, publication_year, likes, categories } = book;
        console.log(title, author, description, cover_image, publication_year, likes, categories);

        try {
            const result = await sql`INSERT INTO books (id, title, author, description, cover_image, publication_year, likes, categories) VALUES (${id}, ${title}, ${author}, ${description}, ${cover_image}, ${publication_year}, ${likes}, ${categories}) RETURNING id`;
            console.log(result);
        } catch (err) {
            console.error(err);
        }
    }

    async update(id, book) {
        console.log(book)
        const { title, author, description, cover_image, publication_year, likes, categories } = book;

        await sql`update books SET title = ${title}, author = ${author}, description = ${description}, cover_image = ${cover_image}, publication_year = ${publication_year}, likes = ${likes}, categories = ${categories} WHERE id = ${id}`;


    }

    async delete(id) {
        console.log(id);
        try {
            await sql`DELETE FROM books WHERE id = ${String(id)}`;
            return true;
        } catch (error) {
            return { message: "This id is not exist" };
        }
    }

}