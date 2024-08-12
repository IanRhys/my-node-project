const express = require("express");
const { register, login } = require("../controllers/authControllers");
const router = express.Router();


//breaks the server for some reason, maybe needs to be set as part of a page
// router.post("/register", register);
// router.post("/login", login);

module.exports = router;