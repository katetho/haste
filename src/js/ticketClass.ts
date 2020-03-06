export default class Ticket{
    title: string;
    department: string;
    priority:string;
    deadline: Date;
    description:string;

    constructor(title: string, department: string, priority:string, deadline: Date, description:string) {
      this.title = title;
      this.department = department;
      this.priority = priority;
      this.deadline = deadline;
      this.description = description;
    }
  }
