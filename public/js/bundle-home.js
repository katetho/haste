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
/* harmony import */ var _collapsableCards__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./collapsableCards */ "./src/js/collapsableCards.js");
/* harmony import */ var _dropdowns__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dropdowns */ "./src/js/dropdowns.js");
/* harmony import */ var _ticketModal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ticketModal */ "./src/js/ticketModal.js");
/* harmony import */ var _utilitiesHome__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utilitiesHome */ "./src/js/utilitiesHome.js");
/* harmony import */ var _ticketTakeReq__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ticketTakeReq */ "./src/js/ticketTakeReq.js");






Object(_collapsableCards__WEBPACK_IMPORTED_MODULE_0__["default"])();
Object(_dropdowns__WEBPACK_IMPORTED_MODULE_1__["default"])();
Object(_ticketModal__WEBPACK_IMPORTED_MODULE_2__["default"])();
Object(_utilitiesHome__WEBPACK_IMPORTED_MODULE_3__["default"])();
Object(_ticketTakeReq__WEBPACK_IMPORTED_MODULE_4__["default"])();


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

/***/ "./src/js/ticketModal.js":
/*!*******************************!*\
  !*** ./src/js/ticketModal.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ticketModal; });
/* harmony import */ var _ticketClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ticketClass */ "./src/js/ticketClass.js");
/* harmony import */ var _ticketsReq__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ticketsReq */ "./src/js/ticketsReq.js");


let Ticket = Object(_ticketClass__WEBPACK_IMPORTED_MODULE_0__["default"])();

let newTicketBtn = document.getElementsByClassName('new-ticket')[0];
let bgModal = document.getElementsByClassName('bg-modal')[0];
let contents = document.getElementsByClassName('modal-contents')[0];
let closeBtn = document.getElementsByClassName('close-bg-modal')[0];
let page = document.getElementsByTagName('main')[0];
let form = document.getElementsByClassName('ticket-form')[0];
let submit = document.getElementsByClassName('submit-ticket')[0];
let deadline = document.getElementById('deadline');

function centerModal() {
    let width = contents.getBoundingClientRect()
        .width;
    let height = contents.getBoundingClientRect()
        .height;
    scrollTo({
        top: contents.offsetTop - height / 5,
        left: contents.offsetLeft - width / 5,
        behavior: 'smooth'
    });
}

function ticketModal() {
    submit.onclick = function(event) {
        let inputs = form.querySelectorAll('input, select, textarea'); //get all inputs
        let inputCount = 0;
        for (let input of inputs) { //don't iterate through "form" - too many elements
            let longTitle = (input.id === 'title' && input.value.length > 35);
            if (input.value === "" || longTitle) {
                if (longTitle || input.value === "") {
                    input.style.borderColor = 'red'; //outline empty fields or long title
                if (longTitle) {
                    let tooltipTxt = title.parentNode.getAttribute('data');
                    input.parentNode.setAttribute('data-tooltip', tooltipTxt);
                }
              }
            } else {
                inputCount++;
                input.style.borderColor = '#CFD8DC';
                input.parentNode.removeAttribute('data-tooltip');
                if (inputCount === inputs.length) {
                    let ticketsArr = []
                    for (let input of inputs) {
                        let val = input.value;
                        if (input.id === 'description' || input.id === 'title') {
                            val = val.slice(0, 1)
                                .toUpperCase() + val.slice(1, val.length);
                        }
                        ticketsArr.push(val);
                    }
                    Object(_ticketsReq__WEBPACK_IMPORTED_MODULE_1__["default"])(new Ticket(...ticketsArr)); //ES6, for ES5 - loop through
                    for (let input of inputs) {
                      input.value=""; //clear out the form
                    }
                    bgModal.style.display = "none";
                    page.className = '';
                }
            }
        }
    }

    newTicketBtn.onclick = function() {
        bgModal.style.display = "flex";
        page.className = 'blur'
        centerModal();
    }

    window.onresize = function() {
        centerModal();
    }

    closeBtn.onclick = function() {
        bgModal.style.display = "none";
        page.className = '';
    }

    deadline.onfocus = function() { //let the user choose a date onfocus
        this.type = "date";
    }

    deadline.onblur = function() { //show the placeholder onblur
        this.type = "text";
    }
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
            takeBtn.outerHTML = `<a id=${takeBtn.id} href="#"> Assigned to: ${assignee} </a>`;
        }
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
/* harmony import */ var _collapsableCards__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./collapsableCards */ "./src/js/collapsableCards.js");
/* harmony import */ var _ticketTakeReq__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ticketTakeReq */ "./src/js/ticketTakeReq.js");



function postTicket(obj) {
      let xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://localhost:3002/tickets', true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.responseType = 'document';
      xhr.onload = function() {
          if (this.status == 200) {
              let tickets = this.response;
              document
                  .getElementsByClassName('tickets-display')[0]
                  .innerHTML = tickets
                  .getElementsByClassName('tickets-display')[0]
                  .innerHTML; //this chunk of dom is generated after the scripts are added
                  Object(_collapsableCards__WEBPACK_IMPORTED_MODULE_0__["default"])(); //so the earlier scripts won't work
                  Object(_ticketTakeReq__WEBPACK_IMPORTED_MODULE_1__["default"])();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbGxhcHNhYmxlQ2FyZHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2Ryb3Bkb3ducy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvaG9tZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdGlja2V0Q2xhc3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3RpY2tldE1vZGFsLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy90aWNrZXRUYWtlUmVxLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy90aWNrZXRzUmVxLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlsaXRpZXNIb21lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVlO0FBQ2YsbUJBQW1CLG1CQUFtQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDLFNBQVMsRUFBRTtBQUNYOztBQUVBO0FBQ0EsdUJBQXVCLHFCQUFxQjtBQUM1QztBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7Ozs7Ozs7Ozs7Ozs7QUNwQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGVBQWUsc0JBQXNCO0FBQ3JDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN2QkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQThDO0FBQ1Y7QUFDSTtBQUNBO0FBQ0k7O0FBRTVDLGlFQUFZO0FBQ1osMERBQVM7QUFDVCw0REFBVztBQUNYLDhEQUFTO0FBQ1QsOERBQWE7Ozs7Ozs7Ozs7Ozs7QUNWYjtBQUFBO0FBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDUkE7QUFBQTtBQUFBO0FBQUE7QUFBd0M7QUFDRjtBQUN0QyxhQUFhLDREQUFXOztBQUV4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFZTtBQUNmO0FBQ0Esc0VBQXNFO0FBQ3RFO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRDtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLDJEQUFVLDRCQUE0QjtBQUMxRDtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQ0FBbUM7QUFDbkM7QUFDQTs7QUFFQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDdEZBO0FBQUE7QUFBQTs7QUFFZTtBQUNmLG1CQUFtQixxQkFBcUI7QUFDeEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDLFdBQVcsMEJBQTBCLFNBQVM7QUFDdkY7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDdkJBO0FBQUE7QUFBQTtBQUFBO0FBQThDO0FBQ0Y7O0FBRTdCO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QixrQkFBa0IsaUVBQVksR0FBRztBQUNqQyxrQkFBa0IsOERBQWE7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNyQkE7QUFBQTtBQUFlO0FBQ2Y7QUFDQTtBQUNBLHdEQUF3RDtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImJ1bmRsZS1ob21lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvanMvaG9tZS5qc1wiKTtcbiIsImxldCBoZWFkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZC1ibG9ja1wiKTtcclxubGV0IGNhcmRCb2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImNvbGxhcHNlIHNob3dcIik7XHJcbmxldCB0YWtlQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYnRuLXRha2UtdGlja2V0Jyk7XHJcblxyXG5mdW5jdGlvbiBzaG93SGlkZShlbCkge1xyXG4gICAgaWYgKGVsLnN0eWxlLmhlaWdodCAhPT0gJzBweCcpIHtcclxuICAgICAgICBlbC5zdHlsZS5oZWlnaHQgPSAnMHB4JztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7IC8vIE1ha2UgaXQgdmlzaWJsZVxyXG4gICAgICAgIGVsLnN0eWxlLmhlaWdodCA9IGVsLnNjcm9sbEhlaWdodCArICdweCc7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZpeEhlaWdodChlbCkge1xyXG4gICAgaWYgKGVsLnN0eWxlLmhlaWdodCAhPT0gJzBweCcpIHtcclxuICAgICAgICBlbC5zdHlsZS5oZWlnaHQgPSBlbC5zY3JvbGxIZWlnaHQgKyAncHgnO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb2xsYXBzYWJsZXMoKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhlYWRlci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGhlYWRlcltpXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LnRvZ2dsZShcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgbGV0IHBhbmVsID0gdGhpcy5uZXh0RWxlbWVudFNpYmxpbmc7XHJcbiAgICAgICAgICAgIGZpeEhlaWdodChwYW5lbCk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoc2hvd0hpZGUsIDAsIHBhbmVsKTsgLy9zaG93SGlkZSBtdXN0IGV4ZWN1dGUgYWZ0ZXIgZml4SGVpZ2h0XHJcbiAgICAgICAgfSk7IC8vb3RoZXJ3aXNlIGhlaWdodCB3b24ndCBoYXZlIGEgcGl4ZWwgdmFsdWUsIGFuZCB0aGUgdHJhbnNpdGlvbiB3b3VsZG50IG9jY3VyXHJcbiAgICB9XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYXJkQm9keS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoY2FyZEJvZHlbaV0uc3R5bGUuaGVpZ2h0ICE9PSAnMHB4JylcclxuICAgICAgICAgICAgICAgIGNhcmRCb2R5W2ldLnN0eWxlLmhlaWdodCA9ICdhdXRvJztcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG4iLCJsZXQgZHJvcERvd25zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIm5hdi1saW5rXCIpO1xyXG5sZXQgbmF2YmFyU2lkZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJuYXZiYXItbmF2XCIpWzBdO1xyXG5sZXQgcGFnZVRvcEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2lkZWJhclRvZ2dsZVRvcFwiKTtcclxubGV0IHBhZ2VUb3AgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBhZ2UtdG9wXCIpO1xyXG5cclxuZm9yIChsZXQgaSA9IDA7IGkgPCBkcm9wRG93bnMubGVuZ3RoOyBpKyspIHtcclxuICAgIGRyb3BEb3duc1tpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNob3dUb2dnbGUpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dUb2dnbGUoZSkge1xyXG4gICAgbGV0IGVsID0gZS5jdXJyZW50VGFyZ2V0O1xyXG4gICAgZWwuY2xhc3NMaXN0LnRvZ2dsZShcInNob3dcIik7XHJcbiAgICBpZiAoZWwubmV4dEVsZW1lbnRTaWJsaW5nKSB7XHJcbiAgICAgICAgZWwubmV4dEVsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdC50b2dnbGUoXCJzaG93XCIpO1xyXG4gICAgfVxyXG4gICAgZWxbXCJhcmlhLWV4cGFuZGVkXCJdID0gIWVsW1wiYXJpYS1leHBhbmRlZFwiXVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkcm9wZG93bnMoKSB7XHJcbiAgICBwYWdlVG9wQnRuLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBwYWdlVG9wLmNsYXNzTGlzdC50b2dnbGUoJ3NpZGViYXItdG9nZ2xlZCcpO1xyXG4gICAgICAgIG5hdmJhclNpZGUuY2xhc3NMaXN0LnRvZ2dsZSgndG9nZ2xlZCcpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBjb2xsYXBzYWJsZXMgZnJvbSAnLi9jb2xsYXBzYWJsZUNhcmRzJztcclxuaW1wb3J0IGRyb3Bkb3ducyBmcm9tICcuL2Ryb3Bkb3ducyc7XHJcbmltcG9ydCB0aWNrZXRNb2RhbCBmcm9tICcuL3RpY2tldE1vZGFsJztcclxuaW1wb3J0IHV0aWxpdGllcyBmcm9tICcuL3V0aWxpdGllc0hvbWUnO1xyXG5pbXBvcnQgdGlja2V0VGFrZVJlcSBmcm9tICcuL3RpY2tldFRha2VSZXEnO1xyXG5cclxuY29sbGFwc2FibGVzKCk7XHJcbmRyb3Bkb3ducygpO1xyXG50aWNrZXRNb2RhbCgpO1xyXG51dGlsaXRpZXMoKTtcclxudGlja2V0VGFrZVJlcSgpO1xyXG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0aWNrZXRDbGFzcygpIHtcclxuICByZXR1cm4gZnVuY3Rpb24gVGlja2V0KHRpdGxlLCBkZXBhcnRtZW50LCBwcmlvcml0eSwgZGVhZGxpbmUsIGRlc2NyaXB0aW9uKSB7XHJcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XHJcbiAgICB0aGlzLmRlcGFydG1lbnQgPSBkZXBhcnRtZW50O1xyXG4gICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xyXG4gICAgdGhpcy5kZWFkbGluZSA9IGRlYWRsaW5lO1xyXG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgdGlja2V0Q2xhc3MgZnJvbSAnLi90aWNrZXRDbGFzcyc7XHJcbmltcG9ydCBwb3N0VGlja2V0IGZyb20gJy4vdGlja2V0c1JlcSc7XHJcbmxldCBUaWNrZXQgPSB0aWNrZXRDbGFzcygpO1xyXG5cclxubGV0IG5ld1RpY2tldEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ25ldy10aWNrZXQnKVswXTtcclxubGV0IGJnTW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdiZy1tb2RhbCcpWzBdO1xyXG5sZXQgY29udGVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtb2RhbC1jb250ZW50cycpWzBdO1xyXG5sZXQgY2xvc2VCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjbG9zZS1iZy1tb2RhbCcpWzBdO1xyXG5sZXQgcGFnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdtYWluJylbMF07XHJcbmxldCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndGlja2V0LWZvcm0nKVswXTtcclxubGV0IHN1Ym1pdCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3N1Ym1pdC10aWNrZXQnKVswXTtcclxubGV0IGRlYWRsaW5lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RlYWRsaW5lJyk7XHJcblxyXG5mdW5jdGlvbiBjZW50ZXJNb2RhbCgpIHtcclxuICAgIGxldCB3aWR0aCA9IGNvbnRlbnRzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXHJcbiAgICAgICAgLndpZHRoO1xyXG4gICAgbGV0IGhlaWdodCA9IGNvbnRlbnRzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXHJcbiAgICAgICAgLmhlaWdodDtcclxuICAgIHNjcm9sbFRvKHtcclxuICAgICAgICB0b3A6IGNvbnRlbnRzLm9mZnNldFRvcCAtIGhlaWdodCAvIDUsXHJcbiAgICAgICAgbGVmdDogY29udGVudHMub2Zmc2V0TGVmdCAtIHdpZHRoIC8gNSxcclxuICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCdcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0aWNrZXRNb2RhbCgpIHtcclxuICAgIHN1Ym1pdC5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICBsZXQgaW5wdXRzID0gZm9ybS5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCwgc2VsZWN0LCB0ZXh0YXJlYScpOyAvL2dldCBhbGwgaW5wdXRzXHJcbiAgICAgICAgbGV0IGlucHV0Q291bnQgPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGlucHV0IG9mIGlucHV0cykgeyAvL2Rvbid0IGl0ZXJhdGUgdGhyb3VnaCBcImZvcm1cIiAtIHRvbyBtYW55IGVsZW1lbnRzXHJcbiAgICAgICAgICAgIGxldCBsb25nVGl0bGUgPSAoaW5wdXQuaWQgPT09ICd0aXRsZScgJiYgaW5wdXQudmFsdWUubGVuZ3RoID4gMzUpO1xyXG4gICAgICAgICAgICBpZiAoaW5wdXQudmFsdWUgPT09IFwiXCIgfHwgbG9uZ1RpdGxlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobG9uZ1RpdGxlIHx8IGlucHV0LnZhbHVlID09PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQuc3R5bGUuYm9yZGVyQ29sb3IgPSAncmVkJzsgLy9vdXRsaW5lIGVtcHR5IGZpZWxkcyBvciBsb25nIHRpdGxlXHJcbiAgICAgICAgICAgICAgICBpZiAobG9uZ1RpdGxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRvb2x0aXBUeHQgPSB0aXRsZS5wYXJlbnROb2RlLmdldEF0dHJpYnV0ZSgnZGF0YScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LnBhcmVudE5vZGUuc2V0QXR0cmlidXRlKCdkYXRhLXRvb2x0aXAnLCB0b29sdGlwVHh0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dENvdW50Kys7XHJcbiAgICAgICAgICAgICAgICBpbnB1dC5zdHlsZS5ib3JkZXJDb2xvciA9ICcjQ0ZEOERDJztcclxuICAgICAgICAgICAgICAgIGlucHV0LnBhcmVudE5vZGUucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXRvb2x0aXAnKTtcclxuICAgICAgICAgICAgICAgIGlmIChpbnB1dENvdW50ID09PSBpbnB1dHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRpY2tldHNBcnIgPSBbXVxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGlucHV0IG9mIGlucHV0cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmFsID0gaW5wdXQudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC5pZCA9PT0gJ2Rlc2NyaXB0aW9uJyB8fCBpbnB1dC5pZCA9PT0gJ3RpdGxlJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsID0gdmFsLnNsaWNlKDAsIDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRvVXBwZXJDYXNlKCkgKyB2YWwuc2xpY2UoMSwgdmFsLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGlja2V0c0Fyci5wdXNoKHZhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHBvc3RUaWNrZXQobmV3IFRpY2tldCguLi50aWNrZXRzQXJyKSk7IC8vRVM2LCBmb3IgRVM1IC0gbG9vcCB0aHJvdWdoXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW5wdXQgb2YgaW5wdXRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBpbnB1dC52YWx1ZT1cIlwiOyAvL2NsZWFyIG91dCB0aGUgZm9ybVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBiZ01vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgICAgICAgICBwYWdlLmNsYXNzTmFtZSA9ICcnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG5ld1RpY2tldEJ0bi5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgYmdNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XHJcbiAgICAgICAgcGFnZS5jbGFzc05hbWUgPSAnYmx1cidcclxuICAgICAgICBjZW50ZXJNb2RhbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHdpbmRvdy5vbnJlc2l6ZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNlbnRlck1vZGFsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xvc2VCdG4ub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGJnTW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgIHBhZ2UuY2xhc3NOYW1lID0gJyc7XHJcbiAgICB9XHJcblxyXG4gICAgZGVhZGxpbmUub25mb2N1cyA9IGZ1bmN0aW9uKCkgeyAvL2xldCB0aGUgdXNlciBjaG9vc2UgYSBkYXRlIG9uZm9jdXNcclxuICAgICAgICB0aGlzLnR5cGUgPSBcImRhdGVcIjtcclxuICAgIH1cclxuXHJcbiAgICBkZWFkbGluZS5vbmJsdXIgPSBmdW5jdGlvbigpIHsgLy9zaG93IHRoZSBwbGFjZWhvbGRlciBvbmJsdXJcclxuICAgICAgICB0aGlzLnR5cGUgPSBcInRleHRcIjtcclxuICAgIH1cclxufVxyXG4iLCJsZXQgdGFrZUJ0bnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdidG4tdGFrZS10aWNrZXQnKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRpY2tldFRha2VSZXEoKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRha2VCdG5zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdGFrZUJ0bnNbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3NpZ25lZVBhdGNoKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYXNzaWduZWVQYXRjaCgpIHtcclxuICAgIGxldCB0YWtlQnRuID0gdGhpcztcclxuICAgIGxldCBhc3NpZ25lZSA9IGF0b2IobG9jYWxTdG9yYWdlLnVuKTsgLy9kZWNvZGUgZnJvbSBiYXNlNjRcclxuICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgIHhoci5vcGVuKCdQQVRDSCcsICcvdGlja2V0cy8nICsgdGFrZUJ0bi5pZCk7XHJcbiAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcclxuICAgIGxldCB1c2VyID0ge1xyXG4gICAgICAgIGFzc2lnbmVlXHJcbiAgICB9O1xyXG4gICAgeGhyLnNlbmQoSlNPTi5zdHJpbmdpZnkodXNlcikpO1xyXG4gICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXR1cyA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgIHRha2VCdG4ub3V0ZXJIVE1MID0gYDxhIGlkPSR7dGFrZUJ0bi5pZH0gaHJlZj1cIiNcIj4gQXNzaWduZWQgdG86ICR7YXNzaWduZWV9IDwvYT5gO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgY29sbGFwc2FibGVzIGZyb20gJy4vY29sbGFwc2FibGVDYXJkcyc7XHJcbmltcG9ydCB0aWNrZXRUYWtlUmVxIGZyb20gJy4vdGlja2V0VGFrZVJlcSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwb3N0VGlja2V0KG9iaikge1xyXG4gICAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgIHhoci5vcGVuKCdQT1NUJywgJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMi90aWNrZXRzJywgdHJ1ZSk7XHJcbiAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcclxuICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdkb2N1bWVudCc7XHJcbiAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIGlmICh0aGlzLnN0YXR1cyA9PSAyMDApIHtcclxuICAgICAgICAgICAgICBsZXQgdGlja2V0cyA9IHRoaXMucmVzcG9uc2U7XHJcbiAgICAgICAgICAgICAgZG9jdW1lbnRcclxuICAgICAgICAgICAgICAgICAgLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3RpY2tldHMtZGlzcGxheScpWzBdXHJcbiAgICAgICAgICAgICAgICAgIC5pbm5lckhUTUwgPSB0aWNrZXRzXHJcbiAgICAgICAgICAgICAgICAgIC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd0aWNrZXRzLWRpc3BsYXknKVswXVxyXG4gICAgICAgICAgICAgICAgICAuaW5uZXJIVE1MOyAvL3RoaXMgY2h1bmsgb2YgZG9tIGlzIGdlbmVyYXRlZCBhZnRlciB0aGUgc2NyaXB0cyBhcmUgYWRkZWRcclxuICAgICAgICAgICAgICAgICAgY29sbGFwc2FibGVzKCk7IC8vc28gdGhlIGVhcmxpZXIgc2NyaXB0cyB3b24ndCB3b3JrXHJcbiAgICAgICAgICAgICAgICAgIHRpY2tldFRha2VSZXEoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICB4aHIuc2VuZChKU09OLnN0cmluZ2lmeShvYmopKTtcclxuICB9XHJcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHV0aWxpdGllcygpIHtcclxuICAgIGxldCBhY2NvdW50TmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJmdWxsbmFtZVwiKVswXTtcclxuICAgIGxldCBzaWduT3V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInNpZ25vdXRcIilbMF07XHJcbiAgICBhY2NvdW50TmFtZS5pbm5lckhUTUwgPSBhdG9iKGxvY2FsU3RvcmFnZS51bikgfHwgJyc7IC8vZGVjb2RlIGZyb20gYmFzZTY0XHJcbiAgICBzaWduT3V0Lm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcclxuICAgICAgICBzZXNzaW9uU3RvcmFnZS5jbGVhcigpO1xyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=