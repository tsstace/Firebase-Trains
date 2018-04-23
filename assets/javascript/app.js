function thisMoment() {
  var currentDate = moment().format('MMMM Do YYYY, h:mm:ss a');
  $("#dateTime").append('<p>' + currentDate + '</p>');
}
thisMoment();

// Initialize Firebase

var config = {
  apiKey: "AIzaSyBtsdATLXshx-oWRsXNNbvSXBjD9ADEf-E",
  authDomain: "sandbox-1cfaa.firebaseapp.com",
  databaseURL: "https://sandbox-1cfaa.firebaseio.com",
  projectId: "sandbox-1cfaa",
  storageBucket: "sandbox-1cfaa.appspot.com",
  messagingSenderId: "182746347442"
};

firebase.initializeApp(config);

var database = firebase.database();
var provider = new firebase.auth.GoogleAuthProvider();

var dataRef = firebase.database();

// Initial Values
var name = "";
var destination = "";
var trainTime = "";
var frequency = "";
var nextTrainArrival = "";
var minutesAway = "";
var sound = new Audio("assets/sound/button-click.mp3");

// Capture Button Click
$("#click-button").on("click", function (event) {
  event.preventDefault();
  sound.play();

  // Grab values from text boxes
  name = $("#name-input").val().trim();
  destination = $("#destination-input").val().trim();
  trainTime = $("#time-input").val().trim();
  frequency = $("#freq-input").val().trim();
  // call myFunction to calculate values that are not explicitly stored
  var nextTrain = myFunction(trainTime, frequency);
  nextTrainArrival = nextTrain;
  //
  minutesAway = minutesAway;
  //
  $("input[type='text']").val("");
  $("input[type='number']").val("");
  $("input[data-date-format='HH:mm']").val("");



  // Insert the data entered into Firebase
  database.ref().push({
    name: name,
    destination: destination,
    frequency: frequency,
    trainTime: trainTime,
    nextTrainArrival: nextTrain,
    minutesAway: minutesAway,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });

});

//====================================================

function myFunction(tt, fr) {

  var firstTimeConverted = moment(tt, "hh:mm").subtract(1, "years");

  // Current Time
  var currentTime = moment();

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

  // Time apart (use modulus to handle remainder)
  var tRemainder = diffTime % fr;

  // Minutes Until Train
  var tMinutesUntilTrain = fr - tRemainder;
  minutesAway = tMinutesUntilTrain;

  // Next Train
  var nextTrain = moment().add(tMinutesUntilTrain, "minutes");

  return (moment(nextTrain).format("hh:mm"));

}

myFunction();

//
//
//  Return newly added train info to the screen
//
dataRef.ref().on("child_added", function (childSnapshot) {

  $("#trainSchedule").append("<tr><td span id='name'> " + childSnapshot.val().name + "</td>" +
    " </span><td span id='destination'> " + childSnapshot.val().destination + "</td>" +
    " </span><td span id='frequency'> " + childSnapshot.val().frequency + "</td>" +
    " </span><td span id='next'> " + childSnapshot.val().nextTrainArrival + "</td>" +
    " </span><td span id='minAway'> " + childSnapshot.val().minutesAway + "</td>" + " </span></div>");

  // Handle an error scenario?
}, function (errorObject) {
  console.log("Errors handled: " + errorObject.code);
});

dataRef.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val().name);
  console.log(childSnapshot.val().destination);
  console.log(childSnapshot.val().trainTime);
  console.log(childSnapshot.val().frequency);
  console.log(childSnapshot.val().dateAdded);

});

dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (childSnapshot) {

});
