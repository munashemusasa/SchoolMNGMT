require('dotenv').config();

var express = require('express');
var router = express.Router();
const User =require('../models/user')
const Class1 =require('../models/class');
const Subject =require('../models/subject');
const Fees =require('../models/fees');
const Test =require('../models/classTest');
const TestX =require('../models/classTestX');
const Lesson =require('../models/lesson');
const Exam =require('../models/exam');
const Grade =require('../models/grade');
const Pass = require('../models/passRate')
const TeacherClassRate = require('../models/tcPassRateX')
const TeacherExamRate = require('../models/tcPassRate')
const TeacherDash = require('../models/teacherDash')
const StudentSub =require('../models/studentSubject');
const TeacherSub =require('../models/teacherSubject');
const Income =require('../models/incomeX');
const Expenses = require('../models/expenses')
const FeesUpdate =require('../models/feesUpdate');
var mongoose = require('mongoose')
var passport = require('passport')
var xlsx = require('xlsx')
var multer = require('multer')
const fs = require('fs')
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var passport = require('passport')
var moment = require('moment')
var bcrypt = require('bcrypt-nodejs');


var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/uploads/')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})



var upload = multer({
    storage:storage
})

/*
router.get('/',isLoggedIn,function(req,res){
var teacherId = req.user.uid
var teacherName = req.user.fullname
var term = req.user.term
var m = moment()
var year = m.format('YYYY')
  TeacherSub.find({teacherId:teacherId},function(err,lods){
    for(var i = 0; i<lods.length;i++){
      let sub = lods[i].subjectName
      let subCode = lods[i].subjectCode

      console.log(subCode)


      var pass =TeacherExamRate ();
      pass.firstTerm = 0;
      pass.firstAvgMark = 0
      pass.secondTerm= 0;
      pass.secondAvgMark = 0
      pass.thirdTerm = 0
      pass.thirdAvgMark=0;
      pass.teacherId = teacherId;
      pass.teacherName = teacherName;
      pass.subject = sub
      pass.subjectCode = subCode

      pass.type = 'Final Exam';
      pass.term = term
      pass.year = year

      pass.save()


    }
    res.redirect('/teacher/passRate')
  })
})
*/


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
  TeacherSub.find({teacherId:teacherId},function(err,lods){
    for(var i = 0; i<lods.length;i++){
      let sub = lods[i].subjectName
      let subCode = lods[i].subjectCode

    

   TeacherExamRate.find({year:year, teacherId:teacherId, subject:sub,  subjectCode:subCode},function(err,docs){


     if(docs.length == 0){
 console.log(sub, subCode)
       TestX.find({term:term,year:year,teacherId:uid, type:'Final Exam',  subject:sub,subjectCode:subCode },function(err,hods){
         console.log(hods, 'hods')
 
         TestX.find({term:term,year:year,teacherId:uid, result:'pass', type:'Final Exam', subject:sub, subjectCode:subCode},function(err,lods){
        /* if(hods.length >=1){*/
          console.log(lods,'lods')
 
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
 
              avgMark = totalMarks / numberOfMarks
             console.log(avgMark, 'avgMark')
             var pass =TeacherExamRate();
             pass.firstTerm = 0;
             pass.firstAvgMark = 0
             pass.secondTerm= 0;
             pass.secondAvgMark = 0
             pass.thirdTerm = 0
             pass.thirdAvgMark=0;
             pass.teacherId = teacherId;
             pass.teacherName = fullname;
             pass.subject = sub
             pass.subjectCode = subCode
             pass.term = term
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
              /* }*/
               
               })
               
             })
        }
           else
 
         var  idX  = docs[0]._id
 
         TestX.find({term:term,year:year,teacherId:uid, type:"Final Exam", subject:sub, subjectCode:subCode},function(err,hods){
 
          TestX.find({term:term,year:year, result:'pass',teacherId:uid, type:"Final Exam", subject:sub, subjectCode:subCode},function(err,lods){
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
  
               avgMark = totalMarks / numberOfMarks
 
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
       
 
         })
   
    
        }
        
      res.redirect('/teacher/passRateX')
  
      })    
         
 
   })

/*

   router.get('/passT',isLoggedIn,function(req,res){
    var teacherId = req.user.uid
    var teacherName = req.user.fullname
    var term = req.user.term
var m = moment()
var year = m.format('YYYY')
      TeacherSub.find({teacherId:teacherId},function(err,lods){
        for(var i = 0; i<lods.length;i++){
          let sub = lods[i].subjectName
          let subCode = lods[i].subjectCode
         
    
    
          var pass =TeacherClassRate ();
          pass.firstTerm = 0;
          pass.firstAvgMark = 0
          pass.secondTerm= 0;
          pass.secondAvgMark = 0
          pass.thirdTerm = 0
          pass.thirdAvgMark=0;
          pass.teacherId = teacherId;
          pass.teacherName = teacherName;
          pass.subject = sub
          pass.subjectCode = subCode
    
          pass.type = 'Class Test';
          pass.year = year
          pass.term = term
    
          pass.save()
    
    
        }
        res.redirect('/teacher/passRateX')
      })
    })
    



*/




   router.get('/passRateX',isLoggedIn,function(req,res){
    let totalexams, examsPassed, passRate
    let numberOfMarks, totalMarks, avgMark
    var m = moment()
    var year = m.format('YYYY')
    var term = req.user.term
    var uid = req.user.uid
    var fullname = req.user.teacherName;
    var teacherId = req.user.uid
    
     var m = moment()
     var year = m.format('YYYY')
     var marks, marks2
     var arr1=[]
     var number1
     var term = req.user.term
     TeacherSub.find({teacherId:teacherId},function(err,lods){
      for(var i = 0; i<lods.length;i++){
        let sub = lods[i].subjectName
        let subCode = lods[i].subjectCode
       


     TeacherClassRate.find({year:year,teacherId:teacherId,  subject:sub, subjectCode:subCode},function(err,docs){
   
       if(docs.length == 0){
   
         TestX.find({term:term,year:year,teacherId:uid, type:'Class Test',  subject:sub, subjectCode:subCode},function(err,hods){
   
           TestX.find({term:term,year:year, result:'pass',teacherId:uid, type:'Class Test', subject:sub, subjectCode:subCode},function(err,lods){
          /* if(hods.length >=1){*/
   
   
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
   
                avgMark = totalMarks / numberOfMarks
               
               var pass = TeacherClassRate();
               pass.firstTerm = 0;
               pass.firstAvgMark = 0
               pass.secondTerm= 0;
               pass.secondAvgMark = 0
               pass.thirdTerm = 0
               pass.thirdAvgMark=0
               pass.teacherId = teacherId
               pass.teacherName = fullname;
               pass.subject = sub
               pass.subjectCode = subCode
          
               pass.term = term
               pass.type = 'Class Test'
               pass.year = year
   
               pass.save()
       .then(pas =>{
         id3 = pas._id;
   
         if(term == 1){
   
     
          TeacherClassRate.findByIdAndUpdate(id3,{$set:{firstTerm:passRate, firstAvgMark:avgMark}},function(err,kocs){
        
           
           })
         }else if(term == 2){
         
          TeacherClassRate.findByIdAndUpdate(id3,{$set:{secondTerm:passRate,secondAvgMark:avgMark}},function(err,kocs){
         
               
               })
             }else{
              TeacherClassRate.findByIdAndUpdate(id3,{$set:{thirdTerm:passRate,thirdAvgMark}},function(err,kocs){
               
                   
                   })
                 }
   
                 })
                 /*}*/
                 
                 })
                 
               })
             }
             else
   
           var  idX  = docs[0]._id
   
           TestX.find({term:term,year:year,teacherId:uid, type:"Class Test",  subject:sub, subjectCode:subCode},function(err,hods){
   
            TestX.find({term:term,year:year, result:'pass',teacherId:uid, type:"Class Test",  subject:sub, subjectCode:subCode},function(err,lods){
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
    
                 avgMark = totalMarks / numberOfMarks
   console.log('total Marks', totalMarks)
   console.log('number of  Marks', totalMarks)
                if(term == 1){
   
     
                  TeacherClassRate.findByIdAndUpdate(idX,{$set:{firstTerm:passRate,firstAvgMark:avgMark}},function(err,kocs){
              
                 
                 })
               }else if(term == 2){
               
                TeacherClassRate.findByIdAndUpdate(idX,{$set:{secondTerm:passRate, secondAvgMark:avgMark}},function(err,kocs){
               
                     
                     })
                   }else{
                    TeacherClassRate.findByIdAndUpdate(idX,{$set:{thirdTerm:passRate, thirdAvgMark:avgMark}},function(err,kocs){
                     
                         
                         })
                       }
     
               }
       
      
             })
          
           })    


           
   
           })
          }

          res.redirect('/teacher/dash')

        })
           
   
     })
  









  



  router.get('/dash',isLoggedIn, function(req,res){
    var teacherId = req.user.uid
    var sub,class1
    var arr =[]
    var dept = req.user.dept
    console.log(dept)
    TeacherSub.find({teacherId:teacherId}, function(err,docs){
      sub = docs.length

     if(docs == 0){
       res.render('chart0')
     }
      
     else if(docs.length == 1){
        res.render('chart',{sub:sub,dept:dept})
      }
      else if(docs.length == 2){
        res.render('chart1',{sub:sub,dept:dept})
      }else{
        res.render('chart2',{sub:sub,dept:dept})
      }
      
    })
    
  })
//class Tests
  router.get('/dash2',isLoggedIn,function(req,res){
    var teacherId = req.user.uid
    var sub
    var dept = req.user.dept
    TeacherSub.find({teacherId:teacherId},function(err,docs){
      sub = docs.length

      if(docs == 0){
        res.render('chart0')
      }
    else  if(docs.length == 1){
        res.render('test/chart',{sub:sub,dept:dept})
      }
      else if(docs.length == 2){
        res.render('test/chart1',{sub:sub,dept:dept})
      }else{
        res.render('test/chart2',{sub:sub,dept:dept})
      }
    })
    
  })
//Final Exam

router.post('/PassChart',isLoggedIn,function(req,res){
  var m = moment()
  var year = m.format('YYYY')
  var uid = req.user.uid
  var term = req.user.term
        TeacherExamRate.find({year:year, term:term, teacherId:uid},function(err,docs){
          if(docs == undefined){
            res.redirect('/teacher/dash')
          }else
      
             res.send(docs)
         
          
           })
      
      })


//Class Test
      router.post('/PassChart2',isLoggedIn,function(req,res){
        var m = moment()
        var year = m.format('YYYY')
        var uid = req.user.uid
        var term = req.user.term
              TeacherClassRate.find({year:year, term:term, teacherId:uid},function(err,docs){
                if(docs == undefined){
                  res.redirect('/teacher/dash')
                }else
            
                   res.send(docs)
               
                
                 })
            
            })
  








//role - teacher
  //populates the test record chart for teachers
  router.post('/testChart',isLoggedIn,function(req,res){
    var teacher =  req.user.fullname
      Test.find({teacher:teacher},function(err,docs){
        if(docs == undefined){
          res.redirect('/dash')
        }else
    
           res.send(docs)
           console.log(docs)
        
         })
    
    })
    

//Final Exam

router.post('/PassChartX',isLoggedIn,function(req,res){
  var m = moment()
  var year = m.format('YYYY')
  var uid = req.user.uid
  var term = req.user.term
  TeacherSub.find({teacherId:uid},function(err,tocs){
var class1 = tocs[0].class1
var code = tocs[0].subjectCode
        TeacherExamRate.find({year:year, term:term, teacherId:uid, class1:class1, subjectCode:code,type:'Final Exam'},function(err,docs){
          if(docs == undefined){
            res.redirect('/teacher/dash')
          }else
      
             res.send(docs)
           
          console.log(docs)
           })
          })
      
      })


      //Final Exam

router.post('/PassChartX1',isLoggedIn,function(req,res){
  var m = moment()
  var year = m.format('YYYY')
  var uid = req.user.uid
  var term = req.user.term
  TeacherSub.find({teacherId:uid},function(err,tocs){
var class1 = tocs[1].class1
var code = tocs[1].subjectCode
        TeacherExamRate.find({year:year, term:term, teacherId:uid, class1:class1, subjectCode:code,type:'Final Exam'},function(err,docs){
          if(docs == undefined){
            res.redirect('/teacher/dash')
          }else
      
             res.send(docs)
           
          console.log(docs)
           })
          })
      
      })


//Final Exam

router.post('/PassChartX2',isLoggedIn,function(req,res){
  var m = moment()
  var year = m.format('YYYY')
  var uid = req.user.uid
  var term = req.user.term
  TeacherSub.find({teacherId:uid},function(err,tocs){
var class1 = tocs[2].class1
var code = tocs[2].subjectCode
        TeacherExamRate.find({year:year, term:term, teacherId:uid, class1:class1, subjectCode:code,type:'Final Exam'},function(err,docs){
          if(docs == undefined){
            res.redirect('/teacher/dash')
          }else
      
             res.send(docs)
           
        
           })
          })
      
      })





    //Final Exam

router.post('/PassChartX3',isLoggedIn,function(req,res){
  var m = moment()
  var year = m.format('YYYY')
  var uid = req.user.uid
  var term = req.user.term
  TeacherSub.find({teacherId:uid},function(err,tocs){
var class1 = tocs[3].class1
var code = tocs[3].subjectCode
        TeacherExamRate.find({year:year, term:term, teacherId:uid, class1:class1, subjectCode:code,type:'Final Exam'},function(err,docs){
          if(docs == undefined){
            res.redirect('/teacher/dash')
          }else
      
             res.send(docs)
           
          console.log(docs)
           })
          })
      
      })


      
router.post('/PassChartX4',isLoggedIn,function(req,res){
  var m = moment()
  var year = m.format('YYYY')
  var uid = req.user.uid
  var term = req.user.term
  TeacherSub.find({teacherId:uid},function(err,tocs){
var class1 = tocs[4].class1
var code = tocs[4].subjectCode
        TeacherExamRate.find({year:year, term:term, teacherId:uid, class1:class1, subjectCode:code,type:'Final Exam'},function(err,docs){
          if(docs == undefined){
            res.redirect('/teacher/dash')
          }else
      
             res.send(docs)
           
          console.log(docs)
           })
          })
      
      })



      router.post('/PassChartX5',isLoggedIn,function(req,res){
        var m = moment()
        var year = m.format('YYYY')
        var uid = req.user.uid
        var term = req.user.term
        TeacherSub.find({teacherId:uid},function(err,tocs){
      var class1 = tocs[5].class1
      var code = tocs[5].subjectCode
              TeacherExamRate.find({year:year, term:term, teacherId:uid, class1:class1, subjectCode:code,type:'Final Exam'},function(err,docs){
                if(docs == undefined){
                  res.redirect('/teacher/dash')
                }else
            
                   res.send(docs)
                 
                console.log(docs)
                 })
                })
            
            })
      


            
router.post('/PassChartX6',isLoggedIn,function(req,res){
  var m = moment()
  var year = m.format('YYYY')
  var uid = req.user.uid
  var term = req.user.term
  TeacherSub.find({teacherId:uid},function(err,tocs){
var class1 = tocs[6].class1
var code = tocs[6].subjectCode
        TeacherExamRate.find({year:year, term:term, teacherId:uid, class1:class1, subjectCode:code,type:'Final Exam'},function(err,docs){
          if(docs == undefined){
            res.redirect('/teacher/dash')
          }else
      
             res.send(docs)
           
          console.log(docs)
           })
          })
      
      })




                 
router.post('/PassChartT',isLoggedIn,function(req,res){
  var m = moment()
  var year = m.format('YYYY')
  var uid = req.user.uid
  var term = req.user.term
  TeacherSub.find({teacherId:uid},function(err,tocs){
var class1 = tocs[0].class1
var code = tocs[0].subjectCode
TeacherClassRate.find({year:year, term:term, teacherId:uid, class1:class1, subjectCode:code,type:'Class Test'},function(err,docs){
          if(docs == undefined){
            res.redirect('/teacher/dash')
          }else
      
             res.send(docs)
           
          console.log(docs)
           })
          })
      
      })


      router.post('/PassChartT1',isLoggedIn,function(req,res){
        var m = moment()
        var year = m.format('YYYY')
        var uid = req.user.uid
        var term = req.user.term
        TeacherSub.find({teacherId:uid},function(err,tocs){
      var class1 = tocs[1].class1
      var code = tocs[1].subjectCode
              TeacherClassRate.find({year:year, term:term, teacherId:uid, class1:class1, subjectCode:code,type:'Class Test'},function(err,docs){
                if(docs == undefined){
                  res.redirect('/teacher/dash')
                }else
            
                   res.send(docs)
                 
                console.log(docs)
                 })
                })
            
            })





            router.post('/PassChartT2',isLoggedIn,function(req,res){
              var m = moment()
              var year = m.format('YYYY')
              var uid = req.user.uid
              var term = req.user.term
              TeacherSub.find({teacherId:uid},function(err,tocs){
            var class1 = tocs[2].class1
            var code = tocs[2].subjectCode
                    TeacherClassRate.find({year:year, term:term, teacherId:uid, class1:class1, subjectCode:code,type:'Class Test'},function(err,docs){
                      if(docs == undefined){
                        res.redirect('/teacher/dash')
                      }else
                  
                         res.send(docs)
                       
                      console.log(docs)
                       })
                      })
                  
                  })
      
      
      
                  router.post('/PassChartT3',isLoggedIn,function(req,res){
                    var m = moment()
                    var year = m.format('YYYY')
                    var uid = req.user.uid
                    var term = req.user.term
                    TeacherSub.find({teacherId:uid},function(err,tocs){
                  var class1 = tocs[3].class1
                  var code = tocs[3].subjectCode
                  TeacherClassRate.find({year:year, term:term, teacherId:uid, class1:class1, subjectCode:code,type:'Class Test'},function(err,docs){
                            if(docs == undefined){
                              res.redirect('/teacher/dash')
                            }else
                        
                               res.send(docs)
                             
                            console.log(docs)
                             })
                            })
                        
                        })
      



                        router.get('/fstats',isLoggedIn,function(req,res){
                         
                          var m = moment()
                          var year = m.format('YYYY')
                          var uid = req.user.uid
                          var term = req.user.term
                          TeacherExamRate.find({year:year,  teacherId:uid, type:"Final Exam"},function(err,docs){
                            if (!err) {
                                res.render('teachers/statf', {
                                   list:docs,
                                  
                                });
                            }
                        });
                        
                        
                          
                        })                   





                        router.get('/tstats',isLoggedIn,function(req,res){
                         
                          var m = moment()
                          var year = m.format('YYYY')
                          var uid = req.user.uid
                          var term = req.user.term
                          TeacherClassRate.find({year:year,  teacherId:uid, type:"Class Test"},function(err,docs){
                            if (!err) {
                                res.render('teachers/statc', {
                                   list:docs,
                                  
                                });
                            }
                        });
                        
                        
                          
                        })      



//student registered subjects
router.get('/subjects',isLoggedIn,function(req,res){
  var uid = req.user.uid
  TeacherSub.find({teacherId:uid},(err, docs) => {
    if (!err) {
        res.render('teachers/subjectList', {
           list:docs,
          
        });
    }
});


  
})






    
// role teacher 

//teacher lesson timetable
router.get('/timetable',isLoggedIn, (req, res) => {
  var term = req.user.term
  var m = moment();
  var uid = req.user.uid
  var year = m.format('YYYY')
  Lesson.find({term:term,year:year,teacherId:uid},(err, docs) => {
      if (!err) {
          res.render("lesson/timetableX", {
             list:docs,
            
          });
      }
  });
});



//exam timetable student
router.get('/examList',isLoggedIn, (req, res) => {
  var uid = req.user.uid
  var term = req.user.term
  var year = req.user.year
     Exam.find({uid:uid, term:term, year:year},(err, docs) => {
         if (!err) {
             res.render("exam/examListX", {
                list:docs,
               
             });
         }
     });
   });



//role teacher
//creating exam batch for exam results
router.get('/examBatch',isLoggedIn,teacher,  function(req,res){
  var arr = []
  var arr1 = []
  var user = req.user.term
  var teacherId = req.user.uid

  
  
  Class1.find({}, function(err,docs){
    var arr1 = docs;  
      
      res.render('exam/batch',{ arr1:arr1, user:user})
    
  })
 
})

router.post('/examBatch',isLoggedIn,teacher,  function(req,res){
  var class1 = req.body.class1;
  var subject = req.body.subject;
  var subjectCode = req.body.subjectCode;
  var date = req.body.date;
  var id = req.user._id;
  var teacherId = req.user.uid
  var term = req.body.term;
  var type = req.body.type
  var stdNum, grade 
  let arr = []
  let arr1 = []
  var teacher = req.user.fullname
  var m = moment()
  var year = m.format('YYYY')
  var month = m.format('MMMM')


  
  Class1.find({class1:class1},function(err,docs){
    grade = docs[0].grade
   
  })

 
  req.check('class1','Enter Class').notEmpty();
  req.check('subject','Enter Subject').notEmpty();

  req.check('date','Enter Date').notEmpty();
 

  var errors = req.validationErrors();
     
  if (errors) {
    
    TeacherSub.find({teacherId:teacherId},function(err,docs){

      for(var i = 0;i<docs.length;i++){
        arr1.push(docs[i].class1);
      }
    req.session.errors = errors;
    req.session.success = false
    res.render('exam/batch',{errors:req.session.errors, arr1:arr1})
      })
    
    
  }

  else{

    Test.findOne({'date':date,'class1':class1,'subjectCode':subjectCode,'type':type })
    .then(tes =>{
      if(tes){ 
        
    TeacherSub.find({teacherId:teacherId},function(err,docs){

      for(var i = 0;i<docs.length;i++){
        arr1.push(docs[i].class1);
      }
        req.session.message = {
          type:'errors',
          message:'Test Exists'
        }     
           res.render('exam/batch', {
              message:req.session.message, arr1:arr1})
           
           })


      }else
     

var test = Test();
test.date = date;
test.subject = subject;
test.subjectCode = subjectCode;
test.class1 = class1;
test.year = year;
test.name = date +" "+class1;
test.month  = month;
test.teacher = teacher;
test.numberOfStudents = 0;
test.passRate = 0;
test.term = term;
test.type = type
test.grade = req.body.grade;
test.level = 'highschool'


test.save()
.then(tesn =>{

      User.find({class1:class1, role:'student'},function(err,nocs){

        stdNum = nocs.length - 1;
     
        console.log(stdNum)
        console.log(nocs.length,'wangu')
     
         User.findByIdAndUpdate(id,{$set:{class1:class1, subjects:subject,examDate:date,term:term, classLength:stdNum, studentNum:0, type:type,subjectCode:subjectCode}}, function(err,trocs){
     
          console.log(trocs)
          
   
     
         })
        
         
      
       })
       res.redirect('/teacher/gradeX')
       
  

      })
     
    
    })
 

   
  }

  
})





  //autocomplete teacherName & uid
   
  router.get('/autocomplete/',isLoggedIn, function(req, res, next) {
  var teacherId = req.user.uid
  
    var regex= new RegExp(req.query["term"],'i');
   
    var uidFilter =TeacherSub.find({subjectCode:regex, teacherId:teacherId},{'subjectCode':1}).sort({"updated_at":-1}).sort({"created_at":-1}).limit(20);
  
    
    uidFilter.exec(function(err,data){
   
  
  console.log('data',data)
  
  var result=[];
  
  if(!err){
     if(data && data.length && data.length>0){
       data.forEach(sub=>{
  
        
     
  
          
         let obj={
           id:sub._id,
           label: sub.subjectCode
  
       
         /*  name:name,
           surname:surname,
           batch:batch*/
          
          
       
         
          
  
           
         };
        
         result.push(obj);
         console.log('object',obj.id)
       });
  
     }
   
     res.jsonp(result);
     console.log('Result',result)
    }
  
  })
  
  });
  
  // role admin
  //this routes autopopulates teachers info from the id selected from automplet1
  router.post('/auto',isLoggedIn,function(req,res){
    var code = req.body.code
    var teacherId = req.user.uid
  
   console.log(code, 'code')
    TeacherSub.find({subjectCode:code, teacherId:teacherId},function(err,docs){
   if(docs == undefined){
     res.redirect('/teacher/auto')
   }else
  
      res.send(docs[0])
      console.log(docs[0])
    })
  
  
  })
  
  
  
  
  

















//role teacher
//adding results
router.get('/gradeX',isLoggedIn,teacher,  function(req,res){
  var id = req.user._id;
  var num = req.user.classLength;
  var x = req.user.studentNum
  var ocs
  var class1 = req.user.class1

  if(num == 0){
    res.redirect('/teacher/examBatch')
  }else

  User.find({class1:class1, role:'student'},function(err,docs){
    ocs= docs[x]
    res.render('exam/gradeX', {user:ocs,use:req.user})
  })

  
 
})


router.post('/gradeX',isLoggedIn,teacher, function(req,res){
   var id = req.user._id;
   var date = req.body.date
   var uid = req.body.uid;
   var teacherId = req.user.uid
   var fullname = req.body.fullname;
   var class1 = req.body.class1;
   var grade = req.body.grade;
   var mark = req.body.mark;
   var term = req.user.term;
   var m = moment(date)
   var year = m.format('YYYY')
   var month = m.format('MMMM')
   var x = req.user.studentNum
   var num = req.user.classLength;
   var subject = req.user.subjects;
   var subjectCode = req.user.subjectCode
   var date = req.user.examDate
   var type = req.body.type
   console.log(x, num)

  req.check('mark','Enter Student Mark').notEmpty();
  req.check('uid','Enter Student ID').notEmpty();
  req.check('fullname','Enter Student Name').notEmpty();
  req.check('class1','Enter Class').notEmpty();


  
  var errors = req.validationErrors();
     
  if (errors) {
    
    req.session.errors = errors;
    req.session.success = false
    res.render('exam/gradeX',{errors:req.session.errors})
  }

  else
  {
    var test = new TestX();
    test.uid = uid;
    test.fullname = fullname;
    test.grade = grade;
    test.class1 = class1;
    test.date = date;
    test.teacher = req.user.fullname;
    test.teacherId = teacherId;
    test.mark = mark;
    test.category = 'null';
    test.year = year
    test.month = month
    test.symbol = 'null';
    test.term = term
    test.result = "null";
    test.subject = subject
    test.subjectCode = subjectCode
    test.date = date
    test.type = type

    test.save()
    .then(tes =>{
     Grade.find({},function(err,qocs){
     
      for(var i = 0; i<qocs.length; i++){
let symbol = qocs[i].symbol
let from = qocs[i].from
let to = qocs[i].to

        if(mark >= from && mark <= to ){
          TestX.findByIdAndUpdate(tes._id,{$set:{symbol:symbol}},function(err,mocs){


          })

        }
      }


     })
    
      if(mark >= 50){

        TestX.findByIdAndUpdate(tes._id,{$set:{result:'pass'}},function(err,mocs){


        })
      }else

 TestX.findByIdAndUpdate(tes._id,{$set:{result:'fail'}},function(err,mocs){


        })



    if(num == x){

      User.findByIdAndUpdate(id,{$set:{studentNum:0,classLength:0, class1:"null"}}, function(err,docs){
     

      })

      res.redirect('/teacher/examBatch')
   

    }else

     x++
     console.log('x',x)
      User.findByIdAndUpdate(id,{$set:{studentNum:x}}, function(err,docs){
      
     
      })
      res.redirect('/teacher/gradeX1')
    })

    
  }


})


//role teacher
router.get('/gradeX1',isLoggedIn,teacher,  function(req,res){
  res.redirect('/teacher/gradeX')
})




router.get('/teacherDetails',isLoggedIn,  function(req,res){
  res.render('teachers/teacher-details',{pic:req.user.photo,user:req.user})
})


router.post('/teacherDetails',isLoggedIn,upload.single('file'),function(req,res){
 
  
  
  if(!req.file){
   req.session.message = {
     type:'errors',
     message:'Select Picture'
   }     
     res.render('teachers/teacher-details', {
          user:req.body, message:req.session.message,pic:req.user.photo,user:req.user 
      }) 
   
  } else
  var imageFile = req.file.filename;
  var id  = req.user._id;
 console.log(imageFile)
 console.log(id)
  User.findByIdAndUpdate(id,{$set:{photo:imageFile}},function(err,data){ 
  
  
    
  
  
  })
 
  res.redirect('/teacher/teacherDetails')

     //res.render('uploads/index',{title:'Upload File',records:data, success:success})


   

  
 
})



   //student results
   router.get('/results',isLoggedIn, (req, res) => {
    var uid= req.user.uid
     TestX.find({teacherId:uid, type:'Class Test'},(err, docs) => {
         if (!err) {
             res.render("teacherexam/result", {
                list:docs,
               
             });
         }
     });
   });
   

   //student results - final exam
   router.get('/examResults',isLoggedIn, (req, res) => {
    var uid= req.user.uid
     TestX.find({teacherId:uid, type:'Final Exam'},(err, docs) => {
         if (!err) {
             res.render("teacherExam/resultX", {
                list:docs,
               
             });
         }
     });
   });










  module.exports = router;
  
  
  
  function isLoggedIn(req, res, next) {
      if (req.isAuthenticated()) {
          return next();
      }
      else{
          res.redirect('/')
      }
    }
    
    
    
    function teacher(req,res,next){
      if(req.user.role == 'teacher'){
        return next()
      }
      res.render('errors/access')
      }  
  


      
    async function init(){
      var teacherId = req.user.uid
      var sub,class1
      var arr =[]
      var arr1 = []
      var dept = req.user.dept
    await TeacherSub.find({teacherId:teacherId},function(err,docs){
      arr.push(docs)
      })

      console.log(arr)

    }


