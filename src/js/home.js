import collapsables from './collapsableCards';
import dropdowns from './dropdowns';
import ticketModal from './ticketModal';

export default function home() {
  if (window.location.pathname==="/") {
    collapsables();
    dropdowns();
    ticketModal();
  }
}
