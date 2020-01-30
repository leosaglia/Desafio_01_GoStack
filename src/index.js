const express = require('express');
const routes = require('./routes');

const app = express();

// let contagem = 0;

app.use(express.json());

app.use((req, res, next) => {
    console.count("número de requisições");
    // contagem += 1;
    // console.log(`Requisição do tipo ${req.method} - Total de requisições realizadas ${contagem}`);
    return next();
});

app.use(routes);

app.listen(1234);