import expect from 'expect';
import React from 'react'; // eslint-disable-line no-unused-vars
import {mount, shallow} from 'enzyme'; // eslint-disable-line no-unused-vars
import TutorialCards from './TutorialCards';

/**
* @return {Func} A shallow dom for tests
*/
function setup(status) {
  let props = {
    proverbs: {
      1: { id: 1 },
      2: { id: 2 }
    }
  };
  return shallow(<TutorialCards {...props} />);
}

describe('<TutorialCards />', () => {
  it('renders the TutorialCards component', () => {
    const wrapper = setup();

    // assertions
    expect(wrapper.find('TutorialCard').length).toEqual(2);
  });
});
