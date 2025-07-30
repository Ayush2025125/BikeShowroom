const express = require('express');

const server = express();

PORT = 8000;

server.get('/',(req, res, next, ) => {
    console.log("Hello meri jaan");
    console.log(req.params);
});

server.listen(PORT , () => {
    console.log(`server running at http://localhost:${PORT}`);
})