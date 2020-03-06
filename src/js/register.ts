import postUser from './registerReq.ts';
import User from './userClass.ts';

(function register() {
  let form: HTMLElement = document.querySelector('.user-register');
  let inputs: NodeListOf<Element> = form.querySelectorAll('input, select');
  let registerBtn: HTMLElement = form.querySelector('.btn-user')
  registerBtn.onclick = function() {
      sessionStorage.removeItem('rggd');
      let user = [];
      //for...in iterated through
      //non-enumerable props in this case
      for (let input of inputs) {
        let inputVal: string =  (<HTMLInputElement>input).value
        user.push(inputVal);
      }
      postUser(new User(...user));
  }
})();
