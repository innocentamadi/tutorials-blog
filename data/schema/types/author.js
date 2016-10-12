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
  AUTHOR,
  TUTORIAL,
  USER
} from '../../constants';

import User from '../types/user';
import {getRecordByColumn} from '../helpers/dbHelpers';

const Author = new GraphQLObjectType({
  name: AUTHOR,
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    first_name: {type: GraphQLString},
    last_name: {type: GraphQLString},
    user: {
      type: User,
      resolve: author => getRecordByColumn('users', author.user_id)
    },
    tutorialsConnection: getChildConnectionByName({
      typeName: 'AuthorTutorials',
      tableType: TUTORIAL,
      tableName: 'tutorials',
      foreignKey: 'author_id'
    })
  })
})

export default Author;
