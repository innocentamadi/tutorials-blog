import assign from 'object-assign';

/**
* @param {objects} collection : the original data
* @param {key} id used as key in the collection
*/
export const objectWithMinValue = (objects, key) => objects ? 
   objects.reduce((prev, curr) => 
    prev[key] < curr[key] ? prev : next) :
    {};

/**
* @param {objects} collection : the original data
* @param {key} id used as key in the collection
*/
export const objectWithMaxValue = (objects, key) => objects ? 
   objects.reduce((prev, curr) => 
    prev[key] > curr[key] ? prev : next) :
    {};

/**
* @param {Object} resource: the collection to check
* @param {Boolean} editing: the edit status
* @return {Object} modify only if exxplicitly stated to avoid modifying larger collections
*/
function resetStatus(resource, editing) {
  return editing ?
    assign(resource, {editing: 'editing'}) :
    resource;
}

/**
* @param (Array} arr: to be serialized
* @param {String} key: property to use as key of the object returned
* @return {Object} collection JSON with the array as value and id as key
*/
export function serializeByKey(arr, key) {
  let collection = {};
  if (arr) {
    let keyValue;
    for (let i = 0; i < arr.length; i++) {
      keyValue = arr[i][key || 'id'];
      collection = update(collection, keyValue, arr[i]);
    }
  }
  return collection;
}
