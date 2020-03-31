let dropDowns: NodeListOf<HTMLElement> = document.querySelectorAll('.nav-link');
let navbarSide: HTMLElement = document.querySelector('.navbar-nav');
let pageTopBtn: HTMLElement = document.querySelector('#sidebarToggleTop');
let pageTop: HTMLElement = document.querySelector('#page-top');

for (let i = 0; i < dropDowns.length; i++) {
    dropDowns[i].addEventListener('click', showToggle)
}

function showToggle(e):void {
    let el: HTMLElement = (<HTMLElement>e.currentTarget);
    el.classList.toggle("show");
    if (el.nextElementSibling) {
        el.nextElementSibling.classList.toggle("show");
    }
    el["aria-expanded"] = !el["aria-expanded"]
}

export default function dropdowns() {
    pageTopBtn.onclick = function() {
        pageTop.classList.toggle('sidebar-toggled');
        navbarSide.classList.toggle('toggled');
    }
}
