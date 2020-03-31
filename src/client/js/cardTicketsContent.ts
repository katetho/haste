import collapsables from './collapsableCards.ts';
import ticketTake from './ticketTake.ts';
import modals from './Modals.ts';

export default function cardTicketsContent(tickets: HTMLElement): void {
  if (!tickets) {
      return;
  }
  document
      .getElementsByClassName('tickets-display')[0]
      .innerHTML = tickets
      .getElementsByClassName('tickets-display')[0]
      .innerHTML; //this chunk of dom is generated after the scripts are added

      collapsables();
      ticketTake();
      modals();
}
