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
const registerReq_ts_1 = __webpack_require__(/*! ./registerReq.ts */ "./src/js/registerReq.ts");
const userClass_ts_1 = __webpack_require__(/*! ./userClass.ts */ "./src/js/userClass.ts");
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
        registerReq_ts_1.default(new userClass_ts_1.default(...user));
    };
})();


/***/ }),

/***/ "./src/js/registerReq.ts":
/*!*******************************!*\
  !*** ./src/js/registerReq.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function postRegister(user) {
    let form = document.querySelector('.user-register');
    let inputs = form.querySelectorAll('input, select');
    ;
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/users/register');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(user));
    xhr.onload = function () {
        if (xhr.status === 200) {
            //for replacing 'Welcome!' in the signin form with the below text, sessionStorage.registered
            sessionStorage
                .rggd = btoa('You have been registered successfully! Now you can sign in here'); //encode with base64
            window.location.replace('/users/signin');
        }
        if (xhr.status === 422) {
            let invalidFields = JSON.parse(xhr.response);
            for (let input of inputs) {
                if (invalidFields.includes(input.id)) {
                    let tooltipTxt = input.parentNode.getAttribute('data');
                    input.parentNode.setAttribute('data-tooltip', tooltipTxt);
                    input.style.borderColor = 'red';
                }
                else {
                    input.style.borderColor = '#CFD8DC';
                    input.parentNode.removeAttribute('data-tooltip');
                }
            }
        }
    };
}
exports.default = postRegister;


/***/ }),

/***/ "./src/js/userClass.ts":
/*!*****************************!*\
  !*** ./src/js/userClass.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(firstName, lastName, email, department, password, repPassword, role) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.department = department;
        this.password = password;
        this.repPassword = repPassword;
        this.role = role || 'member';
    }
}
exports.default = User;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3JlZ2lzdGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9qcy9yZWdpc3RlclJlcS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXNlckNsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQSxnR0FBd0M7QUFDeEMsMEZBQWtDO0FBRWxDLENBQUMsU0FBUyxRQUFRO0lBQ2hCLElBQUksSUFBSSxHQUFnQixRQUFRLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDakUsSUFBSSxNQUFNLEdBQXdCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUN6RSxJQUFJLFdBQVcsR0FBZ0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUM7SUFDOUQs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LElBQUksR0FBRyxJQUFJLElBQUksUUFBUSxDQUFDO0lBQy9CLENBQUM7Q0FDRjtBQWxCSCx1QkFrQkciLCJmaWxlIjoiYnVuZGxlLXJlZ2lzdGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvanMvcmVnaXN0ZXIudHNcIik7XG4iLCJpbXBvcnQgcG9zdFVzZXIgZnJvbSAnLi9yZWdpc3RlclJlcS50cyc7XHJcbmltcG9ydCBVc2VyIGZyb20gJy4vdXNlckNsYXNzLnRzJztcclxuXHJcbihmdW5jdGlvbiByZWdpc3RlcigpIHtcclxuICBsZXQgZm9ybTogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudXNlci1yZWdpc3RlcicpO1xyXG4gIGxldCBpbnB1dHM6IE5vZGVMaXN0T2Y8RWxlbWVudD4gPSBmb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0LCBzZWxlY3QnKTtcclxuICBsZXQgcmVnaXN0ZXJCdG46IEhUTUxFbGVtZW50ID0gZm9ybS5xdWVyeVNlbGVjdG9yKCcuYnRuLXVzZXInKVxyXG4gIHJlZ2lzdGVyQnRuLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbSgncmdnZCcpO1xyXG4gICAgICBsZXQgdXNlciA9IFtdO1xyXG4gICAgICAvL2Zvci4uLmluIGl0ZXJhdGVkIHRocm91Z2hcclxuICAgICAgLy9ub24tZW51bWVyYWJsZSBwcm9wcyBpbiB0aGlzIGNhc2VcclxuICAgICAgZm9yIChsZXQgaW5wdXQgb2YgaW5wdXRzKSB7XHJcbiAgICAgICAgbGV0IGlucHV0VmFsOiBzdHJpbmcgPSAgKDxIVE1MSW5wdXRFbGVtZW50PmlucHV0KS52YWx1ZVxyXG4gICAgICAgIHVzZXIucHVzaChpbnB1dFZhbCk7XHJcbiAgICAgIH1cclxuICAgICAgcG9zdFVzZXIobmV3IFVzZXIoLi4udXNlcikpO1xyXG4gIH1cclxufSkoKTtcclxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcG9zdFJlZ2lzdGVyKHVzZXIpIHtcclxuICAgIGxldCBmb3JtOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51c2VyLXJlZ2lzdGVyJyk7XHJcbiAgICBsZXQgaW5wdXRzOiBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PiA9IGZvcm0ucXVlcnlTZWxlY3RvckFsbCgnaW5wdXQsIHNlbGVjdCcpIGFzIE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+OztcclxuICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgIHhoci5vcGVuKCdQT1NUJywgJy91c2Vycy9yZWdpc3RlcicpO1xyXG4gICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XHJcbiAgICB4aHIuc2VuZChKU09OLnN0cmluZ2lmeSh1c2VyKSk7XHJcbiAgICB4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKHhoci5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAvL2ZvciByZXBsYWNpbmcgJ1dlbGNvbWUhJyBpbiB0aGUgc2lnbmluIGZvcm0gd2l0aCB0aGUgYmVsb3cgdGV4dCwgc2Vzc2lvblN0b3JhZ2UucmVnaXN0ZXJlZFxyXG4gICAgICAgICAgICBzZXNzaW9uU3RvcmFnZVxyXG4gICAgICAgICAgICAucmdnZCA9IGJ0b2EoJ1lvdSBoYXZlIGJlZW4gcmVnaXN0ZXJlZCBzdWNjZXNzZnVsbHkhIE5vdyB5b3UgY2FuIHNpZ24gaW4gaGVyZScpOyAvL2VuY29kZSB3aXRoIGJhc2U2NFxyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZSgnL3VzZXJzL3NpZ25pbicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoeGhyLnN0YXR1cyA9PT0gNDIyKSB7XHJcbiAgICAgICAgICAgIGxldCBpbnZhbGlkRmllbGRzOiBBcnJheTxzdHJpbmc+ID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2UpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbnB1dCBvZiBpbnB1dHMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpbnZhbGlkRmllbGRzLmluY2x1ZGVzKGlucHV0LmlkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0b29sdGlwVHh0OiBzdHJpbmcgPSAoPEhUTUxFbGVtZW50PmlucHV0LnBhcmVudE5vZGUpLmdldEF0dHJpYnV0ZSgnZGF0YScpO1xyXG4gICAgICAgICAgICAgICAgICAgIChpbnB1dC5wYXJlbnROb2RlIGFzIEhUTUxFbGVtZW50KS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdG9vbHRpcCcsIHRvb2x0aXBUeHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LnN0eWxlLmJvcmRlckNvbG9yID0gJ3JlZCc7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LnN0eWxlLmJvcmRlckNvbG9yID0gJyNDRkQ4REMnO1xyXG4gICAgICAgICAgICAgICAgICAgIChpbnB1dC5wYXJlbnROb2RlIGFzIEhUTUxFbGVtZW50KS5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtdG9vbHRpcCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXIge1xyXG4gICAgZmlyc3ROYW1lOiBzdHJpbmc7XHJcbiAgICBsYXN0TmFtZTogc3RyaW5nO1xyXG4gICAgZW1haWw6IHN0cmluZztcclxuICAgIGRlcGFydG1lbnQ6IHN0cmluZztcclxuICAgIHBhc3N3b3JkOiBzdHJpbmc7XHJcbiAgICByZXBQYXNzd29yZDogc3RyaW5nO1xyXG4gICAgcm9sZTogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGZpcnN0TmFtZT86IHN0cmluZywgbGFzdE5hbWU/OiBzdHJpbmcsIGVtYWlsPzogc3RyaW5nLCBkZXBhcnRtZW50Pzogc3RyaW5nLCBwYXNzd29yZD86IHN0cmluZywgcmVwUGFzc3dvcmQ/OiBzdHJpbmcsIHJvbGU/OiBzdHJpbmcpIHtcclxuICAgICAgdGhpcy5maXJzdE5hbWUgPSBmaXJzdE5hbWU7XHJcbiAgICAgIHRoaXMubGFzdE5hbWUgPSBsYXN0TmFtZTtcclxuICAgICAgdGhpcy5lbWFpbCA9IGVtYWlsO1xyXG4gICAgICB0aGlzLmRlcGFydG1lbnQgPSBkZXBhcnRtZW50O1xyXG4gICAgICB0aGlzLnBhc3N3b3JkID0gcGFzc3dvcmQ7XHJcbiAgICAgIHRoaXMucmVwUGFzc3dvcmQgPSByZXBQYXNzd29yZDtcclxuICAgICAgdGhpcy5yb2xlID0gcm9sZSB8fCAnbWVtYmVyJztcclxuICAgIH1cclxuICB9XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=