import expect from 'expect';
import * as dbHelpers from './dbHelpers';

describe('dbContition()', () => {
  it('creates a string of conditions for escape placeholders', () => {
    let conditions = {id: 1, order: 2};
    let expectedString = 'WHERE id = $1 AND order = $2';

    expect(dbHelpers.condition(conditions)).toEqual(expectedString);
  });
});

describe('objToArray()', () => {
  it('creates an array of the values of the object', () => {
    let object = {id: 1, order: 2};
    let expectedArr = [1, 2];
    expect(dbHelpers.objToArray(object)).toEqual(expectedArr);
  }); 
});
