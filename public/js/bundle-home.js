/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/home.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/Modals.ts":
/*!**************************!*\
  !*** ./src/js/Modals.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ticketClass_ts_1 = __webpack_require__(/*! ./ticketClass.ts */ "./src/js/ticketClass.ts");
const ticketsReq_ts_1 = __webpack_require__(/*! ./ticketsReq.ts */ "./src/js/ticketsReq.ts");
const ticketCloseReq_ts_1 = __webpack_require__(/*! ./ticketCloseReq.ts */ "./src/js/ticketCloseReq.ts");
let newTicketBtn = document.querySelector('.new-ticket');
let closeTicketBtn = document.getElementsByClassName('btn-close-ticket');
let page = document.querySelector('main');
function showModals() {
    newTicketBtn.addEventListener('click', showBgModal);
    for (let i = 0; i < closeTicketBtn.length; i++) {
        closeTicketBtn[i].addEventListener('click', showBgModal);
    }
}
exports.default = showModals;
function showBgModal(e) {
    let bgModal;
    if (e.currentTarget.classList.contains('new-ticket')) {
        bgModal = document.querySelector('.bg-modal');
        let form = bgModal.querySelector('.ticket-form');
        let deadline = form.deadline;
        deadline.onfocus = function (e) {
            e.currentTarget.type = "date";
        };
        deadline.onblur = function (e) {
            e.currentTarget.type = "text";
        };
        let submit = bgModal.querySelector('.submit-ticket');
        submit.addEventListener('click', submitTicket);
        function submitTicket() {
            let inputs = form.querySelectorAll('input, select, textarea'); //get all inputs
            let inputCount = 0;
            for (let input of inputs) {
                if (input.validationMessage !== '') {
                    input.style.borderColor = 'red'; //outline empty fields or long title
                    if (input.name === 'title') {
                        let tooltipTxt = input.parentNode.getAttribute('data');
                        input.parentNode.setAttribute('data-tooltip', tooltipTxt);
                    }
                }
                else {
                    inputCount++;
                    input.style.borderColor = '#CFD8DC';
                    input.parentNode.removeAttribute('data-tooltip');
                    if (inputCount === inputs.length) {
                        let ticketsArr = [];
                        for (let input of inputs) {
                            let val = input.value;
                            if (input.name === 'description' || input.name === 'title') {
                                val = val.slice(0, 1)
                                    .toUpperCase() + val.slice(1, val.length);
                            }
                            ticketsArr.push(val);
                        }
                        ticketsReq_ts_1.default(new ticketClass_ts_1.default(...ticketsArr)); //ES6, for ES5 - loop through
                        form.reset();
                        bgModal.style.display = "none";
                        page.className = '';
                    }
                }
            }
        }
    }
    if (e.currentTarget.classList.contains('btn-close-ticket')) {
        bgModal = document.querySelector('.close-ticket-modal');
        let submit = bgModal.querySelector('.close-ticket');
        let ticketId = e.currentTarget.id;
        submit.addEventListener('click', closeTicket);
        function closeTicket() {
            let action = bgModal.querySelector('input[name=close]:checked')
                .id;
            ticketCloseReq_ts_1.default({
                action,
                ticketId
            });
            bgModal.style.display = "none";
            page.className = '';
        }
    }
    bgModal.style.display = "flex";
    page.className = 'blur';
    centerModal(bgModal);
    window.onresize = function (bgModal) {
        centerModal(bgModal);
    };
    let closeBtn = bgModal.querySelector('.close-bg-modal');
    closeBtn.onclick = function () {
        bgModal.style.display = "none";
        page.className = '';
    };
    function centerModal(bgModal) {
        let contents = bgModal.querySelector('.modal-contents');
        let width = contents.getBoundingClientRect().width;
        let height = contents.getBoundingClientRect().height;
        scrollTo({
            top: contents.offsetTop - height / 5,
            left: contents.offsetLeft - width / 5,
            behavior: 'smooth'
        });
    }
}


/***/ }),

/***/ "./src/js/cardTicketsContent.ts":
/*!**************************************!*\
  !*** ./src/js/cardTicketsContent.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const collapsableCards_ts_1 = __webpack_require__(/*! ./collapsableCards.ts */ "./src/js/collapsableCards.ts");
const ticketTakeReq_ts_1 = __webpack_require__(/*! ./ticketTakeReq.ts */ "./src/js/ticketTakeReq.ts");
const Modals_ts_1 = __webpack_require__(/*! ./Modals.ts */ "./src/js/Modals.ts");
function cardTicketsContent(tickets) {
    if (!tickets) {
        return;
    }
    document
        .getElementsByClassName('tickets-display')[0]
        .innerHTML = tickets
        .getElementsByClassName('tickets-display')[0]
        .innerHTML; //this chunk of dom is generated after the scripts are added
    collapsableCards_ts_1.default();
    ticketTakeReq_ts_1.default();
    Modals_ts_1.default();
}
exports.default = cardTicketsContent;


/***/ }),

/***/ "./src/js/collapsableCards.ts":
/*!************************************!*\
  !*** ./src/js/collapsableCards.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
let header = document.getElementsByClassName("d-block");
let cardBody = document.querySelectorAll('.collapse, .show');
let takeBtn = document.querySelectorAll('.btn-take-ticket');
function showHide(el) {
    if (el.style.height !== '0px') {
        el.style.height = '0px';
    }
    else {
        el.style.display = 'block'; // Make it visible
        el.style.height = el.scrollHeight + 'px';
    }
}
function fixHeight(el) {
    if (el.style.height !== '0px') {
        el.style.height = el.scrollHeight + 'px';
    }
}
function collapsables() {
    for (let i = 0; i < header.length; i++) {
        header[i].addEventListener("click", function (e) {
            e.preventDefault();
            e.currentTarget.classList.toggle("active");
            let panel = e.currentTarget.nextElementSibling; //TYPE??
            fixHeight(panel);
            console.log(panel);
            setTimeout(showHide, 0, panel); //showHide must execute after fixHeight
        }); //otherwise height won't have a pixel value, and the transition wouldnt occur
    }
    window.addEventListener("resize", function () {
        for (let i = 0; i < cardBody.length; i++) {
            if (cardBody[i].style.height !== '0px')
                cardBody[i].style.height = 'auto';
        }
    });
}
exports.default = collapsables;


/***/ }),

/***/ "./src/js/dropdowns.ts":
/*!*****************************!*\
  !*** ./src/js/dropdowns.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
let dropDowns = document.querySelectorAll('.nav-link');
let navbarSide = document.querySelector('.navbar-nav');
let pageTopBtn = document.querySelector('#sidebarToggleTop');
let pageTop = document.querySelector('#page-top');
for (let i = 0; i < dropDowns.length; i++) {
    dropDowns[i].addEventListener('click', showToggle);
}
function showToggle(e) {
    let el = e.currentTarget;
    el.classList.toggle("show");
    if (el.nextElementSibling) {
        el.nextElementSibling.classList.toggle("show");
    }
    el["aria-expanded"] = !el["aria-expanded"];
}
function dropdowns() {
    pageTopBtn.onclick = function () {
        pageTop.classList.toggle('sidebar-toggled');
        navbarSide.classList.toggle('toggled');
    };
}
exports.default = dropdowns;


/***/ }),

/***/ "./src/js/home.ts":
/*!************************!*\
  !*** ./src/js/home.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const dropdowns_ts_1 = __webpack_require__(/*! ./dropdowns.ts */ "./src/js/dropdowns.ts");
const utilitiesHome_ts_1 = __webpack_require__(/*! ./utilitiesHome.ts */ "./src/js/utilitiesHome.ts");
const ticketStatus_ts_1 = __webpack_require__(/*! ./ticketStatus.ts */ "./src/js/ticketStatus.ts");
const collapsableCards_ts_1 = __webpack_require__(/*! ./collapsableCards.ts */ "./src/js/collapsableCards.ts");
const ticketTakeReq_ts_1 = __webpack_require__(/*! ./ticketTakeReq.ts */ "./src/js/ticketTakeReq.ts");
const Modals_ts_1 = __webpack_require__(/*! ./Modals.ts */ "./src/js/Modals.ts");
dropdowns_ts_1.default();
utilitiesHome_ts_1.default();
ticketStatus_ts_1.default();
Modals_ts_1.default();
collapsableCards_ts_1.default();
ticketTakeReq_ts_1.default();


/***/ }),

/***/ "./src/js/ticketClass.ts":
/*!*******************************!*\
  !*** ./src/js/ticketClass.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Ticket {
    constructor(title, department, priority, deadline, description) {
        this.title = title;
        this.department = department;
        this.priority = priority;
        this.deadline = deadline;
        this.description = description;
    }
}
exports.default = Ticket;


/***/ }),

/***/ "./src/js/ticketCloseReq.ts":
/*!**********************************!*\
  !*** ./src/js/ticketCloseReq.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const cardTicketsContent_ts_1 = __webpack_require__(/*! ./cardTicketsContent.ts */ "./src/js/cardTicketsContent.ts");
function postTicketClose(obj) {
    console.log('hi');
    let xhr = new XMLHttpRequest();
    xhr.open('PATCH', '/tickets/close');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.responseType = 'document';
    xhr.onload = function () {
        if (xhr.status === 200) {
            cardTicketsContent_ts_1.default(this.response);
        }
    };
    xhr.send(JSON.stringify(obj));
}
exports.default = postTicketClose;


/***/ }),

/***/ "./src/js/ticketStatus.ts":
/*!********************************!*\
  !*** ./src/js/ticketStatus.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
let statusSection = document.querySelector('.ticket-status');
function ticketStatus() {
    statusSection.addEventListener('click', function (e) {
        e.preventDefault();
        location.search = '?status=' + e.target.classList.value;
    });
}
exports.default = ticketStatus;


/***/ }),

/***/ "./src/js/ticketTakeReq.ts":
/*!*********************************!*\
  !*** ./src/js/ticketTakeReq.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Modals_ts_1 = __webpack_require__(/*! ./Modals.ts */ "./src/js/Modals.ts");
let takeBtns = document.getElementsByClassName('btn-take-ticket');
function ticketTakeReq() {
    for (let i = 0; i < takeBtns.length; i++) {
        takeBtns[i].addEventListener('click', assigneePatch);
    }
}
exports.default = ticketTakeReq;
function assigneePatch(e) {
    let takeBtn = e.currentTarget;
    let assignee = atob(localStorage.un); //decode from base64
    let xhr = new XMLHttpRequest();
    xhr.open('PATCH', '/tickets/' + takeBtn.id);
    xhr.setRequestHeader('Content-Type', 'application/json');
    let user = {
        assignee
    };
    xhr.send(JSON.stringify(user));
    xhr.onload = function () {
        if (this.status === 200) {
            takeBtn.innerHTML = 'Close';
            takeBtn.classList.toggle('btn-close-ticket');
            takeBtn.classList.toggle('btn-take-ticket');
            Modals_ts_1.default();
        }
    };
}


/***/ }),

/***/ "./src/js/ticketsReq.ts":
/*!******************************!*\
  !*** ./src/js/ticketsReq.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const cardTicketsContent_ts_1 = __webpack_require__(/*! ./cardTicketsContent.ts */ "./src/js/cardTicketsContent.ts");
function postTicket(obj) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/tickets', true);
    xhr.setRequestHeader("Content-Type", "application/json");
    obj.location = location.pathname.slice(1);
    //  xhr.withCredentials=true;
    xhr.responseType = 'document';
    xhr.onload = function () {
        if (this.status == 200) {
            cardTicketsContent_ts_1.default(this.response);
        }
    };
    xhr.send(JSON.stringify(obj));
}
exports.default = postTicket;


/***/ }),

/***/ "./src/js/utilitiesHome.ts":
/*!*********************************!*\
  !*** ./src/js/utilitiesHome.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function utilities() {
    let accountName = document.querySelector('.fullname');
    let signOut = document.querySelector('.signout');
    accountName.innerHTML = atob(localStorage.un) || ''; //decode from base64
    signOut.onclick = function () {
        localStorage.clear();
        sessionStorage.clear();
    };
}
exports.default = utilities;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL01vZGFscy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY2FyZFRpY2tldHNDb250ZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb2xsYXBzYWJsZUNhcmRzLnRzIiwid2VicGFjazovLy8uL3NyYy9qcy9kcm9wZG93bnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2hvbWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3RpY2tldENsYXNzLnRzIiwid2VicGFjazovLy8uL3NyYy9qcy90aWNrZXRDbG9zZVJlcS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdGlja2V0U3RhdHVzLnRzIiwid2VicGFjazovLy8uL3NyYy9qcy90aWNrZXRUYWtlUmVxLnRzIiwid2VicGFjazovLy8uL3NyYy9qcy90aWNrZXRzUmVxLnRzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlsaXRpZXNIb21lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxl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QUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ25FLElBQUksT0FBTyxHQUFpQixRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQy9ELFdBQVcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxvQkFBb0I7SUFDekUsT0FBTyxDQUFDLE9BQU8sR0FBRztRQUNkLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNyQixjQUFjLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDM0IsQ0FBQztBQUNMLENBQUM7QUFSRCw0QkFRQyIsImZpbGUiOiJidW5kbGUtaG9tZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2pzL2hvbWUudHNcIik7XG4iLCJpbXBvcnQgVGlja2V0IGZyb20gJy4vdGlja2V0Q2xhc3MudHMnO1xyXG5pbXBvcnQgcG9zdFRpY2tldCBmcm9tICcuL3RpY2tldHNSZXEudHMnO1xyXG5pbXBvcnQgcG9zdFRpY2tldENsb3NlIGZyb20gJy4vdGlja2V0Q2xvc2VSZXEudHMnO1xyXG5cclxubGV0IG5ld1RpY2tldEJ0bjogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmV3LXRpY2tldCcpO1xyXG5sZXQgY2xvc2VUaWNrZXRCdG46IEhUTUxDb2xsZWN0aW9uT2Y8RWxlbWVudD4gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdidG4tY2xvc2UtdGlja2V0Jyk7XHJcbmxldCBwYWdlOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNob3dNb2RhbHMoKSB7XHJcbiAgICBuZXdUaWNrZXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzaG93QmdNb2RhbCk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNsb3NlVGlja2V0QnRuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY2xvc2VUaWNrZXRCdG5baV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzaG93QmdNb2RhbCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dCZ01vZGFsKGUpIHtcclxuICAgIGxldCBiZ01vZGFsOiBIVE1MRWxlbWVudDtcclxuICAgIGlmIChlLmN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCduZXctdGlja2V0JykpIHtcclxuICAgICAgICBiZ01vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJnLW1vZGFsJyk7XHJcbiAgICAgICAgbGV0IGZvcm06IEhUTUxGb3JtRWxlbWVudCA9IGJnTW9kYWwucXVlcnlTZWxlY3RvcignLnRpY2tldC1mb3JtJyk7XHJcbiAgICAgICAgbGV0IGRlYWRsaW5lOiBIVE1MSW5wdXRFbGVtZW50ID0gZm9ybS5kZWFkbGluZTtcclxuICAgICAgICBkZWFkbGluZS5vbmZvY3VzID0gZnVuY3Rpb24oZTogRXZlbnQpIHsgLy9sZXQgdGhlIHVzZXIgY2hvb3NlIGEgZGF0ZSBvbmZvY3VzXHJcbiAgICAgICAgICAgICg8SFRNTElucHV0RWxlbWVudD5lLmN1cnJlbnRUYXJnZXQpLnR5cGUgPSBcImRhdGVcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRlYWRsaW5lLm9uYmx1ciA9IGZ1bmN0aW9uKGU6IEV2ZW50KSB7IC8vc2hvdyB0aGUgcGxhY2Vob2xkZXIgb25ibHVyXHJcbiAgICAgICAgICAgKDxIVE1MSW5wdXRFbGVtZW50PmUuY3VycmVudFRhcmdldCkudHlwZSA9IFwidGV4dFwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHN1Ym1pdDogSFRNTEVsZW1lbnQgPSBiZ01vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5zdWJtaXQtdGlja2V0Jyk7XHJcbiAgICAgICAgc3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3VibWl0VGlja2V0KTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc3VibWl0VGlja2V0KCkge1xyXG4gICAgICAgICAgICBsZXQgaW5wdXRzOiBOb2RlTGlzdE9mPEVsZW1lbnQ+ID0gZm9ybS5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCwgc2VsZWN0LCB0ZXh0YXJlYScpOyAvL2dldCBhbGwgaW5wdXRzXHJcbiAgICAgICAgICAgIGxldCBpbnB1dENvdW50OiBudW1iZXIgPSAwO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbnB1dCBvZiBpbnB1dHMpIHtcclxuICAgICAgICAgICAgICAgIGlmICgoPEhUTUxJbnB1dEVsZW1lbnQ+aW5wdXQpLnZhbGlkYXRpb25NZXNzYWdlICE9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgICg8SFRNTElucHV0RWxlbWVudD5pbnB1dCkuc3R5bGUuYm9yZGVyQ29sb3IgPSAncmVkJzsgLy9vdXRsaW5lIGVtcHR5IGZpZWxkcyBvciBsb25nIHRpdGxlXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCg8SFRNTElucHV0RWxlbWVudD5pbnB1dCkubmFtZSA9PT0gJ3RpdGxlJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdG9vbHRpcFR4dCA9ICg8SFRNTElucHV0RWxlbWVudD5pbnB1dC5wYXJlbnROb2RlKS5nZXRBdHRyaWJ1dGUoJ2RhdGEnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgKDxIVE1MSW5wdXRFbGVtZW50PmlucHV0LnBhcmVudE5vZGUpLnNldEF0dHJpYnV0ZSgnZGF0YS10b29sdGlwJywgdG9vbHRpcFR4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dENvdW50Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgKDxIVE1MSW5wdXRFbGVtZW50PmlucHV0KS5zdHlsZS5ib3JkZXJDb2xvciA9ICcjQ0ZEOERDJztcclxuICAgICAgICAgICAgICAgICAgICAoPEhUTUxJbnB1dEVsZW1lbnQ+aW5wdXQucGFyZW50Tm9kZSkucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXRvb2x0aXAnKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXRDb3VudCA9PT0gaW5wdXRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGlja2V0c0FyciA9IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGlucHV0IG9mIGlucHV0cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhbCA9ICg8SFRNTElucHV0RWxlbWVudD5pbnB1dCkudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKDxIVE1MSW5wdXRFbGVtZW50PmlucHV0KS5uYW1lID09PSAnZGVzY3JpcHRpb24nIHx8ICg8SFRNTElucHV0RWxlbWVudD5pbnB1dCkubmFtZSA9PT0gJ3RpdGxlJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbCA9IHZhbC5zbGljZSgwLCAxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudG9VcHBlckNhc2UoKSArIHZhbC5zbGljZSgxLCB2YWwubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpY2tldHNBcnIucHVzaCh2YWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc3RUaWNrZXQobmV3IFRpY2tldCguLi50aWNrZXRzQXJyKSk7IC8vRVM2LCBmb3IgRVM1IC0gbG9vcCB0aHJvdWdoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0ucmVzZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmdNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2UuY2xhc3NOYW1lID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKGUuY3VycmVudFRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2J0bi1jbG9zZS10aWNrZXQnKSkge1xyXG4gICAgICAgIGJnTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2xvc2UtdGlja2V0LW1vZGFsJyk7XHJcbiAgICAgICAgbGV0IHN1Ym1pdDogSFRNTEVsZW1lbnQgPSBiZ01vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5jbG9zZS10aWNrZXQnKTtcclxuICAgICAgICBsZXQgdGlja2V0SWQ6IHN0cmluZyA9IGUuY3VycmVudFRhcmdldC5pZDtcclxuICAgICAgICBzdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVRpY2tldCk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNsb3NlVGlja2V0KCkge1xyXG4gICAgICAgICAgICBsZXQgYWN0aW9uOiBzdHJpbmcgPSBiZ01vZGFsLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9Y2xvc2VdOmNoZWNrZWQnKVxyXG4gICAgICAgICAgICAgICAgLmlkO1xyXG4gICAgICAgICAgICBwb3N0VGlja2V0Q2xvc2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0aW9uLFxyXG4gICAgICAgICAgICAgICAgdGlja2V0SWRcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGJnTW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgICAgICBwYWdlLmNsYXNzTmFtZSA9ICcnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGJnTW9kYWwuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xyXG4gICAgcGFnZS5jbGFzc05hbWUgPSAnYmx1cidcclxuICAgIGNlbnRlck1vZGFsKGJnTW9kYWwpO1xyXG5cclxuICAgIHdpbmRvdy5vbnJlc2l6ZSA9IGZ1bmN0aW9uKGJnTW9kYWwpIHtcclxuICAgICAgICBjZW50ZXJNb2RhbChiZ01vZGFsKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgY2xvc2VCdG46IEhUTUxFbGVtZW50ID0gYmdNb2RhbC5xdWVyeVNlbGVjdG9yKCcuY2xvc2UtYmctbW9kYWwnKTtcclxuICAgIGNsb3NlQnRuLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBiZ01vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICBwYWdlLmNsYXNzTmFtZSA9ICcnO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNlbnRlck1vZGFsKGJnTW9kYWwpIHtcclxuICAgICAgICBsZXQgY29udGVudHM6IEhUTUxFbGVtZW50ID0gYmdNb2RhbC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtY29udGVudHMnKTtcclxuICAgICAgICBsZXQgd2lkdGg6IG51bWJlciA9IGNvbnRlbnRzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xyXG4gICAgICAgIGxldCBoZWlnaHQ6IG51bWJlciA9IGNvbnRlbnRzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcclxuICAgICAgICBzY3JvbGxUbyh7XHJcbiAgICAgICAgICAgIHRvcDogY29udGVudHMub2Zmc2V0VG9wIC0gaGVpZ2h0IC8gNSxcclxuICAgICAgICAgICAgbGVmdDogY29udGVudHMub2Zmc2V0TGVmdCAtIHdpZHRoIC8gNSxcclxuICAgICAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IGNvbGxhcHNhYmxlcyBmcm9tICcuL2NvbGxhcHNhYmxlQ2FyZHMudHMnO1xyXG5pbXBvcnQgdGlja2V0VGFrZVJlcSBmcm9tICcuL3RpY2tldFRha2VSZXEudHMnO1xyXG5pbXBvcnQgbW9kYWxzIGZyb20gJy4vTW9kYWxzLnRzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNhcmRUaWNrZXRzQ29udGVudCh0aWNrZXRzOiBIVE1MRWxlbWVudCkge1xyXG4gIGlmICghdGlja2V0cykge1xyXG4gICAgICByZXR1cm47XHJcbiAgfVxyXG4gIGRvY3VtZW50XHJcbiAgICAgIC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd0aWNrZXRzLWRpc3BsYXknKVswXVxyXG4gICAgICAuaW5uZXJIVE1MID0gdGlja2V0c1xyXG4gICAgICAuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndGlja2V0cy1kaXNwbGF5JylbMF1cclxuICAgICAgLmlubmVySFRNTDsgLy90aGlzIGNodW5rIG9mIGRvbSBpcyBnZW5lcmF0ZWQgYWZ0ZXIgdGhlIHNjcmlwdHMgYXJlIGFkZGVkXHJcblxyXG4gICAgICBjb2xsYXBzYWJsZXMoKTtcclxuICAgICAgdGlja2V0VGFrZVJlcSgpO1xyXG4gICAgICBtb2RhbHMoKTtcclxufVxyXG4iLCJsZXQgaGVhZGVyOiBIVE1MQ29sbGVjdGlvbk9mPEVsZW1lbnQ+ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImQtYmxvY2tcIik7XHJcbmxldCBjYXJkQm9keTogTm9kZUxpc3RPZjxIVE1MRWxlbWVudD4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY29sbGFwc2UsIC5zaG93Jyk7XHJcbmxldCB0YWtlQnRuOiBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5idG4tdGFrZS10aWNrZXQnKTtcclxuXHJcbmZ1bmN0aW9uIHNob3dIaWRlKGVsOiBIVE1MRWxlbWVudCk6IHZvaWQge1xyXG4gICAgaWYgKGVsLnN0eWxlLmhlaWdodCAhPT0gJzBweCcpIHtcclxuICAgICAgICBlbC5zdHlsZS5oZWlnaHQgPSAnMHB4JztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7IC8vIE1ha2UgaXQgdmlzaWJsZVxyXG4gICAgICAgIGVsLnN0eWxlLmhlaWdodCA9IGVsLnNjcm9sbEhlaWdodCArICdweCc7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZpeEhlaWdodChlbDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcclxuICAgIGlmIChlbC5zdHlsZS5oZWlnaHQgIT09ICcwcHgnKSB7XHJcbiAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gZWwuc2Nyb2xsSGVpZ2h0ICsgJ3B4JztcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29sbGFwc2FibGVzKCkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoZWFkZXIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaGVhZGVyW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlOiBNb3VzZUV2ZW50KSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgKDxIVE1MTGlua0VsZW1lbnQ+ZS5jdXJyZW50VGFyZ2V0KS5jbGFzc0xpc3QudG9nZ2xlKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICBsZXQgcGFuZWw6IGFueSA9ICg8SFRNTExpbmtFbGVtZW50PmUuY3VycmVudFRhcmdldCkubmV4dEVsZW1lbnRTaWJsaW5nOyAvL1RZUEU/P1xyXG4gICAgICAgICAgICBmaXhIZWlnaHQocGFuZWwpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhwYW5lbClcclxuICAgICAgICAgICAgc2V0VGltZW91dChzaG93SGlkZSwgMCwgcGFuZWwpOyAvL3Nob3dIaWRlIG11c3QgZXhlY3V0ZSBhZnRlciBmaXhIZWlnaHRcclxuICAgICAgICB9KTsgLy9vdGhlcndpc2UgaGVpZ2h0IHdvbid0IGhhdmUgYSBwaXhlbCB2YWx1ZSwgYW5kIHRoZSB0cmFuc2l0aW9uIHdvdWxkbnQgb2NjdXJcclxuICAgIH1cclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNhcmRCb2R5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChjYXJkQm9keVtpXS5zdHlsZS5oZWlnaHQgIT09ICcwcHgnKVxyXG4gICAgICAgICAgICAgICAgY2FyZEJvZHlbaV0uc3R5bGUuaGVpZ2h0ID0gJ2F1dG8nO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcbiIsImxldCBkcm9wRG93bnM6IE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm5hdi1saW5rJyk7XHJcbmxldCBuYXZiYXJTaWRlOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXZiYXItbmF2Jyk7XHJcbmxldCBwYWdlVG9wQnRuOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzaWRlYmFyVG9nZ2xlVG9wJyk7XHJcbmxldCBwYWdlVG9wOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwYWdlLXRvcCcpO1xyXG5cclxuZm9yIChsZXQgaSA9IDA7IGkgPCBkcm9wRG93bnMubGVuZ3RoOyBpKyspIHtcclxuICAgIGRyb3BEb3duc1tpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNob3dUb2dnbGUpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dUb2dnbGUoZSk6dm9pZCB7XHJcbiAgICBsZXQgZWw6IEhUTUxFbGVtZW50ID0gKDxIVE1MRWxlbWVudD5lLmN1cnJlbnRUYXJnZXQpO1xyXG4gICAgZWwuY2xhc3NMaXN0LnRvZ2dsZShcInNob3dcIik7XHJcbiAgICBpZiAoZWwubmV4dEVsZW1lbnRTaWJsaW5nKSB7XHJcbiAgICAgICAgZWwubmV4dEVsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdC50b2dnbGUoXCJzaG93XCIpO1xyXG4gICAgfVxyXG4gICAgZWxbXCJhcmlhLWV4cGFuZGVkXCJdID0gIWVsW1wiYXJpYS1leHBhbmRlZFwiXVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkcm9wZG93bnMoKSB7XHJcbiAgICBwYWdlVG9wQnRuLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBwYWdlVG9wLmNsYXNzTGlzdC50b2dnbGUoJ3NpZGViYXItdG9nZ2xlZCcpO1xyXG4gICAgICAgIG5hdmJhclNpZGUuY2xhc3NMaXN0LnRvZ2dsZSgndG9nZ2xlZCcpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBkcm9wZG93bnMgZnJvbSAnLi9kcm9wZG93bnMudHMnO1xyXG5pbXBvcnQgdXRpbGl0aWVzIGZyb20gJy4vdXRpbGl0aWVzSG9tZS50cyc7XHJcbmltcG9ydCB0aWNrZXRTdGF0dXMgZnJvbSAnLi90aWNrZXRTdGF0dXMudHMnO1xyXG5pbXBvcnQgY29sbGFwc2FibGVzIGZyb20gJy4vY29sbGFwc2FibGVDYXJkcy50cyc7XHJcbmltcG9ydCB0aWNrZXRUYWtlUmVxIGZyb20gJy4vdGlja2V0VGFrZVJlcS50cyc7XHJcbmltcG9ydCBtb2RhbHMgZnJvbSAnLi9Nb2RhbHMudHMnO1xyXG5cclxuZHJvcGRvd25zKCk7XHJcbnV0aWxpdGllcygpO1xyXG50aWNrZXRTdGF0dXMoKTtcclxubW9kYWxzKCk7XHJcbmNvbGxhcHNhYmxlcygpO1xyXG50aWNrZXRUYWtlUmVxKCk7XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpY2tldHtcclxuICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICBkZXBhcnRtZW50OiBzdHJpbmc7XHJcbiAgICBwcmlvcml0eTogc3RyaW5nO1xyXG4gICAgZGVhZGxpbmU6IERhdGU7XHJcbiAgICBkZXNjcmlwdGlvbjpzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IodGl0bGU/OiBzdHJpbmcsIGRlcGFydG1lbnQ/OiBzdHJpbmcsIHByaW9yaXR5PzpzdHJpbmcsIGRlYWRsaW5lPzogRGF0ZSwgZGVzY3JpcHRpb24/OnN0cmluZykge1xyXG4gICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XHJcbiAgICAgIHRoaXMuZGVwYXJ0bWVudCA9IGRlcGFydG1lbnQ7XHJcbiAgICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcclxuICAgICAgdGhpcy5kZWFkbGluZSA9IGRlYWRsaW5lO1xyXG4gICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XHJcbiAgICB9XHJcbiAgfVxyXG4iLCJpbXBvcnQgY2FyZFRpY2tldHNDb250ZW50IGZyb20gJy4vY2FyZFRpY2tldHNDb250ZW50LnRzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBvc3RUaWNrZXRDbG9zZShvYmopIHtcclxuICBjb25zb2xlLmxvZygnaGknKVxyXG4gICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgeGhyLm9wZW4oJ1BBVENIJywgJy90aWNrZXRzL2Nsb3NlJyk7XHJcbiAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcclxuICAgIHhoci5yZXNwb25zZVR5cGUgPSAnZG9jdW1lbnQnO1xyXG4gICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICh4aHIuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICAgIGNhcmRUaWNrZXRzQ29udGVudCh0aGlzLnJlc3BvbnNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB4aHIuc2VuZChKU09OLnN0cmluZ2lmeShvYmopKVxyXG59XHJcbiIsImxldCBzdGF0dXNTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRpY2tldC1zdGF0dXMnKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRpY2tldFN0YXR1cygpIHtcclxuICBzdGF0dXNTZWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxmdW5jdGlvbihlOiBNb3VzZUV2ZW50KXtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGxvY2F0aW9uLnNlYXJjaD0nP3N0YXR1cz0nKyg8SFRNTEVsZW1lbnQ+ZS50YXJnZXQpLmNsYXNzTGlzdC52YWx1ZTtcclxuICB9KVxyXG59XHJcbiIsImltcG9ydCBtb2RhbHMgZnJvbSAnLi9Nb2RhbHMudHMnO1xyXG5cclxubGV0IHRha2VCdG5zOiBIVE1MQ29sbGVjdGlvbk9mPEVsZW1lbnQ+ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYnRuLXRha2UtdGlja2V0Jyk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0aWNrZXRUYWtlUmVxKCkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0YWtlQnRucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHRha2VCdG5zW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXNzaWduZWVQYXRjaCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFzc2lnbmVlUGF0Y2goZTogTW91c2VFdmVudCk6IHZvaWQge1xyXG4gICAgbGV0IHRha2VCdG46IEhUTUxFbGVtZW50ID0gKDxIVE1MRWxlbWVudD5lLmN1cnJlbnRUYXJnZXQpO1xyXG4gICAgbGV0IGFzc2lnbmVlOiBzdHJpbmcgPSBhdG9iKGxvY2FsU3RvcmFnZS51bik7IC8vZGVjb2RlIGZyb20gYmFzZTY0XHJcbiAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICB4aHIub3BlbignUEFUQ0gnLCAnL3RpY2tldHMvJyArIHRha2VCdG4uaWQpO1xyXG4gICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XHJcbiAgICBsZXQgdXNlciA9IHtcclxuICAgICAgICBhc3NpZ25lZVxyXG4gICAgfTtcclxuICAgIHhoci5zZW5kKEpTT04uc3RyaW5naWZ5KHVzZXIpKTtcclxuICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAodGhpcy5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICAgICAgKDxIVE1MRWxlbWVudD50YWtlQnRuKS5pbm5lckhUTUw9J0Nsb3NlJztcclxuICAgICAgICAgICg8SFRNTEVsZW1lbnQ+dGFrZUJ0bikuY2xhc3NMaXN0LnRvZ2dsZSgnYnRuLWNsb3NlLXRpY2tldCcpO1xyXG4gICAgICAgICAgKDxIVE1MRWxlbWVudD50YWtlQnRuKS5jbGFzc0xpc3QudG9nZ2xlKCdidG4tdGFrZS10aWNrZXQnKTtcclxuICAgICAgICAgIG1vZGFscygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgY2FyZFRpY2tldHNDb250ZW50IGZyb20gJy4vY2FyZFRpY2tldHNDb250ZW50LnRzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBvc3RUaWNrZXQob2JqKSB7XHJcbiAgICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgeGhyLm9wZW4oJ1BPU1QnLCAnL3RpY2tldHMnLCB0cnVlKTtcclxuICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xyXG4gICAgICBvYmoubG9jYXRpb249bG9jYXRpb24ucGF0aG5hbWUuc2xpY2UoMSk7XHJcbiAgICAvLyAgeGhyLndpdGhDcmVkZW50aWFscz10cnVlO1xyXG4gICAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2RvY3VtZW50JztcclxuICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09IDIwMCkge1xyXG4gICAgICAgICAgICAgIGNhcmRUaWNrZXRzQ29udGVudCh0aGlzLnJlc3BvbnNlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICB4aHIuc2VuZChKU09OLnN0cmluZ2lmeShvYmopKTtcclxuICB9XHJcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHV0aWxpdGllcygpIHtcclxuICAgIGxldCBhY2NvdW50TmFtZTogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZnVsbG5hbWUnKTtcclxuICAgIGxldCBzaWduT3V0OiBIVE1MRWxlbWVudCA9ICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lnbm91dCcpO1xyXG4gICAgYWNjb3VudE5hbWUuaW5uZXJIVE1MID0gYXRvYihsb2NhbFN0b3JhZ2UudW4pIHx8ICcnOyAvL2RlY29kZSBmcm9tIGJhc2U2NFxyXG4gICAgc2lnbk91dC5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLmNsZWFyKCk7XHJcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2UuY2xlYXIoKTtcclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9