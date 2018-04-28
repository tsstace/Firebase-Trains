# Firebase-Trains

This application lists train schedules hosted on a Firebase database via an API call.  The user may view, add additional trains or delete existing routes.  The system also calculates the next arrival of the trains based on the current system time and the interval between routes.   

Requirements:

3 actors: computer, user, Firebase

* Display a current list of trains on page load and after a click event
* OnClick event on the "add train" button triggers an insertion to the Firebase database to store the train name, destination, and frequency
* onClick event on the "delete button" triggers removal from the Firebase database; the deletion uses the name of the train as the criteria to match and execute the removal.
