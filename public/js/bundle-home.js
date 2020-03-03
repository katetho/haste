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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/home.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/Modals.js":
/*!**************************!*\
  !*** ./src/js/Modals.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return showModals; });
/* harmony import */ var _ticketClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ticketClass */ "./src/js/ticketClass.js");
/* harmony import */ var _ticketsReq__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ticketsReq */ "./src/js/ticketsReq.js");
/* harmony import */ var _ticketCloseReq__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ticketCloseReq */ "./src/js/ticketCloseReq.js");



let Ticket = Object(_ticketClass__WEBPACK_IMPORTED_MODULE_0__["default"])();

let newTicketBtn = document.getElementsByClassName('new-ticket')[0];
let closeTicketBtn = document.getElementsByClassName('btn-close-ticket');
let page = document.getElementsByTagName('main')[0];

function showModals() {
    newTicketBtn.addEventListener('click', showBgModal);
    for (var i = 0; i < closeTicketBtn.length; i++) {
        closeTicketBtn[i].addEventListener('click', showBgModal);
    }
}

function showBgModal(e) {
    let bgModal;
    if (e.currentTarget.classList.contains('new-ticket')) {
        bgModal = document.querySelector('.bg-modal');
        let form = bgModal.querySelector('.ticket-form');
        let deadline = form.deadline;
        deadline.onfocus = function() { //let the user choose a date onfocus
            this.type = "date";
        }

        deadline.onblur = function() { //show the placeholder onblur
            this.type = "text";
        }

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
                } else {
                    inputCount++;
                    input.style.borderColor = '#CFD8DC';
                    input.parentNode.removeAttribute('data-tooltip');
                    if (inputCount === inputs.length) {
                        let ticketsArr = []
                        for (let input of inputs) {
                            let val = input.value;
                            if (input.name === 'description' || input.name === 'title') {
                                val = val.slice(0, 1)
                                    .toUpperCase() + val.slice(1, val.length);
                            }
                            ticketsArr.push(val);
                        }
                        Object(_ticketsReq__WEBPACK_IMPORTED_MODULE_1__["default"])(new Ticket(...ticketsArr)); //ES6, for ES5 - loop through
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
            Object(_ticketCloseReq__WEBPACK_IMPORTED_MODULE_2__["default"])({
                action,
                ticketId
            });
            bgModal.style.display = "none";
            page.className = '';
        }
    }
    bgModal.style.display = "flex";
    page.className = 'blur'
    centerModal(bgModal);

    window.onresize = function(bgModal) {
        centerModal(bgModal);
    }

    let closeBtn = bgModal.querySelector('.close-bg-modal');
    closeBtn.onclick = function() {
        bgModal.style.display = "none";
        page.className = '';
    }

    function centerModal() {
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

/***/ "./src/js/cardTicketsContent.js":
/*!**************************************!*\
  !*** ./src/js/cardTicketsContent.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return cardTicketsContent; });
/* harmony import */ var _ticket__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ticket */ "./src/js/ticket.js");


function cardTicketsContent(tickets) {
  if (!tickets) {
      return;
  }
  document
      .getElementsByClassName('tickets-display')[0]
      .innerHTML = tickets
      .getElementsByClassName('tickets-display')[0]
      .innerHTML; //this chunk of dom is generated after the scripts are added
  Object(_ticket__WEBPACK_IMPORTED_MODULE_0__["default"])();
}


/***/ }),

/***/ "./src/js/collapsableCards.js":
/*!************************************!*\
  !*** ./src/js/collapsableCards.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return collapsables; });
let header = document.getElementsByClassName("d-block");
let cardBody = document.getElementsByClassName("collapse show");
let takeBtn = document.getElementsByClassName('btn-take-ticket');

function showHide(el) {
    if (el.style.height !== '0px') {
        el.style.height = '0px';
    } else {
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
        header[i].addEventListener("click", function(e) {
            e.preventDefault();
            this.classList.toggle("active");
            let panel = this.nextElementSibling;
            fixHeight(panel);
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


/***/ }),

/***/ "./src/js/dropdowns.js":
/*!*****************************!*\
  !*** ./src/js/dropdowns.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return dropdowns; });
let dropDowns = document.getElementsByClassName("nav-link");
let navbarSide = document.getElementsByClassName("navbar-nav")[0];
let pageTopBtn = document.getElementById("sidebarToggleTop");
let pageTop = document.getElementById("page-top");

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

function dropdowns() {
    pageTopBtn.onclick = function() {
        pageTop.classList.toggle('sidebar-toggled');
        navbarSide.classList.toggle('toggled');
    }
}


/***/ }),

/***/ "./src/js/home.js":
/*!************************!*\
  !*** ./src/js/home.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dropdowns__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dropdowns */ "./src/js/dropdowns.js");
/* harmony import */ var _utilitiesHome__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utilitiesHome */ "./src/js/utilitiesHome.js");
/* harmony import */ var _ticketStatus__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ticketStatus */ "./src/js/ticketStatus.js");
/* harmony import */ var _collapsableCards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./collapsableCards */ "./src/js/collapsableCards.js");
/* harmony import */ var _ticketTakeReq__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ticketTakeReq */ "./src/js/ticketTakeReq.js");
/* harmony import */ var _Modals__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Modals */ "./src/js/Modals.js");







Object(_dropdowns__WEBPACK_IMPORTED_MODULE_0__["default"])();
Object(_utilitiesHome__WEBPACK_IMPORTED_MODULE_1__["default"])();
Object(_ticketStatus__WEBPACK_IMPORTED_MODULE_2__["default"])();
Object(_Modals__WEBPACK_IMPORTED_MODULE_5__["default"])();
Object(_collapsableCards__WEBPACK_IMPORTED_MODULE_3__["default"])();
Object(_ticketTakeReq__WEBPACK_IMPORTED_MODULE_4__["default"])();


/***/ }),

/***/ "./src/js/ticket.js":
/*!**************************!*\
  !*** ./src/js/ticket.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ticket; });
/* harmony import */ var _collapsableCards__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./collapsableCards */ "./src/js/collapsableCards.js");
/* harmony import */ var _ticketTakeReq__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ticketTakeReq */ "./src/js/ticketTakeReq.js");
/* harmony import */ var _Modals__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Modals */ "./src/js/Modals.js");




function ticket(){
  Object(_collapsableCards__WEBPACK_IMPORTED_MODULE_0__["default"])();
  Object(_ticketTakeReq__WEBPACK_IMPORTED_MODULE_1__["default"])();
  Object(_Modals__WEBPACK_IMPORTED_MODULE_2__["default"])();
}


/***/ }),

/***/ "./src/js/ticketClass.js":
/*!*******************************!*\
  !*** ./src/js/ticketClass.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ticketClass; });
function ticketClass() {
  return function Ticket(title, department, priority, deadline, description) {
    this.title = title;
    this.department = department;
    this.priority = priority;
    this.deadline = deadline;
    this.description = description;
  }
}


/***/ }),

/***/ "./src/js/ticketCloseReq.js":
/*!**********************************!*\
  !*** ./src/js/ticketCloseReq.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return postTicketClose; });
/* harmony import */ var _cardTicketsContent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cardTicketsContent */ "./src/js/cardTicketsContent.js");


function postTicketClose(obj) {
    let xhr = new XMLHttpRequest();
    xhr.open('PATCH', '/tickets/close');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.responseType = 'document';
    xhr.onload = function() {
        if (xhr.status === 200) {
          Object(_cardTicketsContent__WEBPACK_IMPORTED_MODULE_0__["default"])(this.response);
        }
    }
    xhr.send(JSON.stringify(obj))
}


/***/ }),

/***/ "./src/js/ticketStatus.js":
/*!********************************!*\
  !*** ./src/js/ticketStatus.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ticketStatus; });
let statusSection = document.querySelector('.ticket-status');

function ticketStatus() {
  statusSection.addEventListener('click',function(e){
    e.preventDefault();
    location.search='?status='+e.target.classList.value;
  })
}


/***/ }),

/***/ "./src/js/ticketTakeReq.js":
/*!*********************************!*\
  !*** ./src/js/ticketTakeReq.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ticketTakeReq; });
/* harmony import */ var _Modals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Modals */ "./src/js/Modals.js");


let takeBtns = document.getElementsByClassName('btn-take-ticket');

function ticketTakeReq() {
    for (let i = 0; i < takeBtns.length; i++) {
        takeBtns[i].addEventListener('click', assigneePatch);
    }
}

function assigneePatch() {
    let takeBtn = this;
    let assignee = atob(localStorage.un); //decode from base64
    let xhr = new XMLHttpRequest();
    xhr.open('PATCH', '/tickets/' + takeBtn.id);
    xhr.setRequestHeader('Content-Type', 'application/json');
    let user = {
        assignee
    };
    xhr.send(JSON.stringify(user));
    xhr.onload = function() {
        if (this.status === 200) {
          takeBtn.innerHTML='Close';
          takeBtn.classList.toggle('btn-close-ticket');
          takeBtn.classList.toggle('btn-take-ticket');
        }
        Object(_Modals__WEBPACK_IMPORTED_MODULE_0__["default"])();
    }
}


/***/ }),

/***/ "./src/js/ticketsReq.js":
/*!******************************!*\
  !*** ./src/js/ticketsReq.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return postTicket; });
/* harmony import */ var _cardTicketsContent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cardTicketsContent */ "./src/js/cardTicketsContent.js");


function postTicket(obj) {
      let xhr = new XMLHttpRequest();
      xhr.open('POST', '/tickets', true);
      xhr.setRequestHeader("Content-Type", "application/json");
      obj.location=location.pathname.slice(1);
      xhr.withCredentials=true;
      xhr.responseType = 'document';
      xhr.onload = function() {
          if (this.status == 200) {
              Object(_cardTicketsContent__WEBPACK_IMPORTED_MODULE_0__["default"])(this.response);
          }
      }
      xhr.send(JSON.stringify(obj));
  }


/***/ }),

/***/ "./src/js/utilitiesHome.js":
/*!*********************************!*\
  !*** ./src/js/utilitiesHome.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return utilities; });
function utilities() {
    let accountName = document.getElementsByClassName("fullname")[0];
    let signOut = document.getElementsByClassName("signout")[0];
    accountName.innerHTML = atob(localStorage.un) || ''; //decode from base64
    signOut.onclick = function() {
        localStorage.clear();
        sessionStorage.clear();
    }
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL01vZGFscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY2FyZFRpY2tldHNDb250ZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb2xsYXBzYWJsZUNhcmRzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9kcm9wZG93bnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2hvbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3RpY2tldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdGlja2V0Q2xhc3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3RpY2tldENsb3NlUmVxLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy90aWNrZXRTdGF0dXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3RpY2tldFRha2VSZXEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3RpY2tldHNSZXEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxpdGllc0hvbWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwy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QUVlO0FBQ2YsbUJBQW1CLHFCQUFxQjtBQUN4QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsdURBQU07QUFDZDtBQUNBOzs7Ozs7Ozs7Ozs7O0FDNUJBO0FBQUE7QUFBQTtBQUFzRDs7QUFFdkM7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxtRUFBa0I7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNmQTtBQUFBO0FBQWU7QUFDZjtBQUNBO0FBQ0Esd0RBQXdEO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYnVuZGxlLWhvbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9qcy9ob21lLmpzXCIpO1xuIiwiaW1wb3J0IHRpY2tldENsYXNzIGZyb20gJy4vdGlja2V0Q2xhc3MnO1xyXG5pbXBvcnQgcG9zdFRpY2tldCBmcm9tICcuL3RpY2tldHNSZXEnO1xyXG5pbXBvcnQgcG9zdFRpY2tldENsb3NlIGZyb20gJy4vdGlja2V0Q2xvc2VSZXEnXHJcbmxldCBUaWNrZXQgPSB0aWNrZXRDbGFzcygpO1xyXG5cclxubGV0IG5ld1RpY2tldEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ25ldy10aWNrZXQnKVswXTtcclxubGV0IGNsb3NlVGlja2V0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYnRuLWNsb3NlLXRpY2tldCcpO1xyXG5sZXQgcGFnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdtYWluJylbMF07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzaG93TW9kYWxzKCkge1xyXG4gICAgbmV3VGlja2V0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2hvd0JnTW9kYWwpO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbG9zZVRpY2tldEJ0bi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNsb3NlVGlja2V0QnRuW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2hvd0JnTW9kYWwpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93QmdNb2RhbChlKSB7XHJcbiAgICBsZXQgYmdNb2RhbDtcclxuICAgIGlmIChlLmN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCduZXctdGlja2V0JykpIHtcclxuICAgICAgICBiZ01vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJnLW1vZGFsJyk7XHJcbiAgICAgICAgbGV0IGZvcm0gPSBiZ01vZGFsLnF1ZXJ5U2VsZWN0b3IoJy50aWNrZXQtZm9ybScpO1xyXG4gICAgICAgIGxldCBkZWFkbGluZSA9IGZvcm0uZGVhZGxpbmU7XHJcbiAgICAgICAgZGVhZGxpbmUub25mb2N1cyA9IGZ1bmN0aW9uKCkgeyAvL2xldCB0aGUgdXNlciBjaG9vc2UgYSBkYXRlIG9uZm9jdXNcclxuICAgICAgICAgICAgdGhpcy50eXBlID0gXCJkYXRlXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkZWFkbGluZS5vbmJsdXIgPSBmdW5jdGlvbigpIHsgLy9zaG93IHRoZSBwbGFjZWhvbGRlciBvbmJsdXJcclxuICAgICAgICAgICAgdGhpcy50eXBlID0gXCJ0ZXh0XCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc3VibWl0ID0gYmdNb2RhbC5xdWVyeVNlbGVjdG9yKCcuc3VibWl0LXRpY2tldCcpO1xyXG4gICAgICAgIHN1Ym1pdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN1Ym1pdFRpY2tldCk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHN1Ym1pdFRpY2tldCgpIHtcclxuICAgICAgICAgICAgbGV0IGlucHV0cyA9IGZvcm0ucXVlcnlTZWxlY3RvckFsbCgnaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWEnKTsgLy9nZXQgYWxsIGlucHV0c1xyXG4gICAgICAgICAgICBsZXQgaW5wdXRDb3VudCA9IDA7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGlucHV0IG9mIGlucHV0cykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGlucHV0LnZhbGlkYXRpb25NZXNzYWdlICE9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LnN0eWxlLmJvcmRlckNvbG9yID0gJ3JlZCc7IC8vb3V0bGluZSBlbXB0eSBmaWVsZHMgb3IgbG9uZyB0aXRsZVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC5uYW1lID09PSAndGl0bGUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0b29sdGlwVHh0ID0gaW5wdXQucGFyZW50Tm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQucGFyZW50Tm9kZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdG9vbHRpcCcsIHRvb2x0aXBUeHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRDb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LnN0eWxlLmJvcmRlckNvbG9yID0gJyNDRkQ4REMnO1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LnBhcmVudE5vZGUucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXRvb2x0aXAnKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXRDb3VudCA9PT0gaW5wdXRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGlja2V0c0FyciA9IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGlucHV0IG9mIGlucHV0cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhbCA9IGlucHV0LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0Lm5hbWUgPT09ICdkZXNjcmlwdGlvbicgfHwgaW5wdXQubmFtZSA9PT0gJ3RpdGxlJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbCA9IHZhbC5zbGljZSgwLCAxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudG9VcHBlckNhc2UoKSArIHZhbC5zbGljZSgxLCB2YWwubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpY2tldHNBcnIucHVzaCh2YWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc3RUaWNrZXQobmV3IFRpY2tldCguLi50aWNrZXRzQXJyKSk7IC8vRVM2LCBmb3IgRVM1IC0gbG9vcCB0aHJvdWdoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0ucmVzZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmdNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2UuY2xhc3NOYW1lID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKGUuY3VycmVudFRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2J0bi1jbG9zZS10aWNrZXQnKSkge1xyXG4gICAgICAgIGJnTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2xvc2UtdGlja2V0LW1vZGFsJyk7XHJcbiAgICAgICAgbGV0IHN1Ym1pdCA9IGJnTW9kYWwucXVlcnlTZWxlY3RvcignLmNsb3NlLXRpY2tldCcpO1xyXG4gICAgICAgIGxldCB0aWNrZXRJZCA9IGUuY3VycmVudFRhcmdldC5pZDtcclxuICAgICAgICBzdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVRpY2tldCk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNsb3NlVGlja2V0KCkge1xyXG4gICAgICAgICAgICBsZXQgYWN0aW9uID0gYmdNb2RhbC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPWNsb3NlXTpjaGVja2VkJylcclxuICAgICAgICAgICAgICAgIC5pZDtcclxuICAgICAgICAgICAgcG9zdFRpY2tldENsb3NlKHtcclxuICAgICAgICAgICAgICAgIGFjdGlvbixcclxuICAgICAgICAgICAgICAgIHRpY2tldElkXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBiZ01vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgcGFnZS5jbGFzc05hbWUgPSAnJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBiZ01vZGFsLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcclxuICAgIHBhZ2UuY2xhc3NOYW1lID0gJ2JsdXInXHJcbiAgICBjZW50ZXJNb2RhbChiZ01vZGFsKTtcclxuXHJcbiAgICB3aW5kb3cub25yZXNpemUgPSBmdW5jdGlvbihiZ01vZGFsKSB7XHJcbiAgICAgICAgY2VudGVyTW9kYWwoYmdNb2RhbCk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGNsb3NlQnRuID0gYmdNb2RhbC5xdWVyeVNlbGVjdG9yKCcuY2xvc2UtYmctbW9kYWwnKTtcclxuICAgIGNsb3NlQnRuLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBiZ01vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICBwYWdlLmNsYXNzTmFtZSA9ICcnO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNlbnRlck1vZGFsKCkge1xyXG4gICAgICAgIGxldCBjb250ZW50cyA9IGJnTW9kYWwucXVlcnlTZWxlY3RvcignLm1vZGFsLWNvbnRlbnRzJyk7XHJcbiAgICAgICAgbGV0IHdpZHRoID0gY29udGVudHMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XHJcbiAgICAgICAgbGV0IGhlaWdodCA9IGNvbnRlbnRzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcclxuICAgICAgICBzY3JvbGxUbyh7XHJcbiAgICAgICAgICAgIHRvcDogY29udGVudHMub2Zmc2V0VG9wIC0gaGVpZ2h0IC8gNSxcclxuICAgICAgICAgICAgbGVmdDogY29udGVudHMub2Zmc2V0TGVmdCAtIHdpZHRoIC8gNSxcclxuICAgICAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHRpY2tldCBmcm9tICcuL3RpY2tldCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjYXJkVGlja2V0c0NvbnRlbnQodGlja2V0cykge1xyXG4gIGlmICghdGlja2V0cykge1xyXG4gICAgICByZXR1cm47XHJcbiAgfVxyXG4gIGRvY3VtZW50XHJcbiAgICAgIC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd0aWNrZXRzLWRpc3BsYXknKVswXVxyXG4gICAgICAuaW5uZXJIVE1MID0gdGlja2V0c1xyXG4gICAgICAuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndGlja2V0cy1kaXNwbGF5JylbMF1cclxuICAgICAgLmlubmVySFRNTDsgLy90aGlzIGNodW5rIG9mIGRvbSBpcyBnZW5lcmF0ZWQgYWZ0ZXIgdGhlIHNjcmlwdHMgYXJlIGFkZGVkXHJcbiAgdGlja2V0KCk7XHJcbn1cclxuIiwibGV0IGhlYWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJkLWJsb2NrXCIpO1xyXG5sZXQgY2FyZEJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiY29sbGFwc2Ugc2hvd1wiKTtcclxubGV0IHRha2VCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdidG4tdGFrZS10aWNrZXQnKTtcclxuXHJcbmZ1bmN0aW9uIHNob3dIaWRlKGVsKSB7XHJcbiAgICBpZiAoZWwuc3R5bGUuaGVpZ2h0ICE9PSAnMHB4Jykge1xyXG4gICAgICAgIGVsLnN0eWxlLmhlaWdodCA9ICcwcHgnO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBlbC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJzsgLy8gTWFrZSBpdCB2aXNpYmxlXHJcbiAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gZWwuc2Nyb2xsSGVpZ2h0ICsgJ3B4JztcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZml4SGVpZ2h0KGVsKSB7XHJcbiAgICBpZiAoZWwuc3R5bGUuaGVpZ2h0ICE9PSAnMHB4Jykge1xyXG4gICAgICAgIGVsLnN0eWxlLmhlaWdodCA9IGVsLnNjcm9sbEhlaWdodCArICdweCc7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbGxhcHNhYmxlcygpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaGVhZGVyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaGVhZGVyW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QudG9nZ2xlKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICBsZXQgcGFuZWwgPSB0aGlzLm5leHRFbGVtZW50U2libGluZztcclxuICAgICAgICAgICAgZml4SGVpZ2h0KHBhbmVsKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dChzaG93SGlkZSwgMCwgcGFuZWwpOyAvL3Nob3dIaWRlIG11c3QgZXhlY3V0ZSBhZnRlciBmaXhIZWlnaHRcclxuICAgICAgICB9KTsgLy9vdGhlcndpc2UgaGVpZ2h0IHdvbid0IGhhdmUgYSBwaXhlbCB2YWx1ZSwgYW5kIHRoZSB0cmFuc2l0aW9uIHdvdWxkbnQgb2NjdXJcclxuICAgIH1cclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNhcmRCb2R5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChjYXJkQm9keVtpXS5zdHlsZS5oZWlnaHQgIT09ICcwcHgnKVxyXG4gICAgICAgICAgICAgICAgY2FyZEJvZHlbaV0uc3R5bGUuaGVpZ2h0ID0gJ2F1dG8nO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcbiIsImxldCBkcm9wRG93bnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibmF2LWxpbmtcIik7XHJcbmxldCBuYXZiYXJTaWRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIm5hdmJhci1uYXZcIilbMF07XHJcbmxldCBwYWdlVG9wQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaWRlYmFyVG9nZ2xlVG9wXCIpO1xyXG5sZXQgcGFnZVRvcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGFnZS10b3BcIik7XHJcblxyXG5mb3IgKGxldCBpID0gMDsgaSA8IGRyb3BEb3ducy5sZW5ndGg7IGkrKykge1xyXG4gICAgZHJvcERvd25zW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2hvd1RvZ2dsZSlcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd1RvZ2dsZShlKSB7XHJcbiAgICBsZXQgZWwgPSBlLmN1cnJlbnRUYXJnZXQ7XHJcbiAgICBlbC5jbGFzc0xpc3QudG9nZ2xlKFwic2hvd1wiKTtcclxuICAgIGlmIChlbC5uZXh0RWxlbWVudFNpYmxpbmcpIHtcclxuICAgICAgICBlbC5uZXh0RWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LnRvZ2dsZShcInNob3dcIik7XHJcbiAgICB9XHJcbiAgICBlbFtcImFyaWEtZXhwYW5kZWRcIl0gPSAhZWxbXCJhcmlhLWV4cGFuZGVkXCJdXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRyb3Bkb3ducygpIHtcclxuICAgIHBhZ2VUb3BCdG4ub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHBhZ2VUb3AuY2xhc3NMaXN0LnRvZ2dsZSgnc2lkZWJhci10b2dnbGVkJyk7XHJcbiAgICAgICAgbmF2YmFyU2lkZS5jbGFzc0xpc3QudG9nZ2xlKCd0b2dnbGVkJyk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IGRyb3Bkb3ducyBmcm9tICcuL2Ryb3Bkb3ducyc7XHJcbmltcG9ydCB1dGlsaXRpZXMgZnJvbSAnLi91dGlsaXRpZXNIb21lJztcclxuaW1wb3J0IHRpY2tldFN0YXR1cyBmcm9tICcuL3RpY2tldFN0YXR1cyc7XHJcbmltcG9ydCBjb2xsYXBzYWJsZXMgZnJvbSAnLi9jb2xsYXBzYWJsZUNhcmRzJztcclxuaW1wb3J0IHRpY2tldFRha2VSZXEgZnJvbSAnLi90aWNrZXRUYWtlUmVxJztcclxuaW1wb3J0IG1vZGFscyBmcm9tICcuL01vZGFscyc7XHJcblxyXG5kcm9wZG93bnMoKTtcclxudXRpbGl0aWVzKCk7XHJcbnRpY2tldFN0YXR1cygpO1xyXG5tb2RhbHMoKTtcclxuY29sbGFwc2FibGVzKCk7XHJcbnRpY2tldFRha2VSZXEoKTtcclxuIiwiaW1wb3J0IGNvbGxhcHNhYmxlcyBmcm9tICcuL2NvbGxhcHNhYmxlQ2FyZHMnO1xyXG5pbXBvcnQgdGlja2V0VGFrZVJlcSBmcm9tICcuL3RpY2tldFRha2VSZXEnO1xyXG5pbXBvcnQgbW9kYWxzIGZyb20gJy4vTW9kYWxzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRpY2tldCgpe1xyXG4gIGNvbGxhcHNhYmxlcygpO1xyXG4gIHRpY2tldFRha2VSZXEoKTtcclxuICBtb2RhbHMoKTtcclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0aWNrZXRDbGFzcygpIHtcclxuICByZXR1cm4gZnVuY3Rpb24gVGlja2V0KHRpdGxlLCBkZXBhcnRtZW50LCBwcmlvcml0eSwgZGVhZGxpbmUsIGRlc2NyaXB0aW9uKSB7XHJcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XHJcbiAgICB0aGlzLmRlcGFydG1lbnQgPSBkZXBhcnRtZW50O1xyXG4gICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xyXG4gICAgdGhpcy5kZWFkbGluZSA9IGRlYWRsaW5lO1xyXG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgY2FyZFRpY2tldHNDb250ZW50IGZyb20gJy4vY2FyZFRpY2tldHNDb250ZW50JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBvc3RUaWNrZXRDbG9zZShvYmopIHtcclxuICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgIHhoci5vcGVuKCdQQVRDSCcsICcvdGlja2V0cy9jbG9zZScpO1xyXG4gICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XHJcbiAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2RvY3VtZW50JztcclxuICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoeGhyLnN0YXR1cyA9PT0gMjAwKSB7XHJcbiAgICAgICAgICBjYXJkVGlja2V0c0NvbnRlbnQodGhpcy5yZXNwb25zZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgeGhyLnNlbmQoSlNPTi5zdHJpbmdpZnkob2JqKSlcclxufVxyXG4iLCJsZXQgc3RhdHVzU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50aWNrZXQtc3RhdHVzJyk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0aWNrZXRTdGF0dXMoKSB7XHJcbiAgc3RhdHVzU2VjdGlvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBsb2NhdGlvbi5zZWFyY2g9Jz9zdGF0dXM9JytlLnRhcmdldC5jbGFzc0xpc3QudmFsdWU7XHJcbiAgfSlcclxufVxyXG4iLCJpbXBvcnQgbW9kYWxzIGZyb20gJy4vTW9kYWxzJztcclxuXHJcbmxldCB0YWtlQnRucyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2J0bi10YWtlLXRpY2tldCcpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdGlja2V0VGFrZVJlcSgpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGFrZUJ0bnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB0YWtlQnRuc1tpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzc2lnbmVlUGF0Y2gpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBhc3NpZ25lZVBhdGNoKCkge1xyXG4gICAgbGV0IHRha2VCdG4gPSB0aGlzO1xyXG4gICAgbGV0IGFzc2lnbmVlID0gYXRvYihsb2NhbFN0b3JhZ2UudW4pOyAvL2RlY29kZSBmcm9tIGJhc2U2NFxyXG4gICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgeGhyLm9wZW4oJ1BBVENIJywgJy90aWNrZXRzLycgKyB0YWtlQnRuLmlkKTtcclxuICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xyXG4gICAgbGV0IHVzZXIgPSB7XHJcbiAgICAgICAgYXNzaWduZWVcclxuICAgIH07XHJcbiAgICB4aHIuc2VuZChKU09OLnN0cmluZ2lmeSh1c2VyKSk7XHJcbiAgICB4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICAgIHRha2VCdG4uaW5uZXJIVE1MPSdDbG9zZSc7XHJcbiAgICAgICAgICB0YWtlQnRuLmNsYXNzTGlzdC50b2dnbGUoJ2J0bi1jbG9zZS10aWNrZXQnKTtcclxuICAgICAgICAgIHRha2VCdG4uY2xhc3NMaXN0LnRvZ2dsZSgnYnRuLXRha2UtdGlja2V0Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG1vZGFscygpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBjYXJkVGlja2V0c0NvbnRlbnQgZnJvbSAnLi9jYXJkVGlja2V0c0NvbnRlbnQnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcG9zdFRpY2tldChvYmopIHtcclxuICAgICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICB4aHIub3BlbignUE9TVCcsICcvdGlja2V0cycsIHRydWUpO1xyXG4gICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcbiAgICAgIG9iai5sb2NhdGlvbj1sb2NhdGlvbi5wYXRobmFtZS5zbGljZSgxKTtcclxuICAgICAgeGhyLndpdGhDcmVkZW50aWFscz10cnVlO1xyXG4gICAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2RvY3VtZW50JztcclxuICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09IDIwMCkge1xyXG4gICAgICAgICAgICAgIGNhcmRUaWNrZXRzQ29udGVudCh0aGlzLnJlc3BvbnNlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICB4aHIuc2VuZChKU09OLnN0cmluZ2lmeShvYmopKTtcclxuICB9XHJcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHV0aWxpdGllcygpIHtcclxuICAgIGxldCBhY2NvdW50TmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJmdWxsbmFtZVwiKVswXTtcclxuICAgIGxldCBzaWduT3V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInNpZ25vdXRcIilbMF07XHJcbiAgICBhY2NvdW50TmFtZS5pbm5lckhUTUwgPSBhdG9iKGxvY2FsU3RvcmFnZS51bikgfHwgJyc7IC8vZGVjb2RlIGZyb20gYmFzZTY0XHJcbiAgICBzaWduT3V0Lm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcclxuICAgICAgICBzZXNzaW9uU3RvcmFnZS5jbGVhcigpO1xyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=