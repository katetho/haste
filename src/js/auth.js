import postAuth from './authReq';

(function signin() {
    let welcomeTxt = document.querySelector('.welcome-txt')
    let userForm = document.querySelector('.user');
    let email = userForm.querySelector('input[type=email]');
    let password = userForm.querySelector('input[type=password]');
    let submitSignin = userForm.querySelector('.btn-user');

    if (sessionStorage.rggd) {
        welcomeTxt.innerHTML = atob(sessionStorage.rggd); //decode from base64
    }
    submitSignin.onclick = function() {
        let user = {
            email: email.value,
            password: password.value
        }
        postAuth(user);
    }
})();
