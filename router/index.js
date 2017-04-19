const express = require('express');
const router = express.Router();
const controller = require('../controller');
router.get('/',function(req,res){
  controller.printall();
  res.send('normal get / req in router');
});

router.get('/aboutus',function(req,res){
  res.send('aboutus in router');
});

module.exports = router;
