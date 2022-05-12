const mongoose = require('mongoose');


var feesSchema = new mongoose.Schema({


uid:{type:String, required:true},
fullname:{type:String, required:true},
date:{type:String, required:true},
term:{type:Number, required:true},
year:{type:Number, required:true},
month:{type:String, required:true},
amount:{type:Number, required:true},
method:{type:String, required:true},
paymentId:{type:String, required:true},
receiptNumber:{type:String, required:true}





})

module.exports = mongoose.model('Fees', feesSchema);