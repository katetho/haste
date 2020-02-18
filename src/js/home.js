import collapsables from './collapsableCards';
import dropdowns from './dropdowns';
import ticketModal from './ticketModal';
import utilities from './utilitiesHome';
import ticketTakeReq from './ticketTakeReq';

export default function home() {
  if (window.location.pathname==="/") {
    collapsables();
    dropdowns();
    ticketModal();
    utilities();
    ticketTakeReq();
  }
}
