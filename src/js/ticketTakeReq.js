import modals from './Modals.js';

let takeBtns = document.getElementsByClassName('btn-take-ticket');

export default function ticketTakeReq() {
    for (let i = 0; i < takeBtns.length; i++) {
        takeBtns[i].addEventListener('click', assigneePatch);
    }
}

function assigneePatch() {
    let takeBtn = this;
    let assignee = atob(localStorage.un); //decode from base64
    let xhr = new XMLHttpRequest();
    xhr.open('PATCH', '/tickets/' + takeBtn.id);
    xhr.setRequestHeader('Content-Type', 'application/json');
    let user = {
        assignee
    };
    xhr.send(JSON.stringify(user));
    xhr.onload = function() {
        if (this.status === 200) {
          takeBtn.innerHTML='Close';
          takeBtn.classList.toggle('btn-close-ticket');
          takeBtn.classList.toggle('btn-take-ticket');
        }
        modals();
    }
}
