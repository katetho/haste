export default function postRegister(user) {
    let form = document.getElementsByClassName('user-register')[0];
    let inputs = form.querySelectorAll('input, select');
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/users/register');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(user));
    xhr.onload = function() {
        if (xhr.status === 200) {
            //for replacing 'Welcome!' in the signin form with the below text, sessionStorage.registered
            sessionStorage
            .rggd = btoa('You have been registered successfully! Now you can sign in here'); //encode with base64
            window.location.replace('/users/signin');
        }
        if (xhr.status === 422) {
            let invalidFields = JSON.parse(xhr.response);
            let pas = form.querySelector('#password')
                .value;
            for (let input of inputs) {
                let passesDontMatch = (input.id === 'repeatPassword' && input.value !== pas);
                if (invalidFields.includes(input.id) || passesDontMatch) {
                    let tooltipTxt = input.parentNode.getAttribute('data')
                    input.parentNode.setAttribute('data-tooltip', tooltipTxt);
                    input.style.borderColor = 'red';
                } else {
                    input.style.borderColor = '#CFD8DC';
                    input.parentNode.removeAttribute('data-tooltip');
                }
            }
        }
    }
}
