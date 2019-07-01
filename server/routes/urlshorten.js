import mongoose from "mongoose";
import { isUri } from "valid-url";
const UrlShorten = mongoose.model("UrlShorten");
import { generate } from "shortid";
const errorUrl = 'http://localhost/error';

export default app => {
    
    //GET API for redirecting to Original URL
    app.get("/:code", async (req, res) =>{
        const urlCode = req.params.code;
        const item = await UrlShorten.findOne({ urlCode: urlCode });
        if(item){
            var delim = item.originalUrl.indexOf("?") >=0 ? "&mePort=" : "?mePort=";

            item.originalUrl = item.originalUrl + delim + app.mePort;
            console.log(item.originalUrl);
            //res.set("mePort", app.mePort);
            //return res.redirect(item.originalUrl);
            return res.status(200).json(item);
        }else{
            return res.redirect(errorUrl);
        }
    });

    //POST API for creating short url from Original URL
    app.post("/api/item", async (req, res) => {
        const { originalUrl } = req.body;
        //const shortBaseUrl = 'http://uo.a';
        const shortBaseUrl = 'http://jvardas.dyndns.org';
        if(!isUri(shortBaseUrl)){
            return res.status(401).json("Invalid Base Url");
        }
        
        const urlCode = generate();
        const updatedAt = new Date();
        if (isUri(originalUrl)){
            try{
                const item = await UrlShorten.findOne({ originalUrl: originalUrl });
                if(item){
                    res.status(200).json(item);
                }else {
                    let shortUrl = shortBaseUrl + "/" + urlCode;
                    const item = new UrlShorten({
                        originalUrl,
                        shortUrl,
                        urlCode,
                        updatedAt
                    });
                    await item.save();
                    res.status(200).json(item);
                }
            } catch (err) {
                res.status(401).status("Invalid User Id");
            }
        } else {
            return res
                .status(401)
                .json(
                    "Invalid Original Url"
                );
        }
    });
};