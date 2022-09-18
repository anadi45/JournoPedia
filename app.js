require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const { connectDB } = require('./src/config/db');
const {router} = require("./src/routes/routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/",router);

connectDB();

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
})