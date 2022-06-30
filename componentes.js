const db = require("./db");
//const axios = require("axios");

//atualiza o main
async function requestMain () {
    await axios.post('http://127.0.0.1:5000/', async (err, response, data)=>{
         if (!err && response.statusCode === 200) {
             console.log(data);
            await db.main_save(JSON.parse(data));
         }
     })
 }

//testa se o manga existe
const vasculhar_main = async () => {
    let first_data = await db.find_main();

    for(let e of first_data["lancamentos"]){

        let existe = await db.verificar_manga();
        console.log(existe ? "tem" : "não tem");

        if (existe) {

        }else{
           await axios({
            url: "http://127.0.0.1:5000/total",
            method: "POST",
            json: true,
            body: JSON.stringify({"link": e[2]})
        }, async (err, response, data)=>{
                if (!err && response.statusCode === 200) {
                    console.log(data);
                    await db.inserir_novo_manga(JSON.parse(data));
                }
            })
        }
    }
}

module.exports = { requestMain, vasculhar_main };