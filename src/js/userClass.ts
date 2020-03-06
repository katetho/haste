export default class User {
    firstName: string;
    lastName: string;
    email: string;
    department: string;
    password: string;
    repPassword: string;
    role: string;

    constructor(firstName?: string, lastName?: string, email?: string, department?: string, password?: string, repPassword?: string, role?: string) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.department = department;
      this.password = password;
      this.repPassword = repPassword;
      this.role = role || 'member';
    }
  }
