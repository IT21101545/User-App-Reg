const express= require('express');
const router= express.Router();

// import user controller

const{ registerUser, login } = require("../Controllers/UserControllers");


// register user route
router.post("/register", registerUser);

// login user route
router.post("/login", login);

module.exports= router;
