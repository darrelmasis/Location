(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getData = void 0;

var getData = function getData(url) {
  var response = fetch(url).then(function (response) {
    return response.json();
  });
  return response;
};

exports.getData = getData;

},{}],2:[function(require,module,exports){
"use strict";

var _getData = require("./modules/getData");

var customersList = document.getElementById("customersList");
var search = document.getElementById("search");
(0, _getData.getData)('../../dist/json/customers.json').then(function (data) {
  var customers = data.customers;
  search.addEventListener('keyup', function () {
    var searchValue = search.value;
    var expression = new RegExp("".concat(searchValue, ".*"), "i");
    var query = '';

    if (searchValue != '') {
      query = customers.filter(function (customer) {
        return expression.test(customer.name);
      });
    }

    if (customersList.hasChildNodes()) {
      while (customersList.childNodes.length >= 1) {
        customersList.removeChild(customersList.firstChild);
      }
    }

    query.forEach(function (customer) {
      var listItem = document.createElement('a');
      listItem.setAttribute = 'href="#"';
      listItem.classList.add('list-group-item', 'list-group-item-action', 'text-start');
      listItem.textContent = "".concat(customer.name, " - ").concat(customer.id);
      customersList.appendChild(listItem);
    });
  });
});

},{"./modules/getData":1}]},{},[2]);

//# sourceMappingURL=scripts.js.map
