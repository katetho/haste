import cardTicketsContent from './cardTicketsContent';

export default function postTicket(obj) {
      let xhr = new XMLHttpRequest();
      xhr.open('POST', '/tickets', true);
      xhr.setRequestHeader("Content-Type", "application/json");
      obj.location=location.pathname.slice(1);
    //  xhr.withCredentials=true;
      xhr.responseType = 'document';
      xhr.onload = function() {
          if (this.status == 200) {
              cardTicketsContent(this.response);
          }
      }
      xhr.send(JSON.stringify(obj));
  }
