export default function postRegister(user) {
    let form: HTMLElement = document.querySelector('.user-register');
    let inputs: NodeListOf<HTMLElement> = form.querySelectorAll('input, select') as NodeListOf<HTMLElement>;;
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
            let invalidFields: Array<string> = JSON.parse(xhr.response);
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
        }
    }
}
