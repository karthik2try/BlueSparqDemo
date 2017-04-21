const express = require('express');
const router = express.Router();
const controller = require('../controller');
const BT = require('../braintree');
const dbUtil = require('../dbUtil');

router.get('/',function(req,res){
  // var machine = dbUtil.getMachineDetails();
  res.render('index');
  // dbUtil.selectedDrink();
  // res.send(BT.getClientId());
  // console.log(__dirname+'/../views/index.html');
});

router.post('/getDrinks',function(req,res){
  dbUtil.getMachineDetails(req.body.machineId)
    .then(function(data){
      // console.log(data);
      res.render('drinks-list',{
        drinks:data,
        machine_id:req.body.machineId
      });
    })

});

router.post('/checkout',function(req,res){
  let responseObj = req.body;
  BT.processPayment(responseObj)
  .then(function(data){
    console.log(data);
    dbUtil.selectedDrink(responseObj.machine_id,responseObj.drink_name)
      .then(function(resp){
        res.render('success');
      })
  });
});

router.get('/:machine_id/:drink_name/:drink_price',function(req,res){
  BT.getClientId()
    .then(function(clientToken){
      res.render('payment-page',{
        clientToken:clientToken,
        drink_name:req.params.drink_name,
        drink_price:req.params.drink_price,
        machine_id:req.params.machine_id
      });
    })
});

router.get('/dashboard',function(req,res){
    dbUtil.getAllMachine()
      .then(function(data){
        res.render('dashboard',{
          machines:data
        });
      });
});

router.get('/aboutus',function(req,res){
  res.send('aboutus in router');
});

module.exports = router;
