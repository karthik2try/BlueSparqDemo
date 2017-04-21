'use strict';
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('./database');

    app.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false

   }));
   app.use(express.static('public'));
   app.set('view engine','ejs');
   app.use(bodyParser.urlencoded({extended:true}));
   app.use('/',require('./router'));
   app.listen(3000,function(err){
  if(!err){
    console.log('express listening to port 3000');
  }
});
