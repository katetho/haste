import User from './userClass.ts';
import fetchData from './fetchData.ts';

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
      fetchData(new User(...user), 'POST', '/users/register',postUser)
  }
})();

function postUser(res): void {
    if (res.status === 200) {
        //for replacing 'Welcome!' in the signin form with the below text, sessionStorage.registered
        sessionStorage
        .rggd = btoa('You have been registered successfully! Now you can sign in here'); //encode with base64
        window.location.replace('/users/signin');
    }
    if (res.status === 422) {
      Promise.resolve(res.json()).then((data)=>{
        let invalidFields: Array<string> = data;
        console.log(invalidFields)
        let form: HTMLElement = document.querySelector('.user-register');
        let inputs: NodeListOf<HTMLElement> = form.querySelectorAll('input, select') as NodeListOf<HTMLElement>;
          for (let input of inputs) {
              if (invalidFields.includes(input.id)) {
                  let tooltipTxt: string = (<HTMLElement>input.parentNode).getAttribute('data');
                  (input.parentNode as HTMLElement).setAttribute('data-tooltip', tooltipTxt);
                  input.style.borderColor = 'red';
              } else {
                  input.style.borderColor = '#CFD8DC';
                  (input.parentNode as HTMLElement).removeAttribute('data-tooltip');
              }
          }
      })
    }
}
