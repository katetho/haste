import ticket from './ticket.js';

export default function cardTicketsContent(tickets) {
  if (!tickets) {
      return;
  }
  document
      .getElementsByClassName('tickets-display')[0]
      .innerHTML = tickets
      .getElementsByClassName('tickets-display')[0]
      .innerHTML; //this chunk of dom is generated after the scripts are added
  ticket();
}
