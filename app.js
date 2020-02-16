const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const observationModel = require('./models/observation');

const CONNECTION_URL = "mongodb+srv://root:root@cluster0-d44lb.gcp.mongodb.net/test?retryWrites=true&w=majority"
const DATABASE_NAME = "db";

var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

var database, collection;

app.listen(3000, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("observations");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});

app.post('/observations', (request, response) => {
    const observation = new observationModel(request.body);
  
    collection.insert(observation, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    });
  });
