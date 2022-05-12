

    var labels1= []
    var labels2= []
    var labels3= []
    var labels4= []






   

  document.addEventListener('DOMContentLoaded', function() {


     
    var calendarE1 = document.getElementById('calendar');

    $.ajax({
   
        dataType: 'json',
        type: 'POST',
        url: "./calendarChart",
        success: function(data) {
  draw(data.map(obj=>{
      return{
          title:obj.title,
          start:obj.start,
          end:obj.end
          
        
      }
  }))
        /*
         for (var i = 0;i<data.length;i++){
            labels1.push(data[i].title)
            labels2.push(data[i].start)
            labels3.push(data[i].end)
            labels4.push(data[i].date)
     
           
       
         }/*
         console.log(data[0].title, data[0].start)
        

 /*      

  

    var calendar = new FullCalendar.Calendar(calendarE1,
      {
        initialView:'dayGridMonth',
        initialDate:'2020-07-07',
        headerToolbar: {
          left:'prev, next today',
          center:'title',
          right:'dayGridMonth, timeGridWeek, timeGridDay'
        },

        
    
         events:data
    
      });
      calendar.render();
*/
  
    }
})
  
        });
/*
    }
})
   */

function draw(data){
    var calendarE1 = document.getElementById('calendar');
    
    var calendar = new FullCalendar.Calendar(calendarE1,
        {
          initialView:'dayGridMonth',
          initialDate:Date.now(),
          headerToolbar: {
            left:'prev, next today',
            center:'title',
            right:'dayGridMonth, timeGridWeek, timeGridDay'
          },

          events:data
    
      });
      calendar.render();

  
          
}