// - mangaKa - version : 0.0.1
const express = require("express");
const fs = require('fs');
const routes = require("./Routes");
const porta = process.env.PORT;

const app = express();

app.use(routes);


app.listen(porta || 5000, ()=> console.log("servidor rodando na porta : "+ (porta || 5000)));