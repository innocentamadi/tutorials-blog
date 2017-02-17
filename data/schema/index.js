import {
  GraphQLSchema,
  GraphQLObjectType,
} from 'graphql';

import {globalIdField} from 'graphql-relay';

import {
  getFieldByColumn,
  getRootConnectionByName
} from './helpers/dbHelpers';

import {
  AUTHOR_TYPE,
  TUTORIAL_TYPE,
  CHAPTER_TYPE,
  PAGE_TYPE,

  AUTHOR_TABLE,
  TUTORIAL_TABLE,
  CHAPTER_TABLE,
  PAGE_TABLE
} from '../constants';

import createTutorialMutation from './mutations/tutorial';
import createChapterMutation from './mutations/chapter';
import createPageMutation from './mutations/page';

let store = {};

const storeType = new GraphQLObjectType({
  name: 'Store',
  fields: () => ({
    id: globalIdField('Store'),
    allAuthors: getRootConnectionByName(AUTHOR_TYPE, AUTHOR_TABLE),
    author: getFieldByColumn(AUTHOR_TYPE, AUTHOR_TABLE),
    allTutorials: getRootConnectionByName(TUTORIAL_TYPE, TUTORIAL_TABLE),
    tutorial: getFieldByColumn(TUTORIAL_TYPE, TUTORIAL_TABLE),
    allChapters: getRootConnectionByName(CHAPTER_TYPE, CHAPTER_TABLE),
    chapter: getFieldByColumn(CHAPTER_TYPE, CHAPTER_TABLE, 'chapter_order'),
    allPages: getRootConnectionByName(PAGE_TYPE, PAGE_TABLE),
    page: getFieldByColumn(PAGE_TYPE, PAGE_TABLE, 'page_order')
  })
})

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      store: {
        type: storeType,
        resolve: () => store
      }
    })
  }),

  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
      createTutorial: createTutorialMutation,
      createChapter: createChapterMutation,
      createPage: createPageMutation
    })
  })

});

export default schema;
