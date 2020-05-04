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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/client/js/home.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/client/js/Modals.ts":
/*!*********************************!*\
  !*** ./src/client/js/Modals.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ticketClass_ts_1 = __importDefault(__webpack_require__(/*! ./ticketClass.ts */ "./src/client/js/ticketClass.ts"));
const cardTicketsContent_ts_1 = __importDefault(__webpack_require__(/*! ./cardTicketsContent.ts */ "./src/client/js/cardTicketsContent.ts"));
const fetchData_ts_1 = __importDefault(__webpack_require__(/*! ./fetchData.ts */ "./src/client/js/fetchData.ts"));
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
                        fetchData_ts_1.default(new ticketClass_ts_1.default(...ticketsArr), 'POST', '/tickets', postTicketClose);
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
            let action = bgModal.querySelector('input[name=close]:checked').id;
            fetchData_ts_1.default({ action, ticketId }, 'PATCH', '/tickets/close', postTicketClose);
            bgModal.style.display = "none";
            page.className = '';
        }
    }
    bgModal.style.display = "flex";
    page.className = 'blur';
    centerModal(bgModal);
    window.onresize = function () {
        centerModal(bgModal);
    };
    let closeBtn = bgModal.querySelector('.close-bg-modal');
    closeBtn.onclick = function () {
        bgModal.style.display = "none";
        page.className = '';
    };
    function centerModal(bgMod) {
        if (bgMod) {
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
}
function postTicketClose(res) {
    if (res.status === 200) {
        Promise.resolve(res.text()).then((data) => {
            let parser = new DOMParser();
            let parsed = parser.parseFromString(data, 'text/html'); //TYPE???
            cardTicketsContent_ts_1.default(parsed);
        });
    }
}


/***/ }),

/***/ "./src/client/js/cardTicketsContent.ts":
/*!*********************************************!*\
  !*** ./src/client/js/cardTicketsContent.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const collapsableCards_ts_1 = __importDefault(__webpack_require__(/*! ./collapsableCards.ts */ "./src/client/js/collapsableCards.ts"));
const ticketTake_ts_1 = __importDefault(__webpack_require__(/*! ./ticketTake.ts */ "./src/client/js/ticketTake.ts"));
const Modals_ts_1 = __importDefault(__webpack_require__(/*! ./Modals.ts */ "./src/client/js/Modals.ts"));
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
    ticketTake_ts_1.default();
    Modals_ts_1.default();
}
exports.default = cardTicketsContent;


/***/ }),

/***/ "./src/client/js/collapsableCards.ts":
/*!*******************************************!*\
  !*** ./src/client/js/collapsableCards.ts ***!
  \*******************************************/
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

/***/ "./src/client/js/dropdowns.ts":
/*!************************************!*\
  !*** ./src/client/js/dropdowns.ts ***!
  \************************************/
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

/***/ "./src/client/js/fetchData.ts":
/*!************************************!*\
  !*** ./src/client/js/fetchData.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function fetchData(data, method, route, success) {
    fetch(route, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((res) => {
        success(res);
    })
        .catch((error) => {
        console.log(error);
    });
}
exports.default = fetchData;


/***/ }),

/***/ "./src/client/js/home.ts":
/*!*******************************!*\
  !*** ./src/client/js/home.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dropdowns_ts_1 = __importDefault(__webpack_require__(/*! ./dropdowns.ts */ "./src/client/js/dropdowns.ts"));
const utilitiesHome_ts_1 = __importDefault(__webpack_require__(/*! ./utilitiesHome.ts */ "./src/client/js/utilitiesHome.ts"));
const ticketStatus_ts_1 = __importDefault(__webpack_require__(/*! ./ticketStatus.ts */ "./src/client/js/ticketStatus.ts"));
const collapsableCards_ts_1 = __importDefault(__webpack_require__(/*! ./collapsableCards.ts */ "./src/client/js/collapsableCards.ts"));
const ticketTake_ts_1 = __importDefault(__webpack_require__(/*! ./ticketTake.ts */ "./src/client/js/ticketTake.ts"));
const Modals_ts_1 = __importDefault(__webpack_require__(/*! ./Modals.ts */ "./src/client/js/Modals.ts"));
dropdowns_ts_1.default();
utilitiesHome_ts_1.default();
ticketStatus_ts_1.default();
Modals_ts_1.default();
collapsableCards_ts_1.default();
ticketTake_ts_1.default();


/***/ }),

/***/ "./src/client/js/ticketClass.ts":
/*!**************************************!*\
  !*** ./src/client/js/ticketClass.ts ***!
  \**************************************/
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

/***/ "./src/client/js/ticketStatus.ts":
/*!***************************************!*\
  !*** ./src/client/js/ticketStatus.ts ***!
  \***************************************/
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

/***/ "./src/client/js/ticketTake.ts":
/*!*************************************!*\
  !*** ./src/client/js/ticketTake.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Modals_ts_1 = __importDefault(__webpack_require__(/*! ./Modals.ts */ "./src/client/js/Modals.ts"));
const fetchData_ts_1 = __importDefault(__webpack_require__(/*! ./fetchData.ts */ "./src/client/js/fetchData.ts"));
let takeBtns = document.getElementsByClassName('btn-take-ticket');
let takeBtn;
function ticketTake() {
    for (let i = 0; i < takeBtns.length; i++) {
        takeBtns[i].addEventListener('click', () => {
            takeBtn = takeBtns[i];
            fetchData_ts_1.default({}, 'PATCH', '/tickets/' + takeBtn.id, assigneePatch);
        });
    }
    function assigneePatch(res) {
        console.log('ENTERED');
        if (res.status === 200) {
            takeBtn.innerHTML = 'Close';
            takeBtn.classList.toggle('btn-close-ticket');
            takeBtn.classList.toggle('btn-take-ticket');
            Modals_ts_1.default();
        }
    }
}
exports.default = ticketTake;


/***/ }),

/***/ "./src/client/js/utilitiesHome.ts":
/*!****************************************!*\
  !*** ./src/client/js/utilitiesHome.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function utilities() {
    let accountName = document.querySelector('.fullname');
    let signOut = document.querySelector('.signout');
    accountName.innerHTML = localStorage.un || ''; //decode from base64
    signOut.onclick = function () {
        localStorage.clear();
        sessionStorage.clear();
    };
}
exports.default = utilities;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC9qcy9Nb2RhbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC9qcy9jYXJkVGlja2V0c0NvbnRlbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC9qcy9jb2xsYXBzYWJsZUNhcmRzLnRzIiwid2VicGFjazovLy8uL3NyYy9jbGllbnQvanMvZHJvcGRvd25zLnRzIiwid2VicGFjazovLy8uL3NyYy9jbGllbnQvanMvZmV0Y2hEYXRhLnRzIiwid2VicGFjazovLy8uL3NyYy9jbGllbnQvanMvaG9tZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L2pzL3RpY2tldENsYXNzLnRzIiwid2VicGFjazovLy8uL3NyYy9jbGllbnQvanMvdGlja2V0U3RhdHVzLnRzIiwid2VicGFjazovLy8uL3NyYy9jbGllbnQvanMvdGlja2V0VGFrZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L2pzL3V0aWxpdGllc0hvbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIs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QUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QixzQkFBUyxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsV0FBVyxHQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDcEUsQ0FBQyxDQUFDO0tBQ0w7SUFDRCxTQUFTLGFBQWEsQ0FBQyxHQUFRO1FBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDO1FBQ2hCLElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7WUFDUixPQUFRLENBQUMsU0FBUyxHQUFDLE9BQU8sQ0FBQztZQUMzQixPQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQzlDLE9BQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDM0QsbUJBQU0sRUFBRSxDQUFDO1NBQ1Y7SUFDTCxDQUFDO0FBQ0wsQ0FBQztBQWhCRCw2QkFnQkM7Ozs7Ozs7Ozs7Ozs7OztBQ3RCRCxTQUF3QixTQUFTO0lBQzdCLElBQUksV0FBVyxHQUFnQixRQUFRLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ25FLElBQUksT0FBTyxHQUFpQixRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQy9ELFdBQVcsQ0FBQyxTQUFTLEdBQUcsWUFBWSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxvQkFBb0I7SUFDbkUsT0FBTyxDQUFDLE9BQU8sR0FBRztRQUNkLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNyQixjQUFjLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDM0IsQ0FBQztBQUNMLENBQUM7QUFSRCw0QkFRQyIsImZpbGUiOiJidW5kbGUtaG9tZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2NsaWVudC9qcy9ob21lLnRzXCIpO1xuIiwiaW1wb3J0IFRpY2tldCBmcm9tICcuL3RpY2tldENsYXNzLnRzJztcclxuaW1wb3J0IGNhcmRUaWNrZXRzQ29udGVudCBmcm9tICcuL2NhcmRUaWNrZXRzQ29udGVudC50cyc7XHJcbmltcG9ydCBmZXRjaERhdGEgZnJvbSAnLi9mZXRjaERhdGEudHMnO1xyXG5cclxubGV0IG5ld1RpY2tldEJ0bjogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmV3LXRpY2tldCcpO1xyXG5sZXQgY2xvc2VUaWNrZXRCdG46IEhUTUxDb2xsZWN0aW9uT2Y8RWxlbWVudD4gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdidG4tY2xvc2UtdGlja2V0Jyk7XHJcbmxldCBwYWdlOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNob3dNb2RhbHMoKSB7XHJcbiAgICBuZXdUaWNrZXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzaG93QmdNb2RhbCk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNsb3NlVGlja2V0QnRuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY2xvc2VUaWNrZXRCdG5baV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzaG93QmdNb2RhbCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dCZ01vZGFsKGUpIHtcclxuICAgIGxldCBiZ01vZGFsOiBIVE1MRWxlbWVudDtcclxuICAgIGlmIChlLmN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCduZXctdGlja2V0JykpIHtcclxuICAgICAgICBiZ01vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJnLW1vZGFsJyk7XHJcbiAgICAgICAgbGV0IGZvcm06IEhUTUxGb3JtRWxlbWVudCA9IGJnTW9kYWwucXVlcnlTZWxlY3RvcignLnRpY2tldC1mb3JtJyk7XHJcbiAgICAgICAgbGV0IGRlYWRsaW5lOiBIVE1MSW5wdXRFbGVtZW50ID0gZm9ybS5kZWFkbGluZTtcclxuICAgICAgICBkZWFkbGluZS5vbmZvY3VzID0gZnVuY3Rpb24oZTogRXZlbnQpIHsgLy9sZXQgdGhlIHVzZXIgY2hvb3NlIGEgZGF0ZSBvbmZvY3VzXHJcbiAgICAgICAgICAgICg8SFRNTElucHV0RWxlbWVudD5lLmN1cnJlbnRUYXJnZXQpLnR5cGUgPSBcImRhdGVcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRlYWRsaW5lLm9uYmx1ciA9IGZ1bmN0aW9uKGU6IEV2ZW50KSB7IC8vc2hvdyB0aGUgcGxhY2Vob2xkZXIgb25ibHVyXHJcbiAgICAgICAgICAgKDxIVE1MSW5wdXRFbGVtZW50PmUuY3VycmVudFRhcmdldCkudHlwZSA9IFwidGV4dFwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHN1Ym1pdDogSFRNTEVsZW1lbnQgPSBiZ01vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5zdWJtaXQtdGlja2V0Jyk7XHJcbiAgICAgICAgc3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3VibWl0VGlja2V0KTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc3VibWl0VGlja2V0KCkge1xyXG4gICAgICAgICAgICBsZXQgaW5wdXRzOiBOb2RlTGlzdE9mPEVsZW1lbnQ+ID0gZm9ybS5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCwgc2VsZWN0LCB0ZXh0YXJlYScpOyAvL2dldCBhbGwgaW5wdXRzXHJcbiAgICAgICAgICAgIGxldCBpbnB1dENvdW50OiBudW1iZXIgPSAwO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbnB1dCBvZiBpbnB1dHMpIHtcclxuICAgICAgICAgICAgICAgIGlmICgoPEhUTUxJbnB1dEVsZW1lbnQ+aW5wdXQpLnZhbGlkYXRpb25NZXNzYWdlICE9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgICg8SFRNTElucHV0RWxlbWVudD5pbnB1dCkuc3R5bGUuYm9yZGVyQ29sb3IgPSAncmVkJzsgLy9vdXRsaW5lIGVtcHR5IGZpZWxkcyBvciBsb25nIHRpdGxlXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCg8SFRNTElucHV0RWxlbWVudD5pbnB1dCkubmFtZSA9PT0gJ3RpdGxlJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdG9vbHRpcFR4dCA9ICg8SFRNTElucHV0RWxlbWVudD5pbnB1dC5wYXJlbnROb2RlKS5nZXRBdHRyaWJ1dGUoJ2RhdGEnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgKDxIVE1MSW5wdXRFbGVtZW50PmlucHV0LnBhcmVudE5vZGUpLnNldEF0dHJpYnV0ZSgnZGF0YS10b29sdGlwJywgdG9vbHRpcFR4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dENvdW50Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgKDxIVE1MSW5wdXRFbGVtZW50PmlucHV0KS5zdHlsZS5ib3JkZXJDb2xvciA9ICcjQ0ZEOERDJztcclxuICAgICAgICAgICAgICAgICAgICAoPEhUTUxJbnB1dEVsZW1lbnQ+aW5wdXQucGFyZW50Tm9kZSkucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXRvb2x0aXAnKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXRDb3VudCA9PT0gaW5wdXRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGlja2V0c0FyciA9IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGlucHV0IG9mIGlucHV0cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhbCA9ICg8SFRNTElucHV0RWxlbWVudD5pbnB1dCkudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKDxIVE1MSW5wdXRFbGVtZW50PmlucHV0KS5uYW1lID09PSAnZGVzY3JpcHRpb24nIHx8ICg8SFRNTElucHV0RWxlbWVudD5pbnB1dCkubmFtZSA9PT0gJ3RpdGxlJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbCA9IHZhbC5zbGljZSgwLCAxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudG9VcHBlckNhc2UoKSArIHZhbC5zbGljZSgxLCB2YWwubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpY2tldHNBcnIucHVzaCh2YWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZldGNoRGF0YShuZXcgVGlja2V0KC4uLnRpY2tldHNBcnIpLCAnUE9TVCcsICcvdGlja2V0cycsIHBvc3RUaWNrZXRDbG9zZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0ucmVzZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmdNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2UuY2xhc3NOYW1lID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKGUuY3VycmVudFRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2J0bi1jbG9zZS10aWNrZXQnKSkge1xyXG4gICAgICAgIGJnTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2xvc2UtdGlja2V0LW1vZGFsJyk7XHJcbiAgICAgICAgbGV0IHN1Ym1pdDogSFRNTEVsZW1lbnQgPSBiZ01vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5jbG9zZS10aWNrZXQnKTtcclxuICAgICAgICBsZXQgdGlja2V0SWQ6IHN0cmluZyA9IGUuY3VycmVudFRhcmdldC5pZDtcclxuICAgICAgICBzdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVRpY2tldCk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNsb3NlVGlja2V0KCkge1xyXG4gICAgICAgICAgICBsZXQgYWN0aW9uOiBzdHJpbmcgPSBiZ01vZGFsLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9Y2xvc2VdOmNoZWNrZWQnKS5pZDtcclxuICAgICAgICAgICAgZmV0Y2hEYXRhKHthY3Rpb24sdGlja2V0SWR9LCAnUEFUQ0gnLCAnL3RpY2tldHMvY2xvc2UnLCBwb3N0VGlja2V0Q2xvc2UpO1xyXG4gICAgICAgICAgICBiZ01vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgcGFnZS5jbGFzc05hbWUgPSAnJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBiZ01vZGFsLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcclxuICAgIHBhZ2UuY2xhc3NOYW1lID0gJ2JsdXInXHJcbiAgICBjZW50ZXJNb2RhbChiZ01vZGFsKTtcclxuXHJcbiAgICB3aW5kb3cub25yZXNpemUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBjZW50ZXJNb2RhbChiZ01vZGFsKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgY2xvc2VCdG46IEhUTUxFbGVtZW50ID0gYmdNb2RhbC5xdWVyeVNlbGVjdG9yKCcuY2xvc2UtYmctbW9kYWwnKTtcclxuICAgIGNsb3NlQnRuLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBiZ01vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICBwYWdlLmNsYXNzTmFtZSA9ICcnO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNlbnRlck1vZGFsKGJnTW9kKTogYW55IHtcclxuICAgICAgICBpZihiZ01vZCkge1xyXG4gICAgICAgIGxldCBjb250ZW50czogSFRNTEVsZW1lbnQgPSBiZ01vZC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtY29udGVudHMnKTtcclxuICAgICAgICBsZXQgd2lkdGg6IG51bWJlciA9IGNvbnRlbnRzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xyXG4gICAgICAgIGxldCBoZWlnaHQ6IG51bWJlciA9IGNvbnRlbnRzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcclxuICAgICAgICBzY3JvbGxUbyh7XHJcbiAgICAgICAgICAgIHRvcDogY29udGVudHMub2Zmc2V0VG9wIC0gaGVpZ2h0IC8gNSxcclxuICAgICAgICAgICAgbGVmdDogY29udGVudHMub2Zmc2V0TGVmdCAtIHdpZHRoIC8gNSxcclxuICAgICAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcG9zdFRpY2tldENsb3NlKHJlczphbnkpOiB2b2lkIHtcclxuICBpZiAocmVzLnN0YXR1cyA9PT0gMjAwKSB7XHJcbiAgICBQcm9taXNlLnJlc29sdmUocmVzLnRleHQoKSkudGhlbigoZGF0YSk9PntcclxuICAgICAgbGV0IHBhcnNlcjogRE9NUGFyc2VyID0gbmV3IERPTVBhcnNlcigpO1xyXG4gICAgICBsZXQgcGFyc2VkOiBhbnkgPSBwYXJzZXIucGFyc2VGcm9tU3RyaW5nKGRhdGEsICd0ZXh0L2h0bWwnKTsgLy9UWVBFPz8/XHJcbiAgICAgIGNhcmRUaWNrZXRzQ29udGVudChwYXJzZWQpfSlcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IGNvbGxhcHNhYmxlcyBmcm9tICcuL2NvbGxhcHNhYmxlQ2FyZHMudHMnO1xyXG5pbXBvcnQgdGlja2V0VGFrZSBmcm9tICcuL3RpY2tldFRha2UudHMnO1xyXG5pbXBvcnQgbW9kYWxzIGZyb20gJy4vTW9kYWxzLnRzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNhcmRUaWNrZXRzQ29udGVudCh0aWNrZXRzOiBIVE1MRWxlbWVudCk6IHZvaWQge1xyXG4gIGlmICghdGlja2V0cykge1xyXG4gICAgICByZXR1cm47XHJcbiAgfVxyXG4gIGRvY3VtZW50XHJcbiAgICAgIC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd0aWNrZXRzLWRpc3BsYXknKVswXVxyXG4gICAgICAuaW5uZXJIVE1MID0gdGlja2V0c1xyXG4gICAgICAuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndGlja2V0cy1kaXNwbGF5JylbMF1cclxuICAgICAgLmlubmVySFRNTDsgLy90aGlzIGNodW5rIG9mIGRvbSBpcyBnZW5lcmF0ZWQgYWZ0ZXIgdGhlIHNjcmlwdHMgYXJlIGFkZGVkXHJcblxyXG4gICAgICBjb2xsYXBzYWJsZXMoKTtcclxuICAgICAgdGlja2V0VGFrZSgpO1xyXG4gICAgICBtb2RhbHMoKTtcclxufVxyXG4iLCJsZXQgaGVhZGVyOiBIVE1MQ29sbGVjdGlvbk9mPEVsZW1lbnQ+ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImQtYmxvY2tcIik7XHJcbmxldCBjYXJkQm9keTogTm9kZUxpc3RPZjxIVE1MRWxlbWVudD4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY29sbGFwc2UsIC5zaG93Jyk7XHJcbmxldCB0YWtlQnRuOiBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5idG4tdGFrZS10aWNrZXQnKTtcclxuXHJcbmZ1bmN0aW9uIHNob3dIaWRlKGVsOiBIVE1MRWxlbWVudCk6IHZvaWQge1xyXG4gICAgaWYgKGVsLnN0eWxlLmhlaWdodCAhPT0gJzBweCcpIHtcclxuICAgICAgICBlbC5zdHlsZS5oZWlnaHQgPSAnMHB4JztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7IC8vIE1ha2UgaXQgdmlzaWJsZVxyXG4gICAgICAgIGVsLnN0eWxlLmhlaWdodCA9IGVsLnNjcm9sbEhlaWdodCArICdweCc7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZpeEhlaWdodChlbDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcclxuICAgIGlmIChlbC5zdHlsZS5oZWlnaHQgIT09ICcwcHgnKSB7XHJcbiAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gZWwuc2Nyb2xsSGVpZ2h0ICsgJ3B4JztcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29sbGFwc2FibGVzKCkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoZWFkZXIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaGVhZGVyW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlOiBNb3VzZUV2ZW50KSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgKDxIVE1MTGlua0VsZW1lbnQ+ZS5jdXJyZW50VGFyZ2V0KS5jbGFzc0xpc3QudG9nZ2xlKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICBsZXQgcGFuZWw6IGFueSA9ICg8SFRNTExpbmtFbGVtZW50PmUuY3VycmVudFRhcmdldCkubmV4dEVsZW1lbnRTaWJsaW5nOyAvL1RZUEU/P1xyXG4gICAgICAgICAgICBmaXhIZWlnaHQocGFuZWwpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhwYW5lbClcclxuICAgICAgICAgICAgc2V0VGltZW91dChzaG93SGlkZSwgMCwgcGFuZWwpOyAvL3Nob3dIaWRlIG11c3QgZXhlY3V0ZSBhZnRlciBmaXhIZWlnaHRcclxuICAgICAgICB9KTsgLy9vdGhlcndpc2UgaGVpZ2h0IHdvbid0IGhhdmUgYSBwaXhlbCB2YWx1ZSwgYW5kIHRoZSB0cmFuc2l0aW9uIHdvdWxkbnQgb2NjdXJcclxuICAgIH1cclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNhcmRCb2R5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChjYXJkQm9keVtpXS5zdHlsZS5oZWlnaHQgIT09ICcwcHgnKVxyXG4gICAgICAgICAgICAgICAgY2FyZEJvZHlbaV0uc3R5bGUuaGVpZ2h0ID0gJ2F1dG8nO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcbiIsImxldCBkcm9wRG93bnM6IE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm5hdi1saW5rJyk7XHJcbmxldCBuYXZiYXJTaWRlOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXZiYXItbmF2Jyk7XHJcbmxldCBwYWdlVG9wQnRuOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzaWRlYmFyVG9nZ2xlVG9wJyk7XHJcbmxldCBwYWdlVG9wOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwYWdlLXRvcCcpO1xyXG5cclxuZm9yIChsZXQgaSA9IDA7IGkgPCBkcm9wRG93bnMubGVuZ3RoOyBpKyspIHtcclxuICAgIGRyb3BEb3duc1tpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNob3dUb2dnbGUpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dUb2dnbGUoZSk6dm9pZCB7XHJcbiAgICBsZXQgZWw6IEhUTUxFbGVtZW50ID0gKDxIVE1MRWxlbWVudD5lLmN1cnJlbnRUYXJnZXQpO1xyXG4gICAgZWwuY2xhc3NMaXN0LnRvZ2dsZShcInNob3dcIik7XHJcbiAgICBpZiAoZWwubmV4dEVsZW1lbnRTaWJsaW5nKSB7XHJcbiAgICAgICAgZWwubmV4dEVsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdC50b2dnbGUoXCJzaG93XCIpO1xyXG4gICAgfVxyXG4gICAgZWxbXCJhcmlhLWV4cGFuZGVkXCJdID0gIWVsW1wiYXJpYS1leHBhbmRlZFwiXVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkcm9wZG93bnMoKSB7XHJcbiAgICBwYWdlVG9wQnRuLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBwYWdlVG9wLmNsYXNzTGlzdC50b2dnbGUoJ3NpZGViYXItdG9nZ2xlZCcpO1xyXG4gICAgICAgIG5hdmJhclNpZGUuY2xhc3NMaXN0LnRvZ2dsZSgndG9nZ2xlZCcpO1xyXG4gICAgfVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZldGNoRGF0YShkYXRhOiBhbnksIG1ldGhvZDogc3RyaW5nLCByb3V0ZTogc3RyaW5nLCBzdWNjZXNzOiBGdW5jdGlvbikge1xyXG4gICAgZmV0Y2gocm91dGUsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiBtZXRob2QsIC8vIG9yICdQVVQnXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgICAgICBzdWNjZXNzKHJlcylcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG59XHJcbiIsImltcG9ydCBkcm9wZG93bnMgZnJvbSAnLi9kcm9wZG93bnMudHMnO1xyXG5pbXBvcnQgdXRpbGl0aWVzIGZyb20gJy4vdXRpbGl0aWVzSG9tZS50cyc7XHJcbmltcG9ydCB0aWNrZXRTdGF0dXMgZnJvbSAnLi90aWNrZXRTdGF0dXMudHMnO1xyXG5pbXBvcnQgY29sbGFwc2FibGVzIGZyb20gJy4vY29sbGFwc2FibGVDYXJkcy50cyc7XHJcbmltcG9ydCB0aWNrZXRUYWtlIGZyb20gJy4vdGlja2V0VGFrZS50cyc7XHJcbmltcG9ydCBtb2RhbHMgZnJvbSAnLi9Nb2RhbHMudHMnO1xyXG5cclxuZHJvcGRvd25zKCk7XHJcbnV0aWxpdGllcygpO1xyXG50aWNrZXRTdGF0dXMoKTtcclxubW9kYWxzKCk7XHJcbmNvbGxhcHNhYmxlcygpO1xyXG50aWNrZXRUYWtlKCk7XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpY2tldHtcclxuICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICBkZXBhcnRtZW50OiBzdHJpbmc7XHJcbiAgICBwcmlvcml0eTogc3RyaW5nO1xyXG4gICAgZGVhZGxpbmU6IERhdGU7XHJcbiAgICBkZXNjcmlwdGlvbjpzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IodGl0bGU/OiBzdHJpbmcsIGRlcGFydG1lbnQ/OiBzdHJpbmcsIHByaW9yaXR5PzpzdHJpbmcsIGRlYWRsaW5lPzogRGF0ZSwgZGVzY3JpcHRpb24/OnN0cmluZykge1xyXG4gICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XHJcbiAgICAgIHRoaXMuZGVwYXJ0bWVudCA9IGRlcGFydG1lbnQ7XHJcbiAgICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcclxuICAgICAgdGhpcy5kZWFkbGluZSA9IGRlYWRsaW5lO1xyXG4gICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XHJcbiAgICB9XHJcbiAgfVxyXG4iLCJsZXQgc3RhdHVzU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50aWNrZXQtc3RhdHVzJyk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0aWNrZXRTdGF0dXMoKSB7XHJcbiAgc3RhdHVzU2VjdGlvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZnVuY3Rpb24oZTogTW91c2VFdmVudCl7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBsb2NhdGlvbi5zZWFyY2g9Jz9zdGF0dXM9JysoPEhUTUxFbGVtZW50PmUudGFyZ2V0KS5jbGFzc0xpc3QudmFsdWU7XHJcbiAgfSlcclxufVxyXG4iLCJpbXBvcnQgbW9kYWxzIGZyb20gJy4vTW9kYWxzLnRzJztcclxuaW1wb3J0IGZldGNoRGF0YSBmcm9tICcuL2ZldGNoRGF0YS50cyc7XHJcblxyXG5sZXQgdGFrZUJ0bnM6IEhUTUxDb2xsZWN0aW9uT2Y8RWxlbWVudD4gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdidG4tdGFrZS10aWNrZXQnKTtcclxubGV0IHRha2VCdG46IEVsZW1lbnQ7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0aWNrZXRUYWtlKCkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0YWtlQnRucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHRha2VCdG5zW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PntcclxuICAgICAgICAgIHRha2VCdG4gPSB0YWtlQnRuc1tpXTtcclxuICAgICAgICAgIGZldGNoRGF0YSh7fSwgJ1BBVENIJywgJy90aWNrZXRzLycrdGFrZUJ0bi5pZCwgYXNzaWduZWVQYXRjaCk7XHJcbiAgICB9KVxyXG59XHJcbmZ1bmN0aW9uIGFzc2lnbmVlUGF0Y2gocmVzOiBhbnkpOiB2b2lkIHtcclxuICBjb25zb2xlLmxvZygnRU5URVJFRCcpXHJcbiAgICAgICAgaWYgKHJlcy5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICAgICAgKDxIVE1MRWxlbWVudD50YWtlQnRuKS5pbm5lckhUTUw9J0Nsb3NlJztcclxuICAgICAgICAgICg8SFRNTEVsZW1lbnQ+dGFrZUJ0bikuY2xhc3NMaXN0LnRvZ2dsZSgnYnRuLWNsb3NlLXRpY2tldCcpO1xyXG4gICAgICAgICAgKDxIVE1MRWxlbWVudD50YWtlQnRuKS5jbGFzc0xpc3QudG9nZ2xlKCdidG4tdGFrZS10aWNrZXQnKTtcclxuICAgICAgICAgIG1vZGFscygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1dGlsaXRpZXMoKSB7XHJcbiAgICBsZXQgYWNjb3VudE5hbWU6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZ1bGxuYW1lJyk7XHJcbiAgICBsZXQgc2lnbk91dDogSFRNTEVsZW1lbnQgPSAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZ25vdXQnKTtcclxuICAgIGFjY291bnROYW1lLmlubmVySFRNTCA9IGxvY2FsU3RvcmFnZS51biB8fCAnJzsgLy9kZWNvZGUgZnJvbSBiYXNlNjRcclxuICAgIHNpZ25PdXQub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xyXG4gICAgICAgIHNlc3Npb25TdG9yYWdlLmNsZWFyKCk7XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==