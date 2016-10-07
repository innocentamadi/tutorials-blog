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
  TUTORIAL
} from '../../constants';

const Author = new GraphQLObjectType({
  name: AUTHOR,
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    first_name: {type: GraphQLString},
    last_name: {type: GraphQLString},
    tutorialsConnection: getChildConnectionByName({
      typeName: 'AuthorTutorials',
      tableType: TUTORIAL,
      tableName: 'tutorials',
      foreignKey: 'author_id'
    })
  })
})

export default Author;
