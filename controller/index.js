const machine = require('../database');
const utility = require('../utility');
const BT = require('../braintree');

module.exports = {
  getMachineDetails : function(){
    return machine;
  },

  print : function(mId){
    let drinks = machine.drinks;
    console.log(drinks);
    utility.checkForRefill(drinks);
    // BT.processPayment();
    return mId;
  }

}
