const express = require("express");
const routes = express.Router();


routes.get("/",(req,res)=>{
    res.render('home',{allUrls:null});
});



module.exports=routes;