import cardTicketsContent from './cardTicketsContent';

export default function ticketStatusPost(ticketStatus) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', location.href);
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.responseType = 'document';
    xhr.onload = function() {
        if (this.status == 200) {
            cardTicketsContent(this.response);
        }
    }
    xhr.send();
}
