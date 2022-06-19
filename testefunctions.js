const sc = require("./scraping");

const retirar_cap = async (i) => {
    console.log("chegou aqui !");
    let data_cap = await sc.leitor(`https://mangayabu.top/?p=${i[1]}`).catch(console.log);
    console.log("chegou aqui 2 !");

    if (typeof data_cap[0] != "string" || typeof data_cap[3] != "object"){
        return false;
    }else{
        return [i[0],i[1], data_cap[0], data_cap[1], data_cap[3]]
    }
}

module.exports = {retirar_cap};