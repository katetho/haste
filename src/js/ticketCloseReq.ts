import cardTicketsContent from './cardTicketsContent.ts';

export default function postTicketClose(obj) {
  console.log('hi')
    let xhr = new XMLHttpRequest();
    xhr.open('PATCH', '/tickets/close');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.responseType = 'document';
    xhr.onload = function() {
        if (xhr.status === 200) {
          cardTicketsContent(this.response);
        }
    }
    xhr.send(JSON.stringify(obj))
}
