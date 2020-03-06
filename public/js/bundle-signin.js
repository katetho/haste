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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/auth.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/auth.ts":
/*!************************!*\
  !*** ./src/js/auth.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const authReq_ts_1 = __webpack_require__(/*! ./authReq.ts */ "./src/js/authReq.ts");
let welcomeTxt = document.querySelector('.welcome-txt');
let submitSignin = document.querySelector('.btn-user');
if (sessionStorage.rggd) {
    welcomeTxt.innerHTML = atob(sessionStorage.rggd); //decode from base64
}
submitSignin.onclick = function () {
    let email = document.querySelector('input[type=email]').value;
    let password = document.querySelector('input[type=password]').value;
    let user = {
        email: email,
        password: password
    };
    authReq_ts_1.default(user);
};


/***/ }),

/***/ "./src/js/authReq.ts":
/*!***************************!*\
  !*** ./src/js/authReq.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function postAuth(userCredentials) {
    let fields = document.querySelectorAll('input');
    let username;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/users/signin", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(userCredentials));
    xhr.onload = function () {
        if (xhr.status === 200) {
            username = JSON.parse(xhr.response);
            localStorage.un = username; //base64 encoded
            window.location.replace('/');
        }
        if (xhr.status === 401) { //user doesn't exist
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
        if (xhr.status === 422) { //missing data
            let missing = JSON.parse(xhr.response);
            for (let field of fields) { //or missing[field] for es5
                if (missing.includes(field.type)) {
                    field.parentNode.removeAttribute('data-tooltip');
                    field.style.borderColor = 'red';
                }
                else {
                    field.style.borderColor = '#CFD8DC';
                }
            }
            //tooltip+red border
        }
    };
}
exports.default = postAuth;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2F1dGgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2F1dGhSZXEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBLG9GQUFvQztBQUVwQyxJQUFJLFVBQVUsR0FBZ0IsUUFBUSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUNyRSxJQUFJLFlBQVksR0FBZ0IsUUFBUSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUVwRSxJQUFJLGNBQWMsQ0FBQyxJQUFJLEVBQUU7SUFDckIsVUFBVSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsb0JBQW9CO0NBQ3pFO0FBQ0QsWUFBWSxDQUFDLE9BQU8sR0FBRztJQUNu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aWxlIjoiYnVuZGxlLXNpZ25pbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2pzL2F1dGgudHNcIik7XG4iLCJpbXBvcnQgcG9zdEF1dGggZnJvbSAnLi9hdXRoUmVxLnRzJztcclxuXHJcbmxldCB3ZWxjb21lVHh0OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53ZWxjb21lLXR4dCcpO1xyXG5sZXQgc3VibWl0U2lnbmluOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG4tdXNlcicpO1xyXG5cclxuaWYgKHNlc3Npb25TdG9yYWdlLnJnZ2QpIHtcclxuICAgIHdlbGNvbWVUeHQuaW5uZXJIVE1MID0gYXRvYihzZXNzaW9uU3RvcmFnZS5yZ2dkKTsgLy9kZWNvZGUgZnJvbSBiYXNlNjRcclxufVxyXG5zdWJtaXRTaWduaW4ub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IGVtYWlsOiBzdHJpbmcgPSAoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1lbWFpbF0nKSkudmFsdWU7XHJcbiAgICBsZXQgcGFzc3dvcmQ6IHN0cmluZyA9ICg8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPXBhc3N3b3JkXScpKS52YWx1ZTtcclxuICAgIGxldCB1c2VyID0ge1xyXG4gICAgICAgIGVtYWlsOiBlbWFpbCxcclxuICAgICAgICBwYXNzd29yZDogcGFzc3dvcmRcclxuICAgIH1cclxuICAgIHBvc3RBdXRoKHVzZXIpO1xyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBvc3RBdXRoKHVzZXJDcmVkZW50aWFscykge1xyXG4gICAgbGV0IGZpZWxkczogTm9kZUxpc3RPZjxIVE1MRWxlbWVudD4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCcpO1xyXG4gICAgbGV0IHVzZXJuYW1lOiBzdHJpbmc7XHJcbiAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICB4aHIub3BlbihcIlBPU1RcIiwgXCIvdXNlcnMvc2lnbmluXCIsIHRydWUpO1xyXG4gICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xyXG4gICAgeGhyLnNlbmQoSlNPTi5zdHJpbmdpZnkodXNlckNyZWRlbnRpYWxzKSlcclxuICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbigpOiB2b2lkIHtcclxuICAgICAgICBpZiAoeGhyLnN0YXR1cyA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgIHVzZXJuYW1lID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2UpO1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UudW4gPSB1c2VybmFtZTsgLy9iYXNlNjQgZW5jb2RlZFxyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZSgnLycpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh4aHIuc3RhdHVzID09PSA0MDEpIHsgLy91c2VyIGRvZXNuJ3QgZXhpc3RcclxuICAgICAgICAgICAgbGV0IHdyb25nOiBBcnJheTxzdHJpbmc+ID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2UpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBmaWVsZCBvZiBmaWVsZHMpIHsgLy9vciBtaXNzaW5nW2ZpZWxkXSBmb3IgZXM1XHJcbiAgICAgICAgICAgICAgICBpZiAod3JvbmcuaW5jbHVkZXMoKDxIVE1MSW5wdXRFbGVtZW50PmZpZWxkKS50eXBlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkLnN0eWxlLmJvcmRlckNvbG9yID0gJ3JlZCc7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRvb2x0aXBUeHQgPSAoPEhUTUxFbGVtZW50PmZpZWxkLnBhcmVudE5vZGUpLmdldEF0dHJpYnV0ZSgnZGF0YScpO1xyXG4gICAgICAgICAgICAgICAgICAgICg8SFRNTEVsZW1lbnQ+ZmllbGQucGFyZW50Tm9kZSkuc2V0QXR0cmlidXRlKCdkYXRhLXRvb2x0aXAnLCB0b29sdGlwVHh0KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgKDxIVE1MRWxlbWVudD5maWVsZC5wYXJlbnROb2RlKS5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtdG9vbHRpcCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkLnN0eWxlLmJvcmRlckNvbG9yID0gJyNDRkQ4REMnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vdG9vbHRpcCtyZWQgYm9yZGVyXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh4aHIuc3RhdHVzID09PSA0MjIpIHsgLy9taXNzaW5nIGRhdGFcclxuICAgICAgICAgICAgbGV0IG1pc3Npbmc6IEFycmF5PHN0cmluZz4gPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZSk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGZpZWxkIG9mIGZpZWxkcykgeyAvL29yIG1pc3NpbmdbZmllbGRdIGZvciBlczVcclxuICAgICAgICAgICAgICAgIGlmIChtaXNzaW5nLmluY2x1ZGVzKCg8SFRNTElucHV0RWxlbWVudD5maWVsZCkudHlwZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAoPEhUTUxFbGVtZW50PmZpZWxkLnBhcmVudE5vZGUpLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS10b29sdGlwJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGQuc3R5bGUuYm9yZGVyQ29sb3IgPSAncmVkJztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGQuc3R5bGUuYm9yZGVyQ29sb3IgPSAnI0NGRDhEQyc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy90b29sdGlwK3JlZCBib3JkZXJcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==