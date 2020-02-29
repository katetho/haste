import ticketClass from './ticketClass';
import postTicket from './ticketsReq';
import postTicketClose from './ticketCloseReq'
let Ticket = ticketClass();

let newTicketBtn = document.getElementsByClassName('new-ticket')[0];
let closeTicketBtn = document.getElementsByClassName('btn-close-ticket');
let page = document.getElementsByTagName('main')[0];

export default function showModals() {
    newTicketBtn.addEventListener('click', showBgModal);
    for (var i = 0; i < closeTicketBtn.length; i++) {
        closeTicketBtn[i].addEventListener('click', showBgModal);
    }
}

function showBgModal(e) {
    let bgModal;
    if (e.currentTarget.classList.contains('new-ticket')) {
        bgModal = document.querySelector('.bg-modal');
        let form = bgModal.querySelector('.ticket-form');
        let deadline = form.deadline;
        deadline.onfocus = function() { //let the user choose a date onfocus
            this.type = "date";
        }

        deadline.onblur = function() { //show the placeholder onblur
            this.type = "text";
        }

        let submit = bgModal.querySelector('.submit-ticket');
        submit.addEventListener('click', submitTicket);

        function submitTicket() {
            let inputs = form.querySelectorAll('input, select, textarea'); //get all inputs
            let inputCount = 0;
            for (let input of inputs) {
                if (input.validationMessage !== '') {
                    input.style.borderColor = 'red'; //outline empty fields or long title
                    if (input.name === 'title') {
                        let tooltipTxt = input.parentNode.getAttribute('data');
                        input.parentNode.setAttribute('data-tooltip', tooltipTxt);
                    }
                } else {
                    inputCount++;
                    input.style.borderColor = '#CFD8DC';
                    input.parentNode.removeAttribute('data-tooltip');
                    if (inputCount === inputs.length) {
                        let ticketsArr = []
                        for (let input of inputs) {
                            let val = input.value;
                            if (input.name === 'description' || input.name === 'title') {
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
        let submit = bgModal.querySelector('.close-ticket');
        let ticketId = e.currentTarget.id;
        submit.addEventListener('click', closeTicket);

        function closeTicket() {
            let action = bgModal.querySelector('input[name=close]:checked')
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

    let closeBtn = bgModal.querySelector('.close-bg-modal');
    closeBtn.onclick = function() {
        bgModal.style.display = "none";
        page.className = '';
    }

    function centerModal() {
        let contents = bgModal.querySelector('.modal-contents');
        let width = contents.getBoundingClientRect().width;
        let height = contents.getBoundingClientRect().height;
        scrollTo({
            top: contents.offsetTop - height / 5,
            left: contents.offsetLeft - width / 5,
            behavior: 'smooth'
        });
    }
}
