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

    if ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) !== 'object') {
      throw new Error('Enumerized.constructor must be passed an object');
    }

    this._object = object;
    this._keys = Enumerized.getKeys(object);
    this._values = Enumerized.getValues(object);

    this._keys.forEach(function (key) {
      _this[key] = _this._object[key];
    });
  }

  /**
   *
   * @param object
   * @returns {string[]}
   */


  _createClass(Enumerized, [{
    key: 'allMatch',


    /**
     *
     * @param parameters
     * @returns {boolean}
     */
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