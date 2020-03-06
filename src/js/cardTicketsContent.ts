import collapsables from './collapsableCards.ts';
import ticketTakeReq from './ticketTakeReq.ts';
import modals from './Modals.ts';

export default function cardTicketsContent(tickets: HTMLElement) {
  if (!tickets) {
      return;
  }
  document
      .getElementsByClassName('tickets-display')[0]
      .innerHTML = tickets
      .getElementsByClassName('tickets-display')[0]
      .innerHTML; //this chunk of dom is generated after the scripts are added

      collapsables();
      ticketTakeReq();
      modals();
}
