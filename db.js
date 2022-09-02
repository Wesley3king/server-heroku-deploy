//mongo db connection
const mongo = require("mongodb");
const mongoClient = mongo.MongoClient;
//const connect_db = require("./db_testes");

const url = "mongodb+srv://king_of_project:UwXWp7BPdGrY1R4l@cluster0.5bcwwx7.mongodb.net/?retryWrites=true&w=majority";
const database = "mangaka", user_banco = "usuario", main_banco = "mainpage", data_banco = "dataall";
const server_banco = "servidor";
const user_database = "users";

//estabelece a conexão:
const conectar = async ()=> {
        //const client = await connect_db.connect().catch(console.log);
        const client = await mongoClient.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).catch(console.log);
        console.log('conectado!');
        return client.db(database);
};

const conectar_user = async () => {
    const client = await mongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).catch(console.log);
    console.log('conectado!');
    return client.db(user_database);
};
//atualizar url MAINSERVER
const urlUpdate = async (url) => {
    let banco = await conectar();
    await banco.collection(server_banco).updateOne({}, {$set: {url: url}});

    return true;
};
//pegar o servidor id
const urlGet = async () => {
    let banco = await conectar().catch(console.log);
    let res = await banco.collection(server_banco).findOne({}, {projection: {_id: 0}});
    return res;
};
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
    let regex = new RegExp(`${link}`, 'ig');
    let encontrar = await db.collection(data_banco).findOne({"link": regex}, {projection : {_id: 0}});
    return encontrar;
}
//procurar os mangas do banco
const searchMangas = async (txt) => {
    let db = await conectar();
    let regex = new RegExp(`${txt}`, 'ig');
    let encontrados = await db.collection(data_banco).find({"nome": regex}, {projection : {_id: 0}});
    return encontrados;
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
const add_user = async (data) => {
    let db = await conectar_user();
    let insert = await db.collection(user_banco).insertOne(data);
    return insert ? true : false;
};

//ler usuario
const read_user = async (mail, senha) => {
    let db = await conectar_user();
    let data = db.collection(user_banco).findOne({address : mail, password: senha},{projection : {_id : 0}});
    return data ? data : false;
};

//adicionar favoritos

const add_favorito = async (mail, senha, data) => {
    let db = await conectar_user().catch(console.log);
    let query = {"$push" : {"favoritos": {"$each": [data], "$position": 0}}};
    let insert = await db.collection(user_banco).updateMany({address: mail , password: senha}, query);
    console.log(insert);
    return insert ? true : false;
}

//remover favorito
const delete_favorito = async (mail, senha, data) => {
    let db = await conectar_user().catch(console.log);
    console.log(data);
    let query = {"$pull" : {favoritos : {nome : data}}};
    let insert = await db.collection(user_banco).updateMany({address: mail , password: senha}, query);
    return insert;
};
//adicionar capitulo lido
const add_readed = async (mail, senha, pos , data) => {
    let db = await conectar_user();
    let query = {"$push": {lidos : {"$each": [data], "$position": pos}}};
    let insert = await db.collection(user_banco).updateMany({address: mail , password: senha}, query);
    return insert ? true : false;
};

//remover capitulo lido
const pull_readed = async (mail, senha, data) => {
    let db = await conectar_user(); // data === nome
    let query = {"$pull": {"lidos" : {nome : data}}};
    let inserir = await db.collection(user_banco).updateOne({address: mail, password : senha}, query);
    console.log(inserir);
    return typeof inserir === "object" ? true : false;
};

module.exports = {main_save, find_main, inserir_novo_manga, urlUpdate, urlGet, verificar_manga, obter_manga, searchMangas, add_user, add_readed, pull_readed,read_user, add_favorito, delete_favorito }