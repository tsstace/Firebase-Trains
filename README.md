# Firebase-Trains

This application lists train schedules hosted on Firebase and allows the user to add additional trains and delete existing routes.  It also calculates the next arrival of the train based on the current system time and the interval between routes.   

Requirements:

3 actors: computer, user, Firebase API

* Display a current list of trains on page load and after a click event
* OnClick event on the "add train" button triggers an insertion to the Firebase database to store the train name, destination, and frequency
* onClick event on the "delete button" triggers removal from the Firebase database; the deletion uses the name of the train to execute the removal.
