import postAuth from './authRequests';

function signin() {
    let userForm = document.querySelector(".user");
    let email = userForm.querySelector("input[type=email]");
    let password = userForm.querySelector("input[type=password]");
    let submitSignin = userForm.querySelector(".btn-user");

    submitSignin.onclick = function() {
        let user = {
            email: email.value,
            password: password.value
        }
        postAuth(user);
    }
}

export default function authenticate() {
    if (window.location.pathname === "/users/signin") {
        signin();
    }
}
