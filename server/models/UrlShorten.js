import mongoose from "mongoose";

const urlShortenSchema = new mongoose.Schema({
    originalUrl: String,
    urlCode: String,
    shortUrl: String,
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type:Date, default: Date.now}
});

mongoose.model('UrlShorten', urlShortenSchema);