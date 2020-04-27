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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/client/js/auth.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/client/js/auth.ts":
/*!*******************************!*\
  !*** ./src/client/js/auth.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const fetchData_ts_1 = __webpack_require__(/*! ./fetchData.ts */ "./src/client/js/fetchData.ts");
let welcomeTxt = document.querySelector('.welcome-txt');
let submitSignin = document.querySelector('.btn-user');
if (sessionStorage.rggd) {
    welcomeTxt.innerHTML = atob(sessionStorage.rggd); //decode from base64
}
submitSignin.onclick = function () {
    let email = document.querySelector('input[type=email]').value;
    let password = document.querySelector('input[type=password]').value;
    let user = {
        email,
        password
    };
    fetchData_ts_1.default(user, 'POST', '/users/signin', postAuth);
};
function postAuth(res) {
    let fields = document.querySelectorAll('input');
    let username;
    if (res.status === 200) {
        Promise.resolve(res.json()).then((data) => {
            username = data;
            localStorage.un = username;
            window.location.replace('/');
        });
    }
    if (res.status === 401) { //user doesn't exist
        Promise.resolve(res.json()).then((data) => {
            let wrong = data;
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
        });
    }
    if (res.status === 422) { //missing data
        Promise.resolve(res.json()).then((data) => {
            let missing = data;
            for (let field of fields) { //or missing[field] for es5
                if (missing.includes(field.type)) {
                    field.parentNode.removeAttribute('data-tooltip');
                    field.style.borderColor = 'red';
                }
                else {
                    field.style.borderColor = '#CFD8DC';
                }
            }
        });
    }
}


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


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC9qcy9hdXRoLnRzIiwid2VicGFjazovLy8uL3NyYy9jbGllbnQvanMvZmV0Y2hEYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQSxpR0FBdUM7QUFFdkMsSUFBSSxVQUFVLEdBQWdCLFFBQVEsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDckUsSUFBSSxZQUFZLEdBQWdCLFFBQVEsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUM7QUFFcEUsSUFBSSxjQUFjLENBQUMsSUFBSSxFQUFFO0lBQ3JCLFVBQVUsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLG9CQUFvQjtDQUN6RTtBQUNELFlBQVksQ0FBQyxPQUFPLEdBQUc7SUFDbkIsSUFBSSxLQUFLLEdBQThCLFFBQVEsQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUUsQ0FBQyxLQUFLLENBQUM7SUFDMUYsSUFBSSxRQUFRLEdBQThCLFFBQVEsQ0FBQyxhQUFhLENBQUMsc0JBQXNCLENBQUUsQ0FBQyxLQUFLLENBQUM7SUFDaEcsSUFBSSxJQUFJLEdBQUc7UUFDUCxLQUFLO1FBQ0wsUUFBUTtLQUNYO0lBQ0Qsc0JBQVMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLGVBQWUsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUN2RCxDQUFDO0FBRUQsU0FBUyxRQUFRLENBQUMsR0FBTztJQUN2QixJQUFJLE1BQU0sR0FBNEIsUUFBUSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3pFLElBQUksUUFBZ0IsQ0FBQztJQUNyQixJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO1FBQ3BCLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFDLEVBQUU7WUFDekMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUNoQixZQUFZLENBQUMsRUFBRSxHQUFHLFFBQVEsQ0FBQztZQUMzQixNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7UUFDOUIsQ0FBQyxDQUFDO0tBQ0g7SUFDRCxJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFLEVBQUUsb0JBQW9CO1FBQzFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFDLEVBQUU7WUFDekMsSUFBSSxLQUFLLEdBQWtCLElBQUksQ0FBQztZQUNoQyxLQUFLLElBQUksS0FBSyxJQUFJLE1BQU0sRUFBRSxFQUFFLDJCQUEyQjtnQkFDbkQsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFvQixLQUFNLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQ2hELEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztvQkFDaEMsSUFBSSxVQUFVLEdBQWlCLEtBQUssQ0FBQyxVQUFXLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUN4RCxLQUFLLENBQUMsVUFBVyxDQUFDLFlBQVksQ0FBQyxjQUFjLEVBQUUsVUFBVSxDQUFDLENBQUM7aUJBQzVFO3FCQUFNO29CQUNXLEtBQUssQ0FBQyxVQUFXLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxDQUFDO29CQUNoRSxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7aUJBQ3ZDO2FBQ0o7UUFDSCxDQUFDLENBQUMsQ0FBQztLQUNKO0lBQ0QsSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRSxFQUFFLGNBQWM7UUFDdEMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUMsRUFBRTtZQUN2QyxJQUFJLE9BQU8sR0FBa0IsSUFBSSxDQUFDO1lBQ2xDLEtBQUssSUFBSSxLQUFLLElBQUksTUFBTSxFQUFFLEVBQUUsMkJBQTJCO2dCQUNuRCxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQW9CLEtBQU0sQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDcEMsS0FBSyxDQUFDLFVBQVcsQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLENBQUM7b0JBQ2hFLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztpQkFDbkM7cUJBQU07b0JBQ0gsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDO2lCQUN2QzthQUNKO1FBQ0wsQ0FBQyxDQUFDLENBQUM7S0FDSjtBQUNELENBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ3hERCxTQUF3QixTQUFTLENBQUMsSUFBUyxFQUFFLE1BQWMsRUFBRSxLQUFhLEVBQUUsT0FBaUI7SUFDekYsS0FBSyxDQUFDLEtBQUssRUFBRTtRQUNMLE1BQU0sRUFBRSxNQUFNO1FBQ2QsT0FBTyxFQUFFO1lBQ0wsY0FBYyxFQUFFLGtCQUFrQjtTQUNyQztRQUNELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztLQUM3QixDQUFDO1NBQ0QsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFDVixPQUFPLENBQUMsR0FBRyxDQUFDO0lBQ2hCLENBQUMsQ0FBQztTQUNELEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QixDQUFDLENBQUMsQ0FBQztBQUNYLENBQUM7QUFkRCw0QkFjQyIsImZpbGUiOiJidW5kbGUtc2lnbmluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvY2xpZW50L2pzL2F1dGgudHNcIik7XG4iLCJpbXBvcnQgZmV0Y2hEYXRhIGZyb20gJy4vZmV0Y2hEYXRhLnRzJztcclxuXHJcbmxldCB3ZWxjb21lVHh0OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53ZWxjb21lLXR4dCcpO1xyXG5sZXQgc3VibWl0U2lnbmluOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG4tdXNlcicpO1xyXG5cclxuaWYgKHNlc3Npb25TdG9yYWdlLnJnZ2QpIHtcclxuICAgIHdlbGNvbWVUeHQuaW5uZXJIVE1MID0gYXRvYihzZXNzaW9uU3RvcmFnZS5yZ2dkKTsgLy9kZWNvZGUgZnJvbSBiYXNlNjRcclxufVxyXG5zdWJtaXRTaWduaW4ub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IGVtYWlsOiBzdHJpbmcgPSAoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1lbWFpbF0nKSkudmFsdWU7XHJcbiAgICBsZXQgcGFzc3dvcmQ6IHN0cmluZyA9ICg8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPXBhc3N3b3JkXScpKS52YWx1ZTtcclxuICAgIGxldCB1c2VyID0ge1xyXG4gICAgICAgIGVtYWlsLFxyXG4gICAgICAgIHBhc3N3b3JkXHJcbiAgICB9XHJcbiAgICBmZXRjaERhdGEodXNlciwgJ1BPU1QnLCAnL3VzZXJzL3NpZ25pbicsIHBvc3RBdXRoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcG9zdEF1dGgocmVzOmFueSk6IHZvaWQge1xyXG4gIGxldCBmaWVsZHM6IE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXQnKTtcclxuICBsZXQgdXNlcm5hbWU6IHN0cmluZztcclxuICBpZiAocmVzLnN0YXR1cyA9PT0gMjAwKSB7XHJcbiAgICAgIFByb21pc2UucmVzb2x2ZShyZXMuanNvbigpKS50aGVuKChkYXRhKT0+e1xyXG4gICAgICB1c2VybmFtZSA9IGRhdGE7XHJcbiAgICAgIGxvY2FsU3RvcmFnZS51biA9IHVzZXJuYW1lO1xyXG4gICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZSgnLycpXHJcbiAgICB9KVxyXG4gIH1cclxuICBpZiAocmVzLnN0YXR1cyA9PT0gNDAxKSB7IC8vdXNlciBkb2Vzbid0IGV4aXN0XHJcbiAgICAgIFByb21pc2UucmVzb2x2ZShyZXMuanNvbigpKS50aGVuKChkYXRhKT0+e1xyXG4gICAgICBsZXQgd3Jvbmc6IEFycmF5PHN0cmluZz4gPSBkYXRhO1xyXG4gICAgICBmb3IgKGxldCBmaWVsZCBvZiBmaWVsZHMpIHsgLy9vciBtaXNzaW5nW2ZpZWxkXSBmb3IgZXM1XHJcbiAgICAgICAgICBpZiAod3JvbmcuaW5jbHVkZXMoKDxIVE1MSW5wdXRFbGVtZW50PmZpZWxkKS50eXBlKSkge1xyXG4gICAgICAgICAgICAgIGZpZWxkLnN0eWxlLmJvcmRlckNvbG9yID0gJ3JlZCc7XHJcbiAgICAgICAgICAgICAgbGV0IHRvb2x0aXBUeHQgPSAoPEhUTUxFbGVtZW50PmZpZWxkLnBhcmVudE5vZGUpLmdldEF0dHJpYnV0ZSgnZGF0YScpO1xyXG4gICAgICAgICAgICAgICg8SFRNTEVsZW1lbnQ+ZmllbGQucGFyZW50Tm9kZSkuc2V0QXR0cmlidXRlKCdkYXRhLXRvb2x0aXAnLCB0b29sdGlwVHh0KTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgKDxIVE1MRWxlbWVudD5maWVsZC5wYXJlbnROb2RlKS5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtdG9vbHRpcCcpO1xyXG4gICAgICAgICAgICAgIGZpZWxkLnN0eWxlLmJvcmRlckNvbG9yID0gJyNDRkQ4REMnO1xyXG4gICAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbiAgaWYgKHJlcy5zdGF0dXMgPT09IDQyMikgeyAvL21pc3NpbmcgZGF0YVxyXG4gICAgUHJvbWlzZS5yZXNvbHZlKHJlcy5qc29uKCkpLnRoZW4oKGRhdGEpPT57XHJcbiAgICAgIGxldCBtaXNzaW5nOiBBcnJheTxzdHJpbmc+ID0gZGF0YTtcclxuICAgICAgZm9yIChsZXQgZmllbGQgb2YgZmllbGRzKSB7IC8vb3IgbWlzc2luZ1tmaWVsZF0gZm9yIGVzNVxyXG4gICAgICAgICAgaWYgKG1pc3NpbmcuaW5jbHVkZXMoKDxIVE1MSW5wdXRFbGVtZW50PmZpZWxkKS50eXBlKSkge1xyXG4gICAgICAgICAgICAgICg8SFRNTEVsZW1lbnQ+ZmllbGQucGFyZW50Tm9kZSkucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXRvb2x0aXAnKTtcclxuICAgICAgICAgICAgICBmaWVsZC5zdHlsZS5ib3JkZXJDb2xvciA9ICdyZWQnO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBmaWVsZC5zdHlsZS5ib3JkZXJDb2xvciA9ICcjQ0ZEOERDJztcclxuICAgICAgICAgIH1cclxuICAgICAgfVxyXG4gIH0pO1xyXG59XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZmV0Y2hEYXRhKGRhdGE6IGFueSwgbWV0aG9kOiBzdHJpbmcsIHJvdXRlOiBzdHJpbmcsIHN1Y2Nlc3M6IEZ1bmN0aW9uKSB7XHJcbiAgICBmZXRjaChyb3V0ZSwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCwgLy8gb3IgJ1BVVCdcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSksXHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3MocmVzKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==