!function(e){var n={};function t(r){if(n[r])return n[r].exports;var s=n[r]={i:r,l:!1,exports:{}};return e[r].call(s.exports,s,s.exports,t),s.l=!0,s.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var s in e)t.d(r,s,function(n){return e[n]}.bind(null,s));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=0)}([function(module,__webpack_exports__,__webpack_require__){"use strict";eval("__webpack_require__.r(__webpack_exports__);\n\n// CONCATENATED MODULE: ./src/js/authReq.js\nfunction postAuth(userCredentials) {\r\n    let username = \"\";\r\n    let xhr = new XMLHttpRequest();\r\n    xhr.open(\"POST\", \"/users/signin\",true);\r\n    xhr.setRequestHeader(\"Content-Type\", \"application/json\");\r\n    xhr.send(JSON.stringify(userCredentials))\r\n    xhr.onload = function() {\r\n      if(xhr.status===200) {\r\n        username=xhr.response;\r\n        window.location.replace('/')\r\n      }\r\n      if(xhr.status===401) { //user doesn't exist\r\n        console.log(JSON.parse(xhr.response))\r\n        //tooltip+red border\r\n      }\r\n      if(xhr.status===422) { //missing data\r\n        console.log(JSON.parse(xhr.response))\r\n        //tooltip+red border\r\n      }\r\n    }\r\n    return username;\r\n  }\r\n\n// CONCATENATED MODULE: ./src/js/auth.js\n\r\n\r\nfunction signin() {\r\n    let welcomeTxt = document.querySelector('.welcome-txt')\r\n    let userForm = document.querySelector('.user');\r\n    let email = userForm.querySelector('input[type=email]');\r\n    let password = userForm.querySelector('input[type=password]');\r\n    let submitSignin = userForm.querySelector('.btn-user');\r\n\r\n    if (sessionStorage.registered) {\r\n        welcomeTxt.innerHTML = sessionStorage.registered;\r\n    }\r\n    submitSignin.onclick = function() {\r\n        let user = {\r\n            email: email.value,\r\n            password: password.value\r\n        }\r\n        postAuth(user);\r\n    }\r\n}\r\n\r\nfunction authenticate() {\r\n    if (window.location.pathname === \"/users/signin\") {\r\n        signin();\r\n    }\r\n}\r\n\n// CONCATENATED MODULE: ./src/js/collapsableCards.js\nlet header = document.getElementsByClassName(\"d-block\");\r\nlet cardBody = document.getElementsByClassName(\"collapse show\");\r\n\r\nfunction showHide(el) {\r\n    if (el.style.height !== '0px') {\r\n        el.style.height = '0px';\r\n    } else {\r\n        el.style.display = 'block'; // Make it visible\r\n        el.style.height = el.scrollHeight + 'px';\r\n    }\r\n}\r\n\r\nfunction fixHeight(el) {\r\n    if (el.style.height !== '0px') {\r\n        el.style.height = el.scrollHeight + 'px';\r\n    }\r\n}\r\n\r\nfunction collapsables() {\r\n  for (let i = 0; i < header.length; i++) {\r\n      header[i].addEventListener(\"click\", function() {\r\n          this.classList.toggle(\"active\");\r\n          let panel = this.nextElementSibling;\r\n          fixHeight(panel);\r\n          setTimeout(showHide, 0, panel); //showHide must execute after fixHeight\r\n      }); //otherwise height won't have a pixel value, and the transition wouldnt occur\r\n  } //try promises again\r\n\r\n  window.addEventListener(\"resize\", function() {\r\n      for (let i = 0; i < cardBody.length; i++) {\r\n          if (cardBody[i].style.height !== '0px')\r\n              cardBody[i].style.height = 'auto';\r\n      }\r\n  });\r\n}\r\n\n// CONCATENATED MODULE: ./src/js/dropdowns.js\nlet dropDowns = document.getElementsByClassName(\"nav-link\");\r\nlet navbarSide = document.getElementsByClassName(\"navbar-nav\")[0];\r\nlet pageTopBtn = document.getElementById(\"sidebarToggleTop\");\r\nlet pageTop = document.getElementById(\"page-top\");\r\n\r\nfor (let i = 0; i < dropDowns.length; i++) {\r\n    dropDowns[i].addEventListener('click', showToggle)\r\n}\r\n\r\nfunction showToggle(e) {\r\n    let el = e.currentTarget;\r\n    el.classList.toggle(\"show\");\r\n    if (el.nextElementSibling) {\r\n        el.nextElementSibling.classList.toggle(\"show\");\r\n    }\r\n    el[\"aria-expanded\"] = !el[\"aria-expanded\"]\r\n}\r\n\r\nfunction dropdowns() {\r\n    pageTopBtn.onclick = function() {\r\n        pageTop.classList.toggle('sidebar-toggled');\r\n        navbarSide.classList.toggle('toggled');\r\n    }\r\n}\r\n\n// CONCATENATED MODULE: ./src/js/ticketClass.js\nfunction ticketClass() {\r\n  return function Ticket(title, department, priority, deadline, description) {\r\n    this.title = title;\r\n    this.department = department;\r\n    this.priority = priority;\r\n    this.deadline = deadline;\r\n    this.description = description;\r\n  }\r\n}\r\n\n// CONCATENATED MODULE: ./src/js/ticketsReq.js\nfunction postTicket(obj) {\r\n      let xhr = new XMLHttpRequest();\r\n      xhr.open('POST', 'http://localhost:3002/tickets', true);\r\n      xhr.setRequestHeader(\"Content-Type\", \"application/json\");\r\n      xhr.responseType = 'document';\r\n      xhr.onload = function() {\r\n          if (this.status == 200) {\r\n              let tickets = this.response;\r\n              document\r\n                  .getElementsByClassName('collapsable-section')[0]\r\n                  .innerHTML = tickets\r\n                  .getElementsByClassName('collapsable-section')[0]\r\n                  .innerHTML;\r\n          }\r\n      }\r\n      xhr.send(JSON.stringify(obj));\r\n  }\r\n\n// CONCATENATED MODULE: ./src/js/ticketModal.js\n\r\n\r\nlet Ticket = ticketClass();\r\n\r\n    let newTicketBtn = document.getElementsByClassName('new-ticket')[0];\r\n    let bgModal = document.getElementsByClassName('bg-modal')[0];\r\n    let contents = document.getElementsByClassName('modal-contents')[0];\r\n    let closeBtn = document.getElementsByClassName('close-bg-modal')[0];\r\n    let page = document.getElementsByTagName('main')[0];\r\n    let ticketModal_form = document.getElementsByClassName('ticket-form')[0];\r\n    let ticketModal_submit = document.getElementsByClassName('submit-ticket')[0];\r\n    let deadline = document.getElementById('deadline');\r\n    let tooltiptext = document.getElementsByClassName('tooltiptext')[0];\r\n\r\n    function centerModal() {\r\n        let width = contents.getBoundingClientRect()\r\n            .width;\r\n        let height = contents.getBoundingClientRect()\r\n            .height;\r\n        scrollTo({\r\n            top: contents.offsetTop - height / 5,\r\n            left: contents.offsetLeft - width / 5,\r\n            behavior: 'smooth'\r\n        });\r\n    }\r\n\r\n    function ticketModal() {\r\n    ticketModal_submit.onclick = function(event) {\r\n        let inputs = ticketModal_form.querySelectorAll('input, select, textarea'); //get all inputs\r\n        let title = inputs[0];\r\n        let inputCount = 0;\r\n        for (let input of inputs) { //don't iterate through \"form\" - too many elements\r\n            if (input.value === \"\") {\r\n                input.style.borderColor = 'red'; //outline empty fields\r\n            } else {\r\n                inputCount++;\r\n                input.style.borderColor = '#CFD8DC';\r\n                if (inputCount === inputs.length) {\r\n                    let ticketsArr = []\r\n                    for (let input of inputs) {\r\n                        let val = input.value;\r\n                        if (input.id === 'description' || input.id === 'title') {\r\n                            val = val.slice(0, 1)\r\n                                .toUpperCase() + val.slice(1, val.length);\r\n                        }\r\n                        ticketsArr.push(val);\r\n                    }\r\n                    if (title.value.length > 35) {\r\n                        title.style.borderColor = 'red';\r\n                        tooltiptext.style.opacity = 1;\r\n                    } else {\r\n\r\n                      postTicket(new Ticket(...ticketsArr)); //ES6, for ES5 - loop through\r\n                        bgModal.style.display = \"none\";\r\n                        page.className = '';\r\n                    }\r\n                }\r\n            }\r\n        }\r\n    }\r\n\r\n    newTicketBtn.onclick = function() {\r\n        tooltiptext.style.opacity = 0;\r\n        bgModal.style.display = \"flex\";\r\n        page.className = 'blur'\r\n        centerModal();\r\n    }\r\n\r\n    window.onresize = function() {\r\n        centerModal();\r\n    }\r\n\r\n    closeBtn.onclick = function() {\r\n        bgModal.style.display = \"none\";\r\n        page.className = '';\r\n    }\r\n\r\n    deadline.onfocus = function() { //let the user choose a date onfocus\r\n        this.type = \"date\";\r\n    }\r\n\r\n    deadline.onblur = function() { //show the placeholder onblur\r\n        this.type = \"text\";\r\n    }\r\n\r\n        localStorage.setItem('Modified', document.lastModified)\r\n}\r\n\n// CONCATENATED MODULE: ./src/js/home.js\n\r\n\r\n\r\n\r\nfunction home() {\r\n  if (window.location.pathname===\"/\") {\r\n    collapsables();\r\n    dropdowns();\r\n    ticketModal();\r\n  }\r\n}\r\n\n// CONCATENATED MODULE: ./src/js/registerReq.js\nfunction postRegister(user) {\r\n    let form = document.getElementsByClassName('user-register')[0];\r\n    let inputs = form.querySelectorAll('input, select');\r\n    let xhr = new XMLHttpRequest();\r\n    xhr.open('POST', '/users/register');\r\n    xhr.setRequestHeader('Content-Type', 'application/json');\r\n    xhr.send(JSON.stringify(user));\r\n    xhr.onload = function() {\r\n        if (xhr.status === 200) {\r\n            //for replacing 'Welcome!' in the signin form with the below text\r\n            sessionStorage.registered = 'You have been registered successfully! Now you can sign in here';\r\n            window.location.replace('/users/signin');\r\n        }\r\n        if (xhr.status === 422) {\r\n            let invalidFields = JSON.parse(xhr.response);\r\n            let pas = form.querySelector('#password')\r\n                .value;\r\n            for (let input of inputs) {\r\n                let passesDontMatch = (input.id === 'repeatPassword' && input.value !== pas);\r\n                if (invalidFields.includes(input.id) || passesDontMatch) {\r\n                    let tooltipTxt = input.parentNode.getAttribute('data')\r\n                    input.parentNode.setAttribute('data-tooltip', tooltipTxt);\r\n                    input.style.borderColor = 'red';\r\n                } else {\r\n                    input.style.borderColor = '#CFD8DC';\r\n                    input.parentNode.removeAttribute('data-tooltip');\r\n                }\r\n            }\r\n        }\r\n    }\r\n}\r\n\n// CONCATENATED MODULE: ./src/js/userClass.js\nfunction userClass() {\r\n  return function User(firstName, lastName, email, department, password, role) {\r\n    this.firstName = firstName;\r\n    this.lastName = lastName;\r\n    this.email = email;\r\n    this.department = department;\r\n    this.password = password;\r\n    this.role = role || 'member';\r\n  }\r\n}\r\n\n// CONCATENATED MODULE: ./src/js/register.js\n\r\n\r\nlet User = userClass();\r\n\r\nasync function registerForm() {\r\n    let form = document.getElementsByClassName('user-register')[0];\r\n    let inputs = form.querySelectorAll('input, select');\r\n    let registerBtn = form.querySelector('.btn-user')\r\n    registerBtn.onclick = function() {\r\n        sessionStorage.removeItem('registered');\r\n        let user = [];\r\n        //for...in iterated through\r\n        //non-enumerable props in this case\r\n        for (let input of inputs) {\r\n            if (input['id'] !== 'repeatPassword') {\r\n                user.push(input.value);\r\n            }\r\n        }\r\n        postRegister(new User(...user));\r\n    }\r\n}\r\n\r\nfunction register() {\r\n    if (window.location.pathname === \"/users/register\") {\r\n        registerForm();\r\n    }\r\n}\r\n\n// CONCATENATED MODULE: ./src/js/main.js\n\r\n\r\n\r\n\r\nauthenticate();\r\nhome();\r\nregister();\r\n\n\n//# sourceURL=webpack:///./src/js/main.js_+_11_modules?")}]);