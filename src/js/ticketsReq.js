export default function postTicket(obj) {
      let xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://localhost:3002/tickets', true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.responseType = 'document';
      xhr.onload = function() {
          if (this.status == 200) {
              let tickets = this.response;
              document
                  .getElementsByClassName('collapsable-section')[0]
                  .innerHTML = tickets
                  .getElementsByClassName('collapsable-section')[0]
                  .innerHTML;
          }
      }
      xhr.send(JSON.stringify(obj));
  }
