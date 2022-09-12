require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const { connectDB } = require('./src/config/db');
const {router} = require("./src/routes/testRoute");

app.get("/",router);

connectDB();

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
})