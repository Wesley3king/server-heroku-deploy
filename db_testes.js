const mongo = require("mongodb");
const mongoClient = mongo.MongoClient;

const url = "";

const connect = async () => {
    const client = await mongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).catch(console.log);
    return client;
}

module.exports = { connect };