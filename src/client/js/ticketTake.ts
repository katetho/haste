import modals from './Modals.ts';
import fetchData from './fetchData.ts';

let takeBtns: HTMLCollectionOf<Element> = document.getElementsByClassName('btn-take-ticket');
let takeBtn: Element;

export default function ticketTake() {
    for (let i = 0; i < takeBtns.length; i++) {
        takeBtns[i].addEventListener('click', ()=>{
          takeBtn = takeBtns[i];
          fetchData({}, 'PATCH', '/tickets/'+takeBtn.id, assigneePatch);
    })
}
function assigneePatch(res: any): void {
  console.log('ENTERED')
        if (res.status === 200) {
          (<HTMLElement>takeBtn).innerHTML='Close';
          (<HTMLElement>takeBtn).classList.toggle('btn-close-ticket');
          (<HTMLElement>takeBtn).classList.toggle('btn-take-ticket');
          modals();
        }
    }
}
