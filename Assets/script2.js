// Declare a variable to show Current Date On HTML
var cureent_date = $("#currentDay");
// Use Day.js to get the current Date and pass it to a variable
cureent_date.text(dayjs().format("dddd, MMMM Do"));

// Declare a variable to get the class of Calendar Container
var cal_container = $(".calendar_container");

// Declare working hours of the day
var working_hours = 8;

// Starting hour of the day
var hours = 9;

// Declare boolean to check Time format
var am = true;
var pm = false;

// Declare an empty array to store input values in a string
var InputArray = new Array(9);

// Declare a variable to get the current hour
var currentHour = dayjs().hour();
// Convert it to 12-hour format by subtracting 12 from it
if (currentHour > 12) {
    currentHour -= 12;
}

render();
retrivedata();

// Function TO Render all Code in the Start of Page Load
function render() {
     // Make that much of daily Plain list as much working hours
     for (var list = 0; list <=working_hours; list++) {
        if (am) {
            if (hours <= 12) {
                var hour_format = hours + " AM";
                createHtml(hour_format, list, hours);
                hours++;
            } else {
                am = false;
                pm = true;
                hours = 1;
                var hour_format = hours + " PM";
                createHtml(hour_format, list, hours);
                hours++;
            }
        } else if (pm) {
            if (hours <= 12) {
                var hour_format = hours + " PM";
                createHtml(hour_format, list, hours);
                hours++;
            } else {
                am = true;
                pm = false;
                hours = 1;
                var hour_format = hours + " AM";
                createHtml(hour_format, list, hours);
                hours++;
            }
        }
    }
}

function createHtml(hour_format, list, hours) {
    var list_row = $("<div class='row calendar_row' data-index=" + list + " ></div>");
    var l1 = $("<div class='col-1 time-block hour' data-index=" + list + "></div>");
    var l2 = $("<div class='col-10'><input type='text' data-index=" + list + "></div>");
    var l3 = $("<div class='block3 col-1 saveBtn' data-index=" + list + "><i class='fa fa-floppy-disk' data-index=" + list + "></i> </div>");
    cal_container.append(list_row);

    list_row.append(l1);
    list_row.append(l2);
    list_row.append(l3);

    list_row.children(".time-block").text(hour_format);

    colorCodeTimeBlocks(l2, hours, am);

}

function colorCodeTimeBlocks(timeBlock, hours, isAM) {
    if (isAM) {
        if (currentHour > hours) {
            timeBlock.children("input").addClass("past");
        } else if (currentHour === hours) {
            timeBlock.children("input").addClass("present");
        } else {
            timeBlock.children("input").addClass("future");
        }
    } else {
        // Add your PM-specific color-coding logic here
        if (currentHour + 12 > hours) {
            timeBlock.children("input").addClass("past");
        } else if (currentHour + 12 === hours) {
            timeBlock.children("input").addClass("present");
        } else {
            timeBlock.children("input").addClass("future");
        }
    }
}

// Save Button Function
$(".calendar_container").on("click", ".saveBtn", function (event) {
    var btn_number = event.target.dataset.index;
    var input_text = $("input[data-index='" + btn_number + "']").val();
    InputArray[btn_number] = input_text;
    localStorage.setItem("Inputs-Array", JSON.stringify(InputArray));
});

// Create Function to retrieve data from the local Storage
function retrivedata() {
    var get_local = JSON.parse(localStorage.getItem("Inputs-Array"));
    if (get_local) {
        for (var i = 0; i < InputArray.length; i++) {
            InputArray = get_local;
            var getval = InputArray[i];
            $("input[data-index='" + i + "']").val(getval);
        }
    }
}