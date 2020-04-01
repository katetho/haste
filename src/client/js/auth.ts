import fetchData from './fetchData.ts';

let welcomeTxt: HTMLElement = document.querySelector('.welcome-txt');
let submitSignin: HTMLElement = document.querySelector('.btn-user');

if (sessionStorage.rggd) {
    welcomeTxt.innerHTML = atob(sessionStorage.rggd); //decode from base64
}
submitSignin.onclick = function() {
    let email: string = (<HTMLInputElement>document.querySelector('input[type=email]')).value;
    let password: string = (<HTMLInputElement>document.querySelector('input[type=password]')).value;
    let user = {
        email,
        password
    }
    fetchData(user, 'POST', '/users/signin', postAuth);
}

function postAuth(res:any): void {
  let fields: NodeListOf<HTMLElement> = document.querySelectorAll('input');
  let username: string;
  if (res.status === 200) {
      Promise.resolve(res.json()).then((data)=>{
      username = data;
      localStorage.un = username;
      window.location.replace('/')
    })
  }
  if (res.status === 401) { //user doesn't exist
      Promise.resolve(res.json()).then((data)=>{
      let wrong: Array<string> = data;
      for (let field of fields) { //or missing[field] for es5
          if (wrong.includes((<HTMLInputElement>field).type)) {
              field.style.borderColor = 'red';
              let tooltipTxt = (<HTMLElement>field.parentNode).getAttribute('data');
              (<HTMLElement>field.parentNode).setAttribute('data-tooltip', tooltipTxt);
          } else {
              (<HTMLElement>field.parentNode).removeAttribute('data-tooltip');
              field.style.borderColor = '#CFD8DC';
          }
      }
    });
  }
  if (res.status === 422) { //missing data
    Promise.resolve(res.json()).then((data)=>{
      let missing: Array<string> = data;
      for (let field of fields) { //or missing[field] for es5
          if (missing.includes((<HTMLInputElement>field).type)) {
              (<HTMLElement>field.parentNode).removeAttribute('data-tooltip');
              field.style.borderColor = 'red';
          } else {
              field.style.borderColor = '#CFD8DC';
          }
      }
  });
}
}
