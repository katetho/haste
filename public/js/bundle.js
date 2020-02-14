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

    if (sessionStorage.registered) {
        welcomeTxt.innerHTML = sessionStorage.registered;
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
    xhr.open("POST", "/users/signin",true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(userCredentials))
    xhr.onload = function() {
      if(xhr.status===200) {
        username=xhr.response;
        window.location.replace('/')
      }
      if(xhr.status===401) { //user doesn't exist
      let wrong = JSON.parse(xhr.response);
      for (let field of fields) { //or missing[field] for es5
        if (wrong.includes(field.type)) {
            field.style.borderColor = 'red';
            let tooltipTxt = field.parentNode.getAttribute('data');
            field.parentNode.setAttribute('data-tooltip', tooltipTxt);
        }
        else {
            field.parentNode.removeAttribute('data-tooltip');
            field.style.borderColor = '#CFD8DC';
        }
      }
        //tooltip+red border
      }
      if(xhr.status===422) { //missing data
        let missing = JSON.parse(xhr.response);
        for (let field of fields) { //or missing[field] for es5
          if (missing.includes(field.type)) {
              field.style.borderColor = 'red';
          }
          else {
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
  } //try promises again

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




function home() {
  if (window.location.pathname==="/") {
    Object(_collapsableCards__WEBPACK_IMPORTED_MODULE_0__["default"])();
    Object(_dropdowns__WEBPACK_IMPORTED_MODULE_1__["default"])();
    Object(_ticketModal__WEBPACK_IMPORTED_MODULE_2__["default"])();
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
            //for replacing 'Welcome!' in the signin form with the below text
            sessionStorage.registered = 'You have been registered successfully! Now you can sign in here';
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
                  Object(_collapsableCards__WEBPACK_IMPORTED_MODULE_0__["default"])(); //so thw earlier scripts won't work
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


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2F1dGguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2F1dGhSZXEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbGxhcHNhYmxlQ2FyZHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2Ryb3Bkb3ducy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvaG9tZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcmVnaXN0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3JlZ2lzdGVyUmVxLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy90aWNrZXRDbGFzcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdGlja2V0TW9kYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3RpY2tldHNSZXEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3VzZXJDbGFzcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FB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QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiwyREFBVSw0QkFBNEI7QUFDMUQ7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUNBQW1DO0FBQ25DO0FBQ0E7O0FBRUEsa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3RGQTtBQUFBO0FBQUE7QUFBOEM7O0FBRS9CO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QixrQkFBa0IsaUVBQVksR0FBRztBQUNqQztBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ25CQTtBQUFBO0FBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvanMvbWFpbi5qc1wiKTtcbiIsImltcG9ydCBwb3N0QXV0aCBmcm9tICcuL2F1dGhSZXEnO1xyXG5cclxuZnVuY3Rpb24gc2lnbmluKCkge1xyXG4gICAgbGV0IHdlbGNvbWVUeHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2VsY29tZS10eHQnKVxyXG4gICAgbGV0IHVzZXJGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVzZXInKTtcclxuICAgIGxldCBlbWFpbCA9IHVzZXJGb3JtLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9ZW1haWxdJyk7XHJcbiAgICBsZXQgcGFzc3dvcmQgPSB1c2VyRm9ybS5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPXBhc3N3b3JkXScpO1xyXG4gICAgbGV0IHN1Ym1pdFNpZ25pbiA9IHVzZXJGb3JtLnF1ZXJ5U2VsZWN0b3IoJy5idG4tdXNlcicpO1xyXG5cclxuICAgIGlmIChzZXNzaW9uU3RvcmFnZS5yZWdpc3RlcmVkKSB7XHJcbiAgICAgICAgd2VsY29tZVR4dC5pbm5lckhUTUwgPSBzZXNzaW9uU3RvcmFnZS5yZWdpc3RlcmVkO1xyXG4gICAgfVxyXG4gICAgc3VibWl0U2lnbmluLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgdXNlciA9IHtcclxuICAgICAgICAgICAgZW1haWw6IGVtYWlsLnZhbHVlLFxyXG4gICAgICAgICAgICBwYXNzd29yZDogcGFzc3dvcmQudmFsdWVcclxuICAgICAgICB9XHJcbiAgICAgICAgcG9zdEF1dGgodXNlcik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGF1dGhlbnRpY2F0ZSgpIHtcclxuICAgIGlmICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT09IFwiL3VzZXJzL3NpZ25pblwiKSB7XHJcbiAgICAgICAgc2lnbmluKCk7XHJcbiAgICB9XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcG9zdEF1dGgodXNlckNyZWRlbnRpYWxzKSB7XHJcbiAgICBsZXQgZmllbGRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXQnKTtcclxuICAgIGxldCB1c2VybmFtZSA9IFwiXCI7XHJcbiAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICB4aHIub3BlbihcIlBPU1RcIiwgXCIvdXNlcnMvc2lnbmluXCIsdHJ1ZSk7XHJcbiAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcbiAgICB4aHIuc2VuZChKU09OLnN0cmluZ2lmeSh1c2VyQ3JlZGVudGlhbHMpKVxyXG4gICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICBpZih4aHIuc3RhdHVzPT09MjAwKSB7XHJcbiAgICAgICAgdXNlcm5hbWU9eGhyLnJlc3BvbnNlO1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKCcvJylcclxuICAgICAgfVxyXG4gICAgICBpZih4aHIuc3RhdHVzPT09NDAxKSB7IC8vdXNlciBkb2Vzbid0IGV4aXN0XHJcbiAgICAgIGxldCB3cm9uZyA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlKTtcclxuICAgICAgZm9yIChsZXQgZmllbGQgb2YgZmllbGRzKSB7IC8vb3IgbWlzc2luZ1tmaWVsZF0gZm9yIGVzNVxyXG4gICAgICAgIGlmICh3cm9uZy5pbmNsdWRlcyhmaWVsZC50eXBlKSkge1xyXG4gICAgICAgICAgICBmaWVsZC5zdHlsZS5ib3JkZXJDb2xvciA9ICdyZWQnO1xyXG4gICAgICAgICAgICBsZXQgdG9vbHRpcFR4dCA9IGZpZWxkLnBhcmVudE5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhJyk7XHJcbiAgICAgICAgICAgIGZpZWxkLnBhcmVudE5vZGUuc2V0QXR0cmlidXRlKCdkYXRhLXRvb2x0aXAnLCB0b29sdGlwVHh0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGZpZWxkLnBhcmVudE5vZGUucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXRvb2x0aXAnKTtcclxuICAgICAgICAgICAgZmllbGQuc3R5bGUuYm9yZGVyQ29sb3IgPSAnI0NGRDhEQyc7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgICAgLy90b29sdGlwK3JlZCBib3JkZXJcclxuICAgICAgfVxyXG4gICAgICBpZih4aHIuc3RhdHVzPT09NDIyKSB7IC8vbWlzc2luZyBkYXRhXHJcbiAgICAgICAgbGV0IG1pc3NpbmcgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZSk7XHJcbiAgICAgICAgZm9yIChsZXQgZmllbGQgb2YgZmllbGRzKSB7IC8vb3IgbWlzc2luZ1tmaWVsZF0gZm9yIGVzNVxyXG4gICAgICAgICAgaWYgKG1pc3NpbmcuaW5jbHVkZXMoZmllbGQudHlwZSkpIHtcclxuICAgICAgICAgICAgICBmaWVsZC5zdHlsZS5ib3JkZXJDb2xvciA9ICdyZWQnO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgZmllbGQuc3R5bGUuYm9yZGVyQ29sb3IgPSAnI0NGRDhEQyc7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vdG9vbHRpcCtyZWQgYm9yZGVyXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB1c2VybmFtZTtcclxuICB9XHJcbiIsImxldCBoZWFkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZC1ibG9ja1wiKTtcclxubGV0IGNhcmRCb2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImNvbGxhcHNlIHNob3dcIik7XHJcblxyXG5mdW5jdGlvbiBzaG93SGlkZShlbCkge1xyXG4gICAgaWYgKGVsLnN0eWxlLmhlaWdodCAhPT0gJzBweCcpIHtcclxuICAgICAgICBlbC5zdHlsZS5oZWlnaHQgPSAnMHB4JztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7IC8vIE1ha2UgaXQgdmlzaWJsZVxyXG4gICAgICAgIGVsLnN0eWxlLmhlaWdodCA9IGVsLnNjcm9sbEhlaWdodCArICdweCc7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZpeEhlaWdodChlbCkge1xyXG4gICAgaWYgKGVsLnN0eWxlLmhlaWdodCAhPT0gJzBweCcpIHtcclxuICAgICAgICBlbC5zdHlsZS5oZWlnaHQgPSBlbC5zY3JvbGxIZWlnaHQgKyAncHgnO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb2xsYXBzYWJsZXMoKSB7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBoZWFkZXIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBoZWFkZXJbaV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QudG9nZ2xlKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgIGxldCBwYW5lbCA9IHRoaXMubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG4gICAgICAgIGZpeEhlaWdodChwYW5lbCk7XHJcbiAgICAgICAgc2V0VGltZW91dChzaG93SGlkZSwgMCwgcGFuZWwpOyAvL3Nob3dIaWRlIG11c3QgZXhlY3V0ZSBhZnRlciBmaXhIZWlnaHRcclxuICAgICAgfSk7IC8vb3RoZXJ3aXNlIGhlaWdodCB3b24ndCBoYXZlIGEgcGl4ZWwgdmFsdWUsIGFuZCB0aGUgdHJhbnNpdGlvbiB3b3VsZG50IG9jY3VyXHJcbiAgfSAvL3RyeSBwcm9taXNlcyBhZ2FpblxyXG5cclxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBmdW5jdGlvbigpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYXJkQm9keS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgaWYgKGNhcmRCb2R5W2ldLnN0eWxlLmhlaWdodCAhPT0gJzBweCcpXHJcbiAgICAgICAgICAgICAgY2FyZEJvZHlbaV0uc3R5bGUuaGVpZ2h0ID0gJ2F1dG8nO1xyXG4gICAgICB9XHJcbiAgfSk7XHJcbn1cclxuIiwibGV0IGRyb3BEb3ducyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJuYXYtbGlua1wiKTtcclxubGV0IG5hdmJhclNpZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibmF2YmFyLW5hdlwiKVswXTtcclxubGV0IHBhZ2VUb3BCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNpZGViYXJUb2dnbGVUb3BcIik7XHJcbmxldCBwYWdlVG9wID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwYWdlLXRvcFwiKTtcclxuXHJcbmZvciAobGV0IGkgPSAwOyBpIDwgZHJvcERvd25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBkcm9wRG93bnNbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzaG93VG9nZ2xlKVxyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93VG9nZ2xlKGUpIHtcclxuICAgIGxldCBlbCA9IGUuY3VycmVudFRhcmdldDtcclxuICAgIGVsLmNsYXNzTGlzdC50b2dnbGUoXCJzaG93XCIpO1xyXG4gICAgaWYgKGVsLm5leHRFbGVtZW50U2libGluZykge1xyXG4gICAgICAgIGVsLm5leHRFbGVtZW50U2libGluZy5jbGFzc0xpc3QudG9nZ2xlKFwic2hvd1wiKTtcclxuICAgIH1cclxuICAgIGVsW1wiYXJpYS1leHBhbmRlZFwiXSA9ICFlbFtcImFyaWEtZXhwYW5kZWRcIl1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZHJvcGRvd25zKCkge1xyXG4gICAgcGFnZVRvcEJ0bi5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcGFnZVRvcC5jbGFzc0xpc3QudG9nZ2xlKCdzaWRlYmFyLXRvZ2dsZWQnKTtcclxuICAgICAgICBuYXZiYXJTaWRlLmNsYXNzTGlzdC50b2dnbGUoJ3RvZ2dsZWQnKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgY29sbGFwc2FibGVzIGZyb20gJy4vY29sbGFwc2FibGVDYXJkcyc7XHJcbmltcG9ydCBkcm9wZG93bnMgZnJvbSAnLi9kcm9wZG93bnMnO1xyXG5pbXBvcnQgdGlja2V0TW9kYWwgZnJvbSAnLi90aWNrZXRNb2RhbCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBob21lKCkge1xyXG4gIGlmICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU9PT1cIi9cIikge1xyXG4gICAgY29sbGFwc2FibGVzKCk7XHJcbiAgICBkcm9wZG93bnMoKTtcclxuICAgIHRpY2tldE1vZGFsKCk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBhdXRoZW50aWNhdGUgZnJvbSAnLi9hdXRoJ1xyXG5pbXBvcnQgaG9tZSBmcm9tICcuL2hvbWUnXHJcbmltcG9ydCByZWdpc3RlciBmcm9tICcuL3JlZ2lzdGVyJ1xyXG5cclxuYXV0aGVudGljYXRlKCk7XHJcbmhvbWUoKTtcclxucmVnaXN0ZXIoKTtcclxuIiwiaW1wb3J0IHBvc3RVc2VyIGZyb20gJy4vcmVnaXN0ZXJSZXEnO1xyXG5pbXBvcnQgdXNlckNsYXNzIGZyb20gJy4vdXNlckNsYXNzJztcclxubGV0IFVzZXIgPSB1c2VyQ2xhc3MoKTtcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIHJlZ2lzdGVyRm9ybSgpIHtcclxuICAgIGxldCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndXNlci1yZWdpc3RlcicpWzBdO1xyXG4gICAgbGV0IGlucHV0cyA9IGZvcm0ucXVlcnlTZWxlY3RvckFsbCgnaW5wdXQsIHNlbGVjdCcpO1xyXG4gICAgbGV0IHJlZ2lzdGVyQnRuID0gZm9ybS5xdWVyeVNlbGVjdG9yKCcuYnRuLXVzZXInKVxyXG4gICAgcmVnaXN0ZXJCdG4ub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oJ3JlZ2lzdGVyZWQnKTtcclxuICAgICAgICBsZXQgdXNlciA9IFtdO1xyXG4gICAgICAgIC8vZm9yLi4uaW4gaXRlcmF0ZWQgdGhyb3VnaFxyXG4gICAgICAgIC8vbm9uLWVudW1lcmFibGUgcHJvcHMgaW4gdGhpcyBjYXNlXHJcbiAgICAgICAgZm9yIChsZXQgaW5wdXQgb2YgaW5wdXRzKSB7XHJcbiAgICAgICAgICAgIGlmIChpbnB1dFsnaWQnXSAhPT0gJ3JlcGVhdFBhc3N3b3JkJykge1xyXG4gICAgICAgICAgICAgICAgdXNlci5wdXNoKGlucHV0LnZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBwb3N0VXNlcihuZXcgVXNlciguLi51c2VyKSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlZ2lzdGVyKCkge1xyXG4gICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PT0gXCIvdXNlcnMvcmVnaXN0ZXJcIikge1xyXG4gICAgICAgIHJlZ2lzdGVyRm9ybSgpO1xyXG4gICAgfVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBvc3RSZWdpc3Rlcih1c2VyKSB7XHJcbiAgICBsZXQgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3VzZXItcmVnaXN0ZXInKVswXTtcclxuICAgIGxldCBpbnB1dHMgPSBmb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0LCBzZWxlY3QnKTtcclxuICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgIHhoci5vcGVuKCdQT1NUJywgJy91c2Vycy9yZWdpc3RlcicpO1xyXG4gICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XHJcbiAgICB4aHIuc2VuZChKU09OLnN0cmluZ2lmeSh1c2VyKSk7XHJcbiAgICB4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKHhoci5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAvL2ZvciByZXBsYWNpbmcgJ1dlbGNvbWUhJyBpbiB0aGUgc2lnbmluIGZvcm0gd2l0aCB0aGUgYmVsb3cgdGV4dFxyXG4gICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5yZWdpc3RlcmVkID0gJ1lvdSBoYXZlIGJlZW4gcmVnaXN0ZXJlZCBzdWNjZXNzZnVsbHkhIE5vdyB5b3UgY2FuIHNpZ24gaW4gaGVyZSc7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKCcvdXNlcnMvc2lnbmluJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh4aHIuc3RhdHVzID09PSA0MjIpIHtcclxuICAgICAgICAgICAgbGV0IGludmFsaWRGaWVsZHMgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZSk7XHJcbiAgICAgICAgICAgIGxldCBwYXMgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoJyNwYXNzd29yZCcpXHJcbiAgICAgICAgICAgICAgICAudmFsdWU7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGlucHV0IG9mIGlucHV0cykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBhc3Nlc0RvbnRNYXRjaCA9IChpbnB1dC5pZCA9PT0gJ3JlcGVhdFBhc3N3b3JkJyAmJiBpbnB1dC52YWx1ZSAhPT0gcGFzKTtcclxuICAgICAgICAgICAgICAgIGlmIChpbnZhbGlkRmllbGRzLmluY2x1ZGVzKGlucHV0LmlkKSB8fCBwYXNzZXNEb250TWF0Y2gpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdG9vbHRpcFR4dCA9IGlucHV0LnBhcmVudE5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhJylcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dC5wYXJlbnROb2RlLnNldEF0dHJpYnV0ZSgnZGF0YS10b29sdGlwJywgdG9vbHRpcFR4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQuc3R5bGUuYm9yZGVyQ29sb3IgPSAncmVkJztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQuc3R5bGUuYm9yZGVyQ29sb3IgPSAnI0NGRDhEQyc7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQucGFyZW50Tm9kZS5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtdG9vbHRpcCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRpY2tldENsYXNzKCkge1xyXG4gIHJldHVybiBmdW5jdGlvbiBUaWNrZXQodGl0bGUsIGRlcGFydG1lbnQsIHByaW9yaXR5LCBkZWFkbGluZSwgZGVzY3JpcHRpb24pIHtcclxuICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcclxuICAgIHRoaXMuZGVwYXJ0bWVudCA9IGRlcGFydG1lbnQ7XHJcbiAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XHJcbiAgICB0aGlzLmRlYWRsaW5lID0gZGVhZGxpbmU7XHJcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB0aWNrZXRDbGFzcyBmcm9tICcuL3RpY2tldENsYXNzJztcclxuaW1wb3J0IHBvc3RUaWNrZXQgZnJvbSAnLi90aWNrZXRzUmVxJztcclxubGV0IFRpY2tldCA9IHRpY2tldENsYXNzKCk7XHJcblxyXG5sZXQgbmV3VGlja2V0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbmV3LXRpY2tldCcpWzBdO1xyXG5sZXQgYmdNb2RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2JnLW1vZGFsJylbMF07XHJcbmxldCBjb250ZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21vZGFsLWNvbnRlbnRzJylbMF07XHJcbmxldCBjbG9zZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2Nsb3NlLWJnLW1vZGFsJylbMF07XHJcbmxldCBwYWdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ21haW4nKVswXTtcclxubGV0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd0aWNrZXQtZm9ybScpWzBdO1xyXG5sZXQgc3VibWl0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc3VibWl0LXRpY2tldCcpWzBdO1xyXG5sZXQgZGVhZGxpbmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVhZGxpbmUnKTtcclxuXHJcbmZ1bmN0aW9uIGNlbnRlck1vZGFsKCkge1xyXG4gICAgbGV0IHdpZHRoID0gY29udGVudHMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcclxuICAgICAgICAud2lkdGg7XHJcbiAgICBsZXQgaGVpZ2h0ID0gY29udGVudHMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcclxuICAgICAgICAuaGVpZ2h0O1xyXG4gICAgc2Nyb2xsVG8oe1xyXG4gICAgICAgIHRvcDogY29udGVudHMub2Zmc2V0VG9wIC0gaGVpZ2h0IC8gNSxcclxuICAgICAgICBsZWZ0OiBjb250ZW50cy5vZmZzZXRMZWZ0IC0gd2lkdGggLyA1LFxyXG4gICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJ1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRpY2tldE1vZGFsKCkge1xyXG4gICAgc3VibWl0Lm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgIGxldCBpbnB1dHMgPSBmb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0LCBzZWxlY3QsIHRleHRhcmVhJyk7IC8vZ2V0IGFsbCBpbnB1dHNcclxuICAgICAgICBsZXQgaW5wdXRDb3VudCA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaW5wdXQgb2YgaW5wdXRzKSB7IC8vZG9uJ3QgaXRlcmF0ZSB0aHJvdWdoIFwiZm9ybVwiIC0gdG9vIG1hbnkgZWxlbWVudHNcclxuICAgICAgICAgICAgbGV0IGxvbmdUaXRsZSA9IChpbnB1dC5pZCA9PT0gJ3RpdGxlJyAmJiBpbnB1dC52YWx1ZS5sZW5ndGggPiAzNSk7XHJcbiAgICAgICAgICAgIGlmIChpbnB1dC52YWx1ZSA9PT0gXCJcIiB8fCBsb25nVGl0bGUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChsb25nVGl0bGUgfHwgaW5wdXQudmFsdWUgPT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dC5zdHlsZS5ib3JkZXJDb2xvciA9ICdyZWQnOyAvL291dGxpbmUgZW1wdHkgZmllbGRzIG9yIGxvbmcgdGl0bGVcclxuICAgICAgICAgICAgICAgIGlmIChsb25nVGl0bGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdG9vbHRpcFR4dCA9IHRpdGxlLnBhcmVudE5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQucGFyZW50Tm9kZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdG9vbHRpcCcsIHRvb2x0aXBUeHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlucHV0Q291bnQrKztcclxuICAgICAgICAgICAgICAgIGlucHV0LnN0eWxlLmJvcmRlckNvbG9yID0gJyNDRkQ4REMnO1xyXG4gICAgICAgICAgICAgICAgaW5wdXQucGFyZW50Tm9kZS5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtdG9vbHRpcCcpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlucHV0Q291bnQgPT09IGlucHV0cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGlja2V0c0FyciA9IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW5wdXQgb2YgaW5wdXRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2YWwgPSBpbnB1dC52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0LmlkID09PSAnZGVzY3JpcHRpb24nIHx8IGlucHV0LmlkID09PSAndGl0bGUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWwgPSB2YWwuc2xpY2UoMCwgMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudG9VcHBlckNhc2UoKSArIHZhbC5zbGljZSgxLCB2YWwubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aWNrZXRzQXJyLnB1c2godmFsKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcG9zdFRpY2tldChuZXcgVGlja2V0KC4uLnRpY2tldHNBcnIpKTsgLy9FUzYsIGZvciBFUzUgLSBsb29wIHRocm91Z2hcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpbnB1dCBvZiBpbnB1dHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIGlucHV0LnZhbHVlPVwiXCI7IC8vY2xlYXIgb3V0IHRoZSBmb3JtXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJnTW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2UuY2xhc3NOYW1lID0gJyc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbmV3VGlja2V0QnRuLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBiZ01vZGFsLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcclxuICAgICAgICBwYWdlLmNsYXNzTmFtZSA9ICdibHVyJ1xyXG4gICAgICAgIGNlbnRlck1vZGFsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgd2luZG93Lm9ucmVzaXplID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY2VudGVyTW9kYWwoKTtcclxuICAgIH1cclxuXHJcbiAgICBjbG9zZUJ0bi5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgYmdNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgcGFnZS5jbGFzc05hbWUgPSAnJztcclxuICAgIH1cclxuXHJcbiAgICBkZWFkbGluZS5vbmZvY3VzID0gZnVuY3Rpb24oKSB7IC8vbGV0IHRoZSB1c2VyIGNob29zZSBhIGRhdGUgb25mb2N1c1xyXG4gICAgICAgIHRoaXMudHlwZSA9IFwiZGF0ZVwiO1xyXG4gICAgfVxyXG5cclxuICAgIGRlYWRsaW5lLm9uYmx1ciA9IGZ1bmN0aW9uKCkgeyAvL3Nob3cgdGhlIHBsYWNlaG9sZGVyIG9uYmx1clxyXG4gICAgICAgIHRoaXMudHlwZSA9IFwidGV4dFwiO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBjb2xsYXBzYWJsZXMgZnJvbSAnLi9jb2xsYXBzYWJsZUNhcmRzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBvc3RUaWNrZXQob2JqKSB7XHJcbiAgICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgeGhyLm9wZW4oJ1BPU1QnLCAnaHR0cDovL2xvY2FsaG9zdDozMDAyL3RpY2tldHMnLCB0cnVlKTtcclxuICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xyXG4gICAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2RvY3VtZW50JztcclxuICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09IDIwMCkge1xyXG4gICAgICAgICAgICAgIGxldCB0aWNrZXRzID0gdGhpcy5yZXNwb25zZTtcclxuICAgICAgICAgICAgICBkb2N1bWVudFxyXG4gICAgICAgICAgICAgICAgICAuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndGlja2V0cy1kaXNwbGF5JylbMF1cclxuICAgICAgICAgICAgICAgICAgLmlubmVySFRNTCA9IHRpY2tldHNcclxuICAgICAgICAgICAgICAgICAgLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3RpY2tldHMtZGlzcGxheScpWzBdXHJcbiAgICAgICAgICAgICAgICAgIC5pbm5lckhUTUw7IC8vdGhpcyBjaHVuayBvZiBkb20gaXMgZ2VuZXJhdGVkIGFmdGVyIHRoZSBzY3JpcHRzIGFyZSBhZGRlZFxyXG4gICAgICAgICAgICAgICAgICBjb2xsYXBzYWJsZXMoKTsgLy9zbyB0aHcgZWFybGllciBzY3JpcHRzIHdvbid0IHdvcmtcclxuICAgICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICB4aHIuc2VuZChKU09OLnN0cmluZ2lmeShvYmopKTtcclxuICB9XHJcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVzZXJDbGFzcygpIHtcclxuICByZXR1cm4gZnVuY3Rpb24gVXNlcihmaXJzdE5hbWUsIGxhc3ROYW1lLCBlbWFpbCwgZGVwYXJ0bWVudCwgcGFzc3dvcmQsIHJvbGUpIHtcclxuICAgIHRoaXMuZmlyc3ROYW1lID0gZmlyc3ROYW1lO1xyXG4gICAgdGhpcy5sYXN0TmFtZSA9IGxhc3ROYW1lO1xyXG4gICAgdGhpcy5lbWFpbCA9IGVtYWlsO1xyXG4gICAgdGhpcy5kZXBhcnRtZW50ID0gZGVwYXJ0bWVudDtcclxuICAgIHRoaXMucGFzc3dvcmQgPSBwYXNzd29yZDtcclxuICAgIHRoaXMucm9sZSA9IHJvbGUgfHwgJ21lbWJlcic7XHJcbiAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=