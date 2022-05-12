const mongoose = require('mongoose');


var tcSchema = new mongoose.Schema({


firstTerm:{type:Number, required:true},
firstAvgMark:{type:Number, required:true},
secondTerm:{type:Number, required:true},
secondAvgMark:{type:Number, required:true},
thirdTerm:{type:Number, required:true},
thirdAvgMark:{type:Number, required:true},
teacherId:{type:String, required:true},
teacherName:{type:String, required:true},

subject:{type:String, required:true},
subjectCode:{type:String, required:true},
type:{type:String, required:true},
term:{type:Number, required:true},
year:{type:Number, required:true}






})

module.exports = mongoose.model('tcPass', tcSchema);





/*

router.get('/passRate',isLoggedIn,function(req,res){
  let totalexams, examsPassed, passRate;
  let numberOfMarks, totalMarks, avgMark;
  var m = moment()
  var year = m.format('YYYY')
  var term = req.user.term
  var uid = req.user.uid
  var fullname = req.user.fullname;
  var teacherId = req.user.uid
   var m = moment()
   var year = m.format('YYYY')
   var marks, marks2
   var arr1=[]
   var number1
  
   TeacherExamRate.find({year:year, teacherId:teacherId},function(err,docs){
 
     if(docs == 0){
 
       TestX.find({term:term,year:year,teacherId:uid, type:'Final Exam'},function(err,hods){
 
         TestX.find({term:term,year:year,teacherId:uid, result:'pass', type:'Final Exam'},function(err,lods){
         if(hods.length >=1){
 
 
          totalexams = hods.length;
          examsPassed = lods.length
          passRate = examsPassed / totalexams * 100
          numberOfMarks = hods.length;
          console.log('numberOfMarks',numberOfMarks)

          for(var q = 0;q<hods.length; q++){
  
            arr1.push(hods[q].mark)
              }
              //adding all incomes from all lots of the same batch number & growerNumber & storing them in variable called total
               totalMarks=0;
              for(var z in arr1) { totalMarks += arr1[z]; }
 
              avgMark = totalMarks/numberOfMarks
             
             var pass =TeacherExamRate ();
             pass.firstTerm = 0;
             pass.firstAvgMark = 0
             pass.secondTerm= 0;
             pass.secondAvgMark = 0
             pass.thirdTerm = 0
             pass.thirdAvgMark=0;
             pass.teacherId = teacherId
             pass.type = 'Final Exam';
             pass.year = year
 
             pass.save()
     .then(pas =>{
       id3 = pas._id;
 
       if(term == 1){
 
   
         TeacherExamRate.findByIdAndUpdate(id3,{$set:{firstTerm:passRate, firstAvgMark:avgMark}},function(err,kocs){
      
         
         })
       }else if(term == 2){
       
         TeacherExamRate.findByIdAndUpdate(id3,{$set:{secondTerm:passRate,secondAvgMark:avgMark}},function(err,kocs){
       
             
             })
           }else{
             TeacherExamRate.findByIdAndUpdate(id3,{$set:{thirdTerm:passRate,thirdAvgMark}},function(err,kocs){
             
                 
                 })
               }
 
               })
               }
               
               })
               
             })
           }
           else
 
         var  idX  = docs[0]._id
 
         TestX.find({term:term,year:year,teacherId:uid, type:"Final Exam"},function(err,hods){
 
          TestX.find({term:term,year:year, result:'pass',teacherId:uid, type:"Final Exam"},function(err,lods){
          if(hods.length >=1){
  
  
           totalexams = hods.length;
           examsPassed = lods.length
           passRate = examsPassed / totalexams * 100
           numberOfMarks = hods.length;
 
           for(var q = 0;q<hods.length; q++){
   
             arr1.push(hods[q].mark)
               }
               //adding all incomes from all lots of the same batch number & growerNumber & storing them in variable called total
                totalMarks=0;
               for(var z in arr1) { totalMarks += arr1[z]; }
  
               avgMark = totalMarks/numberOfMarks
 
              if(term == 1){
 
   
               TeacherExamRate.findByIdAndUpdate(idX,{$set:{firstTerm:passRate,firstAvgMark:avgMark}},function(err,kocs){
            
               
               })
             }else if(term == 2){
             
               TeacherExamRate.findByIdAndUpdate(idX,{$set:{secondTerm:passRate, secondAvgMark:avgMark}},function(err,kocs){
             
                   
                   })
                 }else{
                   TeacherExamRate.findByIdAndUpdate(idX,{$set:{thirdTerm:passRate, thirdAvgMark:avgMark}},function(err,kocs){
                   
                       
                       })
                     }
   
             }
     
    
           })
        
         })    
         res.redirect('/teacher/passRateX')
 
         })
         
 
   })






*/