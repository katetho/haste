/*function getTickets() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3002/tickets', true);
    xhr.send();
    xhr.onreadystatechange = function() {
        //  console.log('this.responseText');
        if (this.status == 200 && this.readyState == 4) {
            console.log(JSON.parse(this.responseText));
        }
    }
}
getTickets();
*/
function postTicket(obj) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3002/tickets', true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
        if (this.status == 200 && this.readyState == 4) {}
    }
    xhr.send(JSON.stringify(obj))
}
