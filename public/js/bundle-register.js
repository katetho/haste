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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/register.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/register.ts":
/*!****************************!*\
  !*** ./src/js/register.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const registerReq_js_1 = __webpack_require__(/*! ./registerReq.js */ "./src/js/registerReq.js");
const userClass_js_1 = __webpack_require__(/*! ./userClass.js */ "./src/js/userClass.js");
let User = userClass_js_1.default();
(function register() {
    let form = document.querySelector('.user-register');
    let inputs = form.querySelectorAll('input, select');
    let registerBtn = form.querySelector('.btn-user');
    registerBtn.onclick = function () {
        sessionStorage.removeItem('rggd');
        let user = [];
        //for...in iterated through
        //non-enumerable props in this case
        for (let input of inputs) {
            let inputVal = input.value;
            user.push(inputVal);
        }
        registerReq_js_1.default(new User(...user));
    };
})();


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
                if (invalidFields.includes(input.id)) {
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
  return function User(firstName, lastName, email, department, password, repPassword, role) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.department = department;
    this.password = password;
    this.repPassword = repPassword;
    this.role = role || 'member';
  }
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3JlZ2lzdGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9qcy9yZWdpc3RlclJlcS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXNlckNsYXNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQSxnR0FBd0M7QUFDeEMsMEZBQXVDO0FBQ3ZDLElBQUksSUFBSSxHQUFHLHNCQUFTLEVBQUUsQ0FBQztBQUV2QixDQUFDLFNBQVMsUUFBUTtJQUNoQixJQUFJLElBQUksR0FBZ0IsUUFBUSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ2pFLElBQUksTUFBTSxHQUF3QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDekUsSUFBSSxXQUFXLEdBQWdCLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDO0lBQzlELFdBQVcsQ0FBQyxPQUFPLEdBQUc7UUFDbEIsY0FBYyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNsQyxJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7UUFDZCwyQkFBMkI7UUFDM0IsbUNBQW1DO1FBQ25DLEtBQUssSUFBSSxLQUFLLElBQUksTUFBTSxFQUFFO1lBQ3hCLElBQUksUUFBUSxHQUErQixLQUFNLENBQUMsS0FBSztZQUN2RCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3JCO1FBQ0Qsd0JBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDaEMsQ0FBQztBQUNILENBQUMsQ0FBQyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7QUNuQkw7QUFBQTtBQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0RkFBNEY7QUFDNUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQzlCQTtBQUFBO0FBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJidW5kbGUtcmVnaXN0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9qcy9yZWdpc3Rlci50c1wiKTtcbiIsImltcG9ydCBwb3N0VXNlciBmcm9tICcuL3JlZ2lzdGVyUmVxLmpzJztcclxuaW1wb3J0IHVzZXJDbGFzcyBmcm9tICcuL3VzZXJDbGFzcy5qcyc7XHJcbmxldCBVc2VyID0gdXNlckNsYXNzKCk7XHJcblxyXG4oZnVuY3Rpb24gcmVnaXN0ZXIoKSB7XHJcbiAgbGV0IGZvcm06IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVzZXItcmVnaXN0ZXInKTtcclxuICBsZXQgaW5wdXRzOiBOb2RlTGlzdE9mPEVsZW1lbnQ+ID0gZm9ybS5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCwgc2VsZWN0Jyk7XHJcbiAgbGV0IHJlZ2lzdGVyQnRuOiBIVE1MRWxlbWVudCA9IGZvcm0ucXVlcnlTZWxlY3RvcignLmJ0bi11c2VyJylcclxuICByZWdpc3RlckJ0bi5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oJ3JnZ2QnKTtcclxuICAgICAgbGV0IHVzZXIgPSBbXTtcclxuICAgICAgLy9mb3IuLi5pbiBpdGVyYXRlZCB0aHJvdWdoXHJcbiAgICAgIC8vbm9uLWVudW1lcmFibGUgcHJvcHMgaW4gdGhpcyBjYXNlXHJcbiAgICAgIGZvciAobGV0IGlucHV0IG9mIGlucHV0cykge1xyXG4gICAgICAgIGxldCBpbnB1dFZhbDogc3RyaW5nID0gICg8SFRNTElucHV0RWxlbWVudD5pbnB1dCkudmFsdWVcclxuICAgICAgICB1c2VyLnB1c2goaW5wdXRWYWwpO1xyXG4gICAgICB9XHJcbiAgICAgIHBvc3RVc2VyKG5ldyBVc2VyKC4uLnVzZXIpKTtcclxuICB9XHJcbn0pKCk7XHJcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBvc3RSZWdpc3Rlcih1c2VyKSB7XHJcbiAgICBsZXQgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3VzZXItcmVnaXN0ZXInKVswXTtcclxuICAgIGxldCBpbnB1dHMgPSBmb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0LCBzZWxlY3QnKTtcclxuICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgIHhoci5vcGVuKCdQT1NUJywgJy91c2Vycy9yZWdpc3RlcicpO1xyXG4gICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XHJcbiAgICB4aHIuc2VuZChKU09OLnN0cmluZ2lmeSh1c2VyKSk7XHJcbiAgICB4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKHhoci5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAvL2ZvciByZXBsYWNpbmcgJ1dlbGNvbWUhJyBpbiB0aGUgc2lnbmluIGZvcm0gd2l0aCB0aGUgYmVsb3cgdGV4dCwgc2Vzc2lvblN0b3JhZ2UucmVnaXN0ZXJlZFxyXG4gICAgICAgICAgICBzZXNzaW9uU3RvcmFnZVxyXG4gICAgICAgICAgICAucmdnZCA9IGJ0b2EoJ1lvdSBoYXZlIGJlZW4gcmVnaXN0ZXJlZCBzdWNjZXNzZnVsbHkhIE5vdyB5b3UgY2FuIHNpZ24gaW4gaGVyZScpOyAvL2VuY29kZSB3aXRoIGJhc2U2NFxyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZSgnL3VzZXJzL3NpZ25pbicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoeGhyLnN0YXR1cyA9PT0gNDIyKSB7XHJcbiAgICAgICAgICAgIGxldCBpbnZhbGlkRmllbGRzID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2UpO1xyXG4gICAgICAgICAgICBsZXQgcGFzID0gZm9ybS5xdWVyeVNlbGVjdG9yKCcjcGFzc3dvcmQnKVxyXG4gICAgICAgICAgICAgICAgLnZhbHVlO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbnB1dCBvZiBpbnB1dHMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpbnZhbGlkRmllbGRzLmluY2x1ZGVzKGlucHV0LmlkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0b29sdGlwVHh0ID0gaW5wdXQucGFyZW50Tm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEnKVxyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LnBhcmVudE5vZGUuc2V0QXR0cmlidXRlKCdkYXRhLXRvb2x0aXAnLCB0b29sdGlwVHh0KTtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dC5zdHlsZS5ib3JkZXJDb2xvciA9ICdyZWQnO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dC5zdHlsZS5ib3JkZXJDb2xvciA9ICcjQ0ZEOERDJztcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dC5wYXJlbnROb2RlLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS10b29sdGlwJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdXNlckNsYXNzKCkge1xyXG4gIHJldHVybiBmdW5jdGlvbiBVc2VyKGZpcnN0TmFtZSwgbGFzdE5hbWUsIGVtYWlsLCBkZXBhcnRtZW50LCBwYXNzd29yZCwgcmVwUGFzc3dvcmQsIHJvbGUpIHtcclxuICAgIHRoaXMuZmlyc3ROYW1lID0gZmlyc3ROYW1lO1xyXG4gICAgdGhpcy5sYXN0TmFtZSA9IGxhc3ROYW1lO1xyXG4gICAgdGhpcy5lbWFpbCA9IGVtYWlsO1xyXG4gICAgdGhpcy5kZXBhcnRtZW50ID0gZGVwYXJ0bWVudDtcclxuICAgIHRoaXMucGFzc3dvcmQgPSBwYXNzd29yZDtcclxuICAgIHRoaXMucmVwUGFzc3dvcmQgPSByZXBQYXNzd29yZDtcclxuICAgIHRoaXMucm9sZSA9IHJvbGUgfHwgJ21lbWJlcic7XHJcbiAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=