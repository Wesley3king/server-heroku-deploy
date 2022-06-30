// - mangaKa - version : 0.0.1
const express = require("express");
//const request = require("request");
const fs = require('fs');
const db = require("./db");
const routes = require("./Routes");
const porta = process.env.PORT || 5000;

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

 async function inserir () {
    let readed = await db.add_readed("moraeswesley290@gmail.com", "mangaka#1", 0, {nome : "Solo Leveling", mark : ["37822","37824","37828"]});
    console.log(readed ? "inserido":"failed");
 }*/
 //inserir();
app.listen(porta, ()=> console.log("servidor rodando na porta : "+ porta));