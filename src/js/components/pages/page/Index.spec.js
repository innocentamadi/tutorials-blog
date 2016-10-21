import expect from 'expect';
import React from 'react'; // eslint-disable-line no-unused-vars
import {mount, shallow} from 'enzyme'; // eslint-disable-line no-unused-vars
import {Page} from './Index';

/**
* @return {Func} A shallow dom for tests
*/
function setup(status) {
  let props = {
  };
  return shallow(<Page {...props} />);
}

describe('<Page />', () => {
  it('renders the New Page component', () => {
    const wrapper = setup();

    // assertions
    expect(wrapper.find('.page-wrapper').length).toEqual(1);
  });
});
