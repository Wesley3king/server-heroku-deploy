const db = require("./db");
const sc = require("./scraping");
const tstf = require("./testefunctions");
//const axios = require("axios");

//vasculha o manga
async function vasculhar_manga (url) {
    let dad = await sc.entrar(url).catch(console.log);
    let cap = [];
    //console.log(dad[2]);
    for (let i of dad[2]) {
        
        let data_cap = await sc.leitor(`https://mangayabu.top/?p=${i[1]}`).catch(console.log);
        console.log(i);
        cap.push([i[0],i[1], data_cap[0], data_cap[1], data_cap[3]]);
    };

    let dados = {
        nome : dad[3],
        capa1 : dad[4],
        capa2 : "",
        sinopse : dad[0],
        link : url,
        categorias : dad[1],
        capitulos : cap
    }

    return dados;
}
//inserir manga
async function insert_Manga (data) {
    let ins = await db.inserir_novo_manga(data);
    console.log(ins ? "sucesso" : "ERRO na inserção do manga");
}
//atualiza o main
async function atualizarMain () {
    let dt = await sc.obter();
    let sucess = await db.main_save(JSON.parse(dt));
    console.log(sucess ? "atualizado":"falha ao atualizar");
 }

//testa se o manga existe
const vasculhar_main = async (url) => {
   // let main = await db.find_main();

   // for(let e of main["lancamentos"]){

       let existe = await db.verificar_manga();
      //  console.log(existe ? "tem" : "não tem");

        if (existe) {

        }else{
           //console.log(e[2]);
           //let dados = await vasculhar_manga(e[2]);
           let dados = await vasculhar_manga(url);
           await insert_Manga(dados);
        }
   // }
}

module.exports = { atualizarMain, vasculhar_main };