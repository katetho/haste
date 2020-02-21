import postUser from './registerReq';
import userClass from './userClass';
let User = userClass();

(function register() {
  let form = document.getElementsByClassName('user-register')[0];
  let inputs = form.querySelectorAll('input, select');
  let registerBtn = form.querySelector('.btn-user')
  registerBtn.onclick = function() {
      sessionStorage.removeItem('rggd');
      let user = [];
      //for...in iterated through
      //non-enumerable props in this case
      for (let input of inputs) {
              user.push(input.value);
      }
      postUser(new User(...user));
  }
})();
