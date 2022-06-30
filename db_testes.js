const mongo = require("mongodb");
const mongoClient = mongo.MongoClient;

const url = "mongodb+srv://king_of_project:UwXWp7BPdGrY1R4l@cluster0.5bcwwx7.mongodb.net/?retryWrites=true&w=majority";

const connect = async () => {
    const client = await mongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).catch(console.log);
    return client;
}

module.exports = { connect };