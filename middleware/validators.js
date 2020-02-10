module.exports = {
  name: function(name) {
    let regPattern = /^([a-zA-Z]+\s*){1,988}$/;
    return regPattern.test(name)
  },
  password: function(pass) {
    let regPattern = /^(?=\w*\d)(?=\w*[a-zA-Z])\w{8,}$/;
    return regPattern.test(pass);
  },
  email: function(email) {
    let regPattern = /^\w{1,64}@(?:\w|\.){1,256}$/;
    return regPattern.test(email);
  },
  department: function(department) {
    let regPattern = /^(Sales|IT Department|Staff|External|Customer Support|Other)$/;
    return regPattern.test(department);
  }
}
