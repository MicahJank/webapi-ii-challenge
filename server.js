const express = require('express');


const postsRouter = require('./posts/posts-router.js');

const server = express();

server.use(express.json());

server.use('/api/posts', postsRouter);

server.get('/', (req, res) => {
    res.send(`
        <h2>Welcomes to Web API II</h2>
    `);
});


module.exports = server;