/******/ (function(modules) { // webpackBootstrap
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		if(typeof XMLHttpRequest === "undefined")
/******/ 			return callback(new Error("No browser support"));
/******/ 		try {
/******/ 			var request = new XMLHttpRequest();
/******/ 			var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 			request.open("GET", requestPath, true);
/******/ 			request.timeout = 10000;
/******/ 			request.send(null);
/******/ 		} catch(err) {
/******/ 			return callback(err);
/******/ 		}
/******/ 		request.onreadystatechange = function() {
/******/ 			if(request.readyState !== 4) return;
/******/ 			if(request.status === 0) {
/******/ 				// timeout
/******/ 				callback(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 			} else if(request.status === 404) {
/******/ 				// no update available
/******/ 				callback();
/******/ 			} else if(request.status !== 200 && request.status !== 304) {
/******/ 				// other failure
/******/ 				callback(new Error("Manifest request to " + requestPath + " failed."));
/******/ 			} else {
/******/ 				// success
/******/ 				try {
/******/ 					var update = JSON.parse(request.responseText);
/******/ 				} catch(e) {
/******/ 					callback(e);
/******/ 					return;
/******/ 				}
/******/ 				callback(null, update);
/******/ 			}
/******/ 		};
/******/ 	}


/******/ 	// Copied from https://github.com/facebook/react/blob/bef45b0/src/shared/utils/canDefineProperty.js
/******/ 	var canDefineProperty = false;
/******/ 	try {
/******/ 		Object.defineProperty({}, "x", {
/******/ 			get: function() {}
/******/ 		});
/******/ 		canDefineProperty = true;
/******/ 	} catch(x) {
/******/ 		// IE will fail on defineProperty
/******/ 	}

/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "623b8b35aa7f27a12e9c"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars

/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				if(canDefineProperty) {
/******/ 					Object.defineProperty(fn, name, (function(name) {
/******/ 						return {
/******/ 							configurable: true,
/******/ 							enumerable: true,
/******/ 							get: function() {
/******/ 								return __webpack_require__[name];
/******/ 							},
/******/ 							set: function(value) {
/******/ 								__webpack_require__[name] = value;
/******/ 							}
/******/ 						};
/******/ 					}(name)));
/******/ 				} else {
/******/ 					fn[name] = __webpack_require__[name];
/******/ 				}
/******/ 			}
/******/ 		}

/******/ 		function ensure(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}

/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		if(canDefineProperty) {
/******/ 			Object.defineProperty(fn, "e", {
/******/ 				enumerable: true,
/******/ 				value: ensure
/******/ 			});
/******/ 		} else {
/******/ 			fn.e = ensure;
/******/ 		}
/******/ 		return fn;
/******/ 	}

/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],

/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},

/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},

/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}

/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";

/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}

/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;

/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;

/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}

/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}

/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;

/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}

/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}

/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}

/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}

/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}

/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};

/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}

/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}

/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}

/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}

/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}

/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;

/******/ 			var data = {};

/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;

/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;

/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];

/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}

/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}

/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");

/******/ 		hotCurrentHash = hotUpdateNewHash;

/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}

/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}

/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}

/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}

/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };

/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _lazyload = __webpack_require__(1);

	function id(name) {
	  return document.getElementById(name);
	}

	var lazyload = new _lazyload.Lazyload({
	  extralHandler: id('J_scroll'),
	  loadImmdiately: true
	});
	lazyload.cacheImg();
	lazyload.addExtralHandler(id('J_scroll1'));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Lazyload = undefined;

	var _b_throttle = __webpack_require__(2);

	var _b_debounce = __webpack_require__(3);

	var _b_observer = __webpack_require__(4);

	Lazyload.prototype = new _b_observer.Observer();
	/**
	* lazyload.js 
	* @description 图片懒加载 lazyload img
	* @author babyzone2004
	*/

	/**
	增加以下css
	.lazyload {
	  opacity: 0;
	}
	.lazyload-show {
	  opacity: 1;
	}
	.lazyload-fadein {
	  position: relative;
	  z-index: 1;
	  transition: opacity .2s ease-in;
	  opacity: 1;
	}
	 */

	Lazyload.prototype.constructor = Lazyload;

	function render(imgCache, fadeIn) {
	  var img = imgCache.img;
	  if (img.tagName.toLowerCase() === 'img') {
	    img.src = img.dataset.src;
	  } else {
	    img.style['background-image'] = 'url(' + img.dataset.src + ')';
	  }
	  if (fadeIn) {
	    img.classList.add('lazyload-fadein');
	  } else {
	    img.classList.add('lazyload-show');
	  }
	  imgCache.isLoad = true;
	  imgCache.isLoading = false;
	}

	function Lazyload(opt) {
	  var me = this;
	  me.scrollStop = true;
	  opt = this.opt = this.mix({
	    selector: '.J_lazyload',
	    buffer: 450,
	    interval: 150,
	    fadeIn: true,
	    bufferWidth: 10,
	    loadImmdiately: true,
	    handler: window
	  }, opt);
	  this.loadImmdiately = opt.loadImmdiately;
	  this.buffer = opt.buffer;
	  this.fadeIn = opt.fadeIn;
	  _b_observer.Observer.call(this, opt.handler, opt.selector);

	  this.throttleLoad = (0, _b_throttle.throttle)(function (e, isExtra) {
	    me.loadImg(e, isExtra);
	  }, opt.interval);

	  var downloadedImgs = me.downloadedImgs = [];
	  var renderCacheImgs = function renderCacheImgs(fadeIn) {
	    me.scrollStop = true;
	    while (downloadedImgs.length !== 0) {
	      render(downloadedImgs.shift(), fadeIn);
	    }
	  };
	  this.debounceRender = (0, _b_debounce.debounce)(renderCacheImgs, 64);
	}

	Lazyload.prototype.scrollCb = function (e, isExtra) {
	  this.throttleLoad(e, isExtra);
	  this.debounceRender(e, isExtra);
	};

	Lazyload.prototype.cacheElem = function (cache, positions, elem, scrollTop) {
	  var rect = elem.getBoundingClientRect();
	  var top = Math.round(rect.top + scrollTop - this.offsetTop);
	  var left = rect.left;
	  if (!cache[top]) {
	    positions.push(top);
	    cache[top] = [];
	  }
	  var lazy = elem.dataset.lazy;
	  var imgCache = {
	    img: elem,
	    isLoad: false,
	    isLoading: false,
	    left: left,
	    lazy: lazy
	  };
	  cache[top].push(imgCache);
	  elem.classList.remove('J_lazyload');
	  if (this.loadImmdiately && !lazy && left < this.handlerWidth) {
	    this.load(imgCache);
	  }
	};

	/*
	 * 更新加载数据，放到缓存中
	 * @Param {NodeList} elems，图片
	 * */
	Lazyload.prototype.cacheImg = function () {
	  this.update();
	  this.loadImg();
	};

	// 加载符合条件的图片
	Lazyload.prototype.loadImg = function (e, horizon) {
	  var me = this;
	  var cache = me.cache;
	  var fadeIn = me.fadeIn;
	  var top = me.getScrollTop();
	  var handlerWidth = me.handlerWidth;

	  // 返回要加载的索引
	  var activeTop = top - this.buffer;
	  var activeBottom = top + this.handlerHeight + this.buffer;
	  var LoadIndexs = this.positions.filter(function (pos) {
	    if (pos > activeTop && pos < activeBottom) {
	      return true;
	    }
	  });

	  // 处理横滑的情况
	  var scrollLeft = 0;
	  if (horizon) {
	    var target = e.target;
	    scrollLeft = target.scrollLeft;
	    var targetHeight = target.clientHeight;
	    var targetTop = Math.round(target.getBoundingClientRect().top);
	    LoadIndexs = LoadIndexs.filter(function (item) {
	      if (targetTop + top <= item && item <= targetTop + top + targetHeight) {
	        return true;
	      }
	    });
	  }
	  for (var i = 0, ii = LoadIndexs.length; i < ii; i++) {
	    var elems = cache[LoadIndexs[i]];
	    for (var j = 0, jj = elems.length; j < jj; j++) {
	      var elem = elems[j];
	      if (elem.left - scrollLeft < handlerWidth) {
	        me.load(elem, fadeIn);
	      }
	    }
	  }
	};

	/*
	 * 加载图片
	 * */
	Lazyload.prototype.load = function (imgCache, fadeIn) {
	  var me = this;
	  if (!imgCache.isLoad && !imgCache.isLoading) {
	    var img = imgCache.img;
	    var startTime = Date.now();
	    var handler = function (imgCache) {
	      return function () {
	        // 缓存或者加载特别快的图片，不用渐现，与dom render一起渲染
	        if (Date.now() - startTime < 48 && !imgCache.lazy) {
	          fadeIn = false;
	        }
	        // 如果延迟显示
	        if (!imgCache.lazy || imgCache.lazy && me.scrollStop) {
	          render(imgCache, fadeIn);
	        } else {
	          me.downloadedImgs.push(imgCache);
	          imgCache.isLoading = false;
	        }
	      };
	    }(imgCache);
	    var handlerErr = function (imgCache) {
	      return function () {
	        imgCache.isLoading = false;
	      };
	    }(imgCache);
	    imgCache.isLoading = true;
	    var _img = new Image();
	    _img.src = img.dataset.src;
	    _img.onload = handler;
	    _img.onerror = handlerErr;
	  }
	};

	/**
	 * @description 立即加载图片
	 * @Param {Boolean} placeholder
	 */
	Lazyload.show = function (handler, selector) {
	  handler = handler || document.body;
	  var imgs = handler.querySelectorAll(selector);
	  for (var i = 0, ii = imgs.length; i < ii; i++) {
	    var elem = imgs[i];
	    if (elem.tagName.toLowerCase() === 'img') {
	      elem.src = elem.dataset.src;
	    } else {
	      elem.style['background-image'] = 'url(' + elem.dataset.src + ')';
	    }
	    var elemClass = elem.classList;
	    elemClass.remove(selector);
	  }
	};

	exports.Lazyload = Lazyload;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	* 截流函数
	* @param fn {Function} 实际要执行的函数
	* @param delay {Number} 间隔执行时间，单位是毫秒
	* @param immediately {Number} 
	* 是否需要立即执行一次，像lazyload这种情况，没必要设置true
	* 如果开启，最后一次执行可能会被setTimeout abort调
	* 
	* @return {Function} 
	*/

	// 针对chromium内核优化,https://github.com/GoogleChrome/devtools-docs/issues/53
	function setArgs(newArgs, oldArgs) {
	  for (var i = 0, ii = oldArgs.length; i < ii; i++) {
	    newArgs.push(oldArgs[i]);
	  }
	}
	function throttle(fn, time, immediately) {
	  var timer;
	  var context;
	  var args = [];
	  var _arguments;
	  return function () {
	    context = this;
	    if (immediately && !timer) {
	      setArgs(args, arguments);
	      fn.apply(context, args);
	      args = [];
	    }
	    if (!timer) {
	      _arguments = arguments;
	      timer = setTimeout(function () {
	        setArgs(args, _arguments);
	        !immediately && fn.apply(context, args);
	        args = [];
	        timer = null;
	      }, time);
	    }
	  };
	}

	exports.throttle = throttle;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	* @param fn {Function} 实际要执行的函数
	* @param delay {Number} 延迟时间，也就是阈值，单位是毫秒
	* @return {Function} 
	*/
	function debounce(fn, delay) {
	  var timer;
	  var tTimer;
	  var context;
	  var args = [];
	  var _argumentsr;
	  return function () {
	    context = this;
	    _argumentsr = arguments;
	    // 增加throttle处理，避免频繁执行clearTimer的开销
	    if (!tTimer) {
	      tTimer = setTimeout(function () {
	        clearTimeout(timer);
	        timer = setTimeout(function () {
	          // 针对chromium内核优化,https://github.com/GoogleChrome/devtools-docs/issues/53
	          for (var i = 0, ii = _argumentsr.length; i < ii; i++) {
	            args.push(_argumentsr[i]);
	          }
	          fn.apply(context, args);
	          args = [];
	        }, delay);
	        tTimer = null;
	      }, 32);
	    }
	  };
	}

	exports.debounce = debounce;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	/**
	* observe.js 
	* @description 监听元素是否在视口之内的基类
	* @author babyzone2004
	*/

	var win = window;

	function Observer(handler, selector) {
	  if (handler) {
	    var me = this;
	    this.cache = {};
	    this.selector = selector;
	    this.positions = [];
	    this.handler = handler;
	    if (handler === win) {
	      this.container = document.body;
	    } else {
	      this.container = handler;
	    }
	    this.offsetTop = this.handler === win ? 0 : this.handler.getBoundingClientRect().top;
	    this.updateContainSize();
	    handler.addEventListener('scroll', function (e) {
	      me.scrollStop = false;
	      me.scrollCb(e);
	    });
	  }
	}

	Observer.prototype.mix = function (ori, dest) {
	  for (var i in dest) {
	    ori[i] = dest[i];
	  }
	  return ori;
	};

	Observer.prototype.cacheElem = function (cache, positions, elem, scrollTop) {
	  var rect = elem.getBoundingClientRect();
	  var top = Math.round(rect.top + scrollTop - this.offsetTop);
	  var left = rect.left;
	  if (!cache[top]) {
	    positions.push(top);
	    cache[top] = [];
	  }
	  var domCache = {
	    dom: elem,
	    left: left,
	    right: rect.right,
	    bottom: rect.bottom
	  };
	  cache[top].push(domCache);
	  elem.classList.remove(this.selector);
	};

	/*
	 * 更新加载数据，放到缓存中
	 * @Param {NodeList} elems，图片
	 * */
	Observer.prototype.update = function () {
	  var doms = this.container.querySelectorAll(this.selector);
	  if (!doms.length) return;
	  var cache = this.cache;
	  var positions = this.positions;
	  var scrollTop = this.getScrollTop();
	  for (var i = 0, ii = doms.length; i < ii; i++) {
	    var dom = doms[i];
	    this.cacheElem(cache, positions, dom, scrollTop);
	  }
	};

	/*
	 * 更新加载数据，放到缓存中
	 * @Param {NodeList} elems，图片
	 * */
	Observer.prototype.updateCache = function () {
	  var cache = this.cache;
	  var scrollTop = this.getScrollTop();
	  var newCache = {};
	  var newPosition = [];
	  for (var i in cache) {
	    var items = cache[i];
	    for (var j = 0, jj = items.length; j < jj; j++) {
	      var dom = items[j].dom;
	      this.cacheElem(newCache, newPosition, dom, scrollTop);
	    }
	  }
	  this.cache = newCache;
	  this.positions = newPosition;
	};

	// 清除指定范围的图片内存
	Observer.prototype.clearMemory = function (top, bottom) {
	  var me = this;
	  var cache = me.cache;
	  top = Math.round(top);
	  bottom = Math.round(bottom);
	  top -= this.offsetTop;
	  bottom -= this.offsetTop;
	  me.positions = me.positions.filter(function (position) {
	    var match = position >= top && position < bottom;
	    if (match) {
	      cache[position] = [];
	    }
	    return !match;
	  });
	};

	// 更新容器尺寸
	Observer.prototype.updateContainSize = function () {
	  var handler = this.handler;
	  if (handler === win) {
	    this.handlerHeight = win.innerHeight;
	    this.handlerWidth = win.innerWidth;
	  } else {
	    this.handlerHeight = handler.clientHeight;
	    this.handlerWidth = handler.clientWidth;
	  }
	};

	// 删除某个指定元素的缓存
	Observer.prototype.clearElemMemory = function (elem) {
	  var cache = this.cache;
	  for (var i in cache) {
	    var elems = cache[i];
	    if (elems) {
	      var index = elems.indexOf(elem);
	      elems.splice(index, 1);
	    }
	  }
	};

	Observer.prototype.getScrollTop = function () {
	  if (this.handler === win) {
	    return win.scrollY;
	  } else {
	    return this.handler.scrollTop;
	  }
	};

	Observer.prototype.scrollCb = function () {};

	/**
	 * 增加额外的横向滚动处理
	 * @param {[type]} $dom [description]
	 */
	Observer.prototype.addExtralHandler = function (handler) {
	  var me = this;
	  handler.addEventListener('scroll', function (e) {
	    me.scrollStop = false;
	    me.scrollCb(e, true);
	  });
	};

	exports.Observer = Observer;

/***/ }
/******/ ]);