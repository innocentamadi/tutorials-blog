import expect from 'expect';
import React from 'react'; // eslint-disable-line no-unused-vars
import {mount, shallow} from 'enzyme'; // eslint-disable-line no-unused-vars
import {Tutorials} from './Index';

/**
* @return {Func} A shallow dom for tests
*/
function setup(status) {
  let props = {
    proverbs: {
      1: {id: 1},
      2: {id: 2}
    }
  };
  return shallow(<Tutorials {...props} />);
}

describe('<Tutorials />', () => {
  it('renders a list of proverbs', () => {
    const wrapper = setup();

    // assertions
    expect(wrapper.find('ListPage').length).toEqual(1);
  });
});
