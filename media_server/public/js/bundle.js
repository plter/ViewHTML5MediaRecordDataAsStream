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
/******/ 	return __webpack_require__(__webpack_require__.s = "./SubProjects/FrontEnd/StreamRecorder/src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./SubProjects/FrontEnd/StreamRecorder/src/Constants.js":
/*!**************************************************************!*\
  !*** ./SubProjects/FrontEnd/StreamRecorder/src/Constants.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n    MIME_TYPE: 'video/webm; codecs=\"opus,vp8\"'\n});\n\n//# sourceURL=webpack:///./SubProjects/FrontEnd/StreamRecorder/src/Constants.js?");

/***/ }),

/***/ "./SubProjects/FrontEnd/StreamRecorder/src/MediaStreamPipeline.js":
/*!************************************************************************!*\
  !*** ./SubProjects/FrontEnd/StreamRecorder/src/MediaStreamPipeline.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return MediaStreamPipeline; });\n/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Constants */ \"./SubProjects/FrontEnd/StreamRecorder/src/Constants.js\");\n\n\nclass MediaStreamPipeline {\n\n    constructor(targetVideoElement) {\n        this._targetVideoElement = targetVideoElement;\n    }\n\n    addBuffer(arrayBuffer, isFirstBuffer = false) {\n        if (this._targetVideoElement.src) {\n            URL.revokeObjectURL(this._targetVideoElement.src);\n        }\n\n        if (!isFirstBuffer) {\n            this._currentSourceBuffer.appendBuffer(arrayBuffer);\n        } else {\n            this._mediaSource = new MediaSource();\n            this._mediaSource.addEventListener(\"sourceopen\", function (e) {\n                this._currentSourceBuffer = this._mediaSource.addSourceBuffer(_Constants__WEBPACK_IMPORTED_MODULE_0__[\"default\"].MIME_TYPE);\n                this._currentSourceBuffer.appendBuffer(arrayBuffer);\n            }.bind(this));\n            this._targetVideoElement.src = URL.createObjectURL(this._mediaSource);\n            this._targetVideoElement.play();\n        }\n    }\n}\n\n//# sourceURL=webpack:///./SubProjects/FrontEnd/StreamRecorder/src/MediaStreamPipeline.js?");

/***/ }),

/***/ "./SubProjects/FrontEnd/StreamRecorder/src/index.js":
/*!**********************************************************!*\
  !*** ./SubProjects/FrontEnd/StreamRecorder/src/index.js ***!
  \**********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _MediaStreamPipeline__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MediaStreamPipeline */ \"./SubProjects/FrontEnd/StreamRecorder/src/MediaStreamPipeline.js\");\n/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tools */ \"./SubProjects/FrontEnd/StreamRecorder/src/tools.js\");\n/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Constants */ \"./SubProjects/FrontEnd/StreamRecorder/src/Constants.js\");\n\n\n\n\nclass Main {\n\n    constructor() {\n        this._socket = io();\n\n        this._previewVideo = document.querySelector(\"#preview\");\n        this._pipeline = new _MediaStreamPipeline__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this._previewVideo);\n\n        this._asyncInit();\n    }\n\n    async _asyncInit() {\n        this._stream = await navigator.mediaDevices.getUserMedia({audio: true, video: true});\n        document.querySelector(\"#btn-refresh\").onclick = this._btnFreshClickedHandler.bind(this);\n    }\n\n    _btnFreshClickedHandler() {\n        if (this._currentMediaRecorder) {\n            this._currentMediaRecorder.ondataavailable = null;\n            this._currentMediaRecorder.stop();\n        }\n\n        let mr = this._currentMediaRecorder = new MediaRecorder(this._stream, {mimeType: _Constants__WEBPACK_IMPORTED_MODULE_2__[\"default\"].MIME_TYPE});\n        mr._isFirstBuffer = true;\n        mr.ondataavailable = async e => {\n            this._socket.emit(\"media_stream\", e.data);\n            let buffer = await _tools__WEBPACK_IMPORTED_MODULE_1__[\"default\"].blobToArrayBuffer(e.data);\n            this._pipeline.addBuffer(buffer, e.target._isFirstBuffer);\n            e.target._isFirstBuffer = false;\n        };\n        mr.start(300);\n    }\n}\n\nnew Main();\n\n//# sourceURL=webpack:///./SubProjects/FrontEnd/StreamRecorder/src/index.js?");

/***/ }),

/***/ "./SubProjects/FrontEnd/StreamRecorder/src/tools.js":
/*!**********************************************************!*\
  !*** ./SubProjects/FrontEnd/StreamRecorder/src/tools.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n    blobToArrayBuffer: function (blob) {\n\n        return new Promise(resolve => {\n            var reader = new FileReader();\n            reader.onload = function () {\n                resolve(reader.result);\n            };\n            reader.readAsArrayBuffer(blob);\n        });\n    }\n});\n\n//# sourceURL=webpack:///./SubProjects/FrontEnd/StreamRecorder/src/tools.js?");

/***/ })

/******/ });