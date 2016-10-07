import {
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql'

import {PAGE} from '../../constants';

const PageType = new GraphQLObjectType({
  name: PAGE,
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: {type: GraphQLString},
    body: {type: GraphQLString},
    chapter_id: {type: GraphQLInt}
  })
});

export default PageType;
