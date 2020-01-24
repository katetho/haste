function getTickets() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3002/', true);
    xhr.send();
    xhr.onreadystatechange = function() {
        if (this.status == 200 && this.readyState == 4) {
            let tickets = this.responseText;
            let parser = new DOMParser()
            let parsed = parser.parseFromString(tickets, 'text/html')
            document
                .getElementsByClassName('collapsable-section')[0].innerHTML = parsed
                .getElementsByClassName('collapsable-section')[0].innerHTML;
        }
    }
}

function postTicket(obj) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3002/tickets', true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
        if (this.status == 200 && this.readyState == 4) {
            let tickets = this.responseText;
            let parser = new DOMParser()
            let parsed = parser.parseFromString(tickets, 'text/html')
            document
                .getElementsByClassName('collapsable-section')[0].innerHTML = parsed
                .getElementsByClassName('collapsable-section')[0].innerHTML;
      }
    }
    xhr.send(JSON.stringify(obj))
    return this.responseText;
}
