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
  AUTHOR,
  TUTORIAL,
  CHAPTER,
  PAGE
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
    allAuthors: getRootConnectionByName(AUTHOR, 'authors'),
    author: getFieldByColumn(AUTHOR, 'authors'),
    allTutorials: getRootConnectionByName(TUTORIAL, 'tutorials'),
    tutorial: getFieldByColumn(TUTORIAL, 'tutorials'),
    allChapters: getRootConnectionByName(CHAPTER, 'chapters'),
    chapter: getFieldByColumn(CHAPTER, 'chapters', 'chapter_order'),
    allPages: getRootConnectionByName(PAGE, 'pages'),
    page: getFieldByColumn(PAGE, 'pages', 'page_order')
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
