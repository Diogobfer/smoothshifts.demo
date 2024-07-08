# SmoothShifts Demo
Allow a user to select a day and manage the operator status of that shift.

## Folder Docker_nginx_postgres 
Contains the Docker Compose and files used to create the PostgreSQL database and the proxy

## Interface
A page with a calendar to select the day, a table that shows the operators on service that day, or a message indicating that the shift doesn't have an operators assigned to it, and a button to edit the shift on the selected day.
When the edit button is pressed, it shows a second page with the current status of the shift. It shows all registered operators, a selection box that contains all the statuses to assign to each operator, and a button to add the selected operator. The second table contains the list of operators that have an assigned status on that shift and three buttons, one for saving the status of each operator on that shift, another to remove the status of a selected operator , and the last to return to the calendar interface.

## Rules of the Shift
Minimum 4 members on the service team and ate least one team leader.
All registered operators must have a status on that shift.

## Status
Service - The operators that are on duty.
Day off - The operators that have a day off because they have done a service.
Vacation - The operators that are on vacation.
Other - Situations that are outside the other three categories.

# Neptune All env on docker 
Contains a Compose file that builds a PostgreSQL database, an Nginx proxy, and the Neptune Open Edition containers.



