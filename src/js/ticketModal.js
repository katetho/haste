    let newTicketBtn = document.getElementsByClassName('new-ticket')[0];
    let bgModal = document.getElementsByClassName('bg-modal')[0];
    let contents = document.getElementsByClassName('modal-contents')[0];
    let closeBtn = document.getElementsByClassName('close-bg-modal')[0];
    let page = document.getElementsByTagName('main')[0];
    let form = document.getElementsByClassName('ticket-form')[0];
    let submit = document.getElementsByClassName('submit-ticket')[0];
    let deadline = document.getElementById('deadline');
    let tooltiptext = document.getElementsByClassName('tooltiptext')[0];

    submit.onclick = function(event) {
        let inputs = form.querySelectorAll('input, select, textarea'); //get all inputs
        let title = inputs[0];
        let inputCount = 0;
        for (let input of inputs) { //don't iterate through "form" - too many elements
            if (input.value === "") {
                input.style.borderColor = 'red'; //outline empty fields
            } else {
                inputCount++;
                input.style.borderColor = '#CFD8DC';
                if (inputCount === inputs.length) {
                    let ticketsArr = []
                    for (let input of inputs) {
                        let val = input.value;
                        if (input.id === 'description' || input.id === 'title') {
                            val = val.slice(0, 1)
                                .toUpperCase() + val.slice(1, val.length);
                        }
                        ticketsArr.push(val);
                    }
                    if (title.value.length > 35) {
                        title.style.borderColor = 'red';
                        tooltiptext.style.opacity = 1;
                    } else {
                        postTicket(new Ticket(...ticketsArr)); //ES6, for ES5 - loop through
                        bgModal.style.display = "none";
                        page.className = '';
                    }
                }
            }
        }
    }

    function centerModal() {
        let width = contents.getBoundingClientRect()
            .width;
        let height = contents.getBoundingClientRect()
            .height;
        scrollTo({
            top: contents.offsetTop - height / 5,
            left: contents.offsetLeft - width / 5,
            behavior: 'smooth'
        });
    }

    newTicketBtn.onclick = function() {
        tooltiptext.style.opacity = 0;
        bgModal.style.display = "flex";
        page.className = 'blur'
        centerModal();
    }

    window.onresize = function() {
        centerModal();
    }

    closeBtn.onclick = function() {
        bgModal.style.display = "none";
        page.className = '';
    }

    deadline.onfocus = function() { //let the user choose a date onfocus
        this.type = "date";
    }

    deadline.onblur = function() { //show the placeholder onblur
        this.type = "text";
    }

    localStorage.setItem('Modified', document.lastModified)
