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
    function centerModal(bgMod) {
        if (!bgMod) {
            return;
        }
        let contents = bgMod.querySelector('.modal-contents');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL01vZGFscy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY2FyZFRpY2tldHNDb250ZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb2xsYXBzYWJsZUNhcmRzLnRzIiwid2VicGFjazovLy8uL3NyYy9qcy9kcm9wZG93bnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2hvbWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3RpY2tldENsYXNzLnRzIiwid2VicGFjazovLy8uL3NyYy9qcy90aWNrZXRDbG9zZVJlcS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdGlja2V0U3RhdHVzLnRzIiwid2VicGFjazovLy8uL3NyYy9qcy90aWNrZXRUYWtlUmVxLnRzIiwid2VicGFjazovLy8uL3NyYy9qcy90aWNrZXRzUmVxLnRzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlsaXRpZXNIb21lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxl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UztJQUM3QixJQUFJLFdBQVcsR0FBZ0IsUUFBUSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNuRSxJQUFJLE9BQU8sR0FBaUIsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMvRCxXQUFXLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsb0JBQW9CO0lBQ3pFLE9BQU8sQ0FBQyxPQUFPLEdBQUc7UUFDZCxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDckIsY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzNCLENBQUM7QUFDTCxDQUFDO0FBUkQsNEJBUUMiLCJmaWxlIjoiYnVuZGxlLWhvbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9qcy9ob21lLnRzXCIpO1xuIiwiaW1wb3J0IFRpY2tldCBmcm9tICcuL3RpY2tldENsYXNzLnRzJztcclxuaW1wb3J0IHBvc3RUaWNrZXQgZnJvbSAnLi90aWNrZXRzUmVxLnRzJztcclxuaW1wb3J0IHBvc3RUaWNrZXRDbG9zZSBmcm9tICcuL3RpY2tldENsb3NlUmVxLnRzJztcclxuXHJcbmxldCBuZXdUaWNrZXRCdG46IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5ldy10aWNrZXQnKTtcclxubGV0IGNsb3NlVGlja2V0QnRuOiBIVE1MQ29sbGVjdGlvbk9mPEVsZW1lbnQ+ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYnRuLWNsb3NlLXRpY2tldCcpO1xyXG5sZXQgcGFnZTogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluJyk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzaG93TW9kYWxzKCkge1xyXG4gICAgbmV3VGlja2V0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2hvd0JnTW9kYWwpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjbG9zZVRpY2tldEJ0bi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNsb3NlVGlja2V0QnRuW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2hvd0JnTW9kYWwpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93QmdNb2RhbChlKSB7XHJcbiAgICBsZXQgYmdNb2RhbDogSFRNTEVsZW1lbnQ7XHJcbiAgICBpZiAoZS5jdXJyZW50VGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbmV3LXRpY2tldCcpKSB7XHJcbiAgICAgICAgYmdNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iZy1tb2RhbCcpO1xyXG4gICAgICAgIGxldCBmb3JtOiBIVE1MRm9ybUVsZW1lbnQgPSBiZ01vZGFsLnF1ZXJ5U2VsZWN0b3IoJy50aWNrZXQtZm9ybScpO1xyXG4gICAgICAgIGxldCBkZWFkbGluZTogSFRNTElucHV0RWxlbWVudCA9IGZvcm0uZGVhZGxpbmU7XHJcbiAgICAgICAgZGVhZGxpbmUub25mb2N1cyA9IGZ1bmN0aW9uKGU6IEV2ZW50KSB7IC8vbGV0IHRoZSB1c2VyIGNob29zZSBhIGRhdGUgb25mb2N1c1xyXG4gICAgICAgICAgICAoPEhUTUxJbnB1dEVsZW1lbnQ+ZS5jdXJyZW50VGFyZ2V0KS50eXBlID0gXCJkYXRlXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkZWFkbGluZS5vbmJsdXIgPSBmdW5jdGlvbihlOiBFdmVudCkgeyAvL3Nob3cgdGhlIHBsYWNlaG9sZGVyIG9uYmx1clxyXG4gICAgICAgICAgICg8SFRNTElucHV0RWxlbWVudD5lLmN1cnJlbnRUYXJnZXQpLnR5cGUgPSBcInRleHRcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBzdWJtaXQ6IEhUTUxFbGVtZW50ID0gYmdNb2RhbC5xdWVyeVNlbGVjdG9yKCcuc3VibWl0LXRpY2tldCcpO1xyXG4gICAgICAgIHN1Ym1pdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN1Ym1pdFRpY2tldCk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHN1Ym1pdFRpY2tldCgpIHtcclxuICAgICAgICAgICAgbGV0IGlucHV0czogTm9kZUxpc3RPZjxFbGVtZW50PiA9IGZvcm0ucXVlcnlTZWxlY3RvckFsbCgnaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWEnKTsgLy9nZXQgYWxsIGlucHV0c1xyXG4gICAgICAgICAgICBsZXQgaW5wdXRDb3VudDogbnVtYmVyID0gMDtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5wdXQgb2YgaW5wdXRzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoKDxIVE1MSW5wdXRFbGVtZW50PmlucHV0KS52YWxpZGF0aW9uTWVzc2FnZSAhPT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICAoPEhUTUxJbnB1dEVsZW1lbnQ+aW5wdXQpLnN0eWxlLmJvcmRlckNvbG9yID0gJ3JlZCc7IC8vb3V0bGluZSBlbXB0eSBmaWVsZHMgb3IgbG9uZyB0aXRsZVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgoPEhUTUxJbnB1dEVsZW1lbnQ+aW5wdXQpLm5hbWUgPT09ICd0aXRsZScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRvb2x0aXBUeHQgPSAoPEhUTUxJbnB1dEVsZW1lbnQ+aW5wdXQucGFyZW50Tm9kZSkuZ2V0QXR0cmlidXRlKCdkYXRhJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICg8SFRNTElucHV0RWxlbWVudD5pbnB1dC5wYXJlbnROb2RlKS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdG9vbHRpcCcsIHRvb2x0aXBUeHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRDb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICg8SFRNTElucHV0RWxlbWVudD5pbnB1dCkuc3R5bGUuYm9yZGVyQ29sb3IgPSAnI0NGRDhEQyc7XHJcbiAgICAgICAgICAgICAgICAgICAgKDxIVE1MSW5wdXRFbGVtZW50PmlucHV0LnBhcmVudE5vZGUpLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS10b29sdGlwJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0Q291bnQgPT09IGlucHV0cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRpY2tldHNBcnIgPSBbXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpbnB1dCBvZiBpbnB1dHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2YWwgPSAoPEhUTUxJbnB1dEVsZW1lbnQ+aW5wdXQpLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCg8SFRNTElucHV0RWxlbWVudD5pbnB1dCkubmFtZSA9PT0gJ2Rlc2NyaXB0aW9uJyB8fCAoPEhUTUxJbnB1dEVsZW1lbnQ+aW5wdXQpLm5hbWUgPT09ICd0aXRsZScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWwgPSB2YWwuc2xpY2UoMCwgMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRvVXBwZXJDYXNlKCkgKyB2YWwuc2xpY2UoMSwgdmFsLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aWNrZXRzQXJyLnB1c2godmFsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3N0VGlja2V0KG5ldyBUaWNrZXQoLi4udGlja2V0c0FycikpOyAvL0VTNiwgZm9yIEVTNSAtIGxvb3AgdGhyb3VnaFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtLnJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJnTW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYWdlLmNsYXNzTmFtZSA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChlLmN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdidG4tY2xvc2UtdGlja2V0JykpIHtcclxuICAgICAgICBiZ01vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNsb3NlLXRpY2tldC1tb2RhbCcpO1xyXG4gICAgICAgIGxldCBzdWJtaXQ6IEhUTUxFbGVtZW50ID0gYmdNb2RhbC5xdWVyeVNlbGVjdG9yKCcuY2xvc2UtdGlja2V0Jyk7XHJcbiAgICAgICAgbGV0IHRpY2tldElkOiBzdHJpbmcgPSBlLmN1cnJlbnRUYXJnZXQuaWQ7XHJcbiAgICAgICAgc3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VUaWNrZXQpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBjbG9zZVRpY2tldCgpIHtcclxuICAgICAgICAgICAgbGV0IGFjdGlvbjogc3RyaW5nID0gYmdNb2RhbC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPWNsb3NlXTpjaGVja2VkJylcclxuICAgICAgICAgICAgICAgIC5pZDtcclxuICAgICAgICAgICAgcG9zdFRpY2tldENsb3NlKHtcclxuICAgICAgICAgICAgICAgIGFjdGlvbixcclxuICAgICAgICAgICAgICAgIHRpY2tldElkXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBiZ01vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgcGFnZS5jbGFzc05hbWUgPSAnJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBiZ01vZGFsLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcclxuICAgIHBhZ2UuY2xhc3NOYW1lID0gJ2JsdXInXHJcbiAgICBjZW50ZXJNb2RhbChiZ01vZGFsKTtcclxuXHJcbiAgICB3aW5kb3cub25yZXNpemUgPSBmdW5jdGlvbihiZ01vZGFsKSB7XHJcbiAgICAgICAgY2VudGVyTW9kYWwoYmdNb2RhbCk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGNsb3NlQnRuOiBIVE1MRWxlbWVudCA9IGJnTW9kYWwucXVlcnlTZWxlY3RvcignLmNsb3NlLWJnLW1vZGFsJyk7XHJcbiAgICBjbG9zZUJ0bi5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgYmdNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgcGFnZS5jbGFzc05hbWUgPSAnJztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjZW50ZXJNb2RhbChiZ01vZCk6dm9pZCB7XHJcbiAgICAgICAgaWYoIWJnTW9kKSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBjb250ZW50czogSFRNTEVsZW1lbnQgPSBiZ01vZC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtY29udGVudHMnKTtcclxuICAgICAgICBsZXQgd2lkdGg6IG51bWJlciA9IGNvbnRlbnRzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xyXG4gICAgICAgIGxldCBoZWlnaHQ6IG51bWJlciA9IGNvbnRlbnRzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcclxuICAgICAgICBzY3JvbGxUbyh7XHJcbiAgICAgICAgICAgIHRvcDogY29udGVudHMub2Zmc2V0VG9wIC0gaGVpZ2h0IC8gNSxcclxuICAgICAgICAgICAgbGVmdDogY29udGVudHMub2Zmc2V0TGVmdCAtIHdpZHRoIC8gNSxcclxuICAgICAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IGNvbGxhcHNhYmxlcyBmcm9tICcuL2NvbGxhcHNhYmxlQ2FyZHMudHMnO1xyXG5pbXBvcnQgdGlja2V0VGFrZVJlcSBmcm9tICcuL3RpY2tldFRha2VSZXEudHMnO1xyXG5pbXBvcnQgbW9kYWxzIGZyb20gJy4vTW9kYWxzLnRzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNhcmRUaWNrZXRzQ29udGVudCh0aWNrZXRzOiBIVE1MRWxlbWVudCkge1xyXG4gIGlmICghdGlja2V0cykge1xyXG4gICAgICByZXR1cm47XHJcbiAgfVxyXG4gIGRvY3VtZW50XHJcbiAgICAgIC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd0aWNrZXRzLWRpc3BsYXknKVswXVxyXG4gICAgICAuaW5uZXJIVE1MID0gdGlja2V0c1xyXG4gICAgICAuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndGlja2V0cy1kaXNwbGF5JylbMF1cclxuICAgICAgLmlubmVySFRNTDsgLy90aGlzIGNodW5rIG9mIGRvbSBpcyBnZW5lcmF0ZWQgYWZ0ZXIgdGhlIHNjcmlwdHMgYXJlIGFkZGVkXHJcblxyXG4gICAgICBjb2xsYXBzYWJsZXMoKTtcclxuICAgICAgdGlja2V0VGFrZVJlcSgpO1xyXG4gICAgICBtb2RhbHMoKTtcclxufVxyXG4iLCJsZXQgaGVhZGVyOiBIVE1MQ29sbGVjdGlvbk9mPEVsZW1lbnQ+ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImQtYmxvY2tcIik7XHJcbmxldCBjYXJkQm9keTogTm9kZUxpc3RPZjxIVE1MRWxlbWVudD4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY29sbGFwc2UsIC5zaG93Jyk7XHJcbmxldCB0YWtlQnRuOiBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5idG4tdGFrZS10aWNrZXQnKTtcclxuXHJcbmZ1bmN0aW9uIHNob3dIaWRlKGVsOiBIVE1MRWxlbWVudCk6IHZvaWQge1xyXG4gICAgaWYgKGVsLnN0eWxlLmhlaWdodCAhPT0gJzBweCcpIHtcclxuICAgICAgICBlbC5zdHlsZS5oZWlnaHQgPSAnMHB4JztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7IC8vIE1ha2UgaXQgdmlzaWJsZVxyXG4gICAgICAgIGVsLnN0eWxlLmhlaWdodCA9IGVsLnNjcm9sbEhlaWdodCArICdweCc7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZpeEhlaWdodChlbDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcclxuICAgIGlmIChlbC5zdHlsZS5oZWlnaHQgIT09ICcwcHgnKSB7XHJcbiAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gZWwuc2Nyb2xsSGVpZ2h0ICsgJ3B4JztcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29sbGFwc2FibGVzKCkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoZWFkZXIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaGVhZGVyW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlOiBNb3VzZUV2ZW50KSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgKDxIVE1MTGlua0VsZW1lbnQ+ZS5jdXJyZW50VGFyZ2V0KS5jbGFzc0xpc3QudG9nZ2xlKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICBsZXQgcGFuZWw6IGFueSA9ICg8SFRNTExpbmtFbGVtZW50PmUuY3VycmVudFRhcmdldCkubmV4dEVsZW1lbnRTaWJsaW5nOyAvL1RZUEU/P1xyXG4gICAgICAgICAgICBmaXhIZWlnaHQocGFuZWwpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhwYW5lbClcclxuICAgICAgICAgICAgc2V0VGltZW91dChzaG93SGlkZSwgMCwgcGFuZWwpOyAvL3Nob3dIaWRlIG11c3QgZXhlY3V0ZSBhZnRlciBmaXhIZWlnaHRcclxuICAgICAgICB9KTsgLy9vdGhlcndpc2UgaGVpZ2h0IHdvbid0IGhhdmUgYSBwaXhlbCB2YWx1ZSwgYW5kIHRoZSB0cmFuc2l0aW9uIHdvdWxkbnQgb2NjdXJcclxuICAgIH1cclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNhcmRCb2R5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChjYXJkQm9keVtpXS5zdHlsZS5oZWlnaHQgIT09ICcwcHgnKVxyXG4gICAgICAgICAgICAgICAgY2FyZEJvZHlbaV0uc3R5bGUuaGVpZ2h0ID0gJ2F1dG8nO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcbiIsImxldCBkcm9wRG93bnM6IE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm5hdi1saW5rJyk7XHJcbmxldCBuYXZiYXJTaWRlOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXZiYXItbmF2Jyk7XHJcbmxldCBwYWdlVG9wQnRuOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzaWRlYmFyVG9nZ2xlVG9wJyk7XHJcbmxldCBwYWdlVG9wOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwYWdlLXRvcCcpO1xyXG5cclxuZm9yIChsZXQgaSA9IDA7IGkgPCBkcm9wRG93bnMubGVuZ3RoOyBpKyspIHtcclxuICAgIGRyb3BEb3duc1tpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNob3dUb2dnbGUpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dUb2dnbGUoZSk6dm9pZCB7XHJcbiAgICBsZXQgZWw6IEhUTUxFbGVtZW50ID0gKDxIVE1MRWxlbWVudD5lLmN1cnJlbnRUYXJnZXQpO1xyXG4gICAgZWwuY2xhc3NMaXN0LnRvZ2dsZShcInNob3dcIik7XHJcbiAgICBpZiAoZWwubmV4dEVsZW1lbnRTaWJsaW5nKSB7XHJcbiAgICAgICAgZWwubmV4dEVsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdC50b2dnbGUoXCJzaG93XCIpO1xyXG4gICAgfVxyXG4gICAgZWxbXCJhcmlhLWV4cGFuZGVkXCJdID0gIWVsW1wiYXJpYS1leHBhbmRlZFwiXVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkcm9wZG93bnMoKSB7XHJcbiAgICBwYWdlVG9wQnRuLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBwYWdlVG9wLmNsYXNzTGlzdC50b2dnbGUoJ3NpZGViYXItdG9nZ2xlZCcpO1xyXG4gICAgICAgIG5hdmJhclNpZGUuY2xhc3NMaXN0LnRvZ2dsZSgndG9nZ2xlZCcpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBkcm9wZG93bnMgZnJvbSAnLi9kcm9wZG93bnMudHMnO1xyXG5pbXBvcnQgdXRpbGl0aWVzIGZyb20gJy4vdXRpbGl0aWVzSG9tZS50cyc7XHJcbmltcG9ydCB0aWNrZXRTdGF0dXMgZnJvbSAnLi90aWNrZXRTdGF0dXMudHMnO1xyXG5pbXBvcnQgY29sbGFwc2FibGVzIGZyb20gJy4vY29sbGFwc2FibGVDYXJkcy50cyc7XHJcbmltcG9ydCB0aWNrZXRUYWtlUmVxIGZyb20gJy4vdGlja2V0VGFrZVJlcS50cyc7XHJcbmltcG9ydCBtb2RhbHMgZnJvbSAnLi9Nb2RhbHMudHMnO1xyXG5cclxuZHJvcGRvd25zKCk7XHJcbnV0aWxpdGllcygpO1xyXG50aWNrZXRTdGF0dXMoKTtcclxubW9kYWxzKCk7XHJcbmNvbGxhcHNhYmxlcygpO1xyXG50aWNrZXRUYWtlUmVxKCk7XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpY2tldHtcclxuICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICBkZXBhcnRtZW50OiBzdHJpbmc7XHJcbiAgICBwcmlvcml0eTogc3RyaW5nO1xyXG4gICAgZGVhZGxpbmU6IERhdGU7XHJcbiAgICBkZXNjcmlwdGlvbjpzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IodGl0bGU/OiBzdHJpbmcsIGRlcGFydG1lbnQ/OiBzdHJpbmcsIHByaW9yaXR5PzpzdHJpbmcsIGRlYWRsaW5lPzogRGF0ZSwgZGVzY3JpcHRpb24/OnN0cmluZykge1xyXG4gICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XHJcbiAgICAgIHRoaXMuZGVwYXJ0bWVudCA9IGRlcGFydG1lbnQ7XHJcbiAgICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcclxuICAgICAgdGhpcy5kZWFkbGluZSA9IGRlYWRsaW5lO1xyXG4gICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XHJcbiAgICB9XHJcbiAgfVxyXG4iLCJpbXBvcnQgY2FyZFRpY2tldHNDb250ZW50IGZyb20gJy4vY2FyZFRpY2tldHNDb250ZW50LnRzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBvc3RUaWNrZXRDbG9zZShvYmopIHtcclxuICBjb25zb2xlLmxvZygnaGknKVxyXG4gICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgeGhyLm9wZW4oJ1BBVENIJywgJy90aWNrZXRzL2Nsb3NlJyk7XHJcbiAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcclxuICAgIHhoci5yZXNwb25zZVR5cGUgPSAnZG9jdW1lbnQnO1xyXG4gICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICh4aHIuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICAgIGNhcmRUaWNrZXRzQ29udGVudCh0aGlzLnJlc3BvbnNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB4aHIuc2VuZChKU09OLnN0cmluZ2lmeShvYmopKVxyXG59XHJcbiIsImxldCBzdGF0dXNTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRpY2tldC1zdGF0dXMnKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRpY2tldFN0YXR1cygpIHtcclxuICBzdGF0dXNTZWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxmdW5jdGlvbihlOiBNb3VzZUV2ZW50KXtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGxvY2F0aW9uLnNlYXJjaD0nP3N0YXR1cz0nKyg8SFRNTEVsZW1lbnQ+ZS50YXJnZXQpLmNsYXNzTGlzdC52YWx1ZTtcclxuICB9KVxyXG59XHJcbiIsImltcG9ydCBtb2RhbHMgZnJvbSAnLi9Nb2RhbHMudHMnO1xyXG5cclxubGV0IHRha2VCdG5zOiBIVE1MQ29sbGVjdGlvbk9mPEVsZW1lbnQ+ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYnRuLXRha2UtdGlja2V0Jyk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0aWNrZXRUYWtlUmVxKCkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0YWtlQnRucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHRha2VCdG5zW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXNzaWduZWVQYXRjaCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFzc2lnbmVlUGF0Y2goZTogTW91c2VFdmVudCk6IHZvaWQge1xyXG4gICAgbGV0IHRha2VCdG46IEhUTUxFbGVtZW50ID0gKDxIVE1MRWxlbWVudD5lLmN1cnJlbnRUYXJnZXQpO1xyXG4gICAgbGV0IGFzc2lnbmVlOiBzdHJpbmcgPSBhdG9iKGxvY2FsU3RvcmFnZS51bik7IC8vZGVjb2RlIGZyb20gYmFzZTY0XHJcbiAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICB4aHIub3BlbignUEFUQ0gnLCAnL3RpY2tldHMvJyArIHRha2VCdG4uaWQpO1xyXG4gICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XHJcbiAgICBsZXQgdXNlciA9IHtcclxuICAgICAgICBhc3NpZ25lZVxyXG4gICAgfTtcclxuICAgIHhoci5zZW5kKEpTT04uc3RyaW5naWZ5KHVzZXIpKTtcclxuICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAodGhpcy5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICAgICAgKDxIVE1MRWxlbWVudD50YWtlQnRuKS5pbm5lckhUTUw9J0Nsb3NlJztcclxuICAgICAgICAgICg8SFRNTEVsZW1lbnQ+dGFrZUJ0bikuY2xhc3NMaXN0LnRvZ2dsZSgnYnRuLWNsb3NlLXRpY2tldCcpO1xyXG4gICAgICAgICAgKDxIVE1MRWxlbWVudD50YWtlQnRuKS5jbGFzc0xpc3QudG9nZ2xlKCdidG4tdGFrZS10aWNrZXQnKTtcclxuICAgICAgICAgIG1vZGFscygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgY2FyZFRpY2tldHNDb250ZW50IGZyb20gJy4vY2FyZFRpY2tldHNDb250ZW50LnRzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBvc3RUaWNrZXQob2JqKSB7XHJcbiAgICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgeGhyLm9wZW4oJ1BPU1QnLCAnL3RpY2tldHMnLCB0cnVlKTtcclxuICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xyXG4gICAgICBvYmoubG9jYXRpb249bG9jYXRpb24ucGF0aG5hbWUuc2xpY2UoMSk7XHJcbiAgICAvLyAgeGhyLndpdGhDcmVkZW50aWFscz10cnVlO1xyXG4gICAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2RvY3VtZW50JztcclxuICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09IDIwMCkge1xyXG4gICAgICAgICAgICAgIGNhcmRUaWNrZXRzQ29udGVudCh0aGlzLnJlc3BvbnNlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICB4aHIuc2VuZChKU09OLnN0cmluZ2lmeShvYmopKTtcclxuICB9XHJcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHV0aWxpdGllcygpIHtcclxuICAgIGxldCBhY2NvdW50TmFtZTogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZnVsbG5hbWUnKTtcclxuICAgIGxldCBzaWduT3V0OiBIVE1MRWxlbWVudCA9ICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lnbm91dCcpO1xyXG4gICAgYWNjb3VudE5hbWUuaW5uZXJIVE1MID0gYXRvYihsb2NhbFN0b3JhZ2UudW4pIHx8ICcnOyAvL2RlY29kZSBmcm9tIGJhc2U2NFxyXG4gICAgc2lnbk91dC5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLmNsZWFyKCk7XHJcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2UuY2xlYXIoKTtcclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9