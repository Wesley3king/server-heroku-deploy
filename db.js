//mongo db connection
const mongoClient = require("mongodb").MongoClient;

const url = "mongodb+srv://king_of_project:UwXWp7BPdGrY1R4l@cluster0.5bcwwx7.mongodb.net/?retryWrites=true&w=majority";
const database = "mangaka", user_banco = "usuario", main_banco = "mainpage", data_banco = "dataall";
const server_banco = "servidor";
const client_col = "usuarios", user_database = "users";

//estabelece a conexão:
const conectar = async ()=> {
        const client = await mongoClient.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('conectado!')
        return client.db(database)
};
//atualizar url MAINSERVER
const urlUpdate = async (url) => {
    let banco = await conectar();

    await banco.collection(server_banco).updateOne({}, {$set: {url: url}});

    return true;
}
//gravar o main
const main_save = async (nomes) => {
    let banco = await conectar();

    await banco.collection(main_banco).deleteOne({}, (err, result)=>{
        if (err) console.log(err)
        else console.log("deletado");
    });

    let ok = await banco.collection(main_banco).insertOne(nomes, (err, result)=>{
        if (err) console.log(err)
        else console.log("inserido");
    });

    if (ok) return true;
};

//enviar o main
const find_main = async ()=> {
    let db = await conectar();
    let data = await db.collection(main_banco).findOne({},{projection: {_id: 0}});
    return data;
}

//inserir no data_banco
const inserir_novo_manga = async (manga) =>{
    let db = await conectar();
    let ad = await db.collection(data_banco).insertOne(manga, (err, result)=>{
        if (err) console.log(err)
        else console.log("inserido");
    });
    //return ad ? true : false;
};

// procurar no banco
const verificar_manga = async (nome_m) => {
    let db = await conectar();
    let encontrar = await db.collection(data_banco).findOne({nome: nome_m}, (err, result)=>{
        if (err) console.log(err);
    });
    return encontrar;
}
//enviar o manga do banco
const obter_manga = async (link) => {
    let db = await conectar();
    let encontrar = await db.collection(data_banco).findOne({"link": link}, {projection : {_id: 0}});
    return encontrar;
}

//obter capitulo
const obter_capitulo = async (link, num_url) => {
    let db = await conectar();
    let encontrar = await db.collection(data_banco).findOne({"link": link}, {projection : {_id: 0}});
    return encontrar;
}
//adicionar um capitulo
const adicionar_capitulo = async (nome,data) => {
    let db = await conectar();
    let encontrar = await db.collection(data_banco).update0ne({"nome": nome}, {$push})
}

//usuario
//adicionar usuario
//adicionar favoritos

//adicionar capitulo lido
const add_readed = async () => {

}
//remover favorito

//remover capitulo lido


module.exports = {main_save, find_main, inserir_novo_manga, urlUpdate, verificar_manga, obter_manga}