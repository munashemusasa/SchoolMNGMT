
var labels1= []
var labels3= []
var labels4= []
var labels5= []
var labels6= []
var class1,sub, class2,sub2, class3, sub3, class4, sub4, code1,code2,code3,cod4

let colors1 = ['#49A9EA', '#36CAAB'];



$.ajax({
   
    dataType: 'json',
    type: 'POST',
    url: "./PassChartX",
    success: function(data) {
    console.log(data)
     for (var i = 0;i<data.length;i++){
        labels1.push(data[i].firstTerm)
        labels1.push(data[i].firstAvgMark)
        labels1.push(data[i].secondTerm)
        labels1.push(data[i].secondAvgMark)
        labels1.push(data[i].thirdTerm)
        labels1.push(data[i].thirdAvgMark)
        labels1.push(data[i].thirdAvgMark)
        code1 = data[i].subjectCode
         sub = data[i].subject
   
     }

     let labels2 =  ['1st Term PassRate', 'AvgMark', '2nd Term PassRate','Avg Mark', '3rd Term PassRate', 'Avg Mark'];
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
            text: code+" "+ sub +" " + "Final Exam Pass Rate (%)",
            display: true
        },
        legend: {
          display: false
        },
        scales:{
            yAxes:[{
              ticks:{
                  stepSize:10
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
    url: "./PassChartX1",
    success: function(data) {
    console.log(data)
     for (var i = 0;i<data.length;i++){
        labels4.push(data[i].firstTerm)
        labels4.push(data[i].firstAvgMark)
        labels4.push(data[i].secondTerm)
        labels4.push(data[i].secondAvgMark)
        labels4.push(data[i].thirdTerm)
        labels4.push(data[i].thirdAvgMark)
        labels4.push(data[i].thirdAvgMark)
        code2 = data[i].subjectCode
         sub2 = data[i].subject
   
     }

     let labels2 =  ['1st Term PassRate', 'AvgMark', '2nd Term PassRate','Avg Mark', '3rd Term PassRate', 'Avg Mark'];
let colors2 = ['#49A9EA', '#36CAAB', '#34495E', '#B370CF','#FFA07A','#FFFF00'];

//contractQty

     let myChart1 = document.getElementById("myChart2").getContext('2d');

let chart2 = new Chart(myChart2, {
    type: 'bar',
    data: {
        labels:  labels2,
        datasets: [ {
            data: labels4,
            backgroundColor: colors2
        }],
        stepSize: 1,
    },
    options: {
        title: {
            text: code2+" "+ sub2 +" " + "Final Exam Pass Rate (%)",
            display: true
        },
        legend: {
          display: false
        },
        scales:{
            yAxes:[{
              ticks:{
                  stepSize:10
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
    url: "./PassChartX2",
    success: function(data) {
    console.log(data)
     for (var i = 0;i<data.length;i++){
        labels5.push(data[i].firstTerm)
        labels5.push(data[i].firstAvgMark)
        labels5.push(data[i].secondTerm)
        labels5.push(data[i].secondAvgMark)
        labels5.push(data[i].thirdTerm)
        labels5.push(data[i].thirdAvgMark)
        labels5.push(data[i].thirdAvgMark)
        code3 = data[i].subjectCode
         sub3 = data[i].subject
   
     }

     let labels2 =  ['1st Term PassRate', 'AvgMark', '2nd Term PassRate','Avg Mark', '3rd Term PassRate', 'Avg Mark'];
let colors2 = ['#49A9EA', '#36CAAB', '#34495E', '#B370CF','#FFA07A','#FFFF00'];

//contractQty

     let myChart3 = document.getElementById("myChart3").getContext('2d');

let chart3 = new Chart(myChart3, {
    type: 'bar',
    data: {
        labels:  labels2,
        datasets: [ {
            data: labels5,
            backgroundColor: colors2
        }],
        stepSize: 1,
    },
    options: {
        title: {
            text: code3+" "+ sub3 +" " + "Final Exam Pass Rate (%)",
            display: true
        },
        legend: {
          display: false
        },
        scales:{
            yAxes:[{
              ticks:{
                  stepSize:10
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
    url: "./PassChartX3",
    success: function(data) {
    console.log(data)
     for (var i = 0;i<data.length;i++){
        labels6.push(data[i].firstTerm)
        labels6.push(data[i].firstAvgMark)
        labels6.push(data[i].secondTerm)
        labels6.push(data[i].secondAvgMark)
        labels6.push(data[i].thirdTerm)
        labels6.push(data[i].thirdAvgMark)
        labels6.push(data[i].thirdAvgMark)
        code4 = data[i].subjectCode
         sub4 = data[i].subject
   
     }

     let labels2 =  ['1st Term PassRate', 'AvgMark', '2nd Term PassRate','Avg Mark', '3rd Term PassRate', 'Avg Mark'];
let colors2 = ['#49A9EA', '#36CAAB', '#34495E', '#B370CF','#FFA07A','#FFFF00'];

//contractQty

     let myChart4 = document.getElementById("myChart4").getContext('2d');

let chart4 = new Chart(myChart4, {
    type: 'bar',
    data: {
        labels:  labels2,
        datasets: [ {
            data: labels6,
            backgroundColor: colors2
        }],
        stepSize: 1,
    },
    options: {
        title: {
            text: code4+" "+ sub4 +" " + "Final Exam Pass Rate (%)",
            display: true
        },
        legend: {
          display: false
        },
        scales:{
            yAxes:[{
              ticks:{
                  stepSize:10
              }
            }]
        }
    }
});


    }
   
});
