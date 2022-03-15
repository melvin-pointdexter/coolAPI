const express = require('express');
//import express from 'express';
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));     //extended: true added from online, not lesson
app.use(bodyParser.json());

const accountRoute=require('./controllers/accounts.js');
app.use('/api/accounts',accountRoute);

const port=5090;
app.listen(port,function(){
    console.log("Console is running via port "+ port);
});
console.log("Test");


