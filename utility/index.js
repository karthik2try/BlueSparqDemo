const sendmail = require('sendmail')();


const machine = require('../database');
module.exports = {
    checkForRefill:function(drinks){
      for(var i in drinks){
        console.log(i);
        if(drinks[i].drink_name === 'pepsi'){
          if(drinks[i].drink_availability <= drinks[i].drink_refill){
            console.log('send mail to',machine.email_id,'bad available pepsi qty is',drinks[i].drink_availability);
          }else{
            console.log('send mail to',machine.email_id,'good available pepsi qty is',drinks[i].drink_availability);
          }
        }
      }
    },
    sendRefillMail: function(mailto,machineNo,drink){
      sendmail({
        from:'refillTeam@VMcloudserver.com',
        to:mailto,
        subject:'time 2 fillup',
        html:'<h3>Time to fill '+ drink.drink_name +' only '+drink.drink_availability+' is available in machine no : '+ machineNo +'</h3>'
      },function(err,result){
          if(err)
          console.log(err);
      });
    }


}
