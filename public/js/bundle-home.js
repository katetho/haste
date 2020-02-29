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
/* harmony import */ var _ticketStatusReq__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ticketStatusReq */ "./src/js/ticketStatusReq.js");


let statusSection = document.querySelector('.ticket-status');

function ticketStatus() {
  statusSection.addEventListener('click',function(e){
    e.preventDefault();
    location.search='?status='+e.target.classList.value;
    Object(_ticketStatusReq__WEBPACK_IMPORTED_MODULE_0__["default"])();
  })
}


/***/ }),

/***/ "./src/js/ticketStatusReq.js":
/*!***********************************!*\
  !*** ./src/js/ticketStatusReq.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ticketStatusPost; });
/* harmony import */ var _cardTicketsContent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cardTicketsContent */ "./src/js/cardTicketsContent.js");


function ticketStatusPost(ticketStatus) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', location.href);
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.responseType = 'document';
    xhr.onload = function() {
        if (this.status == 200) {
            Object(_cardTicketsContent__WEBPACK_IMPORTED_MODULE_0__["default"])(this.response);
        }
    }
    xhr.send();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL01vZGFscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY2FyZFRpY2tldHNDb250ZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb2xsYXBzYWJsZUNhcmRzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9kcm9wZG93bnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2hvbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3RpY2tldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdGlja2V0Q2xhc3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3RpY2tldENsb3NlUmVxLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy90aWNrZXRTdGF0dXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3RpY2tldFN0YXR1c1JlcS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdGlja2V0VGFrZVJlcS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdGlja2V0c1JlcS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbGl0aWVzSG9tZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFB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QSxJQUFJLGdFQUFlO0FBQ25CLEdBQUc7QUFDSDs7Ozs7Ozs7Ozs7OztBQ1ZBO0FBQUE7QUFBQTtBQUFzRDs7QUFFdkM7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLG1FQUFrQjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2JBO0FBQUE7QUFBQTtBQUE4Qjs7QUFFOUI7O0FBRWU7QUFDZixtQkFBbUIscUJBQXFCO0FBQ3hDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSx1REFBTTtBQUNkO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUM1QkE7QUFBQTtBQUFBO0FBQXNEOztBQUV2QztBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLG1FQUFrQjtBQUNoQztBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2ZBO0FBQUE7QUFBZTtBQUNmO0FBQ0E7QUFDQSx3REFBd0Q7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJidW5kbGUtaG9tZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2pzL2hvbWUuanNcIik7XG4iLCJpbXBvcnQgdGlja2V0Q2xhc3MgZnJvbSAnLi90aWNrZXRDbGFzcyc7XHJcbmltcG9ydCBwb3N0VGlja2V0IGZyb20gJy4vdGlja2V0c1JlcSc7XHJcbmltcG9ydCBwb3N0VGlja2V0Q2xvc2UgZnJvbSAnLi90aWNrZXRDbG9zZVJlcSdcclxubGV0IFRpY2tldCA9IHRpY2tldENsYXNzKCk7XHJcblxyXG5sZXQgbmV3VGlja2V0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbmV3LXRpY2tldCcpWzBdO1xyXG5sZXQgY2xvc2VUaWNrZXRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdidG4tY2xvc2UtdGlja2V0Jyk7XHJcbmxldCBwYWdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ21haW4nKVswXTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNob3dNb2RhbHMoKSB7XHJcbiAgICBuZXdUaWNrZXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzaG93QmdNb2RhbCk7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsb3NlVGlja2V0QnRuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY2xvc2VUaWNrZXRCdG5baV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzaG93QmdNb2RhbCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dCZ01vZGFsKGUpIHtcclxuICAgIGxldCBiZ01vZGFsO1xyXG4gICAgaWYgKGUuY3VycmVudFRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ25ldy10aWNrZXQnKSkge1xyXG4gICAgICAgIGJnTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmctbW9kYWwnKTtcclxuICAgICAgICBsZXQgZm9ybSA9IGJnTW9kYWwucXVlcnlTZWxlY3RvcignLnRpY2tldC1mb3JtJyk7XHJcbiAgICAgICAgbGV0IGRlYWRsaW5lID0gZm9ybS5kZWFkbGluZTtcclxuICAgICAgICBkZWFkbGluZS5vbmZvY3VzID0gZnVuY3Rpb24oKSB7IC8vbGV0IHRoZSB1c2VyIGNob29zZSBhIGRhdGUgb25mb2N1c1xyXG4gICAgICAgICAgICB0aGlzLnR5cGUgPSBcImRhdGVcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRlYWRsaW5lLm9uYmx1ciA9IGZ1bmN0aW9uKCkgeyAvL3Nob3cgdGhlIHBsYWNlaG9sZGVyIG9uYmx1clxyXG4gICAgICAgICAgICB0aGlzLnR5cGUgPSBcInRleHRcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBzdWJtaXQgPSBiZ01vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5zdWJtaXQtdGlja2V0Jyk7XHJcbiAgICAgICAgc3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3VibWl0VGlja2V0KTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc3VibWl0VGlja2V0KCkge1xyXG4gICAgICAgICAgICBsZXQgaW5wdXRzID0gZm9ybS5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCwgc2VsZWN0LCB0ZXh0YXJlYScpOyAvL2dldCBhbGwgaW5wdXRzXHJcbiAgICAgICAgICAgIGxldCBpbnB1dENvdW50ID0gMDtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5wdXQgb2YgaW5wdXRzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5wdXQudmFsaWRhdGlvbk1lc3NhZ2UgIT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQuc3R5bGUuYm9yZGVyQ29sb3IgPSAncmVkJzsgLy9vdXRsaW5lIGVtcHR5IGZpZWxkcyBvciBsb25nIHRpdGxlXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0Lm5hbWUgPT09ICd0aXRsZScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRvb2x0aXBUeHQgPSBpbnB1dC5wYXJlbnROb2RlLmdldEF0dHJpYnV0ZSgnZGF0YScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5wYXJlbnROb2RlLnNldEF0dHJpYnV0ZSgnZGF0YS10b29sdGlwJywgdG9vbHRpcFR4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dENvdW50Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQuc3R5bGUuYm9yZGVyQ29sb3IgPSAnI0NGRDhEQyc7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQucGFyZW50Tm9kZS5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtdG9vbHRpcCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dENvdW50ID09PSBpbnB1dHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0aWNrZXRzQXJyID0gW11cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW5wdXQgb2YgaW5wdXRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmFsID0gaW5wdXQudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQubmFtZSA9PT0gJ2Rlc2NyaXB0aW9uJyB8fCBpbnB1dC5uYW1lID09PSAndGl0bGUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsID0gdmFsLnNsaWNlKDAsIDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50b1VwcGVyQ2FzZSgpICsgdmFsLnNsaWNlKDEsIHZhbC5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGlja2V0c0Fyci5wdXNoKHZhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zdFRpY2tldChuZXcgVGlja2V0KC4uLnRpY2tldHNBcnIpKTsgLy9FUzYsIGZvciBFUzUgLSBsb29wIHRocm91Z2hcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5yZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiZ01vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFnZS5jbGFzc05hbWUgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoZS5jdXJyZW50VGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnYnRuLWNsb3NlLXRpY2tldCcpKSB7XHJcbiAgICAgICAgYmdNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jbG9zZS10aWNrZXQtbW9kYWwnKTtcclxuICAgICAgICBsZXQgc3VibWl0ID0gYmdNb2RhbC5xdWVyeVNlbGVjdG9yKCcuY2xvc2UtdGlja2V0Jyk7XHJcbiAgICAgICAgbGV0IHRpY2tldElkID0gZS5jdXJyZW50VGFyZ2V0LmlkO1xyXG4gICAgICAgIHN1Ym1pdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlVGlja2V0KTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY2xvc2VUaWNrZXQoKSB7XHJcbiAgICAgICAgICAgIGxldCBhY3Rpb24gPSBiZ01vZGFsLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9Y2xvc2VdOmNoZWNrZWQnKVxyXG4gICAgICAgICAgICAgICAgLmlkO1xyXG4gICAgICAgICAgICBwb3N0VGlja2V0Q2xvc2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0aW9uLFxyXG4gICAgICAgICAgICAgICAgdGlja2V0SWRcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGJnTW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgICAgICBwYWdlLmNsYXNzTmFtZSA9ICcnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGJnTW9kYWwuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xyXG4gICAgcGFnZS5jbGFzc05hbWUgPSAnYmx1cidcclxuICAgIGNlbnRlck1vZGFsKGJnTW9kYWwpO1xyXG5cclxuICAgIHdpbmRvdy5vbnJlc2l6ZSA9IGZ1bmN0aW9uKGJnTW9kYWwpIHtcclxuICAgICAgICBjZW50ZXJNb2RhbChiZ01vZGFsKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgY2xvc2VCdG4gPSBiZ01vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5jbG9zZS1iZy1tb2RhbCcpO1xyXG4gICAgY2xvc2VCdG4ub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGJnTW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgIHBhZ2UuY2xhc3NOYW1lID0gJyc7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2VudGVyTW9kYWwoKSB7XHJcbiAgICAgICAgbGV0IGNvbnRlbnRzID0gYmdNb2RhbC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtY29udGVudHMnKTtcclxuICAgICAgICBsZXQgd2lkdGggPSBjb250ZW50cy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcclxuICAgICAgICBsZXQgaGVpZ2h0ID0gY29udGVudHMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xyXG4gICAgICAgIHNjcm9sbFRvKHtcclxuICAgICAgICAgICAgdG9wOiBjb250ZW50cy5vZmZzZXRUb3AgLSBoZWlnaHQgLyA1LFxyXG4gICAgICAgICAgICBsZWZ0OiBjb250ZW50cy5vZmZzZXRMZWZ0IC0gd2lkdGggLyA1LFxyXG4gICAgICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCdcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgdGlja2V0IGZyb20gJy4vdGlja2V0JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNhcmRUaWNrZXRzQ29udGVudCh0aWNrZXRzKSB7XHJcbiAgaWYgKCF0aWNrZXRzKSB7XHJcbiAgICAgIHJldHVybjtcclxuICB9XHJcbiAgZG9jdW1lbnRcclxuICAgICAgLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3RpY2tldHMtZGlzcGxheScpWzBdXHJcbiAgICAgIC5pbm5lckhUTUwgPSB0aWNrZXRzXHJcbiAgICAgIC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd0aWNrZXRzLWRpc3BsYXknKVswXVxyXG4gICAgICAuaW5uZXJIVE1MOyAvL3RoaXMgY2h1bmsgb2YgZG9tIGlzIGdlbmVyYXRlZCBhZnRlciB0aGUgc2NyaXB0cyBhcmUgYWRkZWRcclxuICB0aWNrZXQoKTtcclxufVxyXG4iLCJsZXQgaGVhZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImQtYmxvY2tcIik7XHJcbmxldCBjYXJkQm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJjb2xsYXBzZSBzaG93XCIpO1xyXG5sZXQgdGFrZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2J0bi10YWtlLXRpY2tldCcpO1xyXG5cclxuZnVuY3Rpb24gc2hvd0hpZGUoZWwpIHtcclxuICAgIGlmIChlbC5zdHlsZS5oZWlnaHQgIT09ICcwcHgnKSB7XHJcbiAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gJzBweCc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGVsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snOyAvLyBNYWtlIGl0IHZpc2libGVcclxuICAgICAgICBlbC5zdHlsZS5oZWlnaHQgPSBlbC5zY3JvbGxIZWlnaHQgKyAncHgnO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBmaXhIZWlnaHQoZWwpIHtcclxuICAgIGlmIChlbC5zdHlsZS5oZWlnaHQgIT09ICcwcHgnKSB7XHJcbiAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gZWwuc2Nyb2xsSGVpZ2h0ICsgJ3B4JztcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29sbGFwc2FibGVzKCkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoZWFkZXIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBoZWFkZXJbaV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC50b2dnbGUoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgIGxldCBwYW5lbCA9IHRoaXMubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG4gICAgICAgICAgICBmaXhIZWlnaHQocGFuZWwpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KHNob3dIaWRlLCAwLCBwYW5lbCk7IC8vc2hvd0hpZGUgbXVzdCBleGVjdXRlIGFmdGVyIGZpeEhlaWdodFxyXG4gICAgICAgIH0pOyAvL290aGVyd2lzZSBoZWlnaHQgd29uJ3QgaGF2ZSBhIHBpeGVsIHZhbHVlLCBhbmQgdGhlIHRyYW5zaXRpb24gd291bGRudCBvY2N1clxyXG4gICAgfVxyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2FyZEJvZHkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGNhcmRCb2R5W2ldLnN0eWxlLmhlaWdodCAhPT0gJzBweCcpXHJcbiAgICAgICAgICAgICAgICBjYXJkQm9keVtpXS5zdHlsZS5oZWlnaHQgPSAnYXV0byc7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuIiwibGV0IGRyb3BEb3ducyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJuYXYtbGlua1wiKTtcclxubGV0IG5hdmJhclNpZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibmF2YmFyLW5hdlwiKVswXTtcclxubGV0IHBhZ2VUb3BCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNpZGViYXJUb2dnbGVUb3BcIik7XHJcbmxldCBwYWdlVG9wID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwYWdlLXRvcFwiKTtcclxuXHJcbmZvciAobGV0IGkgPSAwOyBpIDwgZHJvcERvd25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBkcm9wRG93bnNbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzaG93VG9nZ2xlKVxyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93VG9nZ2xlKGUpIHtcclxuICAgIGxldCBlbCA9IGUuY3VycmVudFRhcmdldDtcclxuICAgIGVsLmNsYXNzTGlzdC50b2dnbGUoXCJzaG93XCIpO1xyXG4gICAgaWYgKGVsLm5leHRFbGVtZW50U2libGluZykge1xyXG4gICAgICAgIGVsLm5leHRFbGVtZW50U2libGluZy5jbGFzc0xpc3QudG9nZ2xlKFwic2hvd1wiKTtcclxuICAgIH1cclxuICAgIGVsW1wiYXJpYS1leHBhbmRlZFwiXSA9ICFlbFtcImFyaWEtZXhwYW5kZWRcIl1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZHJvcGRvd25zKCkge1xyXG4gICAgcGFnZVRvcEJ0bi5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcGFnZVRvcC5jbGFzc0xpc3QudG9nZ2xlKCdzaWRlYmFyLXRvZ2dsZWQnKTtcclxuICAgICAgICBuYXZiYXJTaWRlLmNsYXNzTGlzdC50b2dnbGUoJ3RvZ2dsZWQnKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgZHJvcGRvd25zIGZyb20gJy4vZHJvcGRvd25zJztcclxuaW1wb3J0IHV0aWxpdGllcyBmcm9tICcuL3V0aWxpdGllc0hvbWUnO1xyXG5pbXBvcnQgdGlja2V0U3RhdHVzIGZyb20gJy4vdGlja2V0U3RhdHVzJztcclxuaW1wb3J0IGNvbGxhcHNhYmxlcyBmcm9tICcuL2NvbGxhcHNhYmxlQ2FyZHMnO1xyXG5pbXBvcnQgdGlja2V0VGFrZVJlcSBmcm9tICcuL3RpY2tldFRha2VSZXEnO1xyXG5pbXBvcnQgbW9kYWxzIGZyb20gJy4vTW9kYWxzJztcclxuXHJcbmRyb3Bkb3ducygpO1xyXG51dGlsaXRpZXMoKTtcclxudGlja2V0U3RhdHVzKCk7XHJcbm1vZGFscygpO1xyXG5jb2xsYXBzYWJsZXMoKTtcclxudGlja2V0VGFrZVJlcSgpO1xyXG4iLCJpbXBvcnQgY29sbGFwc2FibGVzIGZyb20gJy4vY29sbGFwc2FibGVDYXJkcyc7XHJcbmltcG9ydCB0aWNrZXRUYWtlUmVxIGZyb20gJy4vdGlja2V0VGFrZVJlcSc7XHJcbmltcG9ydCBtb2RhbHMgZnJvbSAnLi9Nb2RhbHMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdGlja2V0KCl7XHJcbiAgY29sbGFwc2FibGVzKCk7XHJcbiAgdGlja2V0VGFrZVJlcSgpO1xyXG4gIG1vZGFscygpO1xyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRpY2tldENsYXNzKCkge1xyXG4gIHJldHVybiBmdW5jdGlvbiBUaWNrZXQodGl0bGUsIGRlcGFydG1lbnQsIHByaW9yaXR5LCBkZWFkbGluZSwgZGVzY3JpcHRpb24pIHtcclxuICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcclxuICAgIHRoaXMuZGVwYXJ0bWVudCA9IGRlcGFydG1lbnQ7XHJcbiAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XHJcbiAgICB0aGlzLmRlYWRsaW5lID0gZGVhZGxpbmU7XHJcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBjYXJkVGlja2V0c0NvbnRlbnQgZnJvbSAnLi9jYXJkVGlja2V0c0NvbnRlbnQnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcG9zdFRpY2tldENsb3NlKG9iaikge1xyXG4gICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgeGhyLm9wZW4oJ1BBVENIJywgJy90aWNrZXRzL2Nsb3NlJyk7XHJcbiAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcclxuICAgIHhoci5yZXNwb25zZVR5cGUgPSAnZG9jdW1lbnQnO1xyXG4gICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICh4aHIuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICAgIGNhcmRUaWNrZXRzQ29udGVudCh0aGlzLnJlc3BvbnNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB4aHIuc2VuZChKU09OLnN0cmluZ2lmeShvYmopKVxyXG59XHJcbiIsImltcG9ydCB0aWNrZXRTdGF0dXNSZXEgZnJvbSAnLi90aWNrZXRTdGF0dXNSZXEnO1xyXG5cclxubGV0IHN0YXR1c1NlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGlja2V0LXN0YXR1cycpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdGlja2V0U3RhdHVzKCkge1xyXG4gIHN0YXR1c1NlY3Rpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgbG9jYXRpb24uc2VhcmNoPSc/c3RhdHVzPScrZS50YXJnZXQuY2xhc3NMaXN0LnZhbHVlO1xyXG4gICAgdGlja2V0U3RhdHVzUmVxKCk7XHJcbiAgfSlcclxufVxyXG4iLCJpbXBvcnQgY2FyZFRpY2tldHNDb250ZW50IGZyb20gJy4vY2FyZFRpY2tldHNDb250ZW50JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRpY2tldFN0YXR1c1Bvc3QodGlja2V0U3RhdHVzKSB7XHJcbiAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICB4aHIub3BlbignR0VUJywgbG9jYXRpb24uaHJlZik7XHJcbiAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKVxyXG4gICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdkb2N1bWVudCc7XHJcbiAgICB4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09IDIwMCkge1xyXG4gICAgICAgICAgICBjYXJkVGlja2V0c0NvbnRlbnQodGhpcy5yZXNwb25zZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgeGhyLnNlbmQoKTtcclxufVxyXG4iLCJpbXBvcnQgbW9kYWxzIGZyb20gJy4vTW9kYWxzJztcclxuXHJcbmxldCB0YWtlQnRucyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2J0bi10YWtlLXRpY2tldCcpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdGlja2V0VGFrZVJlcSgpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGFrZUJ0bnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB0YWtlQnRuc1tpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzc2lnbmVlUGF0Y2gpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBhc3NpZ25lZVBhdGNoKCkge1xyXG4gICAgbGV0IHRha2VCdG4gPSB0aGlzO1xyXG4gICAgbGV0IGFzc2lnbmVlID0gYXRvYihsb2NhbFN0b3JhZ2UudW4pOyAvL2RlY29kZSBmcm9tIGJhc2U2NFxyXG4gICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgeGhyLm9wZW4oJ1BBVENIJywgJy90aWNrZXRzLycgKyB0YWtlQnRuLmlkKTtcclxuICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xyXG4gICAgbGV0IHVzZXIgPSB7XHJcbiAgICAgICAgYXNzaWduZWVcclxuICAgIH07XHJcbiAgICB4aHIuc2VuZChKU09OLnN0cmluZ2lmeSh1c2VyKSk7XHJcbiAgICB4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICAgIHRha2VCdG4uaW5uZXJIVE1MPSdDbG9zZSc7XHJcbiAgICAgICAgICB0YWtlQnRuLmNsYXNzTGlzdC50b2dnbGUoJ2J0bi1jbG9zZS10aWNrZXQnKTtcclxuICAgICAgICAgIHRha2VCdG4uY2xhc3NMaXN0LnRvZ2dsZSgnYnRuLXRha2UtdGlja2V0Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG1vZGFscygpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBjYXJkVGlja2V0c0NvbnRlbnQgZnJvbSAnLi9jYXJkVGlja2V0c0NvbnRlbnQnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcG9zdFRpY2tldChvYmopIHtcclxuICAgICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICB4aHIub3BlbignUE9TVCcsICcvdGlja2V0cycsIHRydWUpO1xyXG4gICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcbiAgICAgIG9iai5sb2NhdGlvbj1sb2NhdGlvbi5wYXRobmFtZS5zbGljZSgxKTtcclxuICAgICAgeGhyLndpdGhDcmVkZW50aWFscz10cnVlO1xyXG4gICAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2RvY3VtZW50JztcclxuICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09IDIwMCkge1xyXG4gICAgICAgICAgICAgIGNhcmRUaWNrZXRzQ29udGVudCh0aGlzLnJlc3BvbnNlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICB4aHIuc2VuZChKU09OLnN0cmluZ2lmeShvYmopKTtcclxuICB9XHJcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHV0aWxpdGllcygpIHtcclxuICAgIGxldCBhY2NvdW50TmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJmdWxsbmFtZVwiKVswXTtcclxuICAgIGxldCBzaWduT3V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInNpZ25vdXRcIilbMF07XHJcbiAgICBhY2NvdW50TmFtZS5pbm5lckhUTUwgPSBhdG9iKGxvY2FsU3RvcmFnZS51bikgfHwgJyc7IC8vZGVjb2RlIGZyb20gYmFzZTY0XHJcbiAgICBzaWduT3V0Lm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcclxuICAgICAgICBzZXNzaW9uU3RvcmFnZS5jbGVhcigpO1xyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=