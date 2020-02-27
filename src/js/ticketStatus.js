import ticketStatusReq from './ticketStatusReq';

let statusSection = document.querySelector('.ticket-status');

export default function ticketStatus() {
  statusSection.addEventListener('click',function(e){
    e.preventDefault();
    location.search='?status='+e.target.classList.value;
    ticketStatusReq();
  })
}
