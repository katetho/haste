import collapsables from './collapsableCards';
import ticketTakeReq from './ticketTakeReq';

export default function postTicket(obj) {
      let xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://localhost:3002/tickets', true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.responseType = 'document';
      xhr.onload = function() {
          if (this.status == 200) {
              let tickets = this.response;
              document
                  .getElementsByClassName('tickets-display')[0]
                  .innerHTML = tickets
                  .getElementsByClassName('tickets-display')[0]
                  .innerHTML; //this chunk of dom is generated after the scripts are added
                  collapsables(); //so the earlier scripts won't work
                  ticketTakeReq();
          }
      }
      xhr.send(JSON.stringify(obj));
  }
