'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// eslint-disable-next-line no-use-before-define
var enumerize = function enumerize(object) {
  return new Enumerized(object);
};

/**
 *
 */

var Enumerized = function () {
  /**
   *
   * @param object
   */
  function Enumerized(object) {
    _classCallCheck(this, Enumerized);

    if ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) !== 'object') {
      throw new Error('Enumerized.constructor must be passed an object');
    }

    this.object = object;
    this.keys = Enumerized.getKeys(object);
    this.values = Enumerized.getValues(object);
  }

  /**
   *
   * @param object
   * @returns {string[]}
   */


  _createClass(Enumerized, [{
    key: 'allMatch',
    value: function allMatch(parameters) {
      var _this = this;

      var findKeys = Enumerized.getKeys(parameters);

      return findKeys.every(function (findKey) {
        return parameters[findKey] === _this.object[findKey];
      });
    }
  }, {
    key: 'allChildrenMatch',
    value: function allChildrenMatch(parameters) {
      console.log(this.values.length);
      var val = this.values.every(function (child) {
        if ((typeof child === 'undefined' ? 'undefined' : _typeof(child)) !== 'object') {
          return false;
        }

        return enumerize(child).allMatch(parameters);
      });

      alert(val);

      return val;
    }
  }], [{
    key: 'getKeys',
    value: function getKeys(object) {
      return Object.keys(object);
    }

    /**
     *
     * @param object
     * @returns {any[]}
     */

  }, {
    key: 'getValues',
    value: function getValues(object) {
      return Object.values(object);
    }
  }]);

  return Enumerized;
}();

exports.default = enumerize;