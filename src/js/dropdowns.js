let dropDowns = document.getElementsByClassName("nav-link");
let navbarSide = document.getElementsByClassName("navbar-nav")[0];
let pageTopBtn = document.getElementById("sidebarToggleTop");
let pageTop = document.getElementById("page-top");

pageTopBtn.onclick = function() {
    pageTop.classList.toggle('sidebar-toggled');
    navbarSide.classList.toggle('toggled');
}

for (let i = 0; i < dropDowns.length; i++) {
    dropDowns[i].addEventListener('click', showToggle)
}

function showToggle(e) {
    let el = e.currentTarget;
    el.classList.toggle("show");
    if (el.nextElementSibling) {
        el.nextElementSibling.classList.toggle("show");
    }
    el["aria-expanded"] = !el["aria-expanded"]
}
