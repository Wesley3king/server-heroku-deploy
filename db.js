//mongo db connection
const mongoClient = require("mongodb").MongoClient;

const url = "mongodb+srv://king_of_project:UwXWp7BPdGrY1R4l@cluster0.5bcwwx7.mongodb.net/?retryWrites=true&w=majority";
const database = "mangaka" user_banco = "usuario", main_banco = "mainpage", data_banco = "dataall";

//estabelece a conexão:
const conectar = async ()=> {
    if (global.connection && global.connection.state != 'disconected')
        return global.connection;

mongoClient.connect(url, {useUnifiedTopology: true}, (err, connection)=>{
    if (err) console.log(err)
    else {
        global.connection = connection.db("testelocal");
        console.log("connected!");
        return global.connection;
    };
 });
};

//gravar o main
const main_save = async (nomes) => {
    let banco = await conectar();
    let db = banco.db(database);
    db.collection(main_banco).deleteMany({}, (err, result)=>{
        if (err) console.log(err)
        else console.log("deletado");
    });
    db.collection(main_banco).insertMany(nomes, (err, result)=>{
        if (err) console.log(err)
        else console.log("inserido");
    });

};

//retirar do main
const find_main = async ()=> {
    let banco = await conectar();
    let db = banco.db(database);
    db.collection(main_banco).find({}, (err, result)=>{
        if (err) console.log(err)
        else {
            console.log(result);
            return result;
        };
    });
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