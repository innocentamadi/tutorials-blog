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
  PAGE_TYPE
} from '../constants';

import TutorialType from './types/tutorial';

let store = {};

const errorHandler = () => {
  return {};
}

const storeType = new GraphQLObjectType({
  name: 'Store',
  fields: () => ({
    id: globalIdField('Store'),
    allAuthors: getRootConnectionByName(AUTHOR_TYPE, 'authors'),
    author: getFieldByColumn(AUTHOR_TYPE, 'authors'),
    allTutorials: getRootConnectionByName(TUTORIAL_TYPE, 'tutorials'),
    tutorial: getFieldByColumn(TUTORIAL_TYPE, 'tutorials'),
    allChapters: getRootConnectionByName(CHAPTER_TYPE, 'chapters'),
    chapter: getFieldByColumn(CHAPTER_TYPE, 'chapters', 'chapter_order'),
    allPages: getRootConnectionByName(PAGE_TYPE, 'pages'),
    page: getFieldByColumn(PAGE_TYPE, 'pages', 'page_order')
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

  // mutation: new GraphQLObjectType({
  //   name: 'Mutation',
  //   fields: () => ({
  //     createAuthor: createAuthorMutation
  //   })
  // })

});

export default schema;
