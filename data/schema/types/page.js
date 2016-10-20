import {
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql'

import {PAGE_TYPE} from '../../constants';

const PageType = new GraphQLObjectType({
  name: PAGE_TYPE,
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: {type: GraphQLString},
    body: {type: GraphQLString},
    page_order: {type: new GraphQLNonNull(GraphQLInt)},
    chapter_order: {type: new GraphQLNonNull(GraphQLInt)},
    tutorial_id: {type: new GraphQLNonNull(GraphQLID)}
  })
});

export default PageType;
