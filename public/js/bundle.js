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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return authenticate; });\n/* harmony import */ var _authRequests__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./authRequests */ \"./src/js/authRequests.js\");\n\r\n\r\nfunction signin() {\r\n    let userForm = document.querySelector(\".user\");\r\n    let email = userForm.querySelector(\"input[type=email]\");\r\n    let password = userForm.querySelector(\"input[type=password]\");\r\n    let submitSignin = userForm.querySelector(\".btn-user\");\r\n\r\n    submitSignin.onclick = function() {\r\n        let user = {\r\n            email: email.value,\r\n            password: password.value\r\n        }\r\n        Object(_authRequests__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(user);\r\n    }\r\n}\r\n\r\nfunction authenticate() {\r\n    if (window.location.pathname === \"/users/signin\") {\r\n        signin();\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/js/auth.js?");

/***/ }),

/***/ "./src/js/authRequests.js":
/*!********************************!*\
  !*** ./src/js/authRequests.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return postAuth; });\nfunction postAuth(userCredentials) {\r\n    let username = \"\";\r\n    let xhr = new XMLHttpRequest();\r\n    xhr.open(\"POST\", \"/users/signin\",true);\r\n    xhr.setRequestHeader(\"Content-Type\", \"application/json\");\r\n    xhr.send(JSON.stringify(userCredentials))\r\n    xhr.onload = function() {\r\n      if(xhr.status===200) {\r\n        username=xhr.response;\r\n        window.location.replace('/')\r\n      }\r\n      if(xhr.status===401) { //user doesn't exist\r\n        console.log(JSON.parse(xhr.response))\r\n        //tooltip+red border\r\n      }\r\n      if(xhr.status===422) { //missing data\r\n        console.log(JSON.parse(xhr.response))\r\n        //tooltip+red border\r\n      }\r\n    }\r\n    return username;\r\n  }\r\n\n\n//# sourceURL=webpack:///./src/js/authRequests.js?");

/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth */ \"./src/js/auth.js\");\n\r\n\r\nObject(_auth__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\r\n\n\n//# sourceURL=webpack:///./src/js/main.js?");

/***/ })

/******/ });