let newTicketBtn = document.getElementsByClassName('btn-icon-split')[0];
let bgModal = document.getElementsByClassName('bg-modal')[0];
let closeBtn= document.getElementsByClassName('close-bg-modal')[0];
let page = document.getElementsByTagName('main')[0];

newTicketBtn.addEventListener("click", function() {
	bgModal.style.display = "flex";
	page.className = 'blur';
});

closeBtn.addEventListener("click", function() {
  console.log('closeBtn')
	bgModal.style.display = "none";
	page.className = '';
});
