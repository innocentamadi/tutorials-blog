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
    page_order: {type: GraphQLInt},
    chapter_order: {type: GraphQLInt}
  })
});

export default PageType;
