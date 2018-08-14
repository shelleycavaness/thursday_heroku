require('source-map-support/register')
module.exports =
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_dotenv_config__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_dotenv_config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_dotenv_config__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_mongoose__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_mongoose__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_volleyball__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_volleyball___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_volleyball__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_cors__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_cors___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_cors__);






const app = __WEBPACK_IMPORTED_MODULE_1_express___default()();
//const {PORT, DBUrl} = process.env; (first version)
//(these are the local varibles- give them name that make sence and use cap to follow convention)
/*heroku config:set MLAB_URL=mongodb://she:1964knicker@ds121182.mlab.com:21182/hugo-lab  
this is to set up the config setting in heroku. some are set and some you can create.
the .env file is writen in shell. better not to leave spaces
git push -u heroku master (this is so that heroku find the remote)
*/
const DBUrl = process.env.MLAB_URL || process.env.LOCAL_Url;
const SERVER_PORT = process.env.PORT || process.env.LOCAL_PORT;
const options = { promiseLibrary: Promise, useNewUrlParser: true };
const db = __WEBPACK_IMPORTED_MODULE_2_mongoose___default.a.connection;

//volleyball informe en direct
app.use(__WEBPACK_IMPORTED_MODULE_3_volleyball___default.a);
//ecrit les bon headers (utile pour fetch)
app.use(__WEBPACK_IMPORTED_MODULE_4_cors___default()());
//permet de recuper l'url pour les requettes
app.use(__WEBPACK_IMPORTED_MODULE_1_express___default.a.urlencoded({ extended: false }));

//express se connect a un port
app.listen(SERVER_PORT, () => {
	console.log(`server listen ${SERVER_PORT}`);
});

//connection base de donnee
__WEBPACK_IMPORTED_MODULE_2_mongoose___default.a.connect(DBUrl, options).then(() => {
	console.log('mongo works on ' + DBUrl);
}, err => {
	console.log(err);
});

//model
const foodSchema = new __WEBPACK_IMPORTED_MODULE_2_mongoose___default.a.Schema({
	title: { type: String }
});
const Food = __WEBPACK_IMPORTED_MODULE_2_mongoose___default.a.model('meal', foodSchema);
//create data for test database mlab
const veggieBurger = new Food({ title: "BocaBurger" });
veggieBurger.save(err => console.log("our err" + err));

//recuperer la base de donnees
app.get('/data', (req, res) => {
	Food.find({}, (err, data) => {
		if (err) console.log(err);
		res.json(data);
	});
});

//sauvegarder dans la base de donnee
app.post('/save', (req, res) => {
	const newFood = new Food(req.body);
	newFood.save((err, data) => {
		if (err) console.log(err);
		res.redirect("http://localhost:3000");
	});
});

//delete un id dans la base de donnee
app.get("/delet/:id", (req, res) => {
	Food.remove({ _id: req.params.id }, err => {
		if (err) console.log(err);
		res.redirect("http://localhost:3000/");
	});
});

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("dotenv/config");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("volleyball");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ })
/******/ ]);
//# sourceMappingURL=main.map