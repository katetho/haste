import postUser from './registerReq';
import userClass from './userClass';
let User = userClass();

async function registerForm() {
    let form = document.getElementsByClassName('user-register')[0];
    let inputs = form.querySelectorAll('input, select');
    let registerBtn = form.querySelector('.btn-user')
    registerBtn.onclick = function() {
        sessionStorage.removeItem('registered');
        let user = [];
        //for...in iterated through
        //non-enumerable props in this case
        for (let input of inputs) {
            if (input['id'] !== 'repeatPassword') {
                user.push(input.value);
            }
        }
        postUser(new User(...user));
    }
}

export default function register() {
    if (window.location.pathname === "/users/register") {
        registerForm();
    }
}
