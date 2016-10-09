import delay from './delay';
import {proverbs} from './data/proverbs';
import {translations} from './data/translations';

/* eslint-disable camelcase */

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

export function proverbWithTranslation(proverbId) {
  let proverbArr = proverbs.filter(proverb => proverb.id === proverbId);
  let translationsArr = translations.filter(job => job.proverb_id === proverbId);
  return Object.assign({}, proverbArr[0], {translations: translationsArr});
}

// This would be performed on the server in a real app. Just stubbing in.
const generateId = (proverb) => {
  return replaceAll(proverb.body.toLowerCase(), ' ', '-');
};

class TutorialApi {
  static getAllTutorials() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], proverbs));
      }, delay);
    });
  }

  static getTutorial(proverbId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign({}, proverbWithTranslation(proverbId)));
      }, delay);
    });
  }

  static saveTutorial(proverb) {
    proverb = Object.assign({}, proverb); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minTutorialTitleLength = 3;
        if (proverb.title.length < minTutorialTitleLength) {
          reject(`Title must be at least ${minTutorialTitleLength} characters.`);
        }

        if (proverb.id) {
          const existingTutorialIndex = proverbs.findIndex(a => a.id === proverb.id);
          proverbs.splice(existingTutorialIndex, 1, proverb);
        } else {
          // Just simulating creation here.
          // The server would generate ids and watchHref's for new proverbs in a real app.
          // Cloning so copy returned is passed by value rather than by reference.
          // proverb.id = generateId(proverb);
          proverbs.push(proverb);
        }

        resolve(proverb);
      }, delay);
    });
  }

  static deleteTutorial(proverbId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfTutorialToDelete = proverbs.findIndex(proverb => {
          return proverb.proverbId === proverbId;
        });
        proverbs.splice(indexOfTutorialToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default TutorialApi;
