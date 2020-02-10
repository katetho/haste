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
        console.log(JSON.parse(xhr.response))
        //tooltip+red border
      }
      if(xhr.status===422) { //missing data
        console.log(JSON.parse(xhr.response))
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
      header[i].addEventListener("click", function() {
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
    let tooltiptext = document.getElementsByClassName('tooltiptext')[0];

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
        let title = inputs[0];
        let inputCount = 0;
        for (let input of inputs) { //don't iterate through "form" - too many elements
            if (input.value === "") {
                input.style.borderColor = 'red'; //outline empty fields
            } else {
                inputCount++;
                input.style.borderColor = '#CFD8DC';
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
                    if (title.value.length > 35) {
                        title.style.borderColor = 'red';
                        tooltiptext.style.opacity = 1;
                    } else {

                      Object(_ticketsReq__WEBPACK_IMPORTED_MODULE_1__["default"])(new Ticket(...ticketsArr)); //ES6, for ES5 - loop through
                        bgModal.style.display = "none";
                        page.className = '';
                    }
                }
            }
        }
    }

    newTicketBtn.onclick = function() {
        tooltiptext.style.opacity = 0;
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

        localStorage.setItem('Modified', document.lastModified)
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
function postTicket(obj) {
      let xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://localhost:3002/tickets', true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.responseType = 'document';
      xhr.onload = function() {
          if (this.status == 200) {
              let tickets = this.response;
              document
                  .getElementsByClassName('collapsable-section')[0]
                  .innerHTML = tickets
                  .getElementsByClassName('collapsable-section')[0]
                  .innerHTML;
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
//# sourceMappingURL=bundle.js.map