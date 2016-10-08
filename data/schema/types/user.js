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

import { USER } from '../../constants';

const User = new GraphQLObjectType({
  name: USER,
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    first_name: {type: GraphQLString},
    last_name: {type: GraphQLString},
  })
})

export default User;
