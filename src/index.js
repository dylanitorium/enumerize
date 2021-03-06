// eslint-disable-next-line no-use-before-define
const enumerize = object => new Enumerized(object);

/**
 *
 */
class Enumerized {
  /**
   *
   * @param object
   */
  constructor(object) {
    if (object === null || typeof object !== 'object') {
      object = {};
    }

    this._object = object;
    this._keys = Enumerized.getKeys(object);
    this._values = Enumerized.getValues(object);
    this.length = this._keys.length;

    this._keys.forEach((key) => {
      const property = this._object[key];
      this[key] = (typeof property === 'object') ? enumerize(property) : property;
    });
  }

  /**
   *
   * @param object
   * @returns {string[]}
   */
  static getKeys(object) {
    return Object.keys(object);
  }

  /**
   *
   * @param object
   * @returns {any[]}
   */
  static getValues(object) {
    return Object.values(object);
  }

  /**
   *
   * @returns {*}
   */
  getKeys() {
    return this._keys;
  }


  /**
   *
   * @returns {*}
   */
  getValues() {
    return this._values;
  }

  /**
   *
   * @param parameters
   * @returns {boolean}
   */
  allMatch(parameters) {
    const findKeys = Enumerized.getKeys(parameters);
    return findKeys.every(findKey => (parameters[findKey] === this._object[findKey]));
  }

  /**
   *
   * @param parameters
   * @returns {*|boolean}
   */
  allChildrenMatch(parameters) {
    return this._values.every((child) => {
      if (typeof child !== 'object') {
        return false;
      }

      return enumerize(child).allMatch(parameters);
    });
  }

  /**
   *
   * @param callback
   */
  forEach(callback) {
    this._keys.forEach((key) => {
      const value = this._object[key];
      callback(value, key);
    });
  }

  /**
   *
   * @param keys
   * @returns {*}
   */
  filterByKeys(keys) {
    const matches = {};
    keys.filter(key => this._keys.includes(key)).forEach((key) => {
      matches[key] = this._object[key];
    });
    return enumerize(matches);
  }


  map(callback) {
    const result = {};
    this._keys.forEach((key) => {
      result[key] = callback(this._object[key]);
    });
    return result;
  }


}

export default enumerize;
