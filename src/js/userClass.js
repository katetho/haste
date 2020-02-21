export default function userClass() {
  return function User(firstName, lastName, email, department, password, repPassword, role) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.department = department;
    this.password = password;
    this.repPassword = repPassword;
    this.role = role || 'member';
  }
}
