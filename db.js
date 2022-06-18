//mongo db connection
const mongoClient = require("mongodb").MongoClient;

const url = "mongodb+srv://king_of_project:UwXWp7BPdGrY1R4l@cluster0.5bcwwx7.mongodb.net/?retryWrites=true&w=majority";
const database = "mangaka", user_banco = "usuario", main_banco = "mainpage", data_banco = "dataall";
const server_banco = "servidor"

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

    await banco.collection(server_banco).updateOne({url: url}, (err, result)=>{
        if (err) console.log(err)
        else console.log("inserido");
    })
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

//retirar do main
const find_main = async ()=> {
    let db = await conectar();
    let data = await db.collection(main_banco).findOne({},{projection: {_id: 0}});
    return data;
}

//inserir no data_banco
const inserir_novo_manga = async (mangas) =>{
    let banco = await conectar();
    let db = banco.db(database);
    db.collection(main_banco).insertMany(mangas, (err, result)=>{
        if (err) console.log(err)
        else console.log("inserido");
    });
};

module.exports = {main_save, find_main, inserir_novo_manga, urlUpdate}