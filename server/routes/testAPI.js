//import express from "express";
//var router = express.Router();

export default router => {
  router.get("/", function(req, res) {
    res.send("API is working properly");
  });
};

//export default router;
