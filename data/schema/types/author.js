import {
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

import {
  getChildConnectionByName
} from '../helpers/dbHelpers.js';

import {
  AUTHOR_TYPE,
  TUTORIAL_TYPE,
  TUTORIAL_TABLE,
  USER_TYPE,
  USER_TABLE
} from '../../constants';

import User from '../types/user';
import {getRecordByColumn} from '../helpers/dbHelpers';

const Author = new GraphQLObjectType({
  name: AUTHOR_TYPE,
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    user_id: {type: GraphQLID},
    user: {
      type: User,
      resolve: author => getRecordByColumn(USER_TABLE, {id: author.user_id})
    },
    tutorialsConnection: getChildConnectionByName({
      typeName: 'AuthorTutorials',
      tableType: TUTORIAL_TYPE,
      tableName: TUTORIAL_TABLE,
      foreignKey: 'author_id'
    })
  })
})

export default Author;
