/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\r\n    if (k2 === undefined) k2 = k;\r\n    var desc = Object.getOwnPropertyDescriptor(m, k);\r\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\r\n      desc = { enumerable: true, get: function() { return m[k]; } };\r\n    }\r\n    Object.defineProperty(o, k2, desc);\r\n}) : (function(o, m, k, k2) {\r\n    if (k2 === undefined) k2 = k;\r\n    o[k2] = m[k];\r\n}));\r\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\r\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\r\n}) : function(o, v) {\r\n    o[\"default\"] = v;\r\n});\r\nvar __importStar = (this && this.__importStar) || function (mod) {\r\n    if (mod && mod.__esModule) return mod;\r\n    var result = {};\r\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\r\n    __setModuleDefault(result, mod);\r\n    return result;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst THREE = __importStar(__webpack_require__(/*! three */ \"./node_modules/three/build/three.cjs\"));\r\nconsole.log(\"Hello World!\");\r\nwindow.addEventListener('DOMContentLoaded', init);\r\nfunction init() {\r\n    const width = 960;\r\n    const height = 540;\r\n    // レンダラーを作成\r\n    const renderer = new THREE.WebGLRenderer({\r\n        canvas: document.querySelector('#myCanvas')\r\n    });\r\n    renderer.setPixelRatio(window.devicePixelRatio);\r\n    renderer.setSize(width, height);\r\n    // シーンを作成\r\n    const scene = new THREE.Scene();\r\n    // カメラを作成\r\n    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);\r\n    camera.position.set(0, 0, +1000);\r\n    // 箱を作成\r\n    const geometry = new THREE.BoxGeometry(500, 500, 500);\r\n    const material = new THREE.MeshStandardMaterial({ color: 0x0000FF });\r\n    const box = new THREE.Mesh(geometry, material);\r\n    scene.add(box);\r\n    // 平行光源\r\n    const light = new THREE.DirectionalLight(0xFFFFFF);\r\n    light.intensity = 2; // 光の強さを倍に\r\n    light.position.set(1, 1, 1);\r\n    // シーンに追加\r\n    scene.add(light);\r\n    // 初回実行\r\n    tick();\r\n    function tick() {\r\n        requestAnimationFrame(tick);\r\n        // 箱を回転させる\r\n        box.rotation.x += 0.01;\r\n        box.rotation.y += 0.01;\r\n        // レンダリング\r\n        renderer.render(scene, camera);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://three-app/./src/index.ts?");

/***/ }),

/***/ "./node_modules/three/build/three.cjs":
/*!********************************************!*\
  !*** ./node_modules/three/build/three.cjs ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports) => {


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;