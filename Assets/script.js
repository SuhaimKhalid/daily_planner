
// Delcare a Vaiable to show Current Date On HTML
var cureent_date = $("#currentDay");
// Use Day.js to get current Date and pass it to a variable
cureent_date.text(dayjs().format("dddd, MMMM Do"));


// Delcare a vaiable to get the class of Calender Container
var cal_container = $('.calendar_container');

// Delcare working hours of the day
var working_hours=8;

// Starting hour of the day
var hours= 9; 

// Declare bolean to check Time format
var am=true;
var pm=false;

// Declare a empty string to store input valu in a string
var InputArray = new Array(9);

 // Declare a variable to get current hour
 var currentHour = dayjs().hour();
//  convert it to 12 hour format by subtracting 12 in it
if(currentHour>12)
{
    currentHour-=12;
    
}


render();
retrivedata();
// Function TO Render all Code in the Start of Page Load
function render(){

    // Make that much of daily Plain list as much working hours
    for(var list=0; list<=working_hours;list++)
    {
    // Only run if Am is true
if(am)
{
    // If hours are less then 12
    if(hours<=12)
    { 
        // Add Am string to Hour value
        var hour_format= hours + " AM";
        createHtml(hour_format,list,hours);
        hours++;
        if(hours>12)
        {
            //Change hour value to 1 so we can switch from am to pm
            hours=1;   
            am=false;
            pm=true;
        }
    }
  
}
   // Only run if Pm is true
else if(pm)
{
    // If hours less then or equal to 12
    if(hours<=12)
    { 
        // Add Pm string to Hour value
        var hour_format= hours + " PM";
        createHtml(hour_format,list,hours);
        hours++;
        if(hours>12)
        {
            //Change hour value to 1 so we can switch from am to pm
            hours=1;   
            am=true;
            pm=false;
            
        }
    }
  
} 
    }
}

function createHtml(hour_format,list,hours)
{
    var list_row=$("<div class='row calendar_row' data-index="+ list + " ></div>");
   var l1=$("<div class='col-1 time-block hour' data-index="+ list + "></div>");
   var l2=$("<div class='col-10'><input type='text' data-index="+ list + "></div>");
   var l3=$("<div class='block3 col-1 saveBtn' data-index="+ list + "><i class='fa fa-floppy-disk' data-index="+ list + "></i> </div>");
   cal_container.append(list_row);
  
   list_row.append(l1);
   list_row.append(l2);
   list_row.append(l3);

   list_row.children(".time-block").text(hour_format);


   if (currentHour >hours) {
    // l1.attr("style","opacity: 0.5;");
    l2.children("input").addClass("past");
    // l3.attr("style","pointer-events:none;opacity: 0.5;");
} else if (currentHour === hours) {
    l2.children("input").addClass("present");
} else {
    l2.children("input").addClass("future");
}


// if(am)
// {
//     if (currentHour >hours) {
//         // l1.attr("style","opacity: 0.5;");
//         l2.children("input").addClass("past");
//         // l3.attr("style","pointer-events:none;opacity: 0.5;");
//     } else if (currentHour === hours) {
//         l2.children("input").addClass("present");
//     } else {
//         l2.children("input").addClass("future");
//     }
//     console.log(am)
// }
// if(pm)
// {
//     if (currentHour >hours) {
//         // l1.attr("style","opacity: 0.5;");
//         l2.children("input").addClass("past");
//         // l3.attr("style","pointer-events:none;opacity: 0.5;");
//     } else if (currentHour === hours) {
//         l2.children("input").addClass("present");
//     } else {
//         l2.children("input").addClass("future");
//     }
//     console.log(am)
// }
   

}


// Save Button Function
$(".calendar_container").on("click",".saveBtn",function (event){
  
    // Getting the current target dataset into the variable
    var btn_number = event.target.dataset.index;
    
    // Getting the input on the base of dataset
    var input_text=$("input[data-index='"+btn_number+"']").val();

    //Store input value into the array 
    InputArray[btn_number]=input_text;
    
    // InputArray.splice(btn_number-1, 1, input_text);
    
    // Store array into the local Storage
    localStorage.setItem("Inputs-Array",JSON.stringify(InputArray));
    
    })


    // Create Function to retrive data from the local Storage
    function retrivedata(){

        // Delcare a variable to hold 
        var get_local= JSON.parse(localStorage.getItem("Inputs-Array"));
        
            if(get_local){
                for(var i=0; i<InputArray.length; i++)
                {
                    InputArray = get_local;
                    // Passing data
                    var getval=InputArray[i];
            
                    // Putting it inthe html by .val(function)
                    $("input[data-index='"+ i +"']").val(getval);
                }
            }

    }

    // // Stop User to enter in the past input field
    // $('.past').keydown(function(event) {
    //     event.preventDefault();
    //     return false;
    //  });