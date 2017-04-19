'use strict';
const express = require('express');
const app = express();

app.use('/',require('./router'));

app.listen(3000,function(err){
  if(!err){
    console.log('express listening to port 3000');
  }
});
