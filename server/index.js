//
import express from "express";
import { json } from "body-parser";
import mongoose from "mongoose";

console.log("Me args: " + process.argv);
let mePort = null;
process.argv.forEach(arg => {
    if(arg.startsWith("port:")){
        mePort = parseInt(arg.replace("port:",""));
    }
});

console.log("Me port: " + mePort);

const mongoURI = "mongodb://localhost/UrlShorten";
const connectOptions = {
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE
};

mongoose.Promise = global.Promise;
mongoose.connect(mongoURI, connectOptions, (err, db) => 
{
    if(err) console.log('Error', err);
    console.log('Connected to MongoDB');
});
import './models/UrlShorten';

const app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-type,Accept,x-access-token,X-key"
    );
    if(req.method == "OPTIONS") {
        res.status(200).end();
    }else{
        next();
    }
});
app.use(json());

import urlshorten from "./routes/urlshorten";
urlshorten(app);
import testAPI from './routes/testAPI';
testAPI(app);



const PORT = mePort || 7000;
//start server on 7000
app.listen(PORT, ()=> {
    console.log('Server started on port', PORT);
})

app.mePort = PORT;