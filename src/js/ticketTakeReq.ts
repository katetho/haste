import modals from './Modals.ts';

let takeBtns: HTMLCollectionOf<Element> = document.getElementsByClassName('btn-take-ticket');

export default function ticketTakeReq() {
    for (let i = 0; i < takeBtns.length; i++) {
        takeBtns[i].addEventListener('click', assigneePatch);
    }
}

function assigneePatch(e: MouseEvent): void {
    let takeBtn: HTMLElement = (<HTMLElement>e.currentTarget);
    let assignee: string = atob(localStorage.un); //decode from base64
    let xhr = new XMLHttpRequest();
    xhr.open('PATCH', '/tickets/' + takeBtn.id);
    xhr.setRequestHeader('Content-Type', 'application/json');
    let user = {
        assignee
    };
    xhr.send(JSON.stringify(user));
    xhr.onload = function() {
        if (this.status === 200) {
          (<HTMLElement>takeBtn).innerHTML='Close';
          (<HTMLElement>takeBtn).classList.toggle('btn-close-ticket');
          (<HTMLElement>takeBtn).classList.toggle('btn-take-ticket');
          modals();
        }
    }
}