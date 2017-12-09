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
    if (typeof object !== 'object') {
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
   * @param parameters
   * @returns {boolean}
   */
  allMatch(parameters) {
    const findKeys = Enumerized.getKeys(parameters);
    return findKeys.every(findKey => (parameters[findKey] === this.object[findKey]));
  }

  /**
   *
   * @param parameters
   * @returns {*|boolean}
   */
  allChildrenMatch(parameters) {
    return this.values.every((child) => {
      if (typeof child !== 'object') {
        return false;
      }

      return enumerize(child).allMatch(parameters);
    });
  }
}

export default enumerize;
