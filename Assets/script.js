
// Delcare a Vaiable to show Current Date On HTML
var cureent_date = $("#currentDay");
// Use Day.js to get current Date and pass it to a variable
cureent_date.text(dayjs().format("dddd, MMMM Do"));