require('dotenv').config();
const fastify = require('fastify')({ logger: false });
const cors = require('@fastify/cors');


const {
    PGHOST,
    PGDATABASE,
    PGUSER,
    PGPASSWORD,
    ENDPOINT_ID
} = process.env;


fastify.register(cors, {
    origin: '*'
});


fastify.register(require('@fastify/postgres'), {
    connectionString: `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`,
    ssl: true
})

require("./Routes/route")(fastify);


fastify.listen({
    host: '0.0.0.0',
    port: process.env.PORT || 3000
})