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

import { USER_TYPE } from '../../constants';

const User = new GraphQLObjectType({
  name: USER_TYPE,
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    first_name: {type: GraphQLString},
    last_name: {type: GraphQLString},
  })
})

export default User;
