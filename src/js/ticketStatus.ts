let statusSection = document.querySelector('.ticket-status');

export default function ticketStatus() {
  statusSection.addEventListener('click',function(e: MouseEvent){
    e.preventDefault();
    location.search='?status='+(<HTMLElement>e.target).classList.value;
  })
}
