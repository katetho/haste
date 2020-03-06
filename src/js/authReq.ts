export default function postAuth(userCredentials) {
    let fields: NodeListOf<HTMLElement> = document.querySelectorAll('input');
    let username: string;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/users/signin", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(userCredentials))
    xhr.onload = function(): void {
        if (xhr.status === 200) {
            username = JSON.parse(xhr.response);
            localStorage.un = username; //base64 encoded
            window.location.replace('/')
        }
        if (xhr.status === 401) { //user doesn't exist
            let wrong: Array<string> = JSON.parse(xhr.response);
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
            //tooltip+red border
        }
        if (xhr.status === 422) { //missing data
            let missing: Array<string> = JSON.parse(xhr.response);
            for (let field of fields) { //or missing[field] for es5
                if (missing.includes((<HTMLInputElement>field).type)) {
                    (<HTMLElement>field.parentNode).removeAttribute('data-tooltip');
                    field.style.borderColor = 'red';
                } else {
                    field.style.borderColor = '#CFD8DC';
                }
            }
            //tooltip+red border
        }
    }
}
