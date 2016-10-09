import types from './actionTypes';
import webAPI from '../utils/webAPI';
import mockTutorialApi from '../api/mockTutorialsApi';

/**
* @param {Object} tutorials: object
* @return {Object} containing the action type and data
*/
export function loadTutorialsSuccess(tutorials) {
  return { type: types.LOAD_TUTORIALS_SUCCESS, tutorials };
}

/**
* @param {Object} tutorials: object
* @return {Object} containing the action type and data
*/
export function loadTutorialSuccess(tutorial) {
  return { type: types.LOAD_TUTORIAL_SUCCESS, tutorial };
}

/**
* @param {Object} tutorials: key tutorials and value is an array of questions
* @return {Object} containing the action type and tutorial
*/
export function updateTutorialSuccess(tutorial) {
  return { type: types.UPDATE_TUTORIAL_SUCCESS, tutorial };
}

export function loadTutorials() {
  return dispatch => {
    return webAPI(`/tutorials`, 'GET', '')
      .then(res => {
        dispatch(loadTutorialsSuccess(res.tutorials));
      });
  };
}

export function loadTutorial(tutorialId) {
  return dispatch => {
    return mockTutorialApi.getTutorial(tutorialId)
      .then(tutorial => {
        dispatch(loadTutorialSuccess(tutorial));
      });
  };
}
