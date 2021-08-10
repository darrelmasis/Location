(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.search = exports.getData = void 0;

var getData = function getData(url) {
  var response = fetch(url).then(function (response) {
    return response.json();
  });
  return response;
};
/**
 * 
 * @param {string} query 
 * @param {array} data 
 */


exports.getData = getData;

var search = function search(query, data) {
  var expression = new RegExp("".concat(query), 'i');
  data.filter(function (result) {
    return expression.test(result);
  });
};

exports.search = search;

},{}],2:[function(require,module,exports){
"use strict";

var _getData = require("./modules/getData");

/**
 * ***Tareas***
 * Módulo para crear elementos del DOM
 * Módulo de busqueda y respuesta
 * 
 */
var customersList = document.getElementById("customersList");
var searchInput = document.getElementById("search");
(0, _getData.getData)('../../dist/json/customers.json').then(function (data) {
  var customers = data.customers;
  searchInput.addEventListener('keyup', function () {
    var queryResult = (0, _getData.search)();
    var searchValue = _getData.search.value;
    var expression = new RegExp("".concat(searchValue, ".*"), "i");
    var query = '';

    if (searchValue != '') {
      query = customers.filter(function (customer) {
        return expression.test(customer.name);
      });
      customersList.style.display = "block";
    }

    if (customersList.hasChildNodes()) {
      while (customersList.childNodes.length >= 1) {
        customersList.removeChild(customersList.firstChild);
      }
    }

    if (query.length > 0) {
      var limit = 5;

      if (query.length < limit) {
        limit = query.length;
      }

      for (var i = 0; i < limit; i++) {
        var customer = query[i];
        var listItem = document.createElement('span');
        listItem.style.cursor = "pointer";
        listItem.classList.add('list-group-item', 'list-group-item-action', 'text-start');
        listItem.textContent = "".concat(customer.name);
        customersList.appendChild(listItem);
      }
    } else if (_getData.search.value != '') {
      customersList.innerHTML = "<span class=\"text-danger py-3\">No se encontr\xF3 ningun resultado para: <span class=\"fw-bold\">".concat(_getData.search.value, "</span></span>");
    }
  });
  customersList.addEventListener('click', function (e) {
    _getData.search.value = e.target.textContent;
    customersList.style.display = "none";
  });
});

},{"./modules/getData":1}]},{},[2]);

//# sourceMappingURL=scripts.js.map
