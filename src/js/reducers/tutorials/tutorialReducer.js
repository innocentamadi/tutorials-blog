import types from '../../actions/actionTypes';
import * as storeHelpers from './storeHelpers';
import initialState from '../initialState';

export default function proverbReducer(state = initialState.proverbs, action) {
  switch (action.type) {
    case types.LOAD_TUTORIALS_SUCCESS:
      return storeHelpers.loadTutorials(state, action.proverbs);

    case types.LOAD_TUTORIAL_SUCCESS:
      return storeHelpers.updateTutorial(state, action.proverb);

    case types.UPDATE_TUTORIAL_SUCCESS:
      return storeHelpers.updateTutorial(state, action.proverb);

    default:
      return state;
  }
}
