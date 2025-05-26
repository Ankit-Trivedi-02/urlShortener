const express = require("express");
const {loadSignUpPage,loadLoginPage,createUser,loginUser} = require("../controller/user");
const routes = express.Router();


routes.get("/sign-up",loadSignUpPage);
routes.get("/login",loadLoginPage)
routes.post("/sign-up",createUser);
routes.post("/login",loginUser);

module.exports=routes;