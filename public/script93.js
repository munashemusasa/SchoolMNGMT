



var labels1= []
var labels3= []
var labels4= []
var labels5 = []
var labels6 = []


let colors1 = ['#49A9EA', '#36CAAB'];



$.ajax({
   
    dataType: 'json',
    type: 'POST',
    url: "/incomeChart",
    success: function(data) {
    console.log(data)
     for (var i = 0;i<data.length;i++){
        labels1.push(data[i].firstTermIncome)
     
        labels1.push(data[i].secondTermIncome)
    
        labels1.push(data[i].thirdTermIncome)
        
       
   
     }

     let labels2 =  ['1st Term ',  '2nd Term ',  '3rd Term', ];
let colors2 = ['#49A9EA', '#36CAAB', '#34495E', '#B370CF','#FFA07A','#FFFF00'];

//contractQty

     let myChart = document.getElementById("myChart").getContext('2d');

let chart1 = new Chart(myChart, {
    type: 'bar',
    data: {
        labels:  labels2,
        datasets: [ {
            data: labels1,
            backgroundColor: colors2
        }],
        stepSize: 1,
    },
    options: {
        title: {
            text: "Income ($)",
            display: true
        },
        legend: {
          display: false
        },
        scales:{
            yAxes:[{
              ticks:{
                  stepSize:1000
              }
            }]
        }
    }
});





    
    }
   
});






$.ajax({
   
    dataType: 'json',
    type: 'POST',
    url: "/incomeChart",
    success: function(data) {
    console.log(data)
     for (var i = 0;i<data.length;i++){
        labels4.push(data[i].firstTermExpense)
     
        labels4.push(data[i].secondTermExpense)
    
        labels4.push(data[i].thirdTermExpense)
       
   
     }

     let labels3 =  ['1st Term ',  '2nd Term', '3rd Term '];
let colors2 = ['#49A9EA', '#36CAAB', '#34495E', '#B370CF','#FFA07A','#FFFF00'];

//contractQty

     let myChart1 = document.getElementById("myChart2").getContext('2d');

let chart2 = new Chart(myChart2, {
    type: 'bar',
    data: {
        labels:  labels3,
        datasets: [ {
            data: labels4,
            backgroundColor: colors2
        }],
        stepSize: 1,
    },
    options: {
        title: {
            text: "Expenses ($)",
            display: true
        },
        legend: {
          display: false
        },
        scales:{
            yAxes:[{
              ticks:{
                  stepSize:1000
              }
            }]
        }
    }
});





    
    }
   
});












