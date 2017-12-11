import { expect } from 'chai';
import enumerize from './src/index.js';

describe('enumerize', () => {

  const testObject = {
    one: 'one',
    two: 'two',
  };

  const testObject2 = {
    one: {
      one: 'one',
      two: 'two',
    },
    two: {
      one: 'one',
      two: 'two',
    }
  };

  const testObject3 = {
    one: {
      one: 'one',
      two: 'two',
    },
    two: {
      one: 'one',
      two: 'one',
    }
  };

  it ('provides access to original properties', () => {
    const result = enumerize(testObject);
    return expect(result.one).to.equal('one');
  });

  it ('allMatch() correctly returns true when matching itself', () => {
    const result = enumerize(testObject).allMatch(testObject);
    return expect(result).to.be.true;
  });

  it ('allMatch() correctly returns true when macthing one property', () => {
    const result = enumerize(testObject).allMatch({ one: 'one' });
    return expect(result).to.be.true;
  });

  it ('allMatch() correctly returns true when empty object is passed', () => {
    const result = enumerize(testObject).allMatch({ });
    return expect(result).to.be.true;
  });

  it ('allMatch() correctly returns false when no parameters match', () => {
    const result = enumerize(testObject).allMatch({ one: 'two' });
    return expect(result).to.be.false;
  });

  it ('allMatch() correctly returns false when at least one parameter does not match', () => {
    const result = enumerize(testObject).allMatch({ one: 'two', two: 'two' });
    return expect(result).to.be.false;
  });

  it ('allChildrenMatch() correctly returns true when all parameters of children match', () => {
    const result = enumerize(testObject2).allChildrenMatch(testObject);
    return expect(result).to.be.true;
  });

  it ('allChildrenMatch() correctly returns true when only one parameter needs matching', () => {
    const result = enumerize(testObject2).allChildrenMatch({ one: 'one' });
    return expect(result).to.be.true;
  });

  it ('allChildrenMatch() correctly returns true when only one parameter needs matching ' +
    'but children are not idenitical', () => {
    const result = enumerize(testObject3).allChildrenMatch({ one: 'one' });
    return expect(result).to.be.true;
  });

  it ('allChildrenMatch() correctly returns false one or more children do not match parameters', () => {
    const result = enumerize(testObject3).allChildrenMatch({ two: 'two' });
    return expect(result).to.be.false;
  });

  it ('allChildrenMatch() correctly returns false when no children match parammeters', () => {
    const result = enumerize(testObject3).allChildrenMatch({ one: 'two' });
    return expect(result).to.be.false;
  });

  it('forEach() returns the key and value for each property in the object', () => {
    const result = {};

    enumerize(testObject).forEach((value, key) => {
      result[key] = value;
    });

    return expect(result).to.deep.equal(testObject);
  });

});

