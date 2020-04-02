const validate = {
  name: function(name: string): boolean {
    let regPattern: RegExp = /^([a-zA-Z]+\s*){1,988}$/;
    return regPattern.test(name)
  },
  password: function(pass: string): boolean {
    let regPattern: RegExp = /^(?=\w*\d)(?=\w*[a-zA-Z])\w{8,50}$/; //bcrypt encrypts the first 72bytes
    return regPattern.test(pass);
  },
  email: function(email: string): boolean {
    let regPattern: RegExp = /^\w{1,64}@(?:\w|\.){1,256}$/;
    return regPattern.test(email);
  },
  department: function(department: string): boolean {
    let regPattern: RegExp = /^(Sales|IT Department|Staff|External|Customer Support|Other)$/;
    return regPattern.test(department);
  }
}
export { validate }
