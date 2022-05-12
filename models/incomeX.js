const mongoose = require('mongoose');


var incomeSchema = new mongoose.Schema({


firstTermIncome:{type:Number, required:true},
firstTermExpense:{type:Number, required:true},
secondTermIncome:{type:Number, required:true},
secondTermExpense:{type:Number, required:true},
thirdTermIncome:{type:Number, required:true},
thirdTermExpense:{type:Number, required:true},
year:{type:Number, required:true},





})

module.exports = mongoose.model('Income', incomeSchema);