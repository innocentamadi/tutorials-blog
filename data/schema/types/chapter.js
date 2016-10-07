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
  CHAPTER,
  PAGE
} from '../../constants';

const Chapter = new GraphQLObjectType({
  name: CHAPTER,
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: {type: GraphQLString},
    duration: {type: GraphQLInt},
    tutorial_id: {type: GraphQLInt},
    pagesConnection: getChildConnectionByName({
      typeName: 'ChapterPages',
      tableType: PAGE,
      tableName: 'pages',
      foreignKey: 'chapter_id'
    })
  })
})

export default Chapter;
