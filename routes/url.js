const express = require("express");
const { handelInputUrl,handleRedirectUrl } = require("../controller/url");
const routes = express.Router();

routes.post("/", handelInputUrl);
routes.get("/",(req,res)=>{res.json({msg:"hello"})});
routes.get("/:id",handleRedirectUrl);


module.exports = routes;