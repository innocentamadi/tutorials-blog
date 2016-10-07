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
  TUTORIAL,
  CHAPTER
} from '../../constants';

const Tutorial = new GraphQLObjectType({
  name: TUTORIAL,
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: {type: GraphQLString},
    duration: {type: GraphQLString},
    author_id: {type: GraphQLInt},
    chaptersConnection: getChildConnectionByName({
      typeName: 'TutorialChapters',
      tableType: CHAPTER,
      tableName: 'chapters',
      foreignKey: 'tutorial_id'
    })
  })
});

export default Tutorial;
