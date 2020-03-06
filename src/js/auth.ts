import postAuth from './authReq.ts';

let welcomeTxt: HTMLElement = document.querySelector('.welcome-txt');
let submitSignin: HTMLElement = document.querySelector('.btn-user');

if (sessionStorage.rggd) {
    welcomeTxt.innerHTML = atob(sessionStorage.rggd); //decode from base64
}
submitSignin.onclick = function() {
    let email: string = (<HTMLInputElement>document.querySelector('input[type=email]')).value;
    let password: string = (<HTMLInputElement>document.querySelector('input[type=password]')).value;
    let user = {
        email: email,
        password: password
    }
    postAuth(user);
}
