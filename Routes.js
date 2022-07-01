const express = require("express");
//const url = require("url");
const fs = require("fs");
//const sc = require("./scraping");
//const { isNull } = require("util");
const mod = require("./componentes");
const db = require("./db");
const cors=require("cors");
const routes = express.Router();
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
 
//rota HOME - rota HOME logado
 routes.get('/',async (req,res)=>{
//https://wesley3king.github.io/mangaKa/maked/
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    let data = await db.find_main();
    console.log("data : ",data);
    res.json(data);
 });

 //eviar destaques
 routes.get("/destaques",(req,res)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    fs.readFile("./archives/Destaques.json",(err,file)=>{
        if(err) console.log("erro ao ler list.json");
        let ark = JSON.parse(file);
        res.json(ark);
    });
 });
routes.use(express.json());//habilita que todas as rotas vão receber json
routes.post('/login', async (req,res)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    let data = req.body;
    console.log(data);
    let dados = await db.read_user(data.mail, data.password).catch(console.log);
    if (dados) {
        res.json(dados);
    }else{
        res.send(dados);
    }
});
//rota de alteração de capitulos
routes.post('/alterarcap', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    let data = req.body;
    console.log(data); // mail / pass / arr
//  let dados = await db.read_user(data.mail, data.password).catch(console.log);
    let pull = await db.pull_readed(data.mail, data.password, data.dados["nome"]).catch(console.log);
    let inserir = false;
    if (pull) {
        inserir = await db.add_readed(data.mail, data.password, 0, data.dados).catch(console.log);
    }

    res.send(inserir);
});
 //rota MAIN
 routes.use(cors(corsOptions));
routes.post('/manga',async (req,res)=>{

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    let req_data = req.body;
    console.log("requisicao manga : ",req_data.url);

    let dad = await db.obter_manga(req_data.url);
    console.log(dad);
    res.json({"data" : dad});

    
});

//leitor

/*routes.post('/manga/leitor', async (req, res)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    let req_data = req.body;
    console.log("requisicao leitor : ",req_data.url);
    let dados = await sc.leitor(req_data.url).catch(e=>console.log(e));
    console.log(dados);
    res.json({"data": dados});
});*/

//pesquisar

/*routes.post('/pesquisar', async (req, res)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    let req_data = req.body;
    console.log("requisicao pesquisa : ",req_data.nome);
    let dados = await sc.search("https://mangayabu.top/lista-de-mangas/#mangasearch",req_data.nome).catch(e=>console.log(e));
    console.log(dados);
    res.json({"data": dados});
});*/

// reação de atualização

routes.post('/server/update', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    let req_data = req.body;
    let att = await db.urlUpdate(req_data.url);
    //console.log("requisicao p: ",req_data.nome);
    await mod.vasculhar_main();
    res.send(att?"operação concluida":"falha!");
});

module.exports = routes;