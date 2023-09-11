const fastify = require('fastify')();
import cors from '@fastify/cors';
import books from './Routes/book.js';

fastify.register(cors, {
    origin: '*'
});


fastify.register(books, { prefix: '/books' });




fastify.listen({
    host: '0.0.0.0',
    port: process.env.PORT || 3000
})