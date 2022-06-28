// - mangaKa - version : 0.0.1
const express = require("express");
const request = require("request");
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
*/
 async function inserir () {
    let ok = await db.add_user({
        nome_user : "king",
        address : "moraeswesley290@gmail.com",
        password : "mangaka#1",
        favoritos : [
            {
                nome : "Solo Leveling",
                url : "https://mangayabu.top/manga/solo-leveling",
                img : "https://mangayabu.top/wp-content/uploads/2022/03/3b158e8c0060cfdcad4b.webp",
                lidos : []
            }
        ],
        lidos_only : [

        ]
    });
    console.log(ok ? "inserido": "falha");
 }
 //inserir();
app.listen(porta, ()=> console.log("servidor rodando na porta : "+ porta));