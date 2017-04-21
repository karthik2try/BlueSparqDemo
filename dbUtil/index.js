const db = require('../database');
const utility = require('../utility');

var getMachineDetails = function(machineNo){
  return new Promise(function(resolve,reject){
    db.machineModel.findOne({machine_id:machineNo},function(err,machine){
      if(machine.drinks != null){
        let drinks = machine.drinks;
          resolve(drinks);
      }else{
        reject(null);
      }
    });
  });
}

var getAllMachine = function(){
  return new Promise(function(resolve,reject){
    db.machineModel.find(function(err,machine){
      if(machine != null){
          resolve(machine);
      }else{
        reject(null);
      }
    });
  });
}

var selectedDrink = function(machineId,drinkName){
  return new Promise(function(resolve,reject){

    db.machineModel.findOne({machine_id:machineId},function(err,machine){
      var drinksInMachine = machine.drinks;
      for(var drink of drinksInMachine){
        console.log(drink.drink_name,'-',drinkName);
        if(drink.drink_name === drinkName){

          if(drink.drink_availability > 0 ){

            if(drink.drink_availability <= drink.drink_refill){
              console.log(drink.drink_availability);
                utility.sendRefillMail(machine.email_id,machineId,drink);
                console.log('sending mail');
            }
            drink.drink_availability--;
            machine.amount++;
            machine.save();
            resolve("success");
          }else{
            reject(null);
          }
        }
      }
    });
  });

}

var saveNewMachine = function(){
  var newMachine = db.machineModel({
    machine_id:'1A',
    store_id:'123wer',
    store_name:'Mc Donalds',
    email_id:['karthik2try@gmail.com','kshankar9267@muleriders.saumag.edu'],
    amount:5,
    drinks:[{
                  drink_name:'coke',
                  drink_price:1,
                  drink_capacity:30,
                  drink_img_url:'https://www.fineprintnyc.com/images/blog/coke-logo/coke-logo-10.jpg',
                  drink_availability:25,
                  drink_refill:23
                }]
  });
  newMachine.save(function(err){
    if(err)
    console.log(err)
    else {
      console.log('save successfully')
    }
  });
}

var insertDrinks = function(){
  var m_no = '1A';
  var new_drink = {
    drink_name:'pepsi',
    drink_price:1,
    drink_capacity:30,
    drink_img_url:'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTGMi-pd14qgOeSZvHbOjRGYgEbS7qE1xSS9gbtQLDWqiLG3R3S5vUYYQI',
    drink_availability:22,
    drink_refill:20
  }
  var selectMachine = new db.machineModel();
  db.machineModel.findOne({machine_id:m_no},function(err,selectMachine){
    if(!err){
      if(selectMachine != null){
        var allDrinks = selectMachine.drinks;
        allDrinks.push(new_drink);
        selectMachine.save();
        console.log(selectMachine);
      }
    }
  });
}

module.exports = {
  selectedDrink,
  getAllMachine,
  saveNewMachine,
  insertDrinks,
  getMachineDetails
}
