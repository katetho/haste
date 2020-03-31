let header: HTMLCollectionOf<Element> = document.getElementsByClassName("d-block");
let cardBody: NodeListOf<HTMLElement> = document.querySelectorAll('.collapse, .show');
let takeBtn: NodeListOf<HTMLElement> = document.querySelectorAll('.btn-take-ticket');

function showHide(el: HTMLElement): void {
    if (el.style.height !== '0px') {
        el.style.height = '0px';
    } else {
        el.style.display = 'block'; // Make it visible
        el.style.height = el.scrollHeight + 'px';
    }
}

function fixHeight(el: HTMLElement): void {
    if (el.style.height !== '0px') {
        el.style.height = el.scrollHeight + 'px';
    }
}

export default function collapsables() {
    for (let i = 0; i < header.length; i++) {
            header[i].addEventListener("click", function(e: MouseEvent) {
            e.preventDefault();
            (<HTMLLinkElement>e.currentTarget).classList.toggle("active");
            let panel: any = (<HTMLLinkElement>e.currentTarget).nextElementSibling; //TYPE??
            fixHeight(panel);
            console.log(panel)
            setTimeout(showHide, 0, panel); //showHide must execute after fixHeight
        }); //otherwise height won't have a pixel value, and the transition wouldnt occur
    }

    window.addEventListener("resize", function() {
        for (let i = 0; i < cardBody.length; i++) {
            if (cardBody[i].style.height !== '0px')
                cardBody[i].style.height = 'auto';
        }
    });
}
