const { books } = require('./books');


module.exports = fastify => {
    books(fastify)
}