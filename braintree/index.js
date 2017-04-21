'use strict';
const braintree = require('braintree');
const dbUtil = require('../dbUtil');

const gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "k4txcjqn38yrgqjs",
  publicKey: "fytzttynk4q4vdyb",
  privateKey: "297ab62e1d4fa1c1b677ab733882f621"
});

module.exports = {
  getClientId:function(){
    return new Promise(function(resolve,reject){
      gateway.clientToken.generate({},function(err,data){
        if(!err){
          resolve(data.clientToken);
        }else{
          reject(err);
        }
      });
    });
  },

  processPayment: function(responseObj) {
    return new Promise(function(resolve,reject){
      gateway.transaction.sale({
        amount:responseObj.amount,
        paymentMethodNonce:responseObj.payment_method_nonce
      },function(err,data){
        if(err){
          reject(err);
        }else{
          // console.log(data);
          resolve(data);
        }
      })
    });
  }
}
