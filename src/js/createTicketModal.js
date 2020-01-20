(function() {
    let newTicketBtn = document.getElementsByClassName('new-ticket')[0];
    let bgModal = document.getElementsByClassName('bg-modal')[0];
    let contents = document.getElementsByClassName('modal-contents')[0];
    let closeBtn = document.getElementsByClassName('close-bg-modal')[0];
    let page = document.getElementsByTagName('main')[0];
    let form = document.getElementsByClassName('ticket-form')[0];
    let submit = document.getElementsByClassName('submit')[0];
    let deadline = document.getElementById('deadline');

    submit.onclick = function(event) {
        let inputs = form.querySelectorAll('input, select, textarea'); //get all inputs
        let inputCount = 0;
        for (let input of inputs) {
            if (input.value === "") {
                input.style.borderColor = 'red'; //outline empty fields
            } else {
                inputCount++;
                input.style.borderColor = '#CFD8DC';
                if (inputCount === inputs.length) {
                  let ticketsArr = []
                    for (let input of inputs) {
                      ticketsArr.push(input.value);
                    }
                    postTicket(new Ticket(...ticketsArr)); //ES6, for ES5 - loop through
                }
            }
        }
            bgModal.style.display = "none";
            page.className = '';
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
})()
