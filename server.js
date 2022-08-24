// - mangaKa - version : 0.1.3
const express = require("express");
const http = require("http");
//const request = require("request");
// const fs = require('fs');
// const db = require("./db");
const routes = require("./Routes");
const porta = process.env.PORT || 5000;

//ver o ip
// const axios = require("axios");
// axios({
//     url:'http://api.ipify.org'
// })
// .then(res => console.log(res.data));
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
 const server = http.createServer(app);
server.listen(porta, ()=> console.log("servidor rodando na porta : "+ porta));