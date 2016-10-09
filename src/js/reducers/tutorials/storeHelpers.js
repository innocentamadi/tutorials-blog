import * as enums from '../../utils/enumsHelpers.js';
import assign from 'object-assign';

/* eslint-disable camelcase */

/**
* @param {Object} state: current application state. Most likely empty though
* @param {Object} proverbs object of proverbs (unserialized)
* @return {object} new serialized proverb object
*/
export function loadTutorials(state, proverbs) {
  return assign({}, state, enums.serializeByKey(proverbs));
}

/**
* @param {Object} proverbs object of proverbs currently in state
* @param {Object} id of proverb to edit
* @return {object} proverbs state with the specific proverb set to editing
*/
export function edit(proverbs, id) {
  return update(proverbs, proverbs[id], true);
}

/**
* @param {Object} proverbs object of proverbs currently in state
* @param {Object} updatedTutorial of proverb to edit
* @param {Object} editing: Boolean to show if edit status is to be set to editing
* @return {object} new serialized proverb object
*/
function update(proverbs, updatedTutorial, editing) {
  return enums.update(proverbs, updatedTutorial.id, updatedTutorial, editing);
}

/**
* @param {Object} proverbs object of proverbs currently in state
* @param {Object} proverb object with most recent updates
* @return {object} state with updates having any editing status removed
*/
export function updateTutorial(proverbs, proverb) {
  return update(proverbs, assign({}, proverb, {editing: null}));
}
