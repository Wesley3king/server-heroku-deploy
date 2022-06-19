const sc = require("./scraping");
const tstf = require("./testefunctions");

async function vasculhar_manga (url) {
    let dad = await sc.entrar(url).catch(console.log);
    let cap = [];
    //console.log(dad[2]);
    for (let i of dad[2]) {
        let ready = false;
        while(!ready){
            let data_cap = await tstf.retirar_cap(i).catch(console.log);
            if (data_cap){
                console.log("entrou");
                cap.push([i[0],i[1], data_cap[0], data_cap[1], data_cap[3]]);
                ready = true;
            }else{
                console.log("failed");
            }
        }
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

    console.log(dados);
}
async function vasculhar_manga2 (url) {
    await vasculhar_manga(url).catch(console.log);
}
vasculhar_manga2("https://mangayabu.top/manga/naze-boku-no-sekai-wo-daremo-oboeteinai-no-ka/");