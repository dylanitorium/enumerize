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
    var _this = this;

    _classCallCheck(this, Enumerized);

    if (object === null || (typeof object === 'undefined' ? 'undefined' : _typeof(object)) !== 'object') {
      throw new Error('Enumerized.constructor must be passed an object');
    }

    this._object = object;
    this._keys = Enumerized.getKeys(object);
    this._values = Enumerized.getValues(object);

    this._keys.forEach(function (key) {
      var property = _this._object[key];
      _this[key] = (typeof property === 'undefined' ? 'undefined' : _typeof(property)) === 'object' ? enumerize(property) : property;
    });
  }

  /**
   *
   * @param object
   * @returns {string[]}
   */


  _createClass(Enumerized, [{
    key: 'getValues',


    /**
     *
     * @returns {*}
     */
    value: function getValues() {
      return this._values;
    }

    /**
     *
     * @param parameters
     * @returns {boolean}
     */

  }, {
    key: 'allMatch',
    value: function allMatch(parameters) {
      var _this2 = this;

      var findKeys = Enumerized.getKeys(parameters);
      return findKeys.every(function (findKey) {
        return parameters[findKey] === _this2._object[findKey];
      });
    }

    /**
     *
     * @param parameters
     * @returns {*|boolean}
     */

  }, {
    key: 'allChildrenMatch',
    value: function allChildrenMatch(parameters) {
      return this._values.every(function (child) {
        if ((typeof child === 'undefined' ? 'undefined' : _typeof(child)) !== 'object') {
          return false;
        }

        return enumerize(child).allMatch(parameters);
      });
    }

    /**
     *
     * @param callback
     */

  }, {
    key: 'forEach',
    value: function forEach(callback) {
      var _this3 = this;

      this._keys.forEach(function (key) {
        var value = _this3._object[key];
        callback(value, key);
      });
    }

    /**
     *
     * @param keys
     * @returns {*}
     */

  }, {
    key: 'keysMatch',
    value: function keysMatch(keys) {
      var _this4 = this;

      var matches = {};
      keys.filter(function (key) {
        return _this4._keys.includes(key);
      }).forEach(function (key) {
        matches[key] = _this4._object[key];
      });
      return enumerize(matches);
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