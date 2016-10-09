import expect from 'expect';
import proverbReducer from './proverbReducer';
import * as actions from '../../actions/tutorialActions';

describe('Tutorial Reducer Test', () => {
  it('should load proverbs when passed LOAD_TUTORIALS_SUCCESS', () => {
    const initialState = {};
    const proverbs = [
      {id: 1},
      {id: 2}
    ];
    const expectedState = {
      1: {id: 1},
      2: {id: 2}
    };
    const action = actions.loadTutorialsSuccess(proverbs);

    // action
    const newState = proverbReducer(initialState, action);

    // assertion
    expect(newState).toEqual(expectedState);
  });

  it("should add a new proverb when passed UPDATE_TUTORIAL_SUCCESS" +
    " if proverb doesn't already exist in store", () => {
    const initialState = {
      1: {id: 1},
      2: {id: 2}
    };
    const newTutorial = {id: 'C'};

    const action = actions.updateTutorialSuccess(newTutorial);

    // action
    const newState = proverbReducer(initialState, action);
    expect(Object.keys(newState).length).toEqual(3);
    expect(newState[1].id).toEqual(1);
    expect(newState[2].id).toEqual(2);
  });

  it('should update proverb when passed UPDATE_TUTORIAL_SUCCESS', () => {
    const initialState = {
      1: {id: 1},
      2: {id: 2}
    };
    const proverb = {id: 2, labor_cost: 34};
    const action = actions.updateTutorialSuccess(proverb);

    // action
    const updatedState = proverbReducer(initialState, action);

    // assertions
    expect(Object.keys(updatedState).length).toEqual(2);
    expect(updatedState[proverb.id].labor_cost).toEqual(34);
  });
});
