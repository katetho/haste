export default function userClass() {
  return function User(firstName, lastName, email, department, password, role) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.department = department;
    this.password = password;
    this.role = role || 'member';
  }
}
