
var labels1= []
var labels3= []
var labels4= []
var class1,sub, code

let colors1 = ['#49A9EA', '#36CAAB'];



$.ajax({
   
    dataType: 'json',
    type: 'POST',
    url: "./PassChartT",
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
        code = data[i].subjectCode
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
            text: code +" "+ sub +" " + "Class Test Pass Rate (%)",
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



