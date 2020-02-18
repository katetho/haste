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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/auth.js":
/*!************************!*\
  !*** ./src/js/auth.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return authenticate; });
/* harmony import */ var _authReq__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./authReq */ "./src/js/authReq.js");


function signin() {
    let welcomeTxt = document.querySelector('.welcome-txt')
    let userForm = document.querySelector('.user');
    let email = userForm.querySelector('input[type=email]');
    let password = userForm.querySelector('input[type=password]');
    let submitSignin = userForm.querySelector('.btn-user');

    if (sessionStorage.rggd) {
        welcomeTxt.innerHTML = atob(sessionStorage.rggd); //decode from base64
    }
    submitSignin.onclick = function() {
        let user = {
            email: email.value,
            password: password.value
        }
        Object(_authReq__WEBPACK_IMPORTED_MODULE_0__["default"])(user);
    }
}

function authenticate() {
    if (window.location.pathname === "/users/signin") {
        signin();
    }
}


/***/ }),

/***/ "./src/js/authReq.js":
/*!***************************!*\
  !*** ./src/js/authReq.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return postAuth; });
function postAuth(userCredentials) {
    let fields = document.querySelectorAll('input');
    let username = "";
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/users/signin", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(userCredentials))
    xhr.onload = function() {
        if (xhr.status === 200) {
            username = JSON.parse(xhr.response);
            localStorage.un = username; //base64 encoded
            window.location.replace('/')
        }
        if (xhr.status === 401) { //user doesn't exist
            let wrong = JSON.parse(xhr.response);
            for (let field of fields) { //or missing[field] for es5
                if (wrong.includes(field.type)) {
                    field.style.borderColor = 'red';
                    let tooltipTxt = field.parentNode.getAttribute('data');
                    field.parentNode.setAttribute('data-tooltip', tooltipTxt);
                } else {
                    field.parentNode.removeAttribute('data-tooltip');
                    field.style.borderColor = '#CFD8DC';
                }
            }
            //tooltip+red border
        }
        if (xhr.status === 422) { //missing data
            let missing = JSON.parse(xhr.response);
            for (let field of fields) { //or missing[field] for es5
                if (missing.includes(field.type)) {
                    field.style.borderColor = 'red';
                } else {
                    field.style.borderColor = '#CFD8DC';
                }
            }
            //tooltip+red border
        }
    }
    return username;
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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return home; });
/* harmony import */ var _collapsableCards__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./collapsableCards */ "./src/js/collapsableCards.js");
/* harmony import */ var _dropdowns__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dropdowns */ "./src/js/dropdowns.js");
/* harmony import */ var _ticketModal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ticketModal */ "./src/js/ticketModal.js");
/* harmony import */ var _utilitiesHome__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utilitiesHome */ "./src/js/utilitiesHome.js");
/* harmony import */ var _ticketTakeReq__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ticketTakeReq */ "./src/js/ticketTakeReq.js");






function home() {
  if (window.location.pathname==="/") {
    Object(_collapsableCards__WEBPACK_IMPORTED_MODULE_0__["default"])();
    Object(_dropdowns__WEBPACK_IMPORTED_MODULE_1__["default"])();
    Object(_ticketModal__WEBPACK_IMPORTED_MODULE_2__["default"])();
    Object(_utilitiesHome__WEBPACK_IMPORTED_MODULE_3__["default"])();
    Object(_ticketTakeReq__WEBPACK_IMPORTED_MODULE_4__["default"])();
  }
}


/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth */ "./src/js/auth.js");
/* harmony import */ var _home__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./home */ "./src/js/home.js");
/* harmony import */ var _register__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./register */ "./src/js/register.js");




Object(_auth__WEBPACK_IMPORTED_MODULE_0__["default"])();
Object(_home__WEBPACK_IMPORTED_MODULE_1__["default"])();
Object(_register__WEBPACK_IMPORTED_MODULE_2__["default"])();


/***/ }),

/***/ "./src/js/register.js":
/*!****************************!*\
  !*** ./src/js/register.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return register; });
/* harmony import */ var _registerReq__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./registerReq */ "./src/js/registerReq.js");
/* harmony import */ var _userClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./userClass */ "./src/js/userClass.js");


let User = Object(_userClass__WEBPACK_IMPORTED_MODULE_1__["default"])();

async function registerForm() {
    let form = document.getElementsByClassName('user-register')[0];
    let inputs = form.querySelectorAll('input, select');
    let registerBtn = form.querySelector('.btn-user')
    registerBtn.onclick = function() {
        sessionStorage.removeItem('registered');
        let user = [];
        //for...in iterated through
        //non-enumerable props in this case
        for (let input of inputs) {
            if (input['id'] !== 'repeatPassword') {
                user.push(input.value);
            }
        }
        Object(_registerReq__WEBPACK_IMPORTED_MODULE_0__["default"])(new User(...user));
    }
}

function register() {
    if (window.location.pathname === "/users/register") {
        registerForm();
    }
}


/***/ }),

/***/ "./src/js/registerReq.js":
/*!*******************************!*\
  !*** ./src/js/registerReq.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return postRegister; });
function postRegister(user) {
    let form = document.getElementsByClassName('user-register')[0];
    let inputs = form.querySelectorAll('input, select');
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/users/register');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(user));
    xhr.onload = function() {
        if (xhr.status === 200) {
            //for replacing 'Welcome!' in the signin form with the below text, sessionStorage.registered
            sessionStorage
            .rggd = btoa('You have been registered successfully! Now you can sign in here'); //encode with base64
            window.location.replace('/users/signin');
        }
        if (xhr.status === 422) {
            let invalidFields = JSON.parse(xhr.response);
            let pas = form.querySelector('#password')
                .value;
            for (let input of inputs) {
                let passesDontMatch = (input.id === 'repeatPassword' && input.value !== pas);
                if (invalidFields.includes(input.id) || passesDontMatch) {
                    let tooltipTxt = input.parentNode.getAttribute('data')
                    input.parentNode.setAttribute('data-tooltip', tooltipTxt);
                    input.style.borderColor = 'red';
                } else {
                    input.style.borderColor = '#CFD8DC';
                    input.parentNode.removeAttribute('data-tooltip');
                }
            }
        }
    }
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

/***/ "./src/js/userClass.js":
/*!*****************************!*\
  !*** ./src/js/userClass.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return userClass; });
function userClass() {
  return function User(firstName, lastName, email, department, password, role) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.department = department;
    this.password = password;
    this.role = role || 'member';
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2F1dGguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2F1dGhSZXEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbGxhcHNhYmxlQ2FyZHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2Ryb3Bkb3ducy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvaG9tZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcmVnaXN0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3JlZ2lzdGVyUmVxLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy90aWNrZXRDbGFzcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdGlja2V0TW9kYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3RpY2tldFRha2VSZXEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3RpY2tldHNSZXEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3VzZXJDbGFzcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbGl0aWVzSG9tZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdI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O0FBQUE7QUFBZTtBQUNmO0FBQ0E7QUFDQSx3REFBd0Q7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9qcy9tYWluLmpzXCIpO1xuIiwiaW1wb3J0IHBvc3RBdXRoIGZyb20gJy4vYXV0aFJlcSc7XHJcblxyXG5mdW5jdGlvbiBzaWduaW4oKSB7XHJcbiAgICBsZXQgd2VsY29tZVR4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53ZWxjb21lLXR4dCcpXHJcbiAgICBsZXQgdXNlckZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudXNlcicpO1xyXG4gICAgbGV0IGVtYWlsID0gdXNlckZvcm0ucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1lbWFpbF0nKTtcclxuICAgIGxldCBwYXNzd29yZCA9IHVzZXJGb3JtLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9cGFzc3dvcmRdJyk7XHJcbiAgICBsZXQgc3VibWl0U2lnbmluID0gdXNlckZvcm0ucXVlcnlTZWxlY3RvcignLmJ0bi11c2VyJyk7XHJcblxyXG4gICAgaWYgKHNlc3Npb25TdG9yYWdlLnJnZ2QpIHtcclxuICAgICAgICB3ZWxjb21lVHh0LmlubmVySFRNTCA9IGF0b2Ioc2Vzc2lvblN0b3JhZ2UucmdnZCk7IC8vZGVjb2RlIGZyb20gYmFzZTY0XHJcbiAgICB9XHJcbiAgICBzdWJtaXRTaWduaW4ub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCB1c2VyID0ge1xyXG4gICAgICAgICAgICBlbWFpbDogZW1haWwudmFsdWUsXHJcbiAgICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZC52YWx1ZVxyXG4gICAgICAgIH1cclxuICAgICAgICBwb3N0QXV0aCh1c2VyKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXV0aGVudGljYXRlKCkge1xyXG4gICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PT0gXCIvdXNlcnMvc2lnbmluXCIpIHtcclxuICAgICAgICBzaWduaW4oKTtcclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwb3N0QXV0aCh1c2VyQ3JlZGVudGlhbHMpIHtcclxuICAgIGxldCBmaWVsZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCcpO1xyXG4gICAgbGV0IHVzZXJuYW1lID0gXCJcIjtcclxuICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgIHhoci5vcGVuKFwiUE9TVFwiLCBcIi91c2Vycy9zaWduaW5cIiwgdHJ1ZSk7XHJcbiAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcbiAgICB4aHIuc2VuZChKU09OLnN0cmluZ2lmeSh1c2VyQ3JlZGVudGlhbHMpKVxyXG4gICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICh4aHIuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICAgICAgdXNlcm5hbWUgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZSk7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS51biA9IHVzZXJuYW1lOyAvL2Jhc2U2NCBlbmNvZGVkXHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKCcvJylcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHhoci5zdGF0dXMgPT09IDQwMSkgeyAvL3VzZXIgZG9lc24ndCBleGlzdFxyXG4gICAgICAgICAgICBsZXQgd3JvbmcgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZSk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGZpZWxkIG9mIGZpZWxkcykgeyAvL29yIG1pc3NpbmdbZmllbGRdIGZvciBlczVcclxuICAgICAgICAgICAgICAgIGlmICh3cm9uZy5pbmNsdWRlcyhmaWVsZC50eXBlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkLnN0eWxlLmJvcmRlckNvbG9yID0gJ3JlZCc7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRvb2x0aXBUeHQgPSBmaWVsZC5wYXJlbnROb2RlLmdldEF0dHJpYnV0ZSgnZGF0YScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkLnBhcmVudE5vZGUuc2V0QXR0cmlidXRlKCdkYXRhLXRvb2x0aXAnLCB0b29sdGlwVHh0KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGQucGFyZW50Tm9kZS5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtdG9vbHRpcCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkLnN0eWxlLmJvcmRlckNvbG9yID0gJyNDRkQ4REMnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vdG9vbHRpcCtyZWQgYm9yZGVyXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh4aHIuc3RhdHVzID09PSA0MjIpIHsgLy9taXNzaW5nIGRhdGFcclxuICAgICAgICAgICAgbGV0IG1pc3NpbmcgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZSk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGZpZWxkIG9mIGZpZWxkcykgeyAvL29yIG1pc3NpbmdbZmllbGRdIGZvciBlczVcclxuICAgICAgICAgICAgICAgIGlmIChtaXNzaW5nLmluY2x1ZGVzKGZpZWxkLnR5cGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGQuc3R5bGUuYm9yZGVyQ29sb3IgPSAncmVkJztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGQuc3R5bGUuYm9yZGVyQ29sb3IgPSAnI0NGRDhEQyc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy90b29sdGlwK3JlZCBib3JkZXJcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdXNlcm5hbWU7XHJcbn1cclxuIiwibGV0IGhlYWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJkLWJsb2NrXCIpO1xyXG5sZXQgY2FyZEJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiY29sbGFwc2Ugc2hvd1wiKTtcclxubGV0IHRha2VCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdidG4tdGFrZS10aWNrZXQnKTtcclxuXHJcbmZ1bmN0aW9uIHNob3dIaWRlKGVsKSB7XHJcbiAgICBpZiAoZWwuc3R5bGUuaGVpZ2h0ICE9PSAnMHB4Jykge1xyXG4gICAgICAgIGVsLnN0eWxlLmhlaWdodCA9ICcwcHgnO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBlbC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJzsgLy8gTWFrZSBpdCB2aXNpYmxlXHJcbiAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gZWwuc2Nyb2xsSGVpZ2h0ICsgJ3B4JztcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZml4SGVpZ2h0KGVsKSB7XHJcbiAgICBpZiAoZWwuc3R5bGUuaGVpZ2h0ICE9PSAnMHB4Jykge1xyXG4gICAgICAgIGVsLnN0eWxlLmhlaWdodCA9IGVsLnNjcm9sbEhlaWdodCArICdweCc7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbGxhcHNhYmxlcygpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaGVhZGVyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaGVhZGVyW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QudG9nZ2xlKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICBsZXQgcGFuZWwgPSB0aGlzLm5leHRFbGVtZW50U2libGluZztcclxuICAgICAgICAgICAgZml4SGVpZ2h0KHBhbmVsKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dChzaG93SGlkZSwgMCwgcGFuZWwpOyAvL3Nob3dIaWRlIG11c3QgZXhlY3V0ZSBhZnRlciBmaXhIZWlnaHRcclxuICAgICAgICB9KTsgLy9vdGhlcndpc2UgaGVpZ2h0IHdvbid0IGhhdmUgYSBwaXhlbCB2YWx1ZSwgYW5kIHRoZSB0cmFuc2l0aW9uIHdvdWxkbnQgb2NjdXJcclxuICAgIH1cclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNhcmRCb2R5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChjYXJkQm9keVtpXS5zdHlsZS5oZWlnaHQgIT09ICcwcHgnKVxyXG4gICAgICAgICAgICAgICAgY2FyZEJvZHlbaV0uc3R5bGUuaGVpZ2h0ID0gJ2F1dG8nO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcbiIsImxldCBkcm9wRG93bnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibmF2LWxpbmtcIik7XHJcbmxldCBuYXZiYXJTaWRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIm5hdmJhci1uYXZcIilbMF07XHJcbmxldCBwYWdlVG9wQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaWRlYmFyVG9nZ2xlVG9wXCIpO1xyXG5sZXQgcGFnZVRvcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGFnZS10b3BcIik7XHJcblxyXG5mb3IgKGxldCBpID0gMDsgaSA8IGRyb3BEb3ducy5sZW5ndGg7IGkrKykge1xyXG4gICAgZHJvcERvd25zW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2hvd1RvZ2dsZSlcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd1RvZ2dsZShlKSB7XHJcbiAgICBsZXQgZWwgPSBlLmN1cnJlbnRUYXJnZXQ7XHJcbiAgICBlbC5jbGFzc0xpc3QudG9nZ2xlKFwic2hvd1wiKTtcclxuICAgIGlmIChlbC5uZXh0RWxlbWVudFNpYmxpbmcpIHtcclxuICAgICAgICBlbC5uZXh0RWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LnRvZ2dsZShcInNob3dcIik7XHJcbiAgICB9XHJcbiAgICBlbFtcImFyaWEtZXhwYW5kZWRcIl0gPSAhZWxbXCJhcmlhLWV4cGFuZGVkXCJdXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRyb3Bkb3ducygpIHtcclxuICAgIHBhZ2VUb3BCdG4ub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHBhZ2VUb3AuY2xhc3NMaXN0LnRvZ2dsZSgnc2lkZWJhci10b2dnbGVkJyk7XHJcbiAgICAgICAgbmF2YmFyU2lkZS5jbGFzc0xpc3QudG9nZ2xlKCd0b2dnbGVkJyk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IGNvbGxhcHNhYmxlcyBmcm9tICcuL2NvbGxhcHNhYmxlQ2FyZHMnO1xyXG5pbXBvcnQgZHJvcGRvd25zIGZyb20gJy4vZHJvcGRvd25zJztcclxuaW1wb3J0IHRpY2tldE1vZGFsIGZyb20gJy4vdGlja2V0TW9kYWwnO1xyXG5pbXBvcnQgdXRpbGl0aWVzIGZyb20gJy4vdXRpbGl0aWVzSG9tZSc7XHJcbmltcG9ydCB0aWNrZXRUYWtlUmVxIGZyb20gJy4vdGlja2V0VGFrZVJlcSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBob21lKCkge1xyXG4gIGlmICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU9PT1cIi9cIikge1xyXG4gICAgY29sbGFwc2FibGVzKCk7XHJcbiAgICBkcm9wZG93bnMoKTtcclxuICAgIHRpY2tldE1vZGFsKCk7XHJcbiAgICB1dGlsaXRpZXMoKTtcclxuICAgIHRpY2tldFRha2VSZXEoKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IGF1dGhlbnRpY2F0ZSBmcm9tICcuL2F1dGgnXHJcbmltcG9ydCBob21lIGZyb20gJy4vaG9tZSdcclxuaW1wb3J0IHJlZ2lzdGVyIGZyb20gJy4vcmVnaXN0ZXInXHJcblxyXG5hdXRoZW50aWNhdGUoKTtcclxuaG9tZSgpO1xyXG5yZWdpc3RlcigpO1xyXG4iLCJpbXBvcnQgcG9zdFVzZXIgZnJvbSAnLi9yZWdpc3RlclJlcSc7XHJcbmltcG9ydCB1c2VyQ2xhc3MgZnJvbSAnLi91c2VyQ2xhc3MnO1xyXG5sZXQgVXNlciA9IHVzZXJDbGFzcygpO1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gcmVnaXN0ZXJGb3JtKCkge1xyXG4gICAgbGV0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd1c2VyLXJlZ2lzdGVyJylbMF07XHJcbiAgICBsZXQgaW5wdXRzID0gZm9ybS5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCwgc2VsZWN0Jyk7XHJcbiAgICBsZXQgcmVnaXN0ZXJCdG4gPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoJy5idG4tdXNlcicpXHJcbiAgICByZWdpc3RlckJ0bi5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbSgncmVnaXN0ZXJlZCcpO1xyXG4gICAgICAgIGxldCB1c2VyID0gW107XHJcbiAgICAgICAgLy9mb3IuLi5pbiBpdGVyYXRlZCB0aHJvdWdoXHJcbiAgICAgICAgLy9ub24tZW51bWVyYWJsZSBwcm9wcyBpbiB0aGlzIGNhc2VcclxuICAgICAgICBmb3IgKGxldCBpbnB1dCBvZiBpbnB1dHMpIHtcclxuICAgICAgICAgICAgaWYgKGlucHV0WydpZCddICE9PSAncmVwZWF0UGFzc3dvcmQnKSB7XHJcbiAgICAgICAgICAgICAgICB1c2VyLnB1c2goaW5wdXQudmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBvc3RVc2VyKG5ldyBVc2VyKC4uLnVzZXIpKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVnaXN0ZXIoKSB7XHJcbiAgICBpZiAod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09PSBcIi91c2Vycy9yZWdpc3RlclwiKSB7XHJcbiAgICAgICAgcmVnaXN0ZXJGb3JtKCk7XHJcbiAgICB9XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcG9zdFJlZ2lzdGVyKHVzZXIpIHtcclxuICAgIGxldCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndXNlci1yZWdpc3RlcicpWzBdO1xyXG4gICAgbGV0IGlucHV0cyA9IGZvcm0ucXVlcnlTZWxlY3RvckFsbCgnaW5wdXQsIHNlbGVjdCcpO1xyXG4gICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgeGhyLm9wZW4oJ1BPU1QnLCAnL3VzZXJzL3JlZ2lzdGVyJyk7XHJcbiAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcclxuICAgIHhoci5zZW5kKEpTT04uc3RyaW5naWZ5KHVzZXIpKTtcclxuICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoeGhyLnN0YXR1cyA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgIC8vZm9yIHJlcGxhY2luZyAnV2VsY29tZSEnIGluIHRoZSBzaWduaW4gZm9ybSB3aXRoIHRoZSBiZWxvdyB0ZXh0LCBzZXNzaW9uU3RvcmFnZS5yZWdpc3RlcmVkXHJcbiAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlXHJcbiAgICAgICAgICAgIC5yZ2dkID0gYnRvYSgnWW91IGhhdmUgYmVlbiByZWdpc3RlcmVkIHN1Y2Nlc3NmdWxseSEgTm93IHlvdSBjYW4gc2lnbiBpbiBoZXJlJyk7IC8vZW5jb2RlIHdpdGggYmFzZTY0XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKCcvdXNlcnMvc2lnbmluJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh4aHIuc3RhdHVzID09PSA0MjIpIHtcclxuICAgICAgICAgICAgbGV0IGludmFsaWRGaWVsZHMgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZSk7XHJcbiAgICAgICAgICAgIGxldCBwYXMgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoJyNwYXNzd29yZCcpXHJcbiAgICAgICAgICAgICAgICAudmFsdWU7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGlucHV0IG9mIGlucHV0cykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBhc3Nlc0RvbnRNYXRjaCA9IChpbnB1dC5pZCA9PT0gJ3JlcGVhdFBhc3N3b3JkJyAmJiBpbnB1dC52YWx1ZSAhPT0gcGFzKTtcclxuICAgICAgICAgICAgICAgIGlmIChpbnZhbGlkRmllbGRzLmluY2x1ZGVzKGlucHV0LmlkKSB8fCBwYXNzZXNEb250TWF0Y2gpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdG9vbHRpcFR4dCA9IGlucHV0LnBhcmVudE5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhJylcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dC5wYXJlbnROb2RlLnNldEF0dHJpYnV0ZSgnZGF0YS10b29sdGlwJywgdG9vbHRpcFR4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQuc3R5bGUuYm9yZGVyQ29sb3IgPSAncmVkJztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQuc3R5bGUuYm9yZGVyQ29sb3IgPSAnI0NGRDhEQyc7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQucGFyZW50Tm9kZS5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtdG9vbHRpcCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRpY2tldENsYXNzKCkge1xyXG4gIHJldHVybiBmdW5jdGlvbiBUaWNrZXQodGl0bGUsIGRlcGFydG1lbnQsIHByaW9yaXR5LCBkZWFkbGluZSwgZGVzY3JpcHRpb24pIHtcclxuICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcclxuICAgIHRoaXMuZGVwYXJ0bWVudCA9IGRlcGFydG1lbnQ7XHJcbiAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XHJcbiAgICB0aGlzLmRlYWRsaW5lID0gZGVhZGxpbmU7XHJcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB0aWNrZXRDbGFzcyBmcm9tICcuL3RpY2tldENsYXNzJztcclxuaW1wb3J0IHBvc3RUaWNrZXQgZnJvbSAnLi90aWNrZXRzUmVxJztcclxubGV0IFRpY2tldCA9IHRpY2tldENsYXNzKCk7XHJcblxyXG5sZXQgbmV3VGlja2V0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbmV3LXRpY2tldCcpWzBdO1xyXG5sZXQgYmdNb2RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2JnLW1vZGFsJylbMF07XHJcbmxldCBjb250ZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21vZGFsLWNvbnRlbnRzJylbMF07XHJcbmxldCBjbG9zZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2Nsb3NlLWJnLW1vZGFsJylbMF07XHJcbmxldCBwYWdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ21haW4nKVswXTtcclxubGV0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd0aWNrZXQtZm9ybScpWzBdO1xyXG5sZXQgc3VibWl0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc3VibWl0LXRpY2tldCcpWzBdO1xyXG5sZXQgZGVhZGxpbmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVhZGxpbmUnKTtcclxuXHJcbmZ1bmN0aW9uIGNlbnRlck1vZGFsKCkge1xyXG4gICAgbGV0IHdpZHRoID0gY29udGVudHMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcclxuICAgICAgICAud2lkdGg7XHJcbiAgICBsZXQgaGVpZ2h0ID0gY29udGVudHMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcclxuICAgICAgICAuaGVpZ2h0O1xyXG4gICAgc2Nyb2xsVG8oe1xyXG4gICAgICAgIHRvcDogY29udGVudHMub2Zmc2V0VG9wIC0gaGVpZ2h0IC8gNSxcclxuICAgICAgICBsZWZ0OiBjb250ZW50cy5vZmZzZXRMZWZ0IC0gd2lkdGggLyA1LFxyXG4gICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJ1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRpY2tldE1vZGFsKCkge1xyXG4gICAgc3VibWl0Lm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgIGxldCBpbnB1dHMgPSBmb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0LCBzZWxlY3QsIHRleHRhcmVhJyk7IC8vZ2V0IGFsbCBpbnB1dHNcclxuICAgICAgICBsZXQgaW5wdXRDb3VudCA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaW5wdXQgb2YgaW5wdXRzKSB7IC8vZG9uJ3QgaXRlcmF0ZSB0aHJvdWdoIFwiZm9ybVwiIC0gdG9vIG1hbnkgZWxlbWVudHNcclxuICAgICAgICAgICAgbGV0IGxvbmdUaXRsZSA9IChpbnB1dC5pZCA9PT0gJ3RpdGxlJyAmJiBpbnB1dC52YWx1ZS5sZW5ndGggPiAzNSk7XHJcbiAgICAgICAgICAgIGlmIChpbnB1dC52YWx1ZSA9PT0gXCJcIiB8fCBsb25nVGl0bGUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChsb25nVGl0bGUgfHwgaW5wdXQudmFsdWUgPT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dC5zdHlsZS5ib3JkZXJDb2xvciA9ICdyZWQnOyAvL291dGxpbmUgZW1wdHkgZmllbGRzIG9yIGxvbmcgdGl0bGVcclxuICAgICAgICAgICAgICAgIGlmIChsb25nVGl0bGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdG9vbHRpcFR4dCA9IHRpdGxlLnBhcmVudE5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQucGFyZW50Tm9kZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdG9vbHRpcCcsIHRvb2x0aXBUeHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlucHV0Q291bnQrKztcclxuICAgICAgICAgICAgICAgIGlucHV0LnN0eWxlLmJvcmRlckNvbG9yID0gJyNDRkQ4REMnO1xyXG4gICAgICAgICAgICAgICAgaW5wdXQucGFyZW50Tm9kZS5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtdG9vbHRpcCcpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlucHV0Q291bnQgPT09IGlucHV0cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGlja2V0c0FyciA9IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW5wdXQgb2YgaW5wdXRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2YWwgPSBpbnB1dC52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0LmlkID09PSAnZGVzY3JpcHRpb24nIHx8IGlucHV0LmlkID09PSAndGl0bGUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWwgPSB2YWwuc2xpY2UoMCwgMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudG9VcHBlckNhc2UoKSArIHZhbC5zbGljZSgxLCB2YWwubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aWNrZXRzQXJyLnB1c2godmFsKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcG9zdFRpY2tldChuZXcgVGlja2V0KC4uLnRpY2tldHNBcnIpKTsgLy9FUzYsIGZvciBFUzUgLSBsb29wIHRocm91Z2hcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpbnB1dCBvZiBpbnB1dHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIGlucHV0LnZhbHVlPVwiXCI7IC8vY2xlYXIgb3V0IHRoZSBmb3JtXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJnTW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2UuY2xhc3NOYW1lID0gJyc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbmV3VGlja2V0QnRuLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBiZ01vZGFsLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcclxuICAgICAgICBwYWdlLmNsYXNzTmFtZSA9ICdibHVyJ1xyXG4gICAgICAgIGNlbnRlck1vZGFsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgd2luZG93Lm9ucmVzaXplID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY2VudGVyTW9kYWwoKTtcclxuICAgIH1cclxuXHJcbiAgICBjbG9zZUJ0bi5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgYmdNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgcGFnZS5jbGFzc05hbWUgPSAnJztcclxuICAgIH1cclxuXHJcbiAgICBkZWFkbGluZS5vbmZvY3VzID0gZnVuY3Rpb24oKSB7IC8vbGV0IHRoZSB1c2VyIGNob29zZSBhIGRhdGUgb25mb2N1c1xyXG4gICAgICAgIHRoaXMudHlwZSA9IFwiZGF0ZVwiO1xyXG4gICAgfVxyXG5cclxuICAgIGRlYWRsaW5lLm9uYmx1ciA9IGZ1bmN0aW9uKCkgeyAvL3Nob3cgdGhlIHBsYWNlaG9sZGVyIG9uYmx1clxyXG4gICAgICAgIHRoaXMudHlwZSA9IFwidGV4dFwiO1xyXG4gICAgfVxyXG59XHJcbiIsImxldCB0YWtlQnRucyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2J0bi10YWtlLXRpY2tldCcpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdGlja2V0VGFrZVJlcSgpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGFrZUJ0bnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB0YWtlQnRuc1tpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzc2lnbmVlUGF0Y2gpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBhc3NpZ25lZVBhdGNoKCkge1xyXG4gICAgbGV0IHRha2VCdG4gPSB0aGlzO1xyXG4gICAgbGV0IGFzc2lnbmVlID0gYXRvYihsb2NhbFN0b3JhZ2UudW4pOyAvL2RlY29kZSBmcm9tIGJhc2U2NFxyXG4gICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgeGhyLm9wZW4oJ1BBVENIJywgJy90aWNrZXRzLycgKyB0YWtlQnRuLmlkKTtcclxuICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xyXG4gICAgbGV0IHVzZXIgPSB7XHJcbiAgICAgICAgYXNzaWduZWVcclxuICAgIH07XHJcbiAgICB4aHIuc2VuZChKU09OLnN0cmluZ2lmeSh1c2VyKSk7XHJcbiAgICB4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICAgICAgdGFrZUJ0bi5vdXRlckhUTUwgPSBgPGEgaWQ9JHt0YWtlQnRuLmlkfSBocmVmPVwiI1wiPiBBc3NpZ25lZCB0bzogJHthc3NpZ25lZX0gPC9hPmA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBjb2xsYXBzYWJsZXMgZnJvbSAnLi9jb2xsYXBzYWJsZUNhcmRzJztcclxuaW1wb3J0IHRpY2tldFRha2VSZXEgZnJvbSAnLi90aWNrZXRUYWtlUmVxJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBvc3RUaWNrZXQob2JqKSB7XHJcbiAgICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgeGhyLm9wZW4oJ1BPU1QnLCAnaHR0cDovL2xvY2FsaG9zdDozMDAyL3RpY2tldHMnLCB0cnVlKTtcclxuICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xyXG4gICAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2RvY3VtZW50JztcclxuICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09IDIwMCkge1xyXG4gICAgICAgICAgICAgIGxldCB0aWNrZXRzID0gdGhpcy5yZXNwb25zZTtcclxuICAgICAgICAgICAgICBkb2N1bWVudFxyXG4gICAgICAgICAgICAgICAgICAuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndGlja2V0cy1kaXNwbGF5JylbMF1cclxuICAgICAgICAgICAgICAgICAgLmlubmVySFRNTCA9IHRpY2tldHNcclxuICAgICAgICAgICAgICAgICAgLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3RpY2tldHMtZGlzcGxheScpWzBdXHJcbiAgICAgICAgICAgICAgICAgIC5pbm5lckhUTUw7IC8vdGhpcyBjaHVuayBvZiBkb20gaXMgZ2VuZXJhdGVkIGFmdGVyIHRoZSBzY3JpcHRzIGFyZSBhZGRlZFxyXG4gICAgICAgICAgICAgICAgICBjb2xsYXBzYWJsZXMoKTsgLy9zbyB0aGUgZWFybGllciBzY3JpcHRzIHdvbid0IHdvcmtcclxuICAgICAgICAgICAgICAgICAgdGlja2V0VGFrZVJlcSgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHhoci5zZW5kKEpTT04uc3RyaW5naWZ5KG9iaikpO1xyXG4gIH1cclxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdXNlckNsYXNzKCkge1xyXG4gIHJldHVybiBmdW5jdGlvbiBVc2VyKGZpcnN0TmFtZSwgbGFzdE5hbWUsIGVtYWlsLCBkZXBhcnRtZW50LCBwYXNzd29yZCwgcm9sZSkge1xyXG4gICAgdGhpcy5maXJzdE5hbWUgPSBmaXJzdE5hbWU7XHJcbiAgICB0aGlzLmxhc3ROYW1lID0gbGFzdE5hbWU7XHJcbiAgICB0aGlzLmVtYWlsID0gZW1haWw7XHJcbiAgICB0aGlzLmRlcGFydG1lbnQgPSBkZXBhcnRtZW50O1xyXG4gICAgdGhpcy5wYXNzd29yZCA9IHBhc3N3b3JkO1xyXG4gICAgdGhpcy5yb2xlID0gcm9sZSB8fCAnbWVtYmVyJztcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdXRpbGl0aWVzKCkge1xyXG4gICAgbGV0IGFjY291bnROYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImZ1bGxuYW1lXCIpWzBdO1xyXG4gICAgbGV0IHNpZ25PdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwic2lnbm91dFwiKVswXTtcclxuICAgIGFjY291bnROYW1lLmlubmVySFRNTCA9IGF0b2IobG9jYWxTdG9yYWdlLnVuKSB8fCAnJzsgLy9kZWNvZGUgZnJvbSBiYXNlNjRcclxuICAgIHNpZ25PdXQub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xyXG4gICAgICAgIHNlc3Npb25TdG9yYWdlLmNsZWFyKCk7XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==