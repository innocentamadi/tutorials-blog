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
  AUTHOR_TYPE,
  TUTORIAL_TYPE,
  CHAPTER_TYPE,
  AUTHOR_TABLE,
  CHAPTER_TABLE,
} from '../../constants';

import Author from './author';
import Chapter from './chapter';

import {getRecordByColumn} from '../helpers/dbHelpers';

const Tutorial = new GraphQLObjectType({
  name: TUTORIAL_TYPE,
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: {type: GraphQLString},
    duration: {type: GraphQLString},
    description: {type: GraphQLString},
    featured_image_url: {type: GraphQLString},
    author_id: {type: GraphQLInt},
    author: {
      type: Author,
      resolve: tut => getRecordByColumn(AUTHOR_TABLE, {id: tut.author_id} ),
    },
    chapter: {
      type: Chapter,
      args: {
        chapter_order: {type: GraphQLInt},
      },
      resolve: (tut, {chapter_order}) => 
        getRecordByColumn(CHAPTER_TABLE, {
          tutorial_id: tut.id,
          chapter_order, 
        })
    },
    chaptersConnection: getChildConnectionByName({
      typeName: 'TutorialChapters',
      tableType: CHAPTER_TYPE,
      tableName: CHAPTER_TABLE,
      foreignKey: 'tutorial_id'
    })
  })
});

export default Tutorial;
