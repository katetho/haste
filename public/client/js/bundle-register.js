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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/client/js/register.ts");
/******/ })
/************************************************************************/
/******/ ({

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

/***/ "./src/client/js/register.ts":
/*!***********************************!*\
  !*** ./src/client/js/register.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const userClass_ts_1 = __webpack_require__(/*! ./userClass.ts */ "./src/client/js/userClass.ts");
const fetchData_ts_1 = __webpack_require__(/*! ./fetchData.ts */ "./src/client/js/fetchData.ts");
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
        fetchData_ts_1.default(new userClass_ts_1.default(...user), 'POST', '/users/register', postUser);
    };
})();
function postUser(res) {
    if (res.status === 200) {
        //for replacing 'Welcome!' in the signin form with the below text, sessionStorage.registered
        sessionStorage
            .rggd = btoa('You have been registered successfully! Now you can sign in here'); //encode with base64
        window.location.replace('/users/signin');
    }
    if (res.status === 422) {
        Promise.resolve(res.json()).then((data) => {
            let invalidFields = data;
            console.log(invalidFields);
            let form = document.querySelector('.user-register');
            let inputs = form.querySelectorAll('input, select');
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
        });
    }
}


/***/ }),

/***/ "./src/client/js/userClass.ts":
/*!************************************!*\
  !*** ./src/client/js/userClass.ts ***!
  \************************************/
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC9qcy9mZXRjaERhdGEudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC9qcy9yZWdpc3Rlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L2pzL3VzZXJDbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNsRkEsU0FBd0IsU0FBUyxDQUFDLElBQVMsRUFBRSxNQUFjLEVBQUUsS0FBYSxFQUFFLE9BQWlCO0lBQ3pGLEtBQUssQ0FBQyxLQUFLLEVBQUU7UUFDTCxNQUFNLEVBQUUsTUFBTTtRQUNkLE9BQU8sRUFBRTtZQUNMLGNBQWMsRUFBRSxrQkFBa0I7U0FDckM7UUFDRCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7S0FDN0IsQ0FBQztTQUNELElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQztJQUNoQixDQUFDLENBQUM7U0FDRCxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkIsQ0FBQyxDQUFDLENBQUM7QUFDWCxDQUFDO0FBZEQsNEJBY0M7Ozs7Ozs7Ozs7Ozs7OztBQ2RELGlHQUFrQztBQUNsQyxpR0FBdUM7QUFFdkMsQ0FBQyxTQUFTLFFBQVE7SUFDaEIsSUFBSSxJQUFJLEdBQWdCLFFBQVEsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUNqRSxJQUFJLE1BQU0sR0FBd0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ3pFLElBQUksV0FBVyxHQUFnQixJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQztJQUM5RCxXQUFXLENBQUMsT0FBTyxHQUFHO1FBQ2xCLGNBQWMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEMsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2QsMkJBQTJCO1FBQzNCLG1DQUFtQztRQUNuQyxLQUFLLElBQUksS0FBSyxJQUFJLE1BQU0sRUFBRTtZQUN4QixJQUFJLFFBQVEsR0FBK0IsS0FBTSxDQUFDLEtBQUs7WUFDdkQsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNyQjtRQUNELHNCQUFTLENBQUMsSUFBSSxzQkFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLGlCQUFpQixFQUFDLFFBQVEsQ0FBQztJQUNwRSxDQUFDO0FBQ0gsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUVMLFNBQVMsUUFBUSxDQUFDLEdBQUc7SUFDakIsSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtRQUNwQiw0RkFBNEY7UUFDNUYsY0FBYzthQUNiLElBQUksR0FBRyxJQUFJLENBQUMsaUVBQWlFLENBQUMsQ0FBQyxDQUFDLG9CQUFvQjtRQUNyRyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztLQUM1QztJQUNELElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7UUFDdEIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUMsRUFBRTtZQUN2QyxJQUFJLGFBQWEsR0FBa0IsSUFBSSxDQUFDO1lBQ3hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDO1lBQzFCLElBQUksSUFBSSxHQUFnQixRQUFRLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDakUsSUFBSSxNQUFNLEdBQTRCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQTRCLENBQUM7WUFDdEcsS0FBSyxJQUFJLEtBQUssSUFBSSxNQUFNLEVBQUU7Z0JBQ3RCLElBQUksYUFBYSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEVBQUU7b0JBQ2xDLElBQUksVUFBVSxHQUF5QixLQUFLLENBQUMsVUFBVyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDN0UsS0FBSyxDQUFDLFVBQTBCLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBRSxVQUFVLENBQUMsQ0FBQztvQkFDM0UsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO2lCQUNuQztxQkFBTTtvQkFDSCxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7b0JBQ25DLEtBQUssQ0FBQyxVQUEwQixDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsQ0FBQztpQkFDckU7YUFDSjtRQUNMLENBQUMsQ0FBQztLQUNIO0FBQ0wsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FDN0NELE1BQXFCLElBQUk7SUFTckIsWUFBWSxTQUFrQixFQUFFLFFBQWlCLEVBQUUsS0FBYyxFQUFFLFVBQW1CLEVBQUUsUUFBaUIsRUFBRSxXQUFvQixFQUFFLElBQWE7UUFDNUksSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksUUFBUSxDQUFDO0lBQy9CLENBQUM7Q0FDRjtBQWxCSCx1QkFrQkciLCJmaWxlIjoiYnVuZGxlLXJlZ2lzdGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvY2xpZW50L2pzL3JlZ2lzdGVyLnRzXCIpO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZmV0Y2hEYXRhKGRhdGE6IGFueSwgbWV0aG9kOiBzdHJpbmcsIHJvdXRlOiBzdHJpbmcsIHN1Y2Nlc3M6IEZ1bmN0aW9uKSB7XHJcbiAgICBmZXRjaChyb3V0ZSwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCwgLy8gb3IgJ1BVVCdcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSksXHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3MocmVzKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcbn1cclxuIiwiaW1wb3J0IFVzZXIgZnJvbSAnLi91c2VyQ2xhc3MudHMnO1xyXG5pbXBvcnQgZmV0Y2hEYXRhIGZyb20gJy4vZmV0Y2hEYXRhLnRzJztcclxuXHJcbihmdW5jdGlvbiByZWdpc3RlcigpIHtcclxuICBsZXQgZm9ybTogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudXNlci1yZWdpc3RlcicpO1xyXG4gIGxldCBpbnB1dHM6IE5vZGVMaXN0T2Y8RWxlbWVudD4gPSBmb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0LCBzZWxlY3QnKTtcclxuICBsZXQgcmVnaXN0ZXJCdG46IEhUTUxFbGVtZW50ID0gZm9ybS5xdWVyeVNlbGVjdG9yKCcuYnRuLXVzZXInKVxyXG4gIHJlZ2lzdGVyQnRuLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbSgncmdnZCcpO1xyXG4gICAgICBsZXQgdXNlciA9IFtdO1xyXG4gICAgICAvL2Zvci4uLmluIGl0ZXJhdGVkIHRocm91Z2hcclxuICAgICAgLy9ub24tZW51bWVyYWJsZSBwcm9wcyBpbiB0aGlzIGNhc2VcclxuICAgICAgZm9yIChsZXQgaW5wdXQgb2YgaW5wdXRzKSB7XHJcbiAgICAgICAgbGV0IGlucHV0VmFsOiBzdHJpbmcgPSAgKDxIVE1MSW5wdXRFbGVtZW50PmlucHV0KS52YWx1ZVxyXG4gICAgICAgIHVzZXIucHVzaChpbnB1dFZhbCk7XHJcbiAgICAgIH1cclxuICAgICAgZmV0Y2hEYXRhKG5ldyBVc2VyKC4uLnVzZXIpLCAnUE9TVCcsICcvdXNlcnMvcmVnaXN0ZXInLHBvc3RVc2VyKVxyXG4gIH1cclxufSkoKTtcclxuXHJcbmZ1bmN0aW9uIHBvc3RVc2VyKHJlcyk6IHZvaWQge1xyXG4gICAgaWYgKHJlcy5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICAgIC8vZm9yIHJlcGxhY2luZyAnV2VsY29tZSEnIGluIHRoZSBzaWduaW4gZm9ybSB3aXRoIHRoZSBiZWxvdyB0ZXh0LCBzZXNzaW9uU3RvcmFnZS5yZWdpc3RlcmVkXHJcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2VcclxuICAgICAgICAucmdnZCA9IGJ0b2EoJ1lvdSBoYXZlIGJlZW4gcmVnaXN0ZXJlZCBzdWNjZXNzZnVsbHkhIE5vdyB5b3UgY2FuIHNpZ24gaW4gaGVyZScpOyAvL2VuY29kZSB3aXRoIGJhc2U2NFxyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKCcvdXNlcnMvc2lnbmluJyk7XHJcbiAgICB9XHJcbiAgICBpZiAocmVzLnN0YXR1cyA9PT0gNDIyKSB7XHJcbiAgICAgIFByb21pc2UucmVzb2x2ZShyZXMuanNvbigpKS50aGVuKChkYXRhKT0+e1xyXG4gICAgICAgIGxldCBpbnZhbGlkRmllbGRzOiBBcnJheTxzdHJpbmc+ID0gZGF0YTtcclxuICAgICAgICBjb25zb2xlLmxvZyhpbnZhbGlkRmllbGRzKVxyXG4gICAgICAgIGxldCBmb3JtOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51c2VyLXJlZ2lzdGVyJyk7XHJcbiAgICAgICAgbGV0IGlucHV0czogTm9kZUxpc3RPZjxIVE1MRWxlbWVudD4gPSBmb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0LCBzZWxlY3QnKSBhcyBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PjtcclxuICAgICAgICAgIGZvciAobGV0IGlucHV0IG9mIGlucHV0cykge1xyXG4gICAgICAgICAgICAgIGlmIChpbnZhbGlkRmllbGRzLmluY2x1ZGVzKGlucHV0LmlkKSkge1xyXG4gICAgICAgICAgICAgICAgICBsZXQgdG9vbHRpcFR4dDogc3RyaW5nID0gKDxIVE1MRWxlbWVudD5pbnB1dC5wYXJlbnROb2RlKS5nZXRBdHRyaWJ1dGUoJ2RhdGEnKTtcclxuICAgICAgICAgICAgICAgICAgKGlucHV0LnBhcmVudE5vZGUgYXMgSFRNTEVsZW1lbnQpLnNldEF0dHJpYnV0ZSgnZGF0YS10b29sdGlwJywgdG9vbHRpcFR4dCk7XHJcbiAgICAgICAgICAgICAgICAgIGlucHV0LnN0eWxlLmJvcmRlckNvbG9yID0gJ3JlZCc7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgaW5wdXQuc3R5bGUuYm9yZGVyQ29sb3IgPSAnI0NGRDhEQyc7XHJcbiAgICAgICAgICAgICAgICAgIChpbnB1dC5wYXJlbnROb2RlIGFzIEhUTUxFbGVtZW50KS5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtdG9vbHRpcCcpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VyIHtcclxuICAgIGZpcnN0TmFtZTogc3RyaW5nO1xyXG4gICAgbGFzdE5hbWU6IHN0cmluZztcclxuICAgIGVtYWlsOiBzdHJpbmc7XHJcbiAgICBkZXBhcnRtZW50OiBzdHJpbmc7XHJcbiAgICBwYXNzd29yZDogc3RyaW5nO1xyXG4gICAgcmVwUGFzc3dvcmQ6IHN0cmluZztcclxuICAgIHJvbGU6IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihmaXJzdE5hbWU/OiBzdHJpbmcsIGxhc3ROYW1lPzogc3RyaW5nLCBlbWFpbD86IHN0cmluZywgZGVwYXJ0bWVudD86IHN0cmluZywgcGFzc3dvcmQ/OiBzdHJpbmcsIHJlcFBhc3N3b3JkPzogc3RyaW5nLCByb2xlPzogc3RyaW5nKSB7XHJcbiAgICAgIHRoaXMuZmlyc3ROYW1lID0gZmlyc3ROYW1lO1xyXG4gICAgICB0aGlzLmxhc3ROYW1lID0gbGFzdE5hbWU7XHJcbiAgICAgIHRoaXMuZW1haWwgPSBlbWFpbDtcclxuICAgICAgdGhpcy5kZXBhcnRtZW50ID0gZGVwYXJ0bWVudDtcclxuICAgICAgdGhpcy5wYXNzd29yZCA9IHBhc3N3b3JkO1xyXG4gICAgICB0aGlzLnJlcFBhc3N3b3JkID0gcmVwUGFzc3dvcmQ7XHJcbiAgICAgIHRoaXMucm9sZSA9IHJvbGUgfHwgJ21lbWJlcic7XHJcbiAgICB9XHJcbiAgfVxyXG4iXSwic291cmNlUm9vdCI6IiJ9