// - mangaKa - version : 0.0.1
const express = require("express");
const fs = require('fs');
const routes = require("./Routes");
const porta = process.env.PORT || 5000;

const app = express();

app.use(routes);


app.listen(porta, ()=> console.log("servidor rodando na porta : "+ (porta || 5000)));