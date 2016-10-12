import {
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql'

import {
  getChildConnectionByName
} from '../helpers/dbHelpers.js';

import {
  AUTHOR,
  TUTORIAL,
  CHAPTER
} from '../../constants';

import Author from './author.js';

import {getRecordByColumn} from '../helpers/dbHelpers';

const Tutorial = new GraphQLObjectType({
  name: TUTORIAL,
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: {type: GraphQLString},
    duration: {type: GraphQLString},
    description: {type: GraphQLString},
    featured_image_url: {type: GraphQLString},
    author_id: {type: GraphQLInt},
    author: {
      type: Author,
      resolve: tut => getRecordByColumn('authors', tut.author_id ),
    },
    chaptersConnection: getChildConnectionByName({
      typeName: 'TutorialChapters',
      tableType: CHAPTER,
      tableName: 'chapters',
      foreignKey: 'tutorial_id'
    })
  })
});

export default Tutorial;
