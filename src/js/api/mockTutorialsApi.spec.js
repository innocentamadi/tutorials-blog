import expect from 'expect';
import mockTutorialsApi, {proverbWithTranslation} from './mockTutorialsApi';
import {proverbs} from './data/proverbs';
import {translations} from './data/translations';

describe('mockTutorialApi()', () => {
  it('returns an array of proverbs on getAllTutorials()', () => {
    mockTutorialsApi.getAllTutorials()
    .then(res => {
      expect(res).toEqual(proverbs);
    });
  });
});

describe('proverbWithTranslation()', () => {
  it('returns an proverb with translation', () => {
    let proverb = proverbs[0];
    let result = proverbWithTranslation(proverb.id);
    let proverbTranslations = translations
      .filter(translation => translation.proverb_id === proverb.id);
    expect(result.translations).toEqual(proverbTranslations);
  });
});
