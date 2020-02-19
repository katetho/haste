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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/register.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/register.js":
/*!****************************!*\
  !*** ./src/js/register.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _registerReq__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./registerReq */ "./src/js/registerReq.js");
/* harmony import */ var _userClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./userClass */ "./src/js/userClass.js");


let User = Object(_userClass__WEBPACK_IMPORTED_MODULE_1__["default"])();

(function registerForm() {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3JlZ2lzdGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9yZWdpc3RlclJlcS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXNlckNsYXNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFBO0FBQXFDO0FBQ0Q7QUFDcEMsV0FBVywwREFBUzs7QUFFcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsNERBQVE7QUFDaEI7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7O0FDcEJEO0FBQUE7QUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEZBQTRGO0FBQzVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQy9CQTtBQUFBO0FBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYnVuZGxlLXJlZ2lzdGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvanMvcmVnaXN0ZXIuanNcIik7XG4iLCJpbXBvcnQgcG9zdFVzZXIgZnJvbSAnLi9yZWdpc3RlclJlcSc7XHJcbmltcG9ydCB1c2VyQ2xhc3MgZnJvbSAnLi91c2VyQ2xhc3MnO1xyXG5sZXQgVXNlciA9IHVzZXJDbGFzcygpO1xyXG5cclxuKGZ1bmN0aW9uIHJlZ2lzdGVyRm9ybSgpIHtcclxuICAgIGxldCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndXNlci1yZWdpc3RlcicpWzBdO1xyXG4gICAgbGV0IGlucHV0cyA9IGZvcm0ucXVlcnlTZWxlY3RvckFsbCgnaW5wdXQsIHNlbGVjdCcpO1xyXG4gICAgbGV0IHJlZ2lzdGVyQnRuID0gZm9ybS5xdWVyeVNlbGVjdG9yKCcuYnRuLXVzZXInKVxyXG4gICAgcmVnaXN0ZXJCdG4ub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oJ3JlZ2lzdGVyZWQnKTtcclxuICAgICAgICBsZXQgdXNlciA9IFtdO1xyXG4gICAgICAgIC8vZm9yLi4uaW4gaXRlcmF0ZWQgdGhyb3VnaFxyXG4gICAgICAgIC8vbm9uLWVudW1lcmFibGUgcHJvcHMgaW4gdGhpcyBjYXNlXHJcbiAgICAgICAgZm9yIChsZXQgaW5wdXQgb2YgaW5wdXRzKSB7XHJcbiAgICAgICAgICAgIGlmIChpbnB1dFsnaWQnXSAhPT0gJ3JlcGVhdFBhc3N3b3JkJykge1xyXG4gICAgICAgICAgICAgICAgdXNlci5wdXNoKGlucHV0LnZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBwb3N0VXNlcihuZXcgVXNlciguLi51c2VyKSk7XHJcbiAgICB9XHJcbn0pKCk7XHJcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBvc3RSZWdpc3Rlcih1c2VyKSB7XHJcbiAgICBsZXQgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3VzZXItcmVnaXN0ZXInKVswXTtcclxuICAgIGxldCBpbnB1dHMgPSBmb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0LCBzZWxlY3QnKTtcclxuICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgIHhoci5vcGVuKCdQT1NUJywgJy91c2Vycy9yZWdpc3RlcicpO1xyXG4gICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XHJcbiAgICB4aHIuc2VuZChKU09OLnN0cmluZ2lmeSh1c2VyKSk7XHJcbiAgICB4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKHhoci5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAvL2ZvciByZXBsYWNpbmcgJ1dlbGNvbWUhJyBpbiB0aGUgc2lnbmluIGZvcm0gd2l0aCB0aGUgYmVsb3cgdGV4dCwgc2Vzc2lvblN0b3JhZ2UucmVnaXN0ZXJlZFxyXG4gICAgICAgICAgICBzZXNzaW9uU3RvcmFnZVxyXG4gICAgICAgICAgICAucmdnZCA9IGJ0b2EoJ1lvdSBoYXZlIGJlZW4gcmVnaXN0ZXJlZCBzdWNjZXNzZnVsbHkhIE5vdyB5b3UgY2FuIHNpZ24gaW4gaGVyZScpOyAvL2VuY29kZSB3aXRoIGJhc2U2NFxyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZSgnL3VzZXJzL3NpZ25pbicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoeGhyLnN0YXR1cyA9PT0gNDIyKSB7XHJcbiAgICAgICAgICAgIGxldCBpbnZhbGlkRmllbGRzID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2UpO1xyXG4gICAgICAgICAgICBsZXQgcGFzID0gZm9ybS5xdWVyeVNlbGVjdG9yKCcjcGFzc3dvcmQnKVxyXG4gICAgICAgICAgICAgICAgLnZhbHVlO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbnB1dCBvZiBpbnB1dHMpIHtcclxuICAgICAgICAgICAgICAgIGxldCBwYXNzZXNEb250TWF0Y2ggPSAoaW5wdXQuaWQgPT09ICdyZXBlYXRQYXNzd29yZCcgJiYgaW5wdXQudmFsdWUgIT09IHBhcyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW52YWxpZEZpZWxkcy5pbmNsdWRlcyhpbnB1dC5pZCkgfHwgcGFzc2VzRG9udE1hdGNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRvb2x0aXBUeHQgPSBpbnB1dC5wYXJlbnROb2RlLmdldEF0dHJpYnV0ZSgnZGF0YScpXHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQucGFyZW50Tm9kZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdG9vbHRpcCcsIHRvb2x0aXBUeHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LnN0eWxlLmJvcmRlckNvbG9yID0gJ3JlZCc7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LnN0eWxlLmJvcmRlckNvbG9yID0gJyNDRkQ4REMnO1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LnBhcmVudE5vZGUucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXRvb2x0aXAnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1c2VyQ2xhc3MoKSB7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uIFVzZXIoZmlyc3ROYW1lLCBsYXN0TmFtZSwgZW1haWwsIGRlcGFydG1lbnQsIHBhc3N3b3JkLCByb2xlKSB7XHJcbiAgICB0aGlzLmZpcnN0TmFtZSA9IGZpcnN0TmFtZTtcclxuICAgIHRoaXMubGFzdE5hbWUgPSBsYXN0TmFtZTtcclxuICAgIHRoaXMuZW1haWwgPSBlbWFpbDtcclxuICAgIHRoaXMuZGVwYXJ0bWVudCA9IGRlcGFydG1lbnQ7XHJcbiAgICB0aGlzLnBhc3N3b3JkID0gcGFzc3dvcmQ7XHJcbiAgICB0aGlzLnJvbGUgPSByb2xlIHx8ICdtZW1iZXInO1xyXG4gIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9