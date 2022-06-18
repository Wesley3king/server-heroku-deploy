// - mangaKa - version : 0.0.1
const express = require("express");
const request = require("request");
const fs = require('fs');
const db = require("./db");
const routes = require("./Routes");
const porta = process.env.PORT || 5200;

const app = express();

app.use(routes);
/*
async function requestMain () {
   await request('http://127.0.0.1:5000/', async (err, response, data)=>{
        if (!err && response.statusCode === 200) {
            console.log(data);
           // await db.main_save(JSON.parse(data));
            console.log(await db.find_main());
        }
    })
}
requestMain();
*/
app.listen(porta, ()=> console.log("servidor rodando na porta : "+ porta));