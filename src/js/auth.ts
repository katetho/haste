import postAuth from './authReq.js';

let welcomeTxt: string = (<HTMLInputElement>document.querySelector('.welcome-txt')).innerHTML;
let submitSignin: HTMLElement = document.querySelector('.btn-user');

if (sessionStorage.rggd) {
    welcomeTxt = atob(sessionStorage.rggd); //decode from base64
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
