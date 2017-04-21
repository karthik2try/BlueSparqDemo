const mongoose = require('mongoose');
mongoose.connect('mongodb://VMusername:VMpassword@ds111851.mlab.com:11851/bluesparqvm',function(err,msg){
  if(!err)
    console.log("mongo lab connected - level 1");
});
const db = mongoose.connection;
db.once('open',function(){
  console.log("mongo lab connected - level 2");
});
var machineSchema = new mongoose.Schema({
                machine_id:String,
                store_id:String,
                store_name:String,
                email_id:[String],
                amount:Number,
                drinks:[{
                              drink_name:String,
                              drink_price:Number,
                              drink_capacity:Number,
                              drink_img_url:String,
                              drink_availability:Number,
                              drink_refill:Number
                            }]
                });

var machineModel = mongoose.model('machineModel',machineSchema);

module.exports = {
  mongoose,
  machineModel
};
