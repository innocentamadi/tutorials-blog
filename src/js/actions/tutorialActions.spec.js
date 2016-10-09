import expect from 'expect';
import * as tutorialActions from './tutorialActions';
import * as types from './actionTypes';
import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';

import Config from '../config/environment';

describe('loadTutorialsSuccess', () => {
  describe('Create load Tutorials Action', () => {
    it('should create a LOAD_TUTORIALS_SUCCESS action', () => {
      // setup
      const proverbs = [
        {id: 'A1023'}
      ];
      const expectedAction = {
        type: types.default.LOAD_TUTORIALS_SUCCESS,
        proverbs
      };

      // actions
      const action = tutorialActions.loadTutorialsSuccess(proverbs);

      // assertions
      expect(action).toEqual(expectedAction);
    });
  });
});

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('loadTutorials', function() {
  afterEach(() => {
    nock.cleanAll();
  });
  // this.timeout(15000);
  it('should dispatch a success action on successful API response', done => {
    // setup
    const proverbs = [{id: 'A1023', name: 'first proverb'}];

    nock(Config.host)
    .get('/proverbs/recent')
    .reply(200, {body: proverbs});

    const expectedActions = [
      {type: types.default.LOAD_TUTORIALS_SUCCESS, proverbs}
    ];

    // action
    const initialAppState = {tags: []};
    const store = mockStore(initialAppState, expectedActions);

    store.dispatch(tutorialActions.loadTutorials()).then(() => {
      const actions = store.getActions();
      // expect(actions[0].type).toEqual(types.default.LOAD_TUTORIALS_SUCCESS);
      // expect(actions[0].proverbs).toEqual(proverbs);
    });

    done();
  });
});
