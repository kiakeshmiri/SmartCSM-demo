const fastify = require('fastify')()
const path = require('path');

fastify.register(require('fastify-cors'), {
})


fastify.register(require('fastify-static'), {
  root: path.join(__dirname, './smartCSM-challange/dist/smartCSM-challange/'),
  prefix: '/', // optional: default '/'
})

fastify.get('/games', async (request, reply) => {
    let jsonData = require('./games.json');

    reply.send(jsonData);
});

fastify.get('/participants', async (request, reply) => {

    let jsonData = require('./participants.json');

    reply.send(jsonData);
});


const start = async () => {
    try {
        console.log("starting server at port 3000");
        await fastify.listen(3000)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()