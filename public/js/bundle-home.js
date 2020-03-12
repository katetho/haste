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
const cardTicketsContent_ts_1 = __webpack_require__(/*! ./cardTicketsContent.ts */ "./src/js/cardTicketsContent.ts");
const fetchData_ts_1 = __webpack_require__(/*! ./fetchData.ts */ "./src/js/fetchData.ts");
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

/***/ "./src/js/cardTicketsContent.ts":
/*!**************************************!*\
  !*** ./src/js/cardTicketsContent.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const collapsableCards_ts_1 = __webpack_require__(/*! ./collapsableCards.ts */ "./src/js/collapsableCards.ts");
const ticketTake_ts_1 = __webpack_require__(/*! ./ticketTake.ts */ "./src/js/ticketTake.ts");
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
    ticketTake_ts_1.default();
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

/***/ "./src/js/fetchData.ts":
/*!*****************************!*\
  !*** ./src/js/fetchData.ts ***!
  \*****************************/
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
const ticketTake_ts_1 = __webpack_require__(/*! ./ticketTake.ts */ "./src/js/ticketTake.ts");
const Modals_ts_1 = __webpack_require__(/*! ./Modals.ts */ "./src/js/Modals.ts");
dropdowns_ts_1.default();
utilitiesHome_ts_1.default();
ticketStatus_ts_1.default();
Modals_ts_1.default();
collapsableCards_ts_1.default();
ticketTake_ts_1.default();


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

/***/ "./src/js/ticketTake.ts":
/*!******************************!*\
  !*** ./src/js/ticketTake.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Modals_ts_1 = __webpack_require__(/*! ./Modals.ts */ "./src/js/Modals.ts");
const fetchData_ts_1 = __webpack_require__(/*! ./fetchData.ts */ "./src/js/fetchData.ts");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL01vZGFscy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY2FyZFRpY2tldHNDb250ZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb2xsYXBzYWJsZUNhcmRzLnRzIiwid2VicGFjazovLy8uL3NyYy9qcy9kcm9wZG93bnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2ZldGNoRGF0YS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvaG9tZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdGlja2V0Q2xhc3MudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3RpY2tldFN0YXR1cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdGlja2V0VGFrZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbGl0aWVzSG9tZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStE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QUFDLEVBQUUsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUNwRSxDQUFDLENBQUM7S0FDTDtJQUNELFNBQVMsYUFBYSxDQUFDLEdBQVE7UUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUM7UUFDaEIsSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtZQUNSLE9BQVEsQ0FBQyxTQUFTLEdBQUMsT0FBTyxDQUFDO1lBQzNCLE9BQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDOUMsT0FBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUMzRCxtQkFBTSxFQUFFLENBQUM7U0FDVjtJQUNMLENBQUM7QUFDTCxDQUFDO0FBaEJELDZCQWdCQzs7Ozs7Ozs7Ozs7Ozs7O0FDdEJELFNBQXdCLFNBQVM7SUFDN0IsSUFBSSxXQUFXLEdBQWdCLFFBQVEsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDbkUsSUFBSSxPQUFPLEdBQWlCLFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDL0QsV0FBVyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLG9CQUFvQjtJQUN6RSxPQUFPLENBQUMsT0FBTyxHQUFHO1FBQ2QsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3JCLGNBQWMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUMzQixDQUFDO0FBQ0wsQ0FBQztBQVJELDRCQVFDIiwiZmlsZSI6ImJ1bmRsZS1ob21lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvanMvaG9tZS50c1wiKTtcbiIsImltcG9ydCBUaWNrZXQgZnJvbSAnLi90aWNrZXRDbGFzcy50cyc7XHJcbmltcG9ydCBjYXJkVGlja2V0c0NvbnRlbnQgZnJvbSAnLi9jYXJkVGlja2V0c0NvbnRlbnQudHMnO1xyXG5pbXBvcnQgZmV0Y2hEYXRhIGZyb20gJy4vZmV0Y2hEYXRhLnRzJztcclxuXHJcbmxldCBuZXdUaWNrZXRCdG46IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5ldy10aWNrZXQnKTtcclxubGV0IGNsb3NlVGlja2V0QnRuOiBIVE1MQ29sbGVjdGlvbk9mPEVsZW1lbnQ+ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYnRuLWNsb3NlLXRpY2tldCcpO1xyXG5sZXQgcGFnZTogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluJyk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzaG93TW9kYWxzKCkge1xyXG4gICAgbmV3VGlja2V0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2hvd0JnTW9kYWwpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjbG9zZVRpY2tldEJ0bi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNsb3NlVGlja2V0QnRuW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2hvd0JnTW9kYWwpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93QmdNb2RhbChlKSB7XHJcbiAgICBsZXQgYmdNb2RhbDogSFRNTEVsZW1lbnQ7XHJcbiAgICBpZiAoZS5jdXJyZW50VGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbmV3LXRpY2tldCcpKSB7XHJcbiAgICAgICAgYmdNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iZy1tb2RhbCcpO1xyXG4gICAgICAgIGxldCBmb3JtOiBIVE1MRm9ybUVsZW1lbnQgPSBiZ01vZGFsLnF1ZXJ5U2VsZWN0b3IoJy50aWNrZXQtZm9ybScpO1xyXG4gICAgICAgIGxldCBkZWFkbGluZTogSFRNTElucHV0RWxlbWVudCA9IGZvcm0uZGVhZGxpbmU7XHJcbiAgICAgICAgZGVhZGxpbmUub25mb2N1cyA9IGZ1bmN0aW9uKGU6IEV2ZW50KSB7IC8vbGV0IHRoZSB1c2VyIGNob29zZSBhIGRhdGUgb25mb2N1c1xyXG4gICAgICAgICAgICAoPEhUTUxJbnB1dEVsZW1lbnQ+ZS5jdXJyZW50VGFyZ2V0KS50eXBlID0gXCJkYXRlXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkZWFkbGluZS5vbmJsdXIgPSBmdW5jdGlvbihlOiBFdmVudCkgeyAvL3Nob3cgdGhlIHBsYWNlaG9sZGVyIG9uYmx1clxyXG4gICAgICAgICAgICg8SFRNTElucHV0RWxlbWVudD5lLmN1cnJlbnRUYXJnZXQpLnR5cGUgPSBcInRleHRcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBzdWJtaXQ6IEhUTUxFbGVtZW50ID0gYmdNb2RhbC5xdWVyeVNlbGVjdG9yKCcuc3VibWl0LXRpY2tldCcpO1xyXG4gICAgICAgIHN1Ym1pdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN1Ym1pdFRpY2tldCk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHN1Ym1pdFRpY2tldCgpIHtcclxuICAgICAgICAgICAgbGV0IGlucHV0czogTm9kZUxpc3RPZjxFbGVtZW50PiA9IGZvcm0ucXVlcnlTZWxlY3RvckFsbCgnaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWEnKTsgLy9nZXQgYWxsIGlucHV0c1xyXG4gICAgICAgICAgICBsZXQgaW5wdXRDb3VudDogbnVtYmVyID0gMDtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5wdXQgb2YgaW5wdXRzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoKDxIVE1MSW5wdXRFbGVtZW50PmlucHV0KS52YWxpZGF0aW9uTWVzc2FnZSAhPT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICAoPEhUTUxJbnB1dEVsZW1lbnQ+aW5wdXQpLnN0eWxlLmJvcmRlckNvbG9yID0gJ3JlZCc7IC8vb3V0bGluZSBlbXB0eSBmaWVsZHMgb3IgbG9uZyB0aXRsZVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgoPEhUTUxJbnB1dEVsZW1lbnQ+aW5wdXQpLm5hbWUgPT09ICd0aXRsZScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRvb2x0aXBUeHQgPSAoPEhUTUxJbnB1dEVsZW1lbnQ+aW5wdXQucGFyZW50Tm9kZSkuZ2V0QXR0cmlidXRlKCdkYXRhJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICg8SFRNTElucHV0RWxlbWVudD5pbnB1dC5wYXJlbnROb2RlKS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdG9vbHRpcCcsIHRvb2x0aXBUeHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRDb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICg8SFRNTElucHV0RWxlbWVudD5pbnB1dCkuc3R5bGUuYm9yZGVyQ29sb3IgPSAnI0NGRDhEQyc7XHJcbiAgICAgICAgICAgICAgICAgICAgKDxIVE1MSW5wdXRFbGVtZW50PmlucHV0LnBhcmVudE5vZGUpLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS10b29sdGlwJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0Q291bnQgPT09IGlucHV0cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRpY2tldHNBcnIgPSBbXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpbnB1dCBvZiBpbnB1dHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2YWwgPSAoPEhUTUxJbnB1dEVsZW1lbnQ+aW5wdXQpLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCg8SFRNTElucHV0RWxlbWVudD5pbnB1dCkubmFtZSA9PT0gJ2Rlc2NyaXB0aW9uJyB8fCAoPEhUTUxJbnB1dEVsZW1lbnQ+aW5wdXQpLm5hbWUgPT09ICd0aXRsZScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWwgPSB2YWwuc2xpY2UoMCwgMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRvVXBwZXJDYXNlKCkgKyB2YWwuc2xpY2UoMSwgdmFsLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aWNrZXRzQXJyLnB1c2godmFsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmZXRjaERhdGEobmV3IFRpY2tldCguLi50aWNrZXRzQXJyKSwgJ1BPU1QnLCAnL3RpY2tldHMnLCBwb3N0VGlja2V0Q2xvc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtLnJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJnTW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYWdlLmNsYXNzTmFtZSA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChlLmN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdidG4tY2xvc2UtdGlja2V0JykpIHtcclxuICAgICAgICBiZ01vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNsb3NlLXRpY2tldC1tb2RhbCcpO1xyXG4gICAgICAgIGxldCBzdWJtaXQ6IEhUTUxFbGVtZW50ID0gYmdNb2RhbC5xdWVyeVNlbGVjdG9yKCcuY2xvc2UtdGlja2V0Jyk7XHJcbiAgICAgICAgbGV0IHRpY2tldElkOiBzdHJpbmcgPSBlLmN1cnJlbnRUYXJnZXQuaWQ7XHJcbiAgICAgICAgc3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VUaWNrZXQpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBjbG9zZVRpY2tldCgpIHtcclxuICAgICAgICAgICAgbGV0IGFjdGlvbjogc3RyaW5nID0gYmdNb2RhbC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPWNsb3NlXTpjaGVja2VkJykuaWQ7XHJcbiAgICAgICAgICAgIGZldGNoRGF0YSh7YWN0aW9uLHRpY2tldElkfSwgJ1BBVENIJywgJy90aWNrZXRzL2Nsb3NlJywgcG9zdFRpY2tldENsb3NlKTtcclxuICAgICAgICAgICAgYmdNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgIHBhZ2UuY2xhc3NOYW1lID0gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgYmdNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XHJcbiAgICBwYWdlLmNsYXNzTmFtZSA9ICdibHVyJ1xyXG4gICAgY2VudGVyTW9kYWwoYmdNb2RhbCk7XHJcblxyXG4gICAgd2luZG93Lm9ucmVzaXplID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY2VudGVyTW9kYWwoYmdNb2RhbCk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGNsb3NlQnRuOiBIVE1MRWxlbWVudCA9IGJnTW9kYWwucXVlcnlTZWxlY3RvcignLmNsb3NlLWJnLW1vZGFsJyk7XHJcbiAgICBjbG9zZUJ0bi5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgYmdNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgcGFnZS5jbGFzc05hbWUgPSAnJztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjZW50ZXJNb2RhbChiZ01vZCk6IGFueSB7XHJcbiAgICAgICAgaWYoYmdNb2QpIHtcclxuICAgICAgICBsZXQgY29udGVudHM6IEhUTUxFbGVtZW50ID0gYmdNb2QucXVlcnlTZWxlY3RvcignLm1vZGFsLWNvbnRlbnRzJyk7XHJcbiAgICAgICAgbGV0IHdpZHRoOiBudW1iZXIgPSBjb250ZW50cy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcclxuICAgICAgICBsZXQgaGVpZ2h0OiBudW1iZXIgPSBjb250ZW50cy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XHJcbiAgICAgICAgc2Nyb2xsVG8oe1xyXG4gICAgICAgICAgICB0b3A6IGNvbnRlbnRzLm9mZnNldFRvcCAtIGhlaWdodCAvIDUsXHJcbiAgICAgICAgICAgIGxlZnQ6IGNvbnRlbnRzLm9mZnNldExlZnQgLSB3aWR0aCAvIDUsXHJcbiAgICAgICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBvc3RUaWNrZXRDbG9zZShyZXM6YW55KTogdm9pZCB7XHJcbiAgaWYgKHJlcy5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgUHJvbWlzZS5yZXNvbHZlKHJlcy50ZXh0KCkpLnRoZW4oKGRhdGEpPT57XHJcbiAgICAgIGxldCBwYXJzZXI6IERPTVBhcnNlciA9IG5ldyBET01QYXJzZXIoKTtcclxuICAgICAgbGV0IHBhcnNlZDogYW55ID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyhkYXRhLCAndGV4dC9odG1sJyk7IC8vVFlQRT8/P1xyXG4gICAgICBjYXJkVGlja2V0c0NvbnRlbnQocGFyc2VkKX0pXHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBjb2xsYXBzYWJsZXMgZnJvbSAnLi9jb2xsYXBzYWJsZUNhcmRzLnRzJztcclxuaW1wb3J0IHRpY2tldFRha2UgZnJvbSAnLi90aWNrZXRUYWtlLnRzJztcclxuaW1wb3J0IG1vZGFscyBmcm9tICcuL01vZGFscy50cyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjYXJkVGlja2V0c0NvbnRlbnQodGlja2V0czogSFRNTEVsZW1lbnQpOiB2b2lkIHtcclxuICBpZiAoIXRpY2tldHMpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gIH1cclxuICBkb2N1bWVudFxyXG4gICAgICAuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndGlja2V0cy1kaXNwbGF5JylbMF1cclxuICAgICAgLmlubmVySFRNTCA9IHRpY2tldHNcclxuICAgICAgLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3RpY2tldHMtZGlzcGxheScpWzBdXHJcbiAgICAgIC5pbm5lckhUTUw7IC8vdGhpcyBjaHVuayBvZiBkb20gaXMgZ2VuZXJhdGVkIGFmdGVyIHRoZSBzY3JpcHRzIGFyZSBhZGRlZFxyXG5cclxuICAgICAgY29sbGFwc2FibGVzKCk7XHJcbiAgICAgIHRpY2tldFRha2UoKTtcclxuICAgICAgbW9kYWxzKCk7XHJcbn1cclxuIiwibGV0IGhlYWRlcjogSFRNTENvbGxlY3Rpb25PZjxFbGVtZW50PiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJkLWJsb2NrXCIpO1xyXG5sZXQgY2FyZEJvZHk6IE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbGxhcHNlLCAuc2hvdycpO1xyXG5sZXQgdGFrZUJ0bjogTm9kZUxpc3RPZjxIVE1MRWxlbWVudD4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYnRuLXRha2UtdGlja2V0Jyk7XHJcblxyXG5mdW5jdGlvbiBzaG93SGlkZShlbDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcclxuICAgIGlmIChlbC5zdHlsZS5oZWlnaHQgIT09ICcwcHgnKSB7XHJcbiAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gJzBweCc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGVsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snOyAvLyBNYWtlIGl0IHZpc2libGVcclxuICAgICAgICBlbC5zdHlsZS5oZWlnaHQgPSBlbC5zY3JvbGxIZWlnaHQgKyAncHgnO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBmaXhIZWlnaHQoZWw6IEhUTUxFbGVtZW50KTogdm9pZCB7XHJcbiAgICBpZiAoZWwuc3R5bGUuaGVpZ2h0ICE9PSAnMHB4Jykge1xyXG4gICAgICAgIGVsLnN0eWxlLmhlaWdodCA9IGVsLnNjcm9sbEhlaWdodCArICdweCc7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbGxhcHNhYmxlcygpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaGVhZGVyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGhlYWRlcltpXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZTogTW91c2VFdmVudCkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICg8SFRNTExpbmtFbGVtZW50PmUuY3VycmVudFRhcmdldCkuY2xhc3NMaXN0LnRvZ2dsZShcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgbGV0IHBhbmVsOiBhbnkgPSAoPEhUTUxMaW5rRWxlbWVudD5lLmN1cnJlbnRUYXJnZXQpLm5leHRFbGVtZW50U2libGluZzsgLy9UWVBFPz9cclxuICAgICAgICAgICAgZml4SGVpZ2h0KHBhbmVsKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocGFuZWwpXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoc2hvd0hpZGUsIDAsIHBhbmVsKTsgLy9zaG93SGlkZSBtdXN0IGV4ZWN1dGUgYWZ0ZXIgZml4SGVpZ2h0XHJcbiAgICAgICAgfSk7IC8vb3RoZXJ3aXNlIGhlaWdodCB3b24ndCBoYXZlIGEgcGl4ZWwgdmFsdWUsIGFuZCB0aGUgdHJhbnNpdGlvbiB3b3VsZG50IG9jY3VyXHJcbiAgICB9XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYXJkQm9keS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoY2FyZEJvZHlbaV0uc3R5bGUuaGVpZ2h0ICE9PSAnMHB4JylcclxuICAgICAgICAgICAgICAgIGNhcmRCb2R5W2ldLnN0eWxlLmhlaWdodCA9ICdhdXRvJztcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG4iLCJsZXQgZHJvcERvd25zOiBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5uYXYtbGluaycpO1xyXG5sZXQgbmF2YmFyU2lkZTogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2YmFyLW5hdicpO1xyXG5sZXQgcGFnZVRvcEJ0bjogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2lkZWJhclRvZ2dsZVRvcCcpO1xyXG5sZXQgcGFnZVRvcDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGFnZS10b3AnKTtcclxuXHJcbmZvciAobGV0IGkgPSAwOyBpIDwgZHJvcERvd25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBkcm9wRG93bnNbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzaG93VG9nZ2xlKVxyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93VG9nZ2xlKGUpOnZvaWQge1xyXG4gICAgbGV0IGVsOiBIVE1MRWxlbWVudCA9ICg8SFRNTEVsZW1lbnQ+ZS5jdXJyZW50VGFyZ2V0KTtcclxuICAgIGVsLmNsYXNzTGlzdC50b2dnbGUoXCJzaG93XCIpO1xyXG4gICAgaWYgKGVsLm5leHRFbGVtZW50U2libGluZykge1xyXG4gICAgICAgIGVsLm5leHRFbGVtZW50U2libGluZy5jbGFzc0xpc3QudG9nZ2xlKFwic2hvd1wiKTtcclxuICAgIH1cclxuICAgIGVsW1wiYXJpYS1leHBhbmRlZFwiXSA9ICFlbFtcImFyaWEtZXhwYW5kZWRcIl1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZHJvcGRvd25zKCkge1xyXG4gICAgcGFnZVRvcEJ0bi5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcGFnZVRvcC5jbGFzc0xpc3QudG9nZ2xlKCdzaWRlYmFyLXRvZ2dsZWQnKTtcclxuICAgICAgICBuYXZiYXJTaWRlLmNsYXNzTGlzdC50b2dnbGUoJ3RvZ2dsZWQnKTtcclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmZXRjaERhdGEoZGF0YTogYW55LCBtZXRob2Q6IHN0cmluZywgcm91dGU6IHN0cmluZywgc3VjY2VzczogRnVuY3Rpb24pIHtcclxuICAgIGZldGNoKHJvdXRlLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogbWV0aG9kLCAvLyBvciAnUFVUJ1xyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKChyZXMpID0+IHtcclxuICAgICAgICAgICAgc3VjY2VzcyhyZXMpXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICB9KTtcclxufVxyXG4iLCJpbXBvcnQgZHJvcGRvd25zIGZyb20gJy4vZHJvcGRvd25zLnRzJztcclxuaW1wb3J0IHV0aWxpdGllcyBmcm9tICcuL3V0aWxpdGllc0hvbWUudHMnO1xyXG5pbXBvcnQgdGlja2V0U3RhdHVzIGZyb20gJy4vdGlja2V0U3RhdHVzLnRzJztcclxuaW1wb3J0IGNvbGxhcHNhYmxlcyBmcm9tICcuL2NvbGxhcHNhYmxlQ2FyZHMudHMnO1xyXG5pbXBvcnQgdGlja2V0VGFrZSBmcm9tICcuL3RpY2tldFRha2UudHMnO1xyXG5pbXBvcnQgbW9kYWxzIGZyb20gJy4vTW9kYWxzLnRzJztcclxuXHJcbmRyb3Bkb3ducygpO1xyXG51dGlsaXRpZXMoKTtcclxudGlja2V0U3RhdHVzKCk7XHJcbm1vZGFscygpO1xyXG5jb2xsYXBzYWJsZXMoKTtcclxudGlja2V0VGFrZSgpO1xyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBUaWNrZXR7XHJcbiAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgZGVwYXJ0bWVudDogc3RyaW5nO1xyXG4gICAgcHJpb3JpdHk6IHN0cmluZztcclxuICAgIGRlYWRsaW5lOiBEYXRlO1xyXG4gICAgZGVzY3JpcHRpb246c3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHRpdGxlPzogc3RyaW5nLCBkZXBhcnRtZW50Pzogc3RyaW5nLCBwcmlvcml0eT86c3RyaW5nLCBkZWFkbGluZT86IERhdGUsIGRlc2NyaXB0aW9uPzpzdHJpbmcpIHtcclxuICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xyXG4gICAgICB0aGlzLmRlcGFydG1lbnQgPSBkZXBhcnRtZW50O1xyXG4gICAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XHJcbiAgICAgIHRoaXMuZGVhZGxpbmUgPSBkZWFkbGluZTtcclxuICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xyXG4gICAgfVxyXG4gIH1cclxuIiwibGV0IHN0YXR1c1NlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGlja2V0LXN0YXR1cycpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdGlja2V0U3RhdHVzKCkge1xyXG4gIHN0YXR1c1NlY3Rpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGZ1bmN0aW9uKGU6IE1vdXNlRXZlbnQpe1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgbG9jYXRpb24uc2VhcmNoPSc/c3RhdHVzPScrKDxIVE1MRWxlbWVudD5lLnRhcmdldCkuY2xhc3NMaXN0LnZhbHVlO1xyXG4gIH0pXHJcbn1cclxuIiwiaW1wb3J0IG1vZGFscyBmcm9tICcuL01vZGFscy50cyc7XHJcbmltcG9ydCBmZXRjaERhdGEgZnJvbSAnLi9mZXRjaERhdGEudHMnO1xyXG5cclxubGV0IHRha2VCdG5zOiBIVE1MQ29sbGVjdGlvbk9mPEVsZW1lbnQ+ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYnRuLXRha2UtdGlja2V0Jyk7XHJcbmxldCB0YWtlQnRuOiBFbGVtZW50O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdGlja2V0VGFrZSgpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGFrZUJ0bnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB0YWtlQnRuc1tpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XHJcbiAgICAgICAgICB0YWtlQnRuID0gdGFrZUJ0bnNbaV07XHJcbiAgICAgICAgICBmZXRjaERhdGEoe30sICdQQVRDSCcsICcvdGlja2V0cy8nK3Rha2VCdG4uaWQsIGFzc2lnbmVlUGF0Y2gpO1xyXG4gICAgfSlcclxufVxyXG5mdW5jdGlvbiBhc3NpZ25lZVBhdGNoKHJlczogYW55KTogdm9pZCB7XHJcbiAgY29uc29sZS5sb2coJ0VOVEVSRUQnKVxyXG4gICAgICAgIGlmIChyZXMuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICAgICg8SFRNTEVsZW1lbnQ+dGFrZUJ0bikuaW5uZXJIVE1MPSdDbG9zZSc7XHJcbiAgICAgICAgICAoPEhUTUxFbGVtZW50PnRha2VCdG4pLmNsYXNzTGlzdC50b2dnbGUoJ2J0bi1jbG9zZS10aWNrZXQnKTtcclxuICAgICAgICAgICg8SFRNTEVsZW1lbnQ+dGFrZUJ0bikuY2xhc3NMaXN0LnRvZ2dsZSgnYnRuLXRha2UtdGlja2V0Jyk7XHJcbiAgICAgICAgICBtb2RhbHMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdXRpbGl0aWVzKCkge1xyXG4gICAgbGV0IGFjY291bnROYW1lOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mdWxsbmFtZScpO1xyXG4gICAgbGV0IHNpZ25PdXQ6IEhUTUxFbGVtZW50ID0gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWdub3V0Jyk7XHJcbiAgICBhY2NvdW50TmFtZS5pbm5lckhUTUwgPSBhdG9iKGxvY2FsU3RvcmFnZS51bikgfHwgJyc7IC8vZGVjb2RlIGZyb20gYmFzZTY0XHJcbiAgICBzaWduT3V0Lm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcclxuICAgICAgICBzZXNzaW9uU3RvcmFnZS5jbGVhcigpO1xyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=