import { MongoClient, ServerApiVersion } from 'mongodb';
let client;

function connect(callback){
    mongoClient.connect(process.env.MONGO_GENOPI, (err, db) => {
        client = db;
        callback();
    });
}
function get(){
    return client;
}

function close(){
    client.close();
}

module.exports = {
    connect,
    get,
    close
};