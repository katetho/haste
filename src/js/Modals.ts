import Ticket from './ticketClass.ts';
import postTicket from './ticketsReq.ts';
import postTicketClose from './ticketCloseReq.ts';

let newTicketBtn: HTMLElement = document.querySelector('.new-ticket');
let closeTicketBtn: HTMLCollectionOf<Element> = document.getElementsByClassName('btn-close-ticket');
let page: HTMLElement = document.querySelector('main');

export default function showModals() {
    newTicketBtn.addEventListener('click', showBgModal);
    for (let i = 0; i < closeTicketBtn.length; i++) {
        closeTicketBtn[i].addEventListener('click', showBgModal);
    }
}

function showBgModal(e) {
    let bgModal: HTMLElement;
    if (e.currentTarget.classList.contains('new-ticket')) {
        bgModal = document.querySelector('.bg-modal');
        let form: HTMLFormElement = bgModal.querySelector('.ticket-form');
        let deadline: HTMLInputElement = form.deadline;
        deadline.onfocus = function(e: Event) { //let the user choose a date onfocus
            (<HTMLInputElement>e.currentTarget).type = "date";
        }

        deadline.onblur = function(e: Event) { //show the placeholder onblur
           (<HTMLInputElement>e.currentTarget).type = "text";
        }

        let submit: HTMLElement = bgModal.querySelector('.submit-ticket');
        submit.addEventListener('click', submitTicket);

        function submitTicket() {
            let inputs: NodeListOf<Element> = form.querySelectorAll('input, select, textarea'); //get all inputs
            let inputCount: number = 0;
            for (let input of inputs) {
                if ((<HTMLInputElement>input).validationMessage !== '') {
                    (<HTMLInputElement>input).style.borderColor = 'red'; //outline empty fields or long title
                    if ((<HTMLInputElement>input).name === 'title') {
                        let tooltipTxt = (<HTMLInputElement>input.parentNode).getAttribute('data');
                        (<HTMLInputElement>input.parentNode).setAttribute('data-tooltip', tooltipTxt);
                    }
                } else {
                    inputCount++;
                    (<HTMLInputElement>input).style.borderColor = '#CFD8DC';
                    (<HTMLInputElement>input.parentNode).removeAttribute('data-tooltip');
                    if (inputCount === inputs.length) {
                        let ticketsArr = []
                        for (let input of inputs) {
                            let val = (<HTMLInputElement>input).value;
                            if ((<HTMLInputElement>input).name === 'description' || (<HTMLInputElement>input).name === 'title') {
                                val = val.slice(0, 1)
                                    .toUpperCase() + val.slice(1, val.length);
                            }
                            ticketsArr.push(val);
                        }
                        postTicket(new Ticket(...ticketsArr)); //ES6, for ES5 - loop through
                        form.reset();
                        bgModal.style.display = "none";
                        page.className = '';
                    }
                }
            }
        }
    }
    if (e.currentTarget.classList.contains('btn-close-ticket')) {
        bgModal = document.querySelector('.close-ticket-modal');
        let submit: HTMLElement = bgModal.querySelector('.close-ticket');
        let ticketId: string = e.currentTarget.id;
        submit.addEventListener('click', closeTicket);

        function closeTicket() {
            let action: string = bgModal.querySelector('input[name=close]:checked')
                .id;
            postTicketClose({
                action,
                ticketId
            });
            bgModal.style.display = "none";
            page.className = '';
        }
    }
    bgModal.style.display = "flex";
    page.className = 'blur'
    centerModal(bgModal);

    window.onresize = function(bgModal) {
        centerModal(bgModal);
    }

    let closeBtn: HTMLElement = bgModal.querySelector('.close-bg-modal');
    closeBtn.onclick = function() {
        bgModal.style.display = "none";
        page.className = '';
    }

    function centerModal(bgMod):void {
        if(!bgMod) {
          return;
        }
        let contents: HTMLElement = bgMod.querySelector('.modal-contents');
        let width: number = contents.getBoundingClientRect().width;
        let height: number = contents.getBoundingClientRect().height;
        scrollTo({
            top: contents.offsetTop - height / 5,
            left: contents.offsetLeft - width / 5,
            behavior: 'smooth'
        });
    }
}
