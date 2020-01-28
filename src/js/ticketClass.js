/*function TicketingSystem() {
//implement singleton
}
let ticketingSystem = new TicketingSystem();
*/

function Ticket(title, department, priority, deadline, description) {
    this.title = title;
    this.department = department;
    this.priority = priority;
    this.deadline = deadline;
    this.description = description;
}
