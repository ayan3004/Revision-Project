const express = require("express");
const app = express()
const port = 5555;
const db = require("./config/db");
const cors = require('cors')
const path = require('path')

app.use(express.json())
app.use(express.urlencoded());

app.use(cors({
    origin: 'http://localhost:3000'
}))

app.use('/uploades', express.static(path.join(__dirname, 'uploades')))
app.use('/uploades/admin', express.static(path.join(__dirname, 'uploades/admin')))
app.use('/uploades/Recipe', express.static(path.join(__dirname, 'uploades/Recipe')))

app.use('/admin', require('./routes/admin'));
app.use('/recipe', require('./routes/recipe'))


app.listen(port , (err)=>{
    err ? console.log(err) : console.log(`server started on ${port}`);
})

