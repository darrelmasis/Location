(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.search = exports.getData = void 0;

/**
 * Obtiene datos de un archivo JSON
 * @param {string} url la ruta del archivo JSON
 * @returns promise
 */
var getData = function getData(url) {
  var response = fetch(url).then(function (response) {
    return response.json();
  });
  return response;
};
/**
 * 
 * @param {string} query criterio de búsqueda
 * @param {array} data data a procesar
 * @returns array
 */


exports.getData = getData;

var search = function search(query, data) {
  var expression = new RegExp("".concat(query), 'i');
  var queryResponse = data.filter(function (result) {
    return expression.test(result.name);
  });
  return queryResponse;
};

exports.search = search;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addAttributes = exports.createCustomElement = exports.select = void 0;
var id = document.getElementById.bind(document);
var q = document.querySelector.bind(document);
var all = document.querySelectorAll.bind(document);
/**
 * 
 * @param {string} elementSelector 
 * @param {int} type 
 * @returns DOM element
 */

var select = function select(elementSelector) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'id';
  var domElement = '';

  switch (type) {
    case 'q':
      domElement = q(elementSelector);
      break;

    case 'all':
      domElement = all(elementSelector);
      break;

    default:
      domElement = id(elementSelector);
      break;
  }

  return domElement;
};
/**
 * Crea elementos con atributos e hijos
 * @param {DOM element} element 
 * @param {string} attributes 
 * @param {string} children 
 * @returns DOM Element
 */


exports.select = select;

var createCustomElement = function createCustomElement(element, attributes, children) {
  var customElement = document.createElement(element);
  if (children !== undefined) children.forEach(function (el) {
    if (el.nodeType) {
      if (el.nodeType === 1 || el.nodeType === 11) customElement.appendChild(el);
    } else {
      customElement.innerHTML += el;
    }
  });
  addAttributes(customElement, attributes);
  return customElement;
};
/**
 * Añade un objeto de atributos a un elemento
 * @param {DOM element} element 
 * @param {object} attrObj 
 */


exports.createCustomElement = createCustomElement;

var addAttributes = function addAttributes(element, attrObj) {
  for (var attr in attrObj) {
    if (attrObj.hasOwnProperty(attr)) element.setAttribute(attr, attrObj[attr]);
  }
};

exports.addAttributes = addAttributes;

},{}],3:[function(require,module,exports){
"use strict";

var _core = require("./modules/core");

var _dom = require("./modules/dom");

var customerList = (0, _dom.select)('customersList', 'id');
var searchInput = (0, _dom.select)('search', 'id');
var dataUrl = '../../dist/json/customers.json';
(0, _core.getData)(dataUrl).then(function (result) {
  var data = result.customers;
  var limit;
  searchInput.addEventListener('input', function () {
    var query = searchInput.value;
    var queryResponse = '';
    query != '' ? queryResponse = (0, _core.search)(query, data) : null;
    queryResponse.length < limit ? limit = queryResponse.length : limit = 5;

    if (customerList.hasChildNodes()) {
      while (customerList.childNodes.length >= 1) {
        customerList.removeChild(customerList.firstChild);
      }
    }

    if (queryResponse.length > 0) {
      for (var i = 0; i <= limit; i++) {
        var customer = queryResponse[i];
        var content = (0, _dom.createCustomElement)('span', null, ["<span class=\"text-secondary\">".concat(customer.id, " - </span> ").concat(customer.name)]);
        var listItem = (0, _dom.createCustomElement)('a', {
          href: "./?q=".concat(customer.id.toLowerCase()),
          class: 'list-group-item d-flex list-group-item-action border-0'
        }, [content]);
        customerList.appendChild(listItem);
      }
    } else if (query != '') {
      customerList.style.display = "block";
    }

    customerList.addEventListener('click', function (e) {
      searchInput.value = e.target.innerText;
    });
  });
});

},{"./modules/core":1,"./modules/dom":2}]},{},[3]);

//# sourceMappingURL=scripts.js.map
