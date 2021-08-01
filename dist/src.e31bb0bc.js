// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"styles.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"createElement.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.createManyElements = void 0;

var createElement = function createElement() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "div";
  return document.createElement(type);
};

var createManyElements = function createManyElements() {
  for (var _len = arguments.length, elements = new Array(_len), _key = 0; _key < _len; _key++) {
    elements[_key] = arguments[_key];
  }

  return elements.map(createElement);
};

exports.createManyElements = createManyElements;
var _default = createElement;
exports.default = _default;
},{}],"addAttribute.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.addMultipleClasses = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var addClass = function addClass(element, key, value) {
  return element.setAttribute(key, value);
};

var addMultipleClasses = function addMultipleClasses(element, attributes) {
  return Object.entries(attributes).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    addClass(element, key, value);
    return element;
  });
};

exports.addMultipleClasses = addMultipleClasses;
var _default = addClass;
exports.default = _default;
},{}],"Image.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createElement = _interopRequireDefault(require("./createElement"));

var _addAttribute = require("./addAttribute");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Image = function Image(attributes) {
  var img = (0, _createElement.default)("img");
  (0, _addAttribute.addMultipleClasses)(img, attributes);
  return img;
};

var _default = Image;
exports.default = _default;
},{"./createElement":"createElement.js","./addAttribute":"addAttribute.js"}],"Button.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createElement = _interopRequireDefault(require("./createElement"));

var _addAttribute = require("./addAttribute");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Image = function Image(attributes) {
  var img = (0, _createElement.default)("button");
  (0, _addAttribute.addMultipleClasses)(img, attributes);
  return img;
};

var _default = Image;
exports.default = _default;
},{"./createElement":"createElement.js","./addAttribute":"addAttribute.js"}],"Container.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createElement = _interopRequireDefault(require("./createElement"));

var _addAttribute = require("./addAttribute");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Container = function Container(element, attributes) {
  var container = (0, _createElement.default)(element);
  (0, _addAttribute.addMultipleClasses)(container, attributes);
  return container;
};

var _default = Container;
exports.default = _default;
},{"./createElement":"createElement.js","./addAttribute":"addAttribute.js"}],"Text.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createElement = _interopRequireDefault(require("./createElement"));

var _addAttribute = require("./addAttribute");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Text = function Text() {
  var txt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "p";
  var attributes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var text = (0, _createElement.default)(type);
  text.textContent = txt;
  (0, _addAttribute.addMultipleClasses)(text, attributes);
  return text;
};

var _default = Text;
exports.default = _default;
},{"./createElement":"createElement.js","./addAttribute":"addAttribute.js"}],"append.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.appendMultiple = void 0;

var append = function append(parent, child) {
  return "append" in parent && parent.append(child);
};

var appendMultiple = function appendMultiple(parent, children) {
  return children.map(function (child) {
    return append(parent, child);
  });
};

exports.appendMultiple = appendMultiple;
var _default = append;
exports.default = _default;
},{}],"Link.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createElement = _interopRequireDefault(require("./createElement"));

var _addAttribute = require("./addAttribute");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Link = function Link(attributes) {
  var element = (0, _createElement.default)("a");
  element.textContent = "See React Version";
  (0, _addAttribute.addMultipleClasses)(element, attributes);
  return element;
};

var _default = Link;
exports.default = _default;
},{"./createElement":"createElement.js","./addAttribute":"addAttribute.js"}],"Header.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Container = _interopRequireDefault(require("./Container"));

var _Text = _interopRequireDefault(require("./Text"));

var _append = _interopRequireDefault(require("./append"));

var _Link = _interopRequireDefault(require("./Link"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Header = function Header(txt) {
  var Wrapper = (0, _Container.default)("div", {
    class: "headWrapper"
  });
  var text = (0, _Text.default)(txt, "p");
  var link = (0, _Link.default)({
    href: "https://react-carousel-ui.netlify.app/",
    target: "_blank",
    rel: "noreferrer"
  });
  (0, _append.default)(Wrapper, text);
  (0, _append.default)(Wrapper, link);
  return Wrapper;
};

var _default = Header;
exports.default = _default;
},{"./Container":"Container.js","./Text":"Text.js","./append":"append.js","./Link":"Link.js"}],"img/one.jpeg":[function(require,module,exports) {
module.exports = "/one.51a948e7.jpeg";
},{}],"img/two.jpeg":[function(require,module,exports) {
module.exports = "/two.e6b439e0.jpeg";
},{}],"img/three.jpeg":[function(require,module,exports) {
module.exports = "/three.36dcbe28.jpeg";
},{}],"Delay.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _addAttribute = _interopRequireWildcard(require("./addAttribute"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var counter = function counter() {
  var initial = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var count = initial;
  return {
    getCount: function getCount() {
      return count;
    },
    increment: function increment() {
      return ++count;
    },
    reset: function reset() {
      return count = 0;
    }
  };
};

var delay = function delay(elements, start, buttons) {
  var _counter = counter(start),
      getCount = _counter.getCount,
      increment = _counter.increment,
      reset = _counter.reset;

  console.log("newCount is", getCount());
  console.log("current elements", elements);
  var intervalID = setInterval(function () {
    //control flow that manages count logic
    //i.e. ensures count does not go higher than 2
    //if 2, count gets reset to 0.
    if (getCount() >= 2) {
      reset();
    } else {
      increment();
    } //count is updated, so img points at image that should be visible


    var count = getCount();
    var img = elements[count];
    var currentButton = buttons[count]; //this if statement hides previous image

    if (count === 0) {
      //hides previous image element
      //if new count is 0, then previous image must be 2
      var hiddenElement = elements[2];
      var previousButton = buttons[2]; //addAttribute(hiddenElement, "class", "hidden");

      (0, _addAttribute.addMultipleClasses)(hiddenElement, {
        class: "hidden",
        "aria-hidden": true
      });
      previousButton.removeAttribute("class");
    } else {
      //if count is not 0, then simply subtract new count by one
      var newCount = count - 1;
      var _hiddenElement = elements[newCount];
      var _previousButton = buttons[newCount]; // addAttribute(hiddenElement, "class", "hidden");

      (0, _addAttribute.addMultipleClasses)(_hiddenElement, {
        class: "hidden",
        "aria-hidden": true
      });

      _previousButton.removeAttribute("class");
    } //after hiding previous image, new is shown


    (0, _addAttribute.addMultipleClasses)(img, {
      class: "visible",
      "aria-hidden": false
    });
    (0, _addAttribute.default)(currentButton, "class", "currentButton");
    console.log("updated elements", elements);
  }, 2000);
  return intervalID;
};

var _default = delay;
exports.default = _default;
},{"./addAttribute":"addAttribute.js"}],"resetTimer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _addAttribute = _interopRequireWildcard(require("./addAttribute"));

var _Delay = _interopRequireDefault(require("./Delay"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var reset = function reset(id, elements, event, buttons) {
  window.clearInterval(id); //use either getAttribute or dataset property
  //let newStart = event.target.getAttribute("data-number");

  var newStart = event.target.dataset.number;
  elements.forEach(function (element, index) {
    if (element.id === event.target.name) {
      //event.target.name points at a string that describes the position of the button
      //that is equal to the position of the image (element.id)
      (0, _addAttribute.addMultipleClasses)(element, {
        class: "visible",
        "aria-hidden": false
      }); //the index is the value of the current iteration
      //inside the if block, it's the position of the element that becomes visible
      //that can be used to change the style of the button - turn it black

      (0, _addAttribute.default)(buttons[index], "class", "currentButton");
    } else {
      (0, _addAttribute.addMultipleClasses)(element, {
        class: "hidden",
        "aria-hidden": true
      }); //same as above, but here, it's used to turn the button to grey
      //which is the previous image/button

      buttons[index].removeAttribute("class");
    }
  });
  var intervalID = (0, _Delay.default)(elements, newStart, buttons);
  return intervalID;
};

var _default = reset;
exports.default = _default;
},{"./addAttribute":"addAttribute.js","./Delay":"Delay.js"}],"Carousel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Image = _interopRequireDefault(require("./Image"));

var _Button = _interopRequireDefault(require("./Button"));

var _Container = _interopRequireDefault(require("./Container"));

var _Header = _interopRequireDefault(require("./Header"));

var _append = require("./append");

var _one = _interopRequireDefault(require("./img/one.jpeg"));

var _two = _interopRequireDefault(require("./img/two.jpeg"));

var _three = _interopRequireDefault(require("./img/three.jpeg"));

var _Delay = _interopRequireDefault(require("./Delay"));

var _resetTimer = _interopRequireDefault(require("./resetTimer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Carousel = function Carousel() {
  //wrappers
  var container = (0, _Container.default)("div", {
    class: "wrapper"
  });
  var imgContainer = (0, _Container.default)("div", {
    class: "center"
  });
  var btnContainer = (0, _Container.default)("div", {
    class: "btnContainer"
  });
  var headContainer = (0, _Header.default)("Carousel UI achieved with Vanilla JS. The image rotates to the next one after 2 seconds, or by clicking the button below the image."); //dom elements, images and button

  var images = [(0, _Image.default)({
    src: _one.default,
    class: "visible",
    id: "imgOne",
    "aria-hidden": false
  }), (0, _Image.default)({
    src: _two.default,
    class: "hidden",
    id: "imgTwo",
    "aria-hidden": true
  }), (0, _Image.default)({
    src: _three.default,
    class: "hidden",
    id: "imgThree",
    "aria-hidden": true
  })];
  var buttons = [(0, _Button.default)({
    name: "imgOne",
    "data-number": 0,
    class: "currentButton"
  }), (0, _Button.default)({
    name: "imgTwo",
    "data-number": 1
  }), (0, _Button.default)({
    name: "imgThree",
    "data-number": 2
  })]; //appending functions, like ReactDOM.render

  (0, _append.appendMultiple)(imgContainer, images);
  (0, _append.appendMultiple)(btnContainer, buttons); //appends ALL Components to Container

  (0, _append.appendMultiple)(container, [headContainer, imgContainer, btnContainer]); //carousel functionality

  var intervalID = (0, _Delay.default)(images, 0, buttons); //buttion event handlers

  buttons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      var id = intervalID;
      intervalID = (0, _resetTimer.default)(id, images, event, buttons);
    });
  });
  return container;
};

var _default = Carousel;
exports.default = _default;
},{"./Image":"Image.js","./Button":"Button.js","./Container":"Container.js","./Header":"Header.js","./append":"append.js","./img/one.jpeg":"img/one.jpeg","./img/two.jpeg":"img/two.jpeg","./img/three.jpeg":"img/three.jpeg","./Delay":"Delay.js","./resetTimer":"resetTimer.js"}],"index.js":[function(require,module,exports) {
"use strict";

require("./styles.css");

var _Carousel = _interopRequireDefault(require("./Carousel"));

var _append = _interopRequireDefault(require("./append"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Carousel UI
//appends to given root
var root = document.getElementById("app");
(0, _append.default)(root, (0, _Carousel.default)());
},{"./styles.css":"styles.css","./Carousel":"Carousel.js","./append":"append.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52010" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map