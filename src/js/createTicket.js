(function(){
let newTicketBtn = document.getElementsByClassName('btn-icon-split')[0];
let bgModal = document.getElementsByClassName('bg-modal')[0];
let closeBtn= document.getElementsByClassName('close-bg-modal')[0];
let page = document.getElementsByTagName('main')[0];
let form = document.getElementsByClassName('ticket-form')[0];
let submit = document.getElementsByClassName('submit')[0];

submit.onclick = function(event) {
	let inputs = form.querySelectorAll('input, select, textarea');
	let inputCount = 0;
	for(let input of inputs) {
		if(input.value === "") {
			input.style.borderColor = 'red';
		}
		else {
			inputCount++;
			input.style.borderColor = '#CFD8DC';
			if (inputCount===inputs.length) {
			for(let input of inputs) {
				console.log(input.value)
			}
			}
		}
	}
}

newTicketBtn.onclick = function() {
	bgModal.style.display = "flex";
	page.className = 'blur';
}

closeBtn.onclick = function() {
	bgModal.style.display = "none";
	page.className = '';
}
})()
